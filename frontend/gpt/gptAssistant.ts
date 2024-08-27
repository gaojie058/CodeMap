// import fetch, { RequestInit, HeadersInit } from 'node-fetch';
import { prompts, PromptName } from './prompts';

// const apiKey = 'sk-REDACTED_vnHWZND0tcCGPBEPFIT3BlbkFJ3wHo4HdobFFJeGq4K07l5esFPS5RfdehjwZdYkx7UA';
const apiKey = 'sk-REDACTED';
const apiBase = "https://api.openai.com/v1";

async function makeRequest(endpoint: string, method: string = 'GET', body: any = null) {
    const url = `${apiBase}${endpoint}`;
    const headers: HeadersInit = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
    };
    const options: RequestInit = { 
        method, 
        headers,
        body: body ? JSON.stringify(body) : undefined
    };
    console.log(`Making ${method} request to ${url}`);
    console.log('Request options:', JSON.stringify(options, null, 2));
    const response = await fetch(url, options);
    console.log(`Response status: ${response.status} ${response.statusText}`);
    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Error response body:', errorBody);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const responseData = await response.json();
    console.log('Response data:', JSON.stringify(responseData, null, 2));
    return responseData;
}

async function listAssistants() {
    console.log("Listing all assistants...");
    const assistants = await makeRequest('/assistants');
    console.log("Assistants:", JSON.stringify(assistants, null, 2));
    return assistants.data;
}

async function updateAssistant(assistantId: string) {
    console.log(`Updating assistant ${assistantId} to enable file search...`);
    const updateBody = {
        tools: [{ type: "file_search" }, { type: "code_interpreter" }],
        instructions: "You are a coding assistant specialized in analyzing project structures and generating detailed reports about project architecture and functionality. Use the file search tool to analyze the project files and provide comprehensive information as requested."
    };
    console.log('Update assistant request body:', JSON.stringify(updateBody, null, 2));
    const updatedAssistant = await makeRequest(`/assistants/${assistantId}`, 'POST', updateBody);
    console.log("Assistant updated:", JSON.stringify(updatedAssistant, null, 2));
    return updatedAssistant;
}

export async function useAssistant(assistantId: string, promptName: PromptName, content: string): Promise<string> {
    console.log(`Using assistant ${assistantId}...`);
    
    const thread = await makeRequest('/threads', 'POST');
    console.log("Thread created:", JSON.stringify(thread, null, 2));

    const combinedContent = `${prompts[promptName].content}\n\nUser Content: ${content}`;
    console.log('Combined content:', combinedContent);

    const message = await makeRequest(`/threads/${thread.id}/messages`, 'POST', {
        role: "user",
        content: combinedContent
    });
    console.log("Message added:", JSON.stringify(message, null, 2));

    const runBody = { assistant_id: assistantId };
    console.log('Run creation request body:', JSON.stringify(runBody, null, 2));
    const run = await makeRequest(`/threads/${thread.id}/runs`, 'POST', runBody);
    console.log("Run created:", JSON.stringify(run, null, 2));

    let runStatus;
    do {
        await new Promise(resolve => setTimeout(resolve, 5000));
        runStatus = await makeRequest(`/threads/${thread.id}/runs/${run.id}`);
        console.log("Run status:", JSON.stringify(runStatus, null, 2));
        
        if (runStatus.status === 'failed') {
            console.error('Run failed. Error:', JSON.stringify(runStatus.last_error, null, 2));
            throw new Error(`Run failed: ${runStatus.last_error.code} - ${runStatus.last_error.message}`);
        }
    } while (runStatus.status !== 'completed' && runStatus.status !== 'failed');

    const messages = await makeRequest(`/threads/${thread.id}/messages`);
    console.log("Retrieved messages:", JSON.stringify(messages, null, 2));
    return messages.data[0].content[0].text.value;
}

export async function initializeAssistant(): Promise<string> {
    const assistants = await listAssistants();
    if (assistants.length > 0) {
        const firstAssistant = assistants[0];
        console.log(`Using the first assistant: ${firstAssistant.id}`);
        const updatedAssistant = await updateAssistant(firstAssistant.id);
        return updatedAssistant.id;
    } else {
        console.error("No assistants found.");
        throw new Error("No assistants found.");
    }
}