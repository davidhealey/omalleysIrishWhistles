function onNoteOn()
{
    Console.print(Synth.isLegatoInterval());
    
	if (Synth.isLegatoInterval())
    {
        Message.ignoreEvent(true);
    }
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
