import fetch from 'node-fetch';

const apiKey = 'sk-REDACTED_vnHWZND0tcCGPBEPFIT3BlbkFJ3wHo4HdobFFJeGq4K07l5esFPS5RfdehjwZdYkx7UA';
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

async function updateAssistant(assistantId) {
    console.log(`Updating assistant ${assistantId} to enable file search...`);
    const updatedAssistant = await makeRequest(`/assistants/${assistantId}`, 'POST', {
        tools: [{ type: "file_search" }, { type: "code_interpreter" }],
        instructions: "You are a coding assistant specialized in analyzing project structures and generating detailed JSON reports about project architecture and functionality. Use the file search tool to analyze the project files and provide comprehensive information as requested."
    });
    console.log("Assistant updated:", updatedAssistant);
    return updatedAssistant;
}

async function useAssistant(assistantId) {
    console.log(`Using assistant ${assistantId}...`);
    
    // Create a thread
    const thread = await makeRequest('/threads', 'POST');
    console.log("Thread created:", thread.id);

    // Add a message to the thread with the new prompt
    const message = await makeRequest(`/threads/${thread.id}/messages`, 'POST', {
        role: "user",
        content: `Interpret this project and return the following information in JSON format: 
1. Project structure; 
2. Distribution of modules in the project structure; 
3. Distribution of files in the project structure; 
4. Functional relationships and business interactions between the modules of the project; 
5. Business relations and logical interactions between the files of the project; 
6. Functional descriptions of each module of the project; 
7. Functional descriptions of each file in the project. The business relations and interactions must be clearly and thoroughly explained. 

Output like the following json example:
{
"project_structure": {
"xxxxx.xxxx": "description"
...
},
"module_distribution": {
"xxxxx(modulename)":"...."
},
"file_distribution": {
"xxxxx(filename)":".....
},
"functional_relationships_modules": {
"xxxxx(modulename)":"...."
},
"business_relations_files": {
"xxxxx(filename)":".....
},
"functional_descriptions_modules": {
"xxxxx(modulename)":"...."
},
"functional_descriptions_files": {
"xxxxx(filename)":".....
}
}`
    });
    console.log("Message added:", message.id);

    // Run the assistant
    const run = await makeRequest(`/threads/${thread.id}/runs`, 'POST', {
        assistant_id: assistantId
    });
    console.log("Run created:", run.id);

    // Wait for the run to complete
    let runStatus;
    do {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
        runStatus = await makeRequest(`/threads/${thread.id}/runs/${run.id}`);
        console.log("Run status:", runStatus.status);
    } while (runStatus.status !== 'completed' && runStatus.status !== 'failed');

    // Retrieve the messages
    const messages = await makeRequest(`/threads/${thread.id}/messages`);
    console.log("Assistant's response:");
    console.log(messages.data[0].content[0].text.value);

    // Try to parse the JSON response
    try {
        const jsonResponse = JSON.parse(messages.data[0].content[0].text.value);
        console.log("Parsed JSON response:", JSON.stringify(jsonResponse, null, 2));
    } catch (error) {
        console.error("Failed to parse JSON response:", error);
    }
}

async function main() {
    try {
        const assistants = await listAssistants();
        if (assistants.length > 0) {
            const firstAssistant = assistants[0];
            console.log(`Using the first assistant: ${firstAssistant.id}`);
            
            // Update the assistant to ensure it has file search enabled
            const updatedAssistant = await updateAssistant(firstAssistant.id);
            
            // Use the updated assistant
            await useAssistant(updatedAssistant.id);
        } else {
            console.log("No assistants found.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();