import {AbstractAnimation} from "./Animation";
import {Channel} from "../Channel";

class Static extends AbstractAnimation {
    color: number;

    constructor(channel: Channel) {
        super(channel);
        this.color = 0x000000;
    }

    run(args: any[]) {
        this.tick(args);
    }

    setBrightness(brightness: number) {
        this.channel.setBrightness(brightness)
    }

    tick(args: any[]) {
        for (let i = 0; i < this.channel.ledCount; i++) {
            this.channel.setStaticColor(this.color);
        }
    }
}

export default Static;