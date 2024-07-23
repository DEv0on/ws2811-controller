import express, {Express} from 'express';
import App from "./App";

class WebServer {
    port: number;
    app: Express;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    registerRoutes() {
        this.app.post('/:anim', (req, res) => {
            if (App.INSTANCE.getMode(req.params.anim) === undefined)
                return res.json({ status: 405, error: "No such animation!"})
            Object.keys(req.body).forEach(key => {
                //@ts-ignore
                App.INSTANCE.getMode(req.params.anim)[key] = body[key]
            })

            res.json({ status: 200 })
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

export { WebServer };