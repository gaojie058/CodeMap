// src/gpt/prompts/systemStructure.ts

export const systemStructurePrompt = {
    name: 'systemStructure',
    content: `Given the codebase, here is the task:
  1. using dot language
  2. annotate the purpose of each edge
  3. using "components: (component description)" to show the main component names
  4. output important functions, variables, and file path
  5. show the business relationship and business flow between components in detail, e.g., "Module A manages Module B", where Module A (usually bigger) is the start of the arrow and module B (usually smaller) is the end of the arrow.
  6. Use color_palette = ["#a9a9a9", "#ffd79d", "#e4b0b0",  "#f7bfbf",  "#d5d4f0",  "#cbe7f2",  "#d3f0d3" ]

  
  Output like the following dot structure example, generate the output strictly in JSON format with NO additional text or explanations:
  
  digraph SystemStructure {

node [shape=box, style="rounded,filled", fontname="Helvetica", fontsize=10]
edge [fontname="Helvetica", fontsize=8, fontcolor=gray30]

// module1
subgraph cluster_module1 {
label="Module 1"
style="filled,rounded"  // added rounded style
color="#d3f0d3"  // light green
node [color="#eaf7ea"]  // slightly lighter green

M1_Component1 [label=<<b>Component 1.1</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]
M1_Component2 [label=<<b>Component 1.2</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]

M1_Component1 -> M1_Component2 [label="relation"]
}

// module2
subgraph cluster_module2 {
label="Module 2"
style="filled,rounded"  // added rounded style
color="#cbe7f2"  // light blue
node [color="#e3f2fa"]  // slightly lighter blue

M2_Component1 [label=<<b>Component 2.1</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]
M2_Component2 [label=<<b>Component 2.2</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]

M2_Component1 -> M2_Component2 [label="M2_Component1 xxxx for M2_Component2"]
}

// module3
subgraph cluster_module3 {
label="Module 3"
style="filled,rounded"  // added rounded style
color="#d5d4f0"  // lavender blue
node [color="#ebeafa"]  // slightly lighter lavender

M3_Component1 [label=<<b>Component 3.1</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]
M3_Component2 [label=<<b>Component 3.2</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]

M3_Component1 -> M3_Component2 [label="M3_Component1 xxxx for M3_Component2"]
}

// module4
subgraph cluster_module4 {
label="Module 4"
style="filled,rounded"  // added rounded style
color="#cbe7f2"  // light blue
node [color="#e3f2fa"]  // slightly lighter blue

M4_Component1 [label=<<b>Component 4.1</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]
M4_Component2 [label=<<b>Component 4.2</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]

M4_Component1 -> M4_Component2 [label="M4_Component1 xxxx for M4_Component2"]
}

// module relationship
M1_Component1 -> M2_Component1 [label="inter-module relation"]
M2_Component2 -> M3_Component1 [label="inter-module relation"]
M3_Component2 -> M4_Component1 [label="inter-module relation"]
M4_Component2 -> M1_Component2 [label="inter-module relation"]

// module external dependencies
ExternalEntity [label="External Entity", shape=ellipse, style=dashed]
M1_Component2 -> ExternalEntity [label="external relation", style=dashed]
}

  `
  };