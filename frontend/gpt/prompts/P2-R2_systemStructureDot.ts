// src/gpt/prompts/systemStructureDot.ts

export const systemStructureDotPrompt = {
    name: 'systemStructureDot',
    content: `Here is the task:
  1. using dot language
  2. annotate the purpose of each edge
  3. using "components: (component description)" to show the main component names,
  4. output important function, variables and file path,
  5. must show the business relationship and business flow between components in detail
  6. output like the following dot structure:
  
  Output like the following dot structure example:
  
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

M2_Component1 -> M2_Component2 [label="relation"]
}

// module3
subgraph cluster_module3 {
label="Module 3"
style="filled,rounded"  // added rounded style
color="#d5d4f0"  // lavender blue
node [color="#ebeafa"]  // slightly lighter lavender

M3_Component1 [label=<<b>Component 3.1</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]
M3_Component2 [label=<<b>Component 3.2</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]

M3_Component1 -> M3_Component2 [label="relation"]
}

// module4
subgraph cluster_module4 {
label="Module 4"
style="filled,rounded"  // added rounded style
color="#cbe7f2"  // light blue
node [color="#e3f2fa"]  // slightly lighter blue

M4_Component1 [label=<<b>Component 4.1</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]
M4_Component2 [label=<<b>Component 4.2</b><br/><br/>File:path/to/filename<br/>Key Functions: function1(), function2()..<br/>Key Variables: A, B...>]

M4_Component1 -> M4_Component2 [label="relation"]
}

// module relationship
M1_Component1 -> M2_Component1 [label="inter-module relation"]
M2_Component2 -> M3_Component1 [label="inter-module relation"]
M3_Component2 -> M4_Component1 [label="inter-module relation"]
M4_Component2 -> M1_Component2 [label="inter-module relation"]

// module external dependencies
ExternalEntity [label="External Entity", shape=ellipse, style=dashed]
M1_Component2 -> ExternalEntity [label="external relation", style=dashed]
}`
  
  };