---
keywords: Articulations
summary:  
author:   David Healey
modified: 19.10.2019
license: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
index:    03
---

You can select an articulation by triggering a key switch or sending a UACC continuous controller message. Changing articulation using UACC (Universal Articulation Controller Channel) is done by setting a value on MIDI CC32.

|Name| Description| Key Switch| UACC/Program|
|---|---|---|---|
|Live| Monophonic with legato, staccato overlay, and retrigger| C1| 20|
|Sustain| Polyphonic sustained notes| C#1| 1|
|Staccato| Polyphonic short notes| D1| 40|

## Round Robin
The live and sustain articulations include two recorded repetition samples.
The staccato articulation and legato transitions use four recorded repetitions in a true-random pattern.