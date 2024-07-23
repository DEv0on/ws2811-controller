import express, {Express} from 'express';

class WebServer {
    port: number;
    app: Express;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    registerRoutes() {
        this.app.post('/:anim/', (req, res) => {

        })
    }

    open() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port: ${this.port}`);
        })
    }
}

export { WebServer };