import AbstractAnimation from "./anim/Animation";
import Static from "./anim/Static";
import { Channel } from "./Channel";
import { Data } from "./Worker";
import { readdirSync } from "node:fs"
import { MessagePort } from "node:worker_threads"

class WorkerProcess {
    private readonly channel;
    private modes: Map<string, AbstractAnimation>;
    private parentPort: MessagePort | null

    constructor(parentPort: MessagePort | null) {
        this.parentPort = parentPort;
        this.channel = new Channel(144);
        this.modes = new Map<string, AbstractAnimation>();
        this.init();
    }

    private init() {
        readdirSync("./anim/").forEach((file) => {
            if (file.toLowerCase().startsWith("animation")) return;
    
            const req = require(`./anim/${file}`);
            this.modes.set(file.split(".")[0].toLowerCase(), new req[Object.keys(req)[0]](this.channel));
        })

        this.parentPort?.on("message", (data: Data) => {
            switch(data.type) {
                case 'mode': {
                    if (this.getMode(data.content) === undefined) {
                        this.parentPort?.postMessage({type: "res", content: {status: 405, error: "No such animation"}})
                        return;
                    }

                    this.channel.setMode(this.getMode(data.content)!)
                    this.parentPort?.postMessage({type: "res", content: {status: 200}});
                    return;
                }
                case 'params': {
                    if (this.getMode(data.content.anim) === undefined) {
                        this.parentPort?.postMessage({type: "res", content: {status: 405, error: "No such animation"}})
                        return;
                    }
                    for (const key of Object.keys(data.content.body)) {
                        if (key.toLowerCase().includes("brightness") && (typeof data.content.body[key] !== "number" || data.content.body[key] < 0 || data.content.body[key] > 255)) {
                            this.parentPort?.postMessage({type: "res", content: {status: 405, error: "Invalid brightness value"}})
                            return;
                        }
        
                        if (key.toLowerCase().includes("color") && typeof data.content.body[key] === "string") {
                            const prefix = data.content.body[key].startsWith("0x") ? "" : "0x";
                            data.content.body[key] = Number(prefix + data.content.body[key]);
                        }
                        if (data.content.body[key] > 0xffffff || data.content.body[key] < 0) {
                            this.parentPort?.postMessage({type: "res", content: { status: 405, error: "Invalid color value"}})
                            return;
                        }
        
                        this.getMode(data.content.anim)!.setParam(key, data.content.body[key]);
                    }
                    this.parentPort?.postMessage({type: "res", content: {status: 200}})
                    return;
                }
            }
        })
    }

    async main() {
        this.channel.setMode(this.getMode("static")!);
        (this.channel.mode!as Static).color = 0xff0000;
        while (true) {
            if (this.channel.mode !== null) {
                await this.channel.mode.tick([])
            }
            await new Promise(res => setInterval(res, 0));
        }
    }
    
    getChannel(): Channel {
        return this.channel;
    }

    getMode(mode: string) {
        return this.modes.get(mode);
    }
}

export default WorkerProcess