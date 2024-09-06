// src/gpt/gptAssistant.ts

import { prompts, PromptName } from './prompts';

const apiKey = 'sk-REDACTED';
const apiBase = "https://api.openai.com/v1";

// 缓存机制
let cachedAssistantId: string | null = null;
const threadCache: Map<string, string> = new Map();

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

export async function useAssistant(promptName: PromptName, content: string): Promise<string> {
    const assistantId = "asst_1rm5Iq7odQeJcMwC8sCbAzx3";//task1
    // const assistantId= "asst_cj2CTaMuDQxc7l4YA3UtZ3nX"//task2
    console.log(`Using assistant ${assistantId}...`);
    
    const cacheKey = `${promptName}:${content}`;
    let threadId = threadCache.get(cacheKey);
    
    if (!threadId) {
        const thread = await makeRequest('/threads', 'POST');
        threadId = thread.id;
        threadCache.set(cacheKey, threadId);
        console.log("Thread created:", JSON.stringify(thread, null, 2));
    } else {
        console.log("Using cached thread:", threadId);
    }

    const combinedContent = `${prompts[promptName].content}\n\nUser Content: ${content}`;
    console.log('Combined content:', combinedContent);

    const message = await makeRequest(`/threads/${threadId}/messages`, 'POST', {
        role: "user",
        content: combinedContent
    });
    console.log("Message added:", JSON.stringify(message, null, 2));

    const runBody = { assistant_id: assistantId };
    console.log('Run creation request body:', JSON.stringify(runBody, null, 2));
    const run = await makeRequest(`/threads/${threadId}/runs`, 'POST', runBody);
    console.log("Run created:", JSON.stringify(run, null, 2));

    let runStatus;
    let retryCount = 0;
    const maxRetries = 10;
    let delay = 1000; // 初始延迟 1 秒

    while (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
        runStatus = await makeRequest(`/threads/${threadId}/runs/${run.id}`);
        console.log("Run status:", JSON.stringify(runStatus, null, 2));
        
        if (runStatus.status === 'completed') {
            break;
        }
        
        if (runStatus.status === 'failed') {
            console.error('Run failed. Error:', JSON.stringify(runStatus.last_error, null, 2));
            throw new Error(`Run failed: ${runStatus.last_error.code} - ${runStatus.last_error.message}`);
        }

        retryCount++;
        delay = Math.min(delay * 2, 30000); // 指数退避，最大延迟 30 秒
    }

    if (retryCount >= maxRetries) {
        throw new Error("Maximum retries reached. Operation timed out.");
    }

    const messages = await makeRequest(`/threads/${threadId}/messages`);
    console.log("Retrieved messages:", JSON.stringify(messages, null, 2));
    return messages.data[0].content[0].text.value;
}

export async function initializeAssistant(): Promise<string> {
    if (cachedAssistantId) {
        console.log(`Using cached assistant: ${cachedAssistantId}`);
        return cachedAssistantId;
    }

    const assistants = await listAssistants();
    if (assistants.length > 0) {
        const firstAssistant = assistants[0];
        console.log(`Using the first assistant: ${firstAssistant.id}`);
        const updatedAssistant = await updateAssistant(firstAssistant.id);
        cachedAssistantId = updatedAssistant.id;
        return cachedAssistantId;
    } else {
        console.error("No assistants found.");
        throw new Error("No assistants found.");
    }
}