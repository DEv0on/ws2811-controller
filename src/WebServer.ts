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
                App.INSTANCE.getMode(req.params.anim)!.setParam(key, req.body[key]);
            })

            res.json({ status: 200 })
        })

        this.app.post('/mode/:anim', (req, res) => {
            if (App.INSTANCE.getMode(req.params.anim) === undefined)
                return res.json({ status: 405, error: "No such animation!"})

            const anim = App.INSTANCE.getMode(req.params.anim)!;
            App.INSTANCE.getChannel().mode = anim;
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