Synth.deferCallbacks(true);

const var sustainTrueRoundRobin = Synth.getMidiProcessor("sustainTrueRoundRobin");
const var transitionRoundRobin = Synth.getMidiProcessor("transitionRoundRobin");
const var staccatoRoundRobin = Synth.getMidiProcessor("staccatoRoundRobin");
const var sustainRandomPitch = Synth.getModulator("sustainRandomPitch");
const var sustainRandomGain = Synth.getModulator("sustainRandomGain");
const var staccatoRandomGain = Synth.getModulator("staccatoRandomGain");
const var staccatoRandomPitch = Synth.getModulator("staccatoRandomPitch");

//GUI
const var btnEnabled = Content.addButton("btnEnabled", 0, 0);
btnEnabled.set("text", "Enabled");

inline function onbtnEnabledControl(control, value)
{
    sustainTrueRoundRobin.setAttribute(sustainTrueRoundRobin.btnEnable, value);
    transitionRoundRobin.setAttribute(transitionRoundRobin.btnEnable, value);
    staccatoRoundRobin.setAttribute(staccatoRoundRobin.btnEnable, value);
    sustainRandomPitch.setBypassed(1-value);
    sustainRandomGain.setBypassed(1-value);
    staccatoRandomGain.setBypassed(1-value);
    staccatoRandomPitch.setBypassed(1-value);
}

btnEnabled.setControlCallback(onbtnEnabledControl);function onNoteOn()
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
 