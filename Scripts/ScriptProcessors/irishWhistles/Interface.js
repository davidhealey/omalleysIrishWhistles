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

//Dynamics\breath control
const var dynamicsCC = Synth.getModulator("dynamicsCC");
const var legato = Synth.getMidiProcessor("legato");
const var knbDynamics = Content.getComponent("knbDynamics");
knbDynamics.setControlCallback(onknbDynamicsControl);

inline function onknbDynamicsControl(control, value)
{
    dynamicsCC.setAttribute(dynamicsCC.DefaultValue, value);
    legato.setAttribute(legato.knbBreath, value);
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
