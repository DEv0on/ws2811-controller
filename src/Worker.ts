import { parentPort } from 'node:worker_threads'
import WorkerProcess from './WorkerProcess';

async function main() {
    const worker = new WorkerProcess(parentPort);
    worker.main();
}

main();

export type Data = {
    type: "mode" | "params"
    content: any
}