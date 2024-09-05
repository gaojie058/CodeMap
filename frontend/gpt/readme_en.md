

# Project Overview

This project is a TypeScript-based toolset designed to interact with OpenAI's API. It allows users to analyze codebases and generate comprehensive reports on project architecture, component relationships, inheritance structures, and other key aspects of software systems. The project provides a framework for defining customizable prompts that guide the analysis and content generation process.

## Project Structure

### Main Files:
- **`gptAssistant.ts`**:
  - **Purpose**: Handles all interactions with the OpenAI API. This file contains functions to configure and utilize AI assistants, making requests to the API, and processing responses to generate meaningful outputs.
  - **Key Functions**:
    - `makeRequest`: A generic function for making API requests, handling both GET and POST methods.
    - `listAssistants`: Retrieves a list of available assistants from the OpenAI API.
    - `updateAssistant`: Updates the configuration of a specific assistant, enabling tools such as `file_search` and `code_interpreter`.
    - `useAssistant`: Combines prompts with content and sends them to the assistant to generate responses.

- **`GptComponent.tsx`**:
  - **Purpose**: A React component that acts as the user interface for interacting with the assistant. It handles user inputs and displays the assistant's responses.

- **`queryDefinitions.ts`**:
  - **Purpose**: Contains the definitions of various prompts used to instruct the assistant. These prompts serve as templates that can be filled with specific content to generate the desired analysis.
  - **Key Concepts**:
    - **Prompt Definitions**: Each prompt is defined with a name, a content template, and a description. The template contains placeholders that will be replaced with actual values during execution.

### Prompts Directory (`prompts/`):
Contains specific TypeScript files that define the prompts used in the project. These prompts cover various analysis tasks, such as generating inheritance graphs, system structure diagrams, and detailed project analyses.

### Usage Examples Directory (`usage/`):
This directory includes example files that demonstrate how to use the defined prompts. These examples show how to generate specific outputs based on different types of analyses.

### Test Directory (`test/`):
Includes test scripts that simulate interactions with the assistant. These scripts are useful for verifying that the prompts and content generation processes work as expected.

## Workflow

### 1. **Assistant Initialization and Configuration**
   - The process begins by initializing and configuring an assistant using the functions in `gptAssistant.ts`.
   - **Listing Assistants**: The `listAssistants` function retrieves a list of all available assistants from OpenAI. This is useful for identifying which assistant to use for a specific task.
     ```typescript
     async function listAssistants() {
         console.log("Listing all assistants...");
         const assistants = await makeRequest('/assistants');
         console.log("Assistants:", JSON.stringify(assistants, null, 2));
         return assistants.data;
     }
     ```
   - **Updating Assistants**: The `updateAssistant` function updates the configuration of a chosen assistant, enabling it to use specific tools necessary for the analysis, such as file search and code interpretation.
     ```typescript
     async function updateAssistant(assistantId: string) {
         console.log(`Updating assistant ${assistantId} to enable file search...`);
         const updatedAssistant = await makeRequest(`/assistants/${assistantId}`, 'POST', {
             tools: [{ type: "file_search" }, { type: "code_interpreter" }],
             instructions: "You are a coding assistant specialized in analyzing project structures and generating detailed reports about project architecture and functionality. Use the file search tool to analyze the project files and provide comprehensive information as requested."
         });
         console.log("Assistant updated:", updatedAssistant);
         return updatedAssistant;
     }
     ```

### 2. **Defining Prompts**
   - Prompts are defined in `queryDefinitions.ts`. These prompts act as templates that dictate what kind of analysis or content the assistant should generate.
   - **Components of a Prompt**:
     - **`promptName`**: A unique identifier for the prompt.
     - **`contentTemplate`**: A string that includes placeholders for variables. These placeholders will be replaced with actual data when generating content.
     - **`description`**: A brief description of what the prompt is designed to do.

   - **Example of a Prompt Definition**:
     ```typescript
     export const queryDefinitions: Record<PromptName, PromptDefinition> = {
         systemStructure: {
             promptName: 'systemStructure',
             contentTemplate: 'Analyze the system structure and describe the relationships between components.',
             description: 'Generates a report on system structure and component relationships.'
         },
         // Additional prompts...
     };
     ```

