const var s = Synth.getChildSynth("staccato");

const var knbGain = Content.addKnob("knbGain", 0, 0);
knbGain.set("text", "Gain");
knbGain.set("mode", "Decibel");
knbGain.setControlCallback(knbGainCB);

inline function knbGainCB(control, value)
{
    s.setAttribute(s.Gain, Engine.getGainFactorForDecibels(value));
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
