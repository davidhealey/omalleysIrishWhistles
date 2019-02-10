reg i;

//Get envelopes
const var envelopeIds = Synth.getIdList("Simple Envelope");
const var envelopes = [];

for (i = 0; i < envelopeIds.length; i++)
{
    envelopes[i] = Synth.getModulator(envelopeIds[i]);
}

//GUI
const var knobs = [];

knobs[0] = Content.addKnob("knbAtk", 0, 0);
knobs[0].set("text", "Attack");
knobs[0].set("mode", "Time");
knobs[0].setControlCallback(onKnobControl);

knobs[1] = Content.addKnob("knbRel", 150, 0);
knobs[1].set("text", "Release");
knobs[1].set("mode", "Time");
knobs[1].setControlCallback(onKnobControl);

inline function onKnobControl(control, value)
{
    local idx = knobs.indexOf(control); //Attack or release knob?
    
    for (i = 0; i < envelopes.length; i++)
    {
        if (idx == 0) //Attack
            envelopes[i].setAttribute(envelopes[i].Attack, value);
        else //Release
            envelopes[i].setAttribute(envelopes[i].Release, value);
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
