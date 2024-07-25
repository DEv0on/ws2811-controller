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
                return res.json({status: 405, error: "No such animation"})
            Object.keys(req.body).forEach(key => {
                if (key.toLowerCase().includes("brightness") && (typeof req.body[key] !== "number" || req.body[key] < 0 || req.body[key] > 255))
                    return res.json({status: 405, error: "Invalid brightness value"})

                if (key.toLowerCase().includes("color") && typeof req.body[key] === "string") {
                    const prefix = req.body[key].startsWith("0x") ? "" : "0x";
                    req.body[key] = Number(prefix + req.body[key]);
                }
                if (req.body[key] > 0xffffff || req.body[key] < 0)
                    return res.json({ status: 405, error: "Invalid color value"})

                App.INSTANCE.getMode(req.params.anim)!.setParam(key, req.body[key]);
            })

            res.json({status: 200})
        })

        this.app.post('/mode/:anim', (req, res) => {
            if (App.INSTANCE.getMode(req.params.anim) === undefined)
                return res.json({status: 405, error: "No such animation!"})

            App.INSTANCE.getChannel().mode = App.INSTANCE.getMode(req.params.anim)!;
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