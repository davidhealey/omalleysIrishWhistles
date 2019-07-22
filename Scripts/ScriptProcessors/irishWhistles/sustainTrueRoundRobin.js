Content.setWidth(500);

const var btnEnable = Content.addButton("btnEnable", 10, 12);
btnEnable.set("text", "Enabled");

const var sustain = Synth.getChildSynth("sustain");
sustain.asSampler().enableRoundRobin(false);function onNoteOn()
{
	if (btnEnable.getValue())
	    sustain.asSampler().setActiveGroup(Math.randInt(1, 2));
	else
	    sustain.asSampler().setActiveGroup(1);
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
 