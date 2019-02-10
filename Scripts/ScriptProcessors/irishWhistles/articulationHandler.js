const var ks = [24, 25];
const var programs = [1, 40];
const var UACC = 32;

reg i;

//Get MIDI muters
const var muterIds = Synth.getIdList("MidiMuter");
const var muters = [];

for (i  = 0; i < muterIds.length; i++)
{
    muters[i] = Synth.getMidiProcessor(muterIds[i]);
}

inline function changeArticulation(idx)
{
    for (i = 0; i < muters.length; i++)
    {
        muters[i].setAttribute(0, 1);
    }
    
    muters[idx].setAttribute(0, 0);
}function onNoteOn()
{
	if (ks.indexOf(Message.getNoteNumber()) != -1)
    {
        changeArticulation(ks.indexOf(Message.getNoteNumber()));
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
