// import fetch, { RequestInit, HeadersInit } from 'node-fetch';
import { prompts, PromptName } from './prompts';

const apiKey = 'sk-REDACTED_vnHWZND0tcCGPBEPFIT3BlbkFJ3wHo4HdobFFJeGq4K07l5esFPS5RfdehjwZdYkx7UA';
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
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    return await response.json();
}

async function listAssistants() {
    console.log("Listing all assistants...");
    const assistants = await makeRequest('/assistants');
    console.log("Assistants:", JSON.stringify(assistants, null, 2));
    return assistants.data;
}

async function updateAssistant(assistantId: string) {
    console.log(`Updating assistant ${assistantId} to enable file search...`);
    const updatedAssistant = await makeRequest(`/assistants/${assistantId}`, 'POST', {
        tools: [{ type: "file_search" }, { type: "code_interpreter" }],
        instructions: "You are a coding assistant specialized in analyzing project structures and generating detailed reports about project architecture and functionality. Use the file search tool to analyze the project files and provide comprehensive information as requested."
    });
    console.log("Assistant updated:", updatedAssistant);
    return updatedAssistant;
}

export async function useAssistant(assistantId: string, promptName: PromptName, content: string): Promise<string> {
    console.log(`Using assistant ${assistantId}...`);
    
    const thread = await makeRequest('/threads', 'POST');
    console.log("Thread created:", thread.id);

    // TODO: need to test actual response with user content
    const combinedContent = `${prompts[promptName].content}\n\nUser Content: ${content}`;

    const message = await makeRequest(`/threads/${thread.id}/messages`, 'POST', {
        role: "user",
        content: combinedContent
    });
    console.log("Message added:", message.id);

    const run = await makeRequest(`/threads/${thread.id}/runs`, 'POST', {
        assistant_id: assistantId
    });
    console.log("Run created:", run.id);

    let runStatus;
    do {
        await new Promise(resolve => setTimeout(resolve, 5000));
        runStatus = await makeRequest(`/threads/${thread.id}/runs/${run.id}`);
        console.log("Run status:", runStatus.status);
    } while (runStatus.status !== 'completed' && runStatus.status !== 'failed');

    const messages = await makeRequest(`/threads/${thread.id}/messages`);
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
        throw new Error("No assistants found.");
    }
}