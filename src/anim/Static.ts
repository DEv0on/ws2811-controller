import AbstractAnimation from "./Animation";
import {Channel} from "../Channel";

class Static extends AbstractAnimation {
    color: number;
    brightness: number;

    constructor(channel: Channel) {
        super(channel);
        this.color = 0x000000;
        this.brightness = 255;
    }

    run(args: any[]) {
        this.tick(args);
    }

    setBrightness(brightness: number) {
        this.channel.setBrightness(brightness)
    }

    tick(args: any[]) {
        this.brightness = Math.min(255, Math.max(0, this.brightness));
        this.setBrightness(this.brightness)
        for (let i = 0; i < this.channel.ledCount; i++) {
            this.channel.setStaticColor(this.color);
        }
    }
}

export default Static;