const knbLow = Content.addKnob("knbLow", 0, 0);
knbLow.setRange(0, 127, 1);
knbLow.set("text", "Low Note");

const knbHigh = Content.addKnob("knbHigh", 150, 0);
knbHigh.setRange(0, 127, 1);
knbHigh.set("text", "High Note");function onNoteOn()
{
    local n = Message.getNoteNumber();
	
    if (n < knbLow.getValue() || n > knbHigh.getValue())
	    Message.ignoreEvent(true);
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
 