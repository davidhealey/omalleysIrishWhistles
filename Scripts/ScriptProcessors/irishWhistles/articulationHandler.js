include("manifest.js");

reg i;

//Get MIDI muters
const var muterIds = Synth.getIdList("MidiMuter");
const var muters = [];

for (m in muterIds)
{
    muters.push(Synth.getMidiProcessor(m));
}

inline function changeArticulation(idx)
{
    for (i = 0; i < muters.length; i++)
    {
        muters[i].setAttribute(0, 1);
    }
    
    muters[idx].setAttribute(0, 0);
    
    Manifest.currentArticulation = idx;
}

changeArticulation(0); //Default articulationfunction onNoteOn()
{
	if (Manifest.ks.indexOf(Message.getNoteNumber()) != -1)
    {
        changeArticulation(Manifest.ks.indexOf(Message.getNoteNumber()));
    }
}
function onNoteOff()
{
	
}
function onController()
{
	if (Message.getControllerNumber() == Manifest.UACC || Message.isProgramChange())
    {
        local ccIdx = Manifest.programs.indexOf(Message.getControllerValue());
        local programIdx = Manifest.programs.indexOf(Message.getProgramChangeNumber());
        
        if (ccIdx != -1) //UACC
        {
            changeArticulation(ccIdx);
        }
        else if (programIdx != -1) //Program change
        {
            changeArticulation(programIdx);
        }
    }
}
function onTimer()
{
	
}
function onControl(number, value)
{
	
}
