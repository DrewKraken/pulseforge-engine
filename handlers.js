import fs from "fs";

function logHandler(params, state) {
    if (!params.message) {
        throw new Error("Error: Missing message parameter");
    }

    let message = params.message;

    for (const key in state) {
        const pattern = `{{${key}}}`;
        const value = state[key];
        message = message.replace(pattern, value);
    }

    console.log(message);
    return { state, result: 'logged' };
}

function setHandler(params, state) {
    if (!params.key || !params.value) {
        throw new Error("Error: Missing key or value parameter");
    }

    state[params.key] = params.value;
    return { state, result: 'set' };
}

function readFileHandler(params, state) {
    if (!params.path || !params.as) {
        throw new Error("Error: Missing path or as parameter");
    }

    const content = fs.readFileSync(params.path, "utf8");
    state[params.as] = content;
    return { state, result: 'read'};
}

function waitHandler(params, state) {
    if (!params.ms) {
        throw new Error("Error: Missing ms parameter");
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ state, result: 'waited' });
        }, params.ms);
    });
}

export { logHandler, setHandler, readFileHandler, waitHandler };