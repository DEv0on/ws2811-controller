import ws281x from "rpi-ws281x-native";
import AbstractAnimation from "./anim/Animation";

class Channel {
    mode: AbstractAnimation | null;
    readonly ledCount: number;
    private channel;
    private readonly colorArray: Uint32Array;

    constructor(ledCount: number) {
        this.mode = null;
        this.ledCount = ledCount;
        this.channel = ws281x(this.ledCount, {
            stripType: "ws2811-rgb",
            gpio: 18,
            brightness: 255
        });
        this.colorArray = this.channel.array;
    }

    clear() {
        ws281x.reset();
    }

    stop() {
        this.mode = null;
        this.clear()
    }

    setMode(mode: AbstractAnimation) {
        this.mode = mode;
    }

    setBrightness(brightness: number) {
        this.channel.brightness = brightness;

        this.render();
    }

    setStaticColor(color: number) {
        for (let i = 0; i < this.ledCount; i++) {
            this.colorArray[i] = color;
        }

        this.render();
    }

    render() {
        //@ts-ignore
        this.channel.render();
    }
}

export {Channel};