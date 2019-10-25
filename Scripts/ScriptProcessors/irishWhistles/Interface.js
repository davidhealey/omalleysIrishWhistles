/*
    Copyright 2019 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

Content.makeFrontInterface(800, 580);

include("manifest.js");
include("settings.js");
include("HISE-Scripting-Framework/libraries/paths.js");

Synth.deferCallbacks(true);

Engine.loadFontAs("{PROJECT_FOLDER}fonts/BLKCHCRY.TTF", "blackCherry");

reg i;

//Value popup styling
Content.setValuePopupData(
{
    "fontName": "Oxygen",
    "fontSize": 18,
    "itemColour": 0x95035C09,
    "itemColour2": 0x95035C09,
    "borderSize": 0
});

//Page handler
const var btnPage = [];
const var pnlPage = [];

btnPage[0] = Content.getComponent("btnPreset0");
btnPage[1] = Content.getComponent("btnSettings");

for (i = 0; i < btnPage.length; i++)
{
    btnPage[i].setControlCallback(onbtnPageControl);
    pnlPage[i] = Content.getComponent("pnlPage"+i);
}

inline function onbtnPageControl(control, value)
{
    local idx = btnPage.indexOf(control);
    
    for (i = 0; i < pnlPage.length; i++)
    {
        pnlPage[i].showControl(idx == i && value == 1);
        btnPage[i].setValue(idx == i && value == 1);
    }
    
    Content.getComponent("pnlInstrument").set("enabled", 1-value);
}

//Dynamics\breath control
const var dynamicsCC = Synth.getModulator("dynamicsCC");
const var legato = Synth.getMidiProcessor("legato");
const var knbDynamics = Content.getComponent("knbDynamics");

inline function onknbDynamicsControl(control, value)
{
    dynamicsCC.setAttribute(dynamicsCC.DefaultValue, value);
    legato.setAttribute(legato.knbBreath, value);
}

knbDynamics.setControlCallback(onknbDynamicsControl);

//Velocity controlled dynamics
const var velocityShaper = Synth.getMidiProcessor("velocityShaper");

inline function onbtnVelDynamicsControl(component, value)
{
	velocityShaper.setAttribute(velocityShaper.btnDynamics, value);
};

Content.getComponent("btnVelDynamics").setControlCallback(onbtnVelDynamicsControl);


//Curve editors
const var btnCC = [];
const var tblCC = [];

for (i = 0; i < 4; i++)
{
    btnCC[i] = Content.getComponent("btnCC"+(i+1));
    btnCC[i].setControlCallback(onbtnCCControl);
    tblCC[i] = Content.getComponent("tblCC"+(i+1));
}

inline function onbtnCCControl(control, value)
{
    local idx = btnCC.indexOf(control);

    local params = ["Expression", "Dynamics", "Vibrato Intensity", "Vibrato Rate"];

    for (i = 0; i < tblCC.length; i++)
    {
        tblCC[i].showControl(false);
        btnCC[i].setValue(false);
    }

    tblCC[idx].showControl(value);
    btnCC[idx].setValue(value);

    //Show velocity table if value is false
    Content.getComponent("tblCC0").showControl(1-value);

    //Set parameter label
    if (value == 1)
        Content.getComponent("lblParam").set("text", params[idx]);
    else
        Content.getComponent("lblParam").set("text", "Velocity");

    //Show velocity dynamics button if dynamics is selected
    Content.getComponent("btnVelDynamics").showControl(idx == 1 && value == 1);
    Content.getComponent("lblVelocityControl").showControl(idx == 1 && value == 1);
}

//Preset handling
const var rangeFilter = Synth.getMidiProcessor("rangeFilter");

//Get samplers
const var samplerIds = Synth.getIdList("Sampler");
const var childSynths = {};

for (s in samplerIds)
{
    childSynths[s] = Synth.getChildSynth(s);
}

//Previous/Next preset buttons
inline function loadAdjacentPreset(control, value)
{
    if (value == 1)
    {
        local idx = btnPreset.indexOf(control);
        idx == 0 ? Engine.loadPreviousUserPreset(false) : Engine.loadNextUserPreset(false);
        Content.getComponent("lblPreset").set("text", Engine.getCurrentUserPresetName());
    }
}

const var btnPreset = [];
btnPreset[0] = Content.getComponent("btnPreset1").setControlCallback(loadAdjacentPreset);
btnPreset[1] = Content.getComponent("btnPreset2").setControlCallback(loadAdjacentPreset);

//Patch selection and loading drop down
const var cmbPatches = Content.getComponent("cmbPatches");
cmbPatches.setControlCallback(oncmbPatchesControl);

inline function oncmbPatchesControl(control, value)
{
    local patch = control.getItemText();

    colourKeys(patch);
    loadSampleMaps(patch);
    setRanges(patch);

    if(Engine.getCurrentUserPresetName() == "")
        Content.getComponent("lblPreset").set("text", "D Default");
    else
        Content.getComponent("lblPreset").set("text", Engine.getCurrentUserPresetName());
}

//Populate patch selection drop down
const var patches = [];

for (k in Manifest.patches)
{
    patches.push(k);
}

cmbPatches.set("items", patches.join("\n"));

//Functions

//Set playable range
inline function setRanges(patch)
{
    local range = Manifest.patches[patch].range;
    
    rangeFilter.setAttribute(rangeFilter.knbLow, range[0]);
    rangeFilter.setAttribute(rangeFilter.knbHigh, range[1]);
}

inline function colourKeys(patch)
{
    local range = Manifest.patches[patch].range;

    for (i = 0; i < 127; i++)
    {
        if (i >= range[0] && i <= range[1])
        {
            Engine.setKeyColour(i, Colours.withAlpha(Colours.white, 0.0)); //Light key colour
        }
        else if (Manifest.ks.indexOf(i) != -1)
        {
            Engine.setKeyColour(i, Colours.withAlpha(Colours.red, 0.3)); //Key switch
        }
        else
        {
            Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.5)); //Dark key colour
        }
    }
}

inline function loadSampleMaps(patch)
{
    local sampleMaps = Sampler.getSampleMapList();

    for (id in samplerIds) //Each sampler
    {
      //A sample map for this patch was found or sampler is transition sampler
      if (sampleMaps.contains(patch + "_" + id) || id == "transitions")
      {
        childSynths[id].setBypassed(false); //Enable sampler

        if (id == "transitions")
        {
            childSynths[id].asSampler().loadSampleMap(patch + "_staccato"); //Load staccato sample map
        }
        else
        {
            childSynths[id].asSampler().loadSampleMap(patch + "_" + id); //Load the sample map
        }
      }
      else
      {
        childSynths[id].setBypassed(true); //Bypass sampler
        childSynths[id].asSampler().loadSampleMap("empty"); //Load empty sample map for this sampler
      }
    }
}

//URL button
inline function onbtnURLControl(component, value)
{
	Engine.openWebsite("https://librewave.com");
};

Content.getComponent("btnURL").setControlCallback(onbtnURLControl);

//Docs button
const var btnDocs = Content.getComponent("btnDocs");

btnDocs.setControlCallback(onbtnDocsControl);
inline function onbtnDocsControl(component, value)
{
    if (!value) pnlDocs.showAsPopup(true);
    component.setValue(1);
};

//Docs panel
const var pnlDocs = Content.getComponent("pnlDocs");
pnlDocs.setIsModalPopup(true);

pnlDocs.setPaintRoutine(function(g)
{
    g.fillAll(this.get("bgColour"));
    g.setColour(0xFF222222);
    g.fillRect([0, 0, 255, this.getHeight()]);
});




function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 