### 3. **Combining Prompts with Content**
   - The core functionality of combining prompts with content is handled by the `generateContent` function in `queryDefinitions.ts`.
   - **How It Works**:
     - **Selecting a Prompt**: Based on the task at hand, a specific prompt is selected using its `promptName`.
     - **Inserting Content**: The selected prompt's `contentTemplate` is retrieved, and the placeholders within it are replaced with actual values provided by the user.
     - **Output**: The result is a fully-formed content string that is ready to be sent to the assistant for processing.

   - **Detailed Example**:
     ```typescript
     export function generateContent(queryType: PromptName, params: Record<string, string> = {}): string {
         const query = queryDefinitions[queryType];
         let content = query.contentTemplate;
         for (const [key, value] of Object.entries(params)) {
             content = content.replace(`{${key}}`, value);
         }
         return content;
     }
     ```
     - **Explanation**:
       - The function `generateContent` takes in a `queryType` (which corresponds to a specific prompt) and a set of parameters (`params`).
       - It retrieves the appropriate `contentTemplate` based on the `queryType`.
       - The placeholders in the `contentTemplate` (e.g., `{componentName}`, `{inheritanceRelation}`) are replaced with actual values from the `params`.
       - The final `content` string is returned, which can then be used in an API request.

### 4. **Making API Requests**
   - Once the content is generated using the selected prompt, it is sent to the OpenAI API through the `useAssistant` function.
   - **Key Steps**:
     - **Prepare the Request**: The generated content is packaged into a JSON body that includes additional parameters like `temperature` and `max_tokens` to control the response's creativity and length.
     - **Send the Request**: The request is sent to the appropriate API endpoint using the `makeRequest` function.
     - **Process the Response**: The API's response is processed, and the relevant portion of the result is extracted and returned to the user.

   - **Detailed Example**:
     ```typescript
     export async function useAssistant(assistantId: string, promptName: PromptName, content: string): Promise<string> {
         const body = {
             input: content,
             temperature: 0.7,
             max_tokens: 1500,
             model: "gpt-4"
         };
         const response = await makeRequest(`/assistants/${assistantId}/completions`, 'POST', body);
         return response.choices[0].text.trim();
     }
     ```
     - **Explanation**:
       - The function `useAssistant` takes in an `assistantId`, a `promptName`, and the `content` string.
       - It constructs a request body with the generated content and sends it to the API.
       - The API returns a response, which is processed to extract the text generated by the assistant. This text is then returned to the user.

### 5. **Generating and Retrieving Reports**
   - The responses from the assistant can be used to generate various types of reports, depending on the prompts used. These reports could include:
     - **System Structure Diagrams**: Visual representations of the relationships between different components in the system.
     - **Inheritance Graphs**: Diagrams showing the inheritance hierarchy within the codebase.
     - **Function Call Flows**: Diagrams illustrating the flow of function calls within the system.
     - **Detailed Project Analyses**: Comprehensive reports that describe the architecture, functionality, and relationships within the project.

   - These reports are highly customizable and can be tailored to the specific needs of the project by modifying the prompts and content templates.

### 6. **Extensibility**
   - The project is designed to be extensible, allowing users to:
     - **Add New Prompts**: New prompts can be defined in `queryDefinitions.ts` to cover additional analysis tasks.
     - **Modify Existing Prompts**: Existing prompts can be adjusted to generate different types of content or to include more detailed analysis.
     - **Integrate New Tools**: Additional tools can be enabled in the assistant's configuration to expand the range of analyses that can be performed.

