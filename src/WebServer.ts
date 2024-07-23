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
            const body = req.body;
            Object.keys(body).forEach(key => {
                //@ts-ignore
                App.INSTANCE.getChannel().mode[key] = body[key]
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