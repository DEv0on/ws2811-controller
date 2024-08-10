import express, {Express} from 'express';
import App from "./App";
import { Data } from './Worker';

class WebServer {
    port: number;
    app: Express;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    registerRoutes() {
        this.app.post('/:anim', (req, res) => {
            const data: Data = {
                type: "params",
                content: {
                    anim: req.params.anim,
                    body: req.body
                }
            }

            App.INSTANCE.worker.postMessage(data)

            res.json({status: 200})
        })

        this.app.post('/mode/:anim', (req, res) => {
            const data: Data = {
                type: "mode",
                content: req.params.anim
            }

            App.INSTANCE.worker.postMessage(data)

            res.json({status: 200})
        })
    }

    open() {
        this.app.use(express.json())
        this.registerRoutes();
        this.app.listen(this.port, () => {
            console.log(`Server started on port: ${this.port}`);
        })
    }
}

export {WebServer};