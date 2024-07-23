import {WebServer} from './WebServer';
import {Channel} from "./Channel";
import Static from "./anim/Static";
import { readdirSync } from "node:fs";
import AbstractAnimation from "./anim/Animation";
const PORT = 8080;
const app = new WebServer(PORT);
const channel = new Channel(144);
const modes: Map<string, AbstractAnimation> = new Map();

readdirSync("./anim/").forEach((file) => {
    if (file.toLowerCase().startsWith("animation")) return;

    const req = require(`./anim/${file}`);
    modes.set(file.split(".")[0].toLowerCase(), new req[Object.keys(req)[0]](channel));
})

async function main() {
    app.open();
    channel.setMode(modes.get("static")!);
    (channel.mode!as Static).color = 0xff0000;
    while (true) {
        if (channel.mode !== null) {
            channel.mode.tick([])
        }
        await (new Promise(resolve => setTimeout(resolve, 10)));
    }
}

main();
