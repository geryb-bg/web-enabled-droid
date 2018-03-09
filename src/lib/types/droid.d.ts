export declare class Droid {
    sequence: number;
    gattProfile;
    controlChar;
    colour: string;

    constructor(gattProfile, controlChar);
    setColour(red, green, blue);
    roll(speed, direction);
    stop();
}