export const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Load assistantid environment variables from Vite (via import.meta.env)
const ASSISTANT_FASTAPI = import.meta.env.VITE_ASSISTANT_FASTAPI || '';
const ASSISTANT_FLASK = import.meta.env.VITE_ASSISTANT_FLASK || '';
const ASSISTANT_DJANGO = import.meta.env.VITE_ASSISTANT_DJANGO || '';

const CURRENT_ASSISTANT = import.meta.env.VITE_CURRENT_ASSISTANT || '';


// Determine the active assistant
export const assistantId = (() => {
    if (CURRENT_ASSISTANT.toLowerCase() === 'fastapi') {
        console.log("Setting assistantId: Current assistant will be fastapi")
        return ASSISTANT_FASTAPI;
    } else if (CURRENT_ASSISTANT.toLowerCase() === 'flask') {
        console.log("Setting assistantId: Current assistant will be flask")
        return ASSISTANT_FLASK;
    } else if (CURRENT_ASSISTANT.toLowerCase() === 'django') {
        console.log("Setting assistantId: Current assistant will be django")
        return ASSISTANT_DJANGO;
    } else {
        throw new Error("Invalid value for assistantId & CURRENT_ASSISTANT. Must be 'fastapi' or 'flask' or 'django'");
    }
})();

console.log(`The current active assistant ID is: ${assistantId}`);


// Load filepath environment variables from Vite (via import.meta.env)
const FILE_PATH_FASTAPI = import.meta.env.VITE_FILE_PATH_FASTAPI
const FILE_PATH_FLASK = import.meta.env.VITE_FILE_PATH_FLASK
const FILE_PATH_DJANGO = import.meta.env.VITE_FILE_PATH_DJANGO


// Determine the active assistant
export const filepath = (() => {
    if (CURRENT_ASSISTANT.toLowerCase() === 'fastapi') {
        console.log("Setting filepath: Current path will be fastapi")
        return FILE_PATH_FASTAPI;
    } else if (CURRENT_ASSISTANT.toLowerCase() === 'flask') {
        console.log("Setting filepath: Current path will be flask")
        return FILE_PATH_FLASK;
    } else if (CURRENT_ASSISTANT.toLowerCase() === 'django') {
        console.log("Setting assistantId: Current path will be django")
        return FILE_PATH_DJANGO;
    } else {
        throw new Error("Invalid value for filepath & CURRENT_ASSISTANT. Must be 'fastapi' or 'flask' or 'django'");
    }
})();

