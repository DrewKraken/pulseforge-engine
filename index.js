import fs from "fs";
import { logHandler, setHandler, readFileHandler, waitHandler } from "./handlers.js";

console.log("Pulseforge is starting...");

try {
const configText = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(configText);

const handlers = {
    log: logHandler,
    set: setHandler,
    readFile: readFileHandler,
    wait: waitHandler,
};

async function executeTasks(tasks, handlers) {
    let state = {};
    
    for (const task of tasks) {
        const taskID = task.id || task.type;
        console.log(`[${taskID}] Executing ${task.type}...`);
        
        const handler = handlers[task.type];
        if (!handler) {
            console.error(`Error: Unknown task type "${task.type}"`);
            process.exit(1);
        }
        
        const result = await handler(task.params, state);
        state = result.state;
        
        console.log(`[${taskID}] Completed`);
    }
    
    return state;
}

await executeTasks(config.tasks, handlers);

} catch (error) {
    console.error("Error: ", error.message);
    process.exit(1);
}