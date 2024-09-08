export const projectStructureJsonPrompt = {
  name: 'projectStructureJson',
  content: `Analyze the project, focus on the all above files, and return the following information:

1. JSON format analysis:

\`\`\`json
{
  "Overview": "A brief overview of the entire project structure",
  "Modules": [
    {
      "Module": "Module Name:Brief description of the module's purpose",
       "classes": [
        {
          "Class": "ClassName1:Concise description of the class, including its purpose and relationships with other classes, easily understandable by beginners",
        },
        {
          "Class": "ClassName2:Concise description of the class, including its purpose and relationships with other classes, easily understandable by beginners",
        },
        ...
      ],
      "files": [
        {
          "File": "filename1:Detailed description of the file's contents and purpose, easily understandable by beginners",
        },
        {
          "File": "filename2:Detailed description of the file's contents and purpose, easily understandable by beginners",
        },
        ...
      ]
         }
  ],
  "Relationships": [
    "0. This whole project starts from ClassX, and then goes into ClassA.",
    "1. ClassA uses ClassB by calling functions X and Y, in order to share data between ClassA and ClassB (e.g., varM, varN). This is to support the (purpose) of why ClassA uses ClassB.",
    "2. After ClassA uses ClassB, the results of ClassB will be passed into ClassC, which then...",
    "3. ...",
    "4. ...",
    "5. ...",
    "6. ..."
  ]
}
\`\`\`

Ensure each module description is concise and each file description is detailed and beginner-friendly. The relationships should be presented as a numbered list, starting from 0, describing the flow of the project, interactions between classes, function calls, data sharing, and purposes. Provide the output strictly in this JSON format without any additional text or explanations.

2. Inheritance graph using dot language:

\`\`\`dot
digraph SystemStructure {
  rankdir=TB;
  ranksep=0.7;
  nodesep=0.5;
  node [shape=box, style="rounded,filled", fontname="Helvetica", fontsize=10]
  edge [fontname="Helvetica", fontsize=8, fontcolor=gray30, arrowsize=0.7]

  // Module 1
  subgraph cluster_module1 {
    label="Module 1"
    style="filled,rounded"
    color="#cbe7f2"
    node [color="#e3f2fa"]

    ClassName1 [label=<<b>ClassName1.Class</b><br/><br/>Class description: (description)<br/>Key Functions: (list)<br/>Key Variables: (list)<br/>File: (path)>]
    ClassName2 [label=<<b>ClassName2.Class</b><br/><br/>Class description: (description)<br/>Key Functions: (list)<br/>Key Variables: (list)<br/>File: (path)>]

    ClassName1 -> ClassName2 [label="Inheritance: ClassName2 extends ClassName1\\nInherited functions: func1, func2\\nInherited variables: var1, var2\\nPurpose: (description of inheritance purpose)"]
  }

  // Module 2
  subgraph cluster_module2 {
    label="Module 2"
    style="filled,rounded"
    color="#d3f0d3"
    node [color="#eaf7ea"]

    ClassName3 [label=<<b>ClassName3.Class</b><br/><br/>Class description: (description)<br/>Key Functions: (list)<br/>Key Variables: (list)<br/>File: (path)>]
    ClassName4 [label=<<b>ClassName4.Class</b><br/><br/>Class description: (description)<br/>Key Functions: (list)<br/>Key Variables: (list)<br/>File: (path)>]

    ClassName3 -> ClassName4 [label="Composition: ClassName3 contains ClassName4\\nUsed functions: func3, func4\\nShared variables: var3, var4\\nPurpose: (description of composition purpose)"]
  }

  // Inter-module relationships
  ClassName2 -> ClassName3 [label="Uses: ClassName2 uses ClassName3\\nCalled functions: func5, func6\\nShared data: var5, var6\\nPurpose: (description of usage purpose)"]

  // Optional external dependencies
  ExternalClass [label=<<b>ExternalClass</b><br/>(if applicable)>, shape=ellipse, style=dashed]
  ClassName4.Class -> ExternalClass [label="Depends on: ClassName4 uses ExternalClass\\nUsed functions: extFunc1, extFunc2\\nShared data: extVar1, extVar2\\nPurpose: (description of dependency purpose)", style=dashed]
}
\`\`\`

Based on the uploaded codebase, generate both the JSON analysis and the inheritance graph following these formats. Ensure that:

1. The information in the dot graph aligns with the JSON.
2. Class names are explicitly shown in the dot graph nodes as "ClassName.Class".
3. Descriptions in the JSON are easily understandable by beginners.
4. Class descriptions in the JSON concisely describe relationships with other classes.
5. The dot graph node design is optimized for universal applicability across most programming languages.
6. Relationships in the dot graph use line breaks if the output is too long.
7. The "Relationships" section in the JSON provides a numbered list (starting from 0) describing the project flow, class interactions, function calls, data sharing, and purposes.
8. your output must cover all the code and file I provided in prompt and vector store

Ensure that the dot graph includes function-level details, specifies inheritance and other relationships between nodes, and includes class names, filenames, key functions, and key variables in each node. For inheritance relationships, specify which key functions and variables are inherited and the purpose of the inheritance.`,
};