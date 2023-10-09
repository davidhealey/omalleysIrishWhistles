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

include("manifest.js");

reg current = 0; //Currently selected articulation
    
//Muters
const var muter = {};
muter.sustain = Synth.getMidiProcessor("sustainMuter");
muter.transition = Synth.getMidiProcessor("transitionMuter");
muter.staccato = Synth.getMidiProcessor("staccatoMuter");

//Envelopes
const var envelope = {};
envelope.sustain = Synth.getModulator("sustainEnvelope");
envelope.staccato = Synth.getModulator("staccatoEnvelope");
    
//Envelope attack modulator
const var sustainAttackVelocity = Synth.getModulator("sustainAttackVelocity");
    
//Scripts
const var legatoHandler = Synth.getMidiProcessor("legato");
const var staccatoVelocityFilter = Synth.getMidiProcessor("staccatoVelocityFilter");
const var staccatoLegatoFilter = Synth.getMidiProcessor("legatoFilter");
    
//Functions
inline function getKSIndex(note)
{
    return Manifest.ks.indexOf(note);
}
    
inline function getProgramIndex(num)
{
    return Manifest.programs.indexOf(num);
}
    
inline function changeArticulation(index)
{
    if (index !== current && index < 3)
    {
        switch (index)
        {
            case 0: //Legato/Live
                muter.sustain.setAttribute(muter.sustain.ignoreButton, 0);
                muter.staccato.setAttribute(muter.staccato.ignoreButton, 0);
                muter.transition.setAttribute(muter.transition.ignoreButton, 0);
                legatoHandler.setAttribute(legatoHandler.btnMute, 0);
                staccatoVelocityFilter.setBypassed(false);
                staccatoLegatoFilter.setBypassed(false);
                sustainAttackVelocity.setBypassed(false);
                envelope.sustain.setAttribute(envelope.sustain.Attack, 100);
                    
                //Staccato/Overlay envelope
                envelope.staccato.setAttribute(envelope.staccato.Attack, 200);
                envelope.staccato.asTableProcessor().reset(0);
                envelope.staccato.asTableProcessor().setTablePoint(0, 0, 0, 0, 0.5);
                envelope.staccato.asTableProcessor().setTablePoint(0, 1, 1, 0, 0.4);
                envelope.staccato.asTableProcessor().addTablePoint(0, 0.03, 1);
            break;
        
            case 1: //Sustain
                muter.sustain.setAttribute(muter.sustain.ignoreButton, 0);
                muter.staccato.setAttribute(muter.staccato.ignoreButton, 1);
                muter.transition.setAttribute(muter.transition.ignoreButton, 1);
                legatoHandler.setAttribute(legatoHandler.btnMute, 1);
                sustainAttackVelocity.setBypassed(true);
                envelope.sustain.setAttribute(envelope.sustain.Attack, 10);
            break;
        
            case 2: //Staccato
                muter.sustain.setAttribute(muter.sustain.ignoreButton, 1);
                muter.staccato.setAttribute(muter.staccato.ignoreButton, 0);
                staccatoVelocityFilter.setBypassed(true);
                staccatoLegatoFilter.setBypassed(true);
                    
                //Envelope
                envelope.staccato.setAttribute(envelope.staccato.Attack, 2);
                envelope.staccato.asTableProcessor().reset(0);
            break;
        }
        
        current = index;
    }
}function onNoteOn()
{
    local idx = getKSIndex(Message.getNoteNumber());

	if (idx != -1)
	    changeArticulation(idx);
}
 function onNoteOff()
{
	
}
 function onController()
{
    //UACC or program change
	if (Message.getControllerNumber() == 32 || Message.isProgramChange())
    {
        local n;

        if (Message.isProgramChange())
            n = Message.getProgramChangeNumber();
        else
            n = Message.getControllerValue();

        //Get articulation index of program/uacc number
        local idx = getProgramIndex(n);

        //Change articulation
        if (idx != -1)
            changeArticulation(idx);
    }
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 