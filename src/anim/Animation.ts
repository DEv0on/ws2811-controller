import {Channel} from "../Channel";

abstract class AbstractAnimation {
    channel: Channel;


    constructor(channel: Channel) {
        this.channel = channel;
    }

    abstract run(args: any[]): void;
    abstract tick(args: any[]): void;
    setParam(key: string, value: any) {
        //@ts-ignore
        this[key] = value;
    }
}

export default AbstractAnimation;