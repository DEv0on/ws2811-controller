import {Channel} from "../Channel";

abstract class AbstractAnimation {
    channel: Channel;


    constructor(channel: Channel) {
        this.channel = channel;
    }

    abstract run(args: any[]): void;
    abstract tick(args: any[]): void;

    abstract setBrightness(brightness: number): void;
}

export default AbstractAnimation;