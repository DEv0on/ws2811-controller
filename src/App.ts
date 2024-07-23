import {WebServer} from "./WebServer";
import {Channel} from "./Channel";
import {readdirSync} from "node:fs";
import AbstractAnimation from "./anim/Animation";
import Static from "./anim/Static";

class App {
    static INSTANCE = new App();
    private static PORT = 8080;
    private webServer;
    private readonly channel;
    private modes: Map<string, AbstractAnimation>;


    constructor() {
        this.webServer = new WebServer(8080);
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
    }

    async main() {
        this.webServer.open();
        this.channel.setMode(this.modes.get("static")!);
        (this.channel.mode!as Static).color = 0xff0000;
        while (true) {
            if (this.channel.mode !== null) {
                this.channel.mode.tick([])
            }
            await (new Promise(resolve => setTimeout(resolve, 10)));
        }
    }

    getChannel(): Channel {
        return this.channel;
    }

    getMode(mode: string) {
        return this.modes.get(mode);
    }
}

export default App;