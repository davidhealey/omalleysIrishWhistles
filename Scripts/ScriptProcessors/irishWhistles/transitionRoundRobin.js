Content.setWidth(500);

const var btnEnable = Content.addButton("btnEnable", 10, 12);
btnEnable.set("text", "Enabled");

const var transitions = Synth.getChildSynth("transitions");
transitions.asSampler().enableRoundRobin(false);function onNoteOn()
{
	if (btnEnable.getValue())
	    transitions.asSampler().setActiveGroup(Math.randInt(1, 4));
	else
	    transitions.asSampler().setActiveGroup(1);
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
 