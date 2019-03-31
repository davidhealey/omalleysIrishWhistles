/*
    Copyright 2018, 2019 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this file. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Settings
{
    const var isPlugin = Engine.isPlugin();

    const var tileData = {
    "Type": "Tabs",
    "Font": "",
    "FontSize": 20,
    "Dynamic": false,
    "ColourData":
        {
            "bgColour": 0x00,
            "itemColour1":0xFF035C09,
            "textColour":0xFFF8F800
        },
    "Content": [],
    "CurrentTab": 0
    };

    tileData["Content"].push({
        "Type": "CustomSettings",
        "Title": "Engine",
        "StyleData": {
        },
        "ColourData":
            {
                "bgColour": 0xFD001D0E,
                "textColour":0xFFFFFDD1
            },
        "Font": "",
        "FontSize": 14,
        "Driver": !isPlugin,
        "Device": !isPlugin,
        "Output": !isPlugin,
        "BufferSize": !isPlugin,
        "SampleRate": !isPlugin,
        "GlobalBPM": true,
        "StreamingMode": true,
        "GraphicRendering": false,
        "ScaleFactor": true,
        "SustainCC": false,
        "ClearMidiCC": true,
        "SampleLocation": true,
        "DebugMode": false,
        "ScaleFactorList": [
            1,
            1.25,
            1.5,
            2
        ]
    });
    
    if(!isPlugin)
    {
        tileData["Content"].push(
        {
            "Type": "MidiSources",
            "Title": "MIDI Input",
            "StyleData": {
            },
            "Font": "",
            "FontSize": 14,
            "ColourData": {
                "bgColour": 0xFD001D0E,
                "textColour":0xFFFFFDD1
            }
        });
    }

    tileData["Content"].push({
        "Type": "MidiChannelList",
        "Title": "MIDI Channel",
        "StyleData": {
        },
        "Font": "",
        "FontSize": 14,
        "ColourData": {
            "bgColour": 0xFD001D0E,
            "textColour":0xFFFFFDD1
        }
    });

    tileData["Content"].push({
        "Type": "MidiLearnPanel",
        "Title": "MIDI Automation",
        "Font": "",
        "FontSize": 14,
        "ColourData":
        {
            "bgColour": 0xFD001D0E,
            "textColour":0xFFFFFDD1,
            "itemColour1":0xFF00714E
        }
    });
    
    tileData["Content"].push({
        "Type": "AboutPagePanel",
        "Title": "About",
        "Font": "",
        "FontSize": 14,
        "ColourData":
        {
            "bgColour": 0xFD001D0E,
            "textColour":0xFFFFFDD1,
            "itemColour1":0xFFFFE500
        },
        "CopyrightNotice": "\u00a9 2019, David Healey",
        "ShowLicensedEmail": false,
        "WebsiteURL": "http://librewave.com",
    });
};

Content.getComponent("fltSettings").setContentData(Settings.tileData);