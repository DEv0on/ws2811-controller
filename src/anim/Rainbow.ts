import AbstractAnimation from "./Animation";
import {Channel} from "../Channel";

class Rainbow extends AbstractAnimation {
    speed: number
    brightness: number
    rainbow: number[]

    constructor(channel: Channel) {
        super(channel);
        this.speed = 2;
        this.brightness = 255;
        this.rainbow = [];
        this.genRainbow();
    }

    genRainbow() {
        for (let i = 0; i < this.channel.ledCount; i++) {
            const f = (i * 255 / this.channel.ledCount);
            const r = Math.round(Math.sin(0.024 * f + 0) * 127 + 128);
            const g = Math.round(Math.sin(0.024 * f + 2) * 127 + 128);
            const b = Math.round(Math.sin(0.024 * f + 4) * 127 + 128);
            this.rainbow[i] = r << 16 ^ g << 8 ^ b;
        }
    }

    run(args: any[]) {
        this.tick(args);
    }

    setBrightness(brightness: number) {
        this.channel.setBrightness(brightness)
    }

    async tick(args: any[]) {
        this.rainbow = this.rainbow.concat(this.rainbow.splice(0, this.speed))
        for (let i = 0; i < this.channel.ledCount; i++) {
            this.channel.colorArray[i] = this.rainbow[i]
        }
        this.setBrightness(this.brightness);
        this.channel.render();
    }
}

export default Rainbow;