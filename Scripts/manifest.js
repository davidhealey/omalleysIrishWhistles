/*
    Copyright 2019 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Manifest
{
    global currentArticulation = 0; //ID of the currently selected articulation
    
    const var UACC = 32;
    const var ks = [36, 37];
    const var programs = [1, 40];
    
    const var patches = {
        "Bb": {
            range:[70, 94]
        },
        "c": {
            range:[72, 96]
        },
        "d": {
            range:[74, 98]
        },
        "low_d": {
            range:[62, 86]
        }
    };
}