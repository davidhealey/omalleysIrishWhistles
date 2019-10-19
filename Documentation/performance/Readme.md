---
keywords: Performance
summary:
author:   David Healey
modified: 19.10.2019
license: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
index:    04
---

The Live articulation is designed to be performed in real time and contains a few features to make obtaining a realistic performance easier and more natural for a keyboard player

## Using a breath controller
When the breath controller button is enabled the Live articulation’s breath controller mode will be engaged. In this mode no sound will be triggered unless the Dynamics knob is at a value greater than 10. If the knob’s value drops below 10 any notes that are playing will be stopped.
You will probably want to assign your breath controller to the Dynamics knob.

## Long notes
Holding down a key will sustain a note indefinitely. Every sample will loop so you can maintain a note of any length. For a realistic performance you should try and keep in mind how much air the player would be using to hold the note and stop when appropriate.

You can use the continuous controller assigned to dynamics to create swells, crescendos, diminuendos, or any other dynamic expressions. A breath controller, mod-wheel, or expression pedal is perfect for this.

## Short notes
To play a short note just release the key earlier and the note will be shorter.
Play the note at a higher velocity with a brief swell on the dynamics controller to create a punchy staccato note. Using more or less force, releasing the key earlier or later, and varying the dynamics can create a variety of short articulations.

## Attack and Accents
Playing very softly, with a velocity below 20, will trigger a slower attack, a velocity above 20 but below 70 will trigger a normal attack.

When playing at velocities of 70 or above a staccato overlay sample will be triggered first and blended smoothly into the start of the sustain sample.

## Legato
Playing in an overlapped style, holding one note while playing the next, will trigger a legato transition between the notes.
You don’t need to worry about pacing your playing to get a smooth transition or to compensate for lag, the instrument will detect your playing speed, the pressure you’re using on the keys (velocity), and a few other parameters to calculate each transition

## Retrigger
A sustain pedal (or other controller assigned to CC64) can be used to retrigger a note. Whle the sustain pedal is held down any key that is released will be retriggered. Releasing the sustain pedal will stop the note.

If you want to retrigger a note immediately after a portamento glide you need to release the sustain pedal at the end of the glide and then hold it down again before releasing the key for the retrigger

## Trills
Trills of any interval, duration, or tempo can be played in a very natural fashion using the built-in retrigger feature. Hold down the first note of the trill while pressing and releasing the second. This is especially realistic when the library is used in combination with a breath controller linked to dynamics

## Portamento
Glissandi, slides, portamento, and smears can be triggered by pressing one key while another is already held and the sustain pedal (or other controller assigned to CC64) is engaged. You can glide across any interval using this method.

## Chords
Although the instruments in this library are monophonic it is sometimes useful to be able to play two or more notes at once. The Live articulation has a built in chord detector that will attempt to differentiate between a legato transition and playing a chord. There is no guarantee that it will be accurate 100% of the time. If you try to play a chord but only one note sounds it means the system thought you were trying to play a legato transition. This feature should be used sparingly and is included as a tool for composing rather than for crafting a realistic performance.
