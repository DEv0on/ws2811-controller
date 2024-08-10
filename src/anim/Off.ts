import AbstractAnimation from "./Animation";
import {Channel} from "../Channel";

class Off extends AbstractAnimation {

    constructor(channel: Channel) {
        super(channel);
    }

    run(args: any[]) {
        this.tick(args);
    }

    setBrightness(brightness: number) {
        this.channel.setBrightness(brightness)
    }

    async tick(args: any[]) {
        this.setBrightness(0);
    }
}

export default Off;