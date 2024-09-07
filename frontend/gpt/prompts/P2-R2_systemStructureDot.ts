// src/gpt/prompts/systemStructureDot.ts

export const systemStructureDotPrompt = {
  name: 'systemStructureDot',
  content: `



Analyze this project based on the vector store and provide the following information:

1. A JSON format output containing:
   a. Project overview, including a brief summary, the main entry point of the project, and a simple description of how to run the project.
   b. Key modules or components of the project and their basic functions.
   c. A step-by-step guide for understanding the project's architecture and functionality.

2. A DOT language graph representing the project structure and relationships.
3. One module can contain multiple components
For the JSON output:
- Each description should be concise and easy to understand. 
- Avoid technical jargon and complex explanations. 
- Focus on providing practical, actionable information for a Python beginner.

For the DOT graph:
- Use the dot language to create the graph.
- Annotate the purpose of each edge.
- Use "components: (component description)" to show the main component names.
- Output important functions, variables, and file paths.
- Show the business relationship and business flow between components in detail.

Ensure that:
1. There is no duplication in the output content, and each JSON field contains unique information.
2. The output paths related to files follow the information in the task1_filepath.md.
3. The output includes all the files in the vector database, with no exceptions.
4. The Modules scope must include all code in the file, you must not omit any Modules
5. If the projectArchitectureGuide in the JSON output include a filename, the filename must output link with the module name， e.g., "starting from module x and its file xx to understand xxxxx"
6. Do not leave any ambiguious description, and all steps in the projectArchitectureGuide must have a clear logical connection


Output the information in the following format, please provide both the JSON output and the DOT graph based on the project analysis. Your analysis scope must include all files:

1. JSON output (enclosed in \`\`\`json \`\`\`)

\`\`\`json
{
  "projectOverview": {
    "summary": "A brief, one-sentence summary of the project.",
    "entryPoint": "The main file or script to run the project.",
    "howToRun": "A simple, step-by-step guide on how to run the project."
  },
  "keyModules": {
    "ModuleName1": "Basic function of this Module",
    "ModuleName2": "Basic function of this Module"
  },
  "projectArchitectureGuide": [
    "Step 1: Description of the first key component and its role",
    "Step 2: Explanation of how this component interacts with others",
    "Step 3: Description of the next key component and its interactions",
    "Step 4: Overview of how data flows between components",
    "Step 5: Explanation of the project's overall execution flow",
    "Step 6: Guide on how to trace a typical operation through the components",
    (more steps as needed)
  ]
}
\`\`\`

2. DOT graph output (enclosed in \`\`\`dot \`\`\`)， must strictly following the few shot

\`\`\`dot

  digraph SystemStructure {

  node [shape=box, style="rounded,filled", fontname="Helvetica", fontsize=10]
  edge [fontname="Helvetica", fontsize=8, fontcolor=gray30]

  // Module 1
  subgraph cluster_module1 {
    label="Module 1"
    style="filled,rounded"  // added rounded style
    color="#cbe7f2"  // light blue
    node [color="#e3f2fa"]  // slightly lighter blue

    M1_Component1 [label=<<b>Component Name 1.1</b><br/><br/>Components description: (description)<br/>Key Functions: (list, must align with the original code)<br/>Key Variables: (list)<br/>Key Files: (path)>]
    M1_Component2 [label=<<b>Component Name 1.2</b><br/><br/>Components description: (description)<br/>Key Functions: (list, must align with the original code)<br/>Key Variables: (list)<br/>Key Files: (path)>]

    M1_Component1 -> M1_Component2 [label="relation and business flow"]
  }

  // Module 2
  subgraph cluster_module2 {
    label="Module 2"
    style="filled,rounded"  // added rounded style
    color="#d3f0d3"  // light green
    node [color="#eaf7ea"]  // slightly lighter green

    M2_Component1 [label=<<b>Component Name 2.1</b><br/><br/>Components description: (description)<br/>Key Functions: (list, must align with the original code)<br/>Key Variables: (list)<br/>Key Files: (path)>]
    M2_Component2 [label=<<b>Component Name 2.2</b><br/><br/>Components description: (description)<br/>Key Functions: (list, must align with the original code)<br/>Key Variables: (list)<br/>Key Files: (path)>]

    M2_Component1 -> M2_Component2 [label="relation and business flow"]
  }

  // Inter-module relationships
  M1_Component1 -> M2_Component1 [label="inter-module relation and business flow"]

  // Optional external dependencies
  ExternalEntity [label=<<b>External Entity</b><br/>(if applicable)>, shape=ellipse, style=dashed]
  M1_Component2 -> ExternalEntity [label="external relation", style=dashed]
}
\`
\`\`\`
  `
};