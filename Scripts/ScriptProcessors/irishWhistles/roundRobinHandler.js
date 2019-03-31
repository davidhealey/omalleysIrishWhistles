Synth.deferCallbacks(true);

const var sustainRoundRobin = Synth.getMidiProcessor("sustainRoundRobin");
const var staccatoRoundRobin = Synth.getMidiProcessor("staccatoRoundRobin");

//GUI
const var btnEnabled = Content.addButton("btnEnabled", 0, 0);
btnEnabled.set("text", "Enabled");

inline function onbtnEnabledControl(control, value)
{
    sustainRoundRobin.setBypassed(1-value);
    staccatoRoundRobin.setAttribute(staccatoRoundRobin.btnEnable, value);
}

btnEnabled.setControlCallback(onbtnEnabledControl);



function onNoteOn()
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
