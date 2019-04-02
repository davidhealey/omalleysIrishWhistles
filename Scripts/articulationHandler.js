/*
    Copyright 2018, 2019 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Articulations
{    
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
        if (index !== Articulations.current && index < 3)
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
                    envelope.staccato.setAttribute(envelope.staccato.Attack, 200);
                break;
        
                case 1: //Sustain
                    muter.sustain.setAttribute(muter.sustain.ignoreButton, 0);
                    muter.staccato.setAttribute(muter.staccato.ignoreButton, 1);
                    muter.transition.setAttribute(muter.transition.ignoreButton, 1);
                    legatoHandler.setAttribute(legatoHandler.btnMute, 1);
                break;
        
                case 2: //Staccato
                    muter.sustain.setAttribute(muter.sustain.ignoreButton, 1);
                    muter.staccato.setAttribute(muter.staccato.ignoreButton, 0);
                    staccatoVelocityFilter.setBypassed(true);
                    staccatoLegatoFilter.setBypassed(true);
                    envelope.staccato.setAttribute(envelope.staccato.Attack, 200);
                break;
            }
        
            Articulations.current = index;
        }
    }
}