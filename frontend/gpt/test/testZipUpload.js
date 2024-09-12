import fetch from 'node-fetch';
import { API_KEY } from '../api';

const apiKey = API_KEY;
const apiBase = "https://api.openai.com/v1";

async function makeRequest(endpoint, method = 'GET', body = null) {
    const url = `${apiBase}${endpoint}`;
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
    };
    const options = { method, headers };
    if (body) {
        options.body = JSON.stringify(body);
    }
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


async function updateAssistant(assistantId) {
    console.log(`Updating assistant ${assistantId} to add project analysis function and file search...`);
    const projectAnalysisFunction = {
        name: "analyze_project",
        description: "Analyzes the project structure and returns detailed information",
        parameters: {
            type: "object",
            properties: {
                project_structure: {
                    type: "string",
                    description: "Description of the overall project structure and organization"
                },
                module_distribution: {
                    type: "string",
                    description: "Detailed breakdown of how modules are distributed within the project structure"
                },
                file_distribution: {
                    type: "string",
                    description: "Comprehensive overview of file distribution across the project"
                },
                functional_relationships_modules: {
                    type: "string",
                    description: "Analysis of functional relationships and business interactions between different modules of the project"
                },
                business_relations_files: {
                    type: "string",
                    description: "Explanation of business relations and logical interactions between various files in the project"
                },
                functional_descriptions_modules: {
                    type: "string",
                    description: "Detailed functional descriptions for each module in the project"
                },
                functional_descriptions_files: {
                    type: "string",
                    description: "In-depth functional descriptions for each significant file in the project"
                }
            },
            required: [
                "project_structure",
                "module_distribution",
                "file_distribution",
                "functional_relationships_modules",
                "business_relations_files",
                "functional_descriptions_modules",
                "functional_descriptions_files"
            ]
        }
    };

    const updateBody = {
        tools: [
            { type: "function", function: projectAnalysisFunction },
            { type: "file_search" }  // This is the new name for file_search
        ],
        instructions: "You are a coding assistant specialized in analyzing project structures and generating detailed reports about project architecture and functionality. Use the file search (retrieval) tool to analyze the project files and then use the analyze_project function to provide comprehensive information as requested."
    };
    console.log('Update assistant request body:', JSON.stringify(updateBody, null, 2));
    const updatedAssistant = await makeRequest(`/assistants/${assistantId}`, 'POST', updateBody);
    console.log("Assistant updated:", JSON.stringify(updatedAssistant, null, 2));
    return updatedAssistant;
}

async function useAssistant(assistantId, promptName, content) {
    console.log(`Using assistant ${assistantId}...`);
    
    const thread = await makeRequest('/threads', 'POST');
    console.log("Thread created:", JSON.stringify(thread, null, 2));

    const combinedContent = `${content}\n\nUser Content: ${promptName}\n\nPlease use the analyze_project function to provide the requested information.`;
    console.log('Combined content:', combinedContent);

    const message = await makeRequest(`/threads/${thread.id}/messages`, 'POST', {
        role: "user",
        content: combinedContent
    });
    console.log("Message added:", JSON.stringify(message, null, 2));

    const runBody = { 
        assistant_id: assistantId,
        instructions: "Use the analyze_project function to provide a comprehensive analysis of the project."
    };
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
    
    try {
        // Find the function call result in the messages
        const functionCallResult = messages.data[0].content.find(content => content.type === 'function');
        if (functionCallResult) {
            return JSON.parse(functionCallResult.function_call.arguments);
        } else {
            // If no function call result is found, try to parse the text content as JSON
            const textContent = messages.data[0].content.find(content => content.type === 'text');
            if (textContent) {
                return JSON.parse(textContent.text.value);
            } else {
                throw new Error("No valid content found in the response");
            }
        }
    } catch (error) {
        console.error("Failed to parse JSON response:", error);
        return messages.data[0].content[0].text.value;
    }
}

async function main() {
    try {
        const assistants = await listAssistants();
        if (assistants.length > 0) {
            const firstAssistant = assistants[0];
            console.log(`Using the first assistant: ${firstAssistant.id}`);
            
            const updatedAssistant = await updateAssistant(firstAssistant.id);
            
            const promptName = 'projectAnalysisJson';
            const content = `Analyze this project and return the following information using the analyze_project function: 
1. Project structure; 
2. Distribution of modules in the project structure; 
3. Distribution of files in the project structure; 
4. Functional relationships and business interactions between the modules of the project; 
5. Business relations and logical interactions between the files of the project; 
6. Functional descriptions of each module of the project; 
7. Functional descriptions of each file in the project. 
Each description must be thorough and detailed. The business relations and interactions must be clearly explained.`;

            const result = await useAssistant(updatedAssistant.id, promptName, content);
            console.log("Final result:", JSON.stringify(result, null, 2));
        } else {
            console.log("No assistants found.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();