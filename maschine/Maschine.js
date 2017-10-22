// Written by Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

Maschine.VERSION = "0.1.5";
Maschine.AUTHOR = "Michael Schmalle";
Maschine.VENDOR = "Native Instruments";

Maschine.STUDIO = 0;
Maschine.STUDIO_NAME = "Maschine Studio";
Maschine.STUDIO_UID = "342ED090-C483-11E3-9C1A-0800200C9A66";

Maschine.MK2 = 1;
Maschine.MK2_NAME = "Maschine MK2";
Maschine.MK2_UID = "EAE08E70-6076-11E4-9803-0800200C9A66";

Maschine.MIKROMK2 = 2;
Maschine.MIKROMK2_NAME = "Maschine Mikro MK2";
Maschine.MIKROMK2_UID = "0272C080-6081-11E4-9803-0800200C9A66";

Maschine.MK1 = 3;
Maschine.MK1_NAME = "Maschine MK1";
Maschine.MK1_UID = "FF7AD6B0-6535-11E4-9803-0800200C9A66";

Maschine.MIKROMK1 = 4;
Maschine.MIKROMK1_NAME = "Maschine Mikro MK1";
Maschine.MIKROMK1_UID = "TODO";

Maschine.INSTANCE = -1;

Maschine.MODE_BANK_DEVICE = 0;
Maschine.MODE_SCALE = 1;
Maschine.MODE_NAVIGATE = 2;
Maschine.MODE_TRACK = 3;
Maschine.MODE_VOLUME = 4;
Maschine.MODE_SELECT = 5;

Maschine.MODE_SEND1 = 6;
Maschine.MODE_SEND2 = 7;
Maschine.MODE_SEND3 = 8;
Maschine.MODE_SEND4 = 9;
Maschine.MODE_PAN = 10;

Maschine.MODE_SCALE_LAYOUT = 11;
Maschine.MODE_CLIP = 12;
Maschine.MODE_XFADE = 13;
Maschine.MODE_MASTER = 14;
Maschine.MODE_GROOVE = 15;
Maschine.MODE_FRAME = 16;
Maschine.MODE_ACCENT = 17;

Maschine.MODE_PARAM_PAGE_SELECT = 20;
Maschine.MODE_BANK_COMMON = 21;
Maschine.MODE_BANK_ENVELOPE = 22;
Maschine.MODE_BANK_DIRECT = 23;
Maschine.MODE_BANK_MACRO = 24;
Maschine.MODE_BANK_MODULATE = 25;
Maschine.MODE_BANK_USER = 26;
//Maschine.MODE_PRESET = 27;
Maschine.MODE_PRESET = 24;
Maschine.MODE_DEVICE_LAYER = 28;
Maschine.MODE_TRACK_VIEW = 29;
Maschine.MODE_SCENE_TRIGGER = 30;
Maschine.MODE_CLIP_TRIGGER = 31;

Maschine.MODE_TEMPO = 32;
Maschine.MODE_DRUM_CHANNEL = 33;
Maschine.MODE_CLIP_LENGTH      = 34;

Maschine.VIEW_PLAY            = 0;
Maschine.VIEW_MODE            = 1;
Maschine.VIEW_DRUM            = 2;
Maschine.VIEW_SEQUENCER       = 3;
Maschine.VIEW_CLIP_TRIGGER    = 4;
Maschine.VIEW_SCENE_TRIGGER   = 5;
Maschine.VIEW_EIDT_TOOLS      = 6;
Maschine.VIEW_MUTE            = 7;
Maschine.VIEW_SOLO            = 8;
Maschine.VIEW_TRACK           = 9;
Maschine.VIEW_NAVIGATE_ACTION = 10;

Maschine.VIEW_BUTTONS = [
    [Maschine.VIEW_SCENE_TRIGGER, MaschineButton.SCENE],
    [Maschine.VIEW_CLIP_TRIGGER, MaschineButton.PATTERN],
    //[Maschine.VIEW_DRUM, MaschineButton.PATTERN],
    //[Maschine.VIEW_PLAY, MaschineButton.PAD_MODE],
    [Maschine.VIEW_SEQUENCER, MaschineButton.STEP_MODE],
    // TODO Fix in MaschineButton
    [Maschine.VIEW_SEQUENCER, MaschineButton.PLUGIN]
];

Maschine.MODES = [
    [Maschine.MODE_MASTER, "Master"],
    [Maschine.MODE_VOLUME, "Volume"],
    [Maschine.MODE_PAN, "  Pan"],
    [Maschine.MODE_GROOVE, "Groove"],

    [Maschine.MODE_CLIP_LENGTH, "Fixed"],
    [Maschine.MODE_SEND1, "Send1"],
    [Maschine.MODE_SEND2, "Send2"],
    [Maschine.MODE_SEND3, "Send3"],

    [Maschine.MODE_CLIP, "Clip"],
    [Maschine.MODE_ACCENT, "Accent"],
    [Maschine.MODE_SCALE_LAYOUT, "SclLay"],
    [Maschine.MODE_XFADE, "XFade"],

    [Maschine.MODE_BANK_DEVICE, "Device"],
    [Maschine.MODE_TRACK, "Track"],
    [Maschine.MODE_SCALE, "Scale"],
    [Maschine.MODE_FRAME, "Frame"]
];

function ModeBank (id, name, isDefault)
{
    this.id = id;
    this.name = name;
    this.isDefault = isDefault == null ? false : isDefault;
}

Maschine.MODE_BANKS = [
    new ModeBank (Maschine.MODE_BANK_DEVICE, 'Device', true),
    new ModeBank (Maschine.MODE_BANK_COMMON, 'Common'),
    new ModeBank (Maschine.MODE_BANK_ENVELOPE, 'Envelope'),
    new ModeBank (Maschine.MODE_BANK_DIRECT, 'Direct'),
    new ModeBank (Maschine.MODE_BANK_MODULATE, 'Modulate'),
    new ModeBank (Maschine.MODE_BANK_MACRO, 'Macro'),
    new ModeBank (Maschine.MODE_BANK_USER, 'User')
];

function Maschine (output, input, buttons)
{
    if (output == null)
        return;

    AbstractControlSurface.call (this, output, input, buttons);

    this.previousModeId = null;

    this.ctrlButtonId = MaschineButton.GROUP_D;

    for (var i = 36; i < 52; i++)
        this.gridNotes.push (i);
}

Maschine.prototype = new AbstractControlSurface ();


//--------------------------------------
// Extensions
//--------------------------------------

Maschine.prototype.getPreviousModeId = function ()
{
    return this.previousModeId;
};

Maschine.prototype.setPreviousModeId = function (modeId)
{
    this.previousModeId = modeId;
;}

Maschine.prototype.isCtrlPressed = function ()
{
    return this.isPressed (this.ctrlButtonId);
};

//--------------------------------------
// Display
//--------------------------------------

Maschine.prototype.lightButton = function (buttonId, isOn)
{
    this.output.sendCC (buttonId, isOn ? MaschineButton.STATE_DOWN : MaschineButton.STATE_UP);
};

Maschine.prototype.setButton = function (buttonId, state)
{
    this.output.sendCC (buttonId, state);
};

Maschine.prototype.lightColor = function (cc, color)
{
    var hue = Math.floor (color.hue * 127.0 / 360.0);
    var saturation = Math.floor ((1 - Math.pow (1 - color.saturation, 2)) * 127.0);
    var brightness = Math.floor (color.brightness * 127.0);

    this.sendCCEx (0, cc, hue);
    this.sendCCEx (1, cc, saturation);
    this.sendCCEx (2, cc, brightness);
};

Maschine.prototype.sendColor = function (cc, color)
{
    var hue = Math.floor (color.hue * 127.0 / 360.0);
    var saturation = Math.floor ((1 - Math.pow (1 - color.saturation, 2)) * 127.0);
    var brightness = Math.floor (color.brightness * 127.0);
    //println("send " + i + ", " + hue + ", " + saturation + ", " + brightness);

    this.sendCCEx (0, cc, hue);
    this.sendCCEx (1, cc, saturation);
    this.sendCCEx (2, cc, brightness);
};

Maschine.prototype.sendCCEx = function (channel, cc, value)
{
    host.getMidiOutPort (0).sendMidi (0xB0 | channel, cc, value);
};

Maschine.prototype.shutdown = function ()
{
    // Clear display
    this.display.clear ().allDone ();

    // Turn off all buttons
    for (var i = 0; i < this.buttons.length; i++)
        this.lightButton (this.buttons[i], false);

    // Turn off row buttons
    for (var i = MaschineButton.TOP_ROW_0; i <= MaschineButton.TOP_ROW_7; i++)
        this.lightButton (i, false);

    // Turn off group buttons
    for (var i = MaschineButton.GROUP_A; i <= MaschineButton.GROUP_H; i++)
        this.sendColor (i, COLOR.OFF);

    this.pads.turnOff ();
};


Maschine.prototype.setButtonConsumed = function (buttonId)
{
    this.lightButton (buttonId, false);
    this.buttonConsumed[buttonId] = true;
};