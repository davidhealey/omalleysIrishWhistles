Content.setWidth(500);

const var btnEnable = Content.addButton("btnEnable", 10, 12);
btnEnable.set("text", "Enabled");

const var staccato = Synth.getChildSynth("staccato");
staccato.asSampler().enableRoundRobin(false);function onNoteOn()
{
	if (btnEnable.getValue())
	    staccato.asSampler().setActiveGroup(Math.randInt(1, 4));
	else
	    staccato.asSampler().setActiveGroup(1);
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
 