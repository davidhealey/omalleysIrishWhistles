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

Content.makeFrontInterface(600, 500);

include("manifest.js");

Synth.deferCallbacks(true);

reg i;
reg lastArticulation = 0;

//Controllers
const var cmbCC = [];
const var knbCC = [];

for (i = 0; i < 3; i++)
{
    cmbCC[i] = Content.getComponent("cmbCC"+i);
    knbCC[i] = Content.getComponent("knbCC"+i);
    knbCC[i].setControlCallback(onknbCCControl);
}

inline function onknbCCControl(control, value)
{
    local idx = knbCC.indexOf(control);
    
    //Link knobs for parameters that share the same CC number
    for (i = 0; i < cmbCC.length; i++)
    {
        if (i != idx && cmbCC[i].getItemText() == cmbCC[idx].getItemText())
        {
            knbCC[i].setValue(value);
        }
    }
    
    //Send CC
    Synth.sendController(cmbCC[idx].getItemText(), value);
}

//Preset handling
const var samplerIds = Synth.getIdList("Sampler");
const var childSynths = {};

for (s in samplerIds)
{
    childSynths[s] = Synth.getChildSynth(s);
}

//Patch selection and loading drop down
const var cmbPatches = Content.getComponent("cmbPatches");
cmbPatches.setControlCallback(oncmbPatchesControl);

inline function oncmbPatchesControl(control, value)
{
    local patch = control.getItemText();
    
    colourKeys(patch);
    loadSampleMaps(patch);
    colourKeySwitches();
}

//Populate patch selection drop down
const var patches = [];

for (k in Manifest.patches)
{
    patches.push(k);
}

cmbPatches.set("items", patches.join("\n"));

inline function colourKeys(patch)
{
    local range = Manifest.patches[patch].range;
    
    for (i = 0; i < 127; i++)
    {
        if (i >= range[0] && i <= range[1])
        {
            Engine.setKeyColour(i, Colours.withAlpha(Colours.white, 0.0)); //Light key colour
        }
        else 
        {
            Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.5)); //Dark key colour
        }
    }
}

inline function colourKeySwitches()
{
    for (i = 0; i < Manifest.ks.length; i++)
    {
        if (i == Manifest.currentArticulation)
        {
            Engine.setKeyColour(Manifest.ks[i], Colours.withAlpha(Colours.red, 0.3)); //Set selected KS
        }
        else
        {
            Engine.setKeyColour(Manifest.ks[i], Colours.withAlpha(Colours.darkred, 0.3)); //Set key colour
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
}function onNoteOn()
{
    //If the articulation has been changed by the articulation handler update the UI
	if (Manifest.currentArticulation != lastArticulation)
    {
        colourKeySwitches();
        lastArticulation = Manifest.currentArticulation;
    }
}
function onNoteOff()
{
	
}
function onController()
{
    //If the articulation has been changed by the articulation handler update the UI
	if (Manifest.currentArticulation != lastArticulation)
    {
        colourKeySwitches();
        lastArticulation = Manifest.currentArticulation;
    }
    
    for (i = 0; i < cmbCC.length; i++)
    {
        if (Message.getControllerNumber() == cmbCC[i].getItemText())
            knbCC[i].setValue(Message.getControllerValue());
    }
}
function onTimer()
{
	
}
function onControl(number, value)
{
	
}
