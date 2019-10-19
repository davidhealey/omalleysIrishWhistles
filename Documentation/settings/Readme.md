---
keywords: Settings
summary:  
author:   David Healey
modified: 16.10.2019
license: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
index:    07
---
  
![omallys-irish-whistles-settings-button](/images/custom/omallys-irish-whistles-settings-button.jpg) 

The settings page gives you control over the sampler engine, hardware configuration, and MIDI options. The settings that are available will vary slightly depending on if you are using the standalone instrument or the VSTi plugin.

### Engine Tab

- Driver: This is used to set the audio playback system that the instrument will use. The choice of drivers will vary depending on your operating system.
- Audio Device: You can select which hardware audio output device (sound-card/audio interface) you want the instrument to use.
- Output: If your chosen device has multiple outputs you can use this menu to select which will be used by the instrument.
- Buffer Size: This is the buffer used by your chosen audio device. Lowering the buffer size reduces latency but if it’s too low it can cause pops and clicks to be heard.
- Sample Rate: This is the sample rate of your chosen audio device. The available options will vary based on your hardware.
- UI Zoom Factor: You can increase or decrease the size of the instrument’s interface using the options in this menu. All of the instrument’s graphics and text are designed to scale perfectly without blurring or fuzziness.
- Streaming Mode: Select the option that suits the type of drive you are using to store the instrument’s samples.
- Max Voices: The amount of polyphony the instrument can handle. If the value is too low you may notice some dropouts when playing a lot of notes.
- Clear MIDI CC: Use this button to reset all MIDI continuous controller assignments you have made using the MIDI learn feature.
- Change sample folder location: If you move the samples to a new location you can use this button to point the instrument to them.

### MIDI input tab

Displays the hardware MIDI devices that the instrument can see. You can check the boxes alongside the device names to enable those devices for MIDI input. This tab is only visible in the standalone application.

### MIDI channel tab

From here you can select the incoming MIDI channels that the instrument will respond to.

### MIDI automation tab

Displays information about any MIDI continuous controller numbers you have assigned using the MIDI learn feature. It also allows you to adjust the range of values that the continuous controllers will use and provides you with a quick way to invert the values if desired.