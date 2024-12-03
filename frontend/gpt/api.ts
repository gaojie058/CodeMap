export const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Load assistantid environment variables from Vite (via import.meta.env)
const ASSISTANT_FASTAPI = import.meta.env.VITE_ASSISTANT_FASTAPI || 'assistant1';
const ASSISTANT_FLASK = import.meta.env.VITE_ASSISTANT_FLASK || 'assistant2';
const CURRENT_ASSISTANT = import.meta.env.VITE_CURRENT_ASSISTANT || '';


// Determine the active assistant
export const assistantId = (() => {
    if (CURRENT_ASSISTANT.toLowerCase() === 'fastapi') {
        return ASSISTANT_FASTAPI;
    } else if (CURRENT_ASSISTANT.toLowerCase() === 'flask') {
        return ASSISTANT_FLASK;
    } else {
        throw new Error("Invalid value for assistantId & CURRENT_ASSISTANT. Must be 'fastapi' or 'flask'.");
    }
})();

console.log(`The current active assistant ID is: ${assistantId}`);


// Load filepath environment variables from Vite (via import.meta.env)
const FILE_PATH_FASTAPI = import.meta.env.VITE_FILE_PATH_FASTAPI
const FILE_PATH_FLASK = import.meta.env.VITE_FILE_PATH_FLASK


// Determine the active assistant
export const filepath = (() => {
    if (CURRENT_ASSISTANT.toLowerCase() === 'fastapi') {
        return FILE_PATH_FASTAPI;
    } else if (CURRENT_ASSISTANT.toLowerCase() === 'flask') {
        return FILE_PATH_FLASK;
    } else {
        throw new Error("Invalid value for filepath & CURRENT_ASSISTANT. Must be 'fastapi' or 'flask'.");
    }
})();

