import {WebServer} from "./WebServer";
import { Worker } from "node:worker_threads"

class App {
    static INSTANCE = new App();
    private static PORT = 8080;
    private webServer;
    worker: Worker

    constructor() {
        this.webServer = new WebServer(8080);
        this.worker = new Worker('./Worker.js')
    }

    async main() {
        this.webServer.open();
    }
}

export default App;