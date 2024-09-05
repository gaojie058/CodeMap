// src/gpt/prompts/functionCallFlow.ts

export const functionCallFlowPrompt = {
    name: 'functionCallFlow',
    content: `In this inheritance graph, provide me with the function call flow of the [selected node] as dot file content, keeping the main functions and their call relationships in the graph, while presenting secondary functions or complex call relationships in the form of comments.
  
  {selectedNode}
  
  Output format:
  using dot langauge
  Example call flow
  Explanation of each function in each node
  
  Few-shot example:
  digraph GenericClassDiagram {
  rankdir=TB;
  node [shape=box];
  edge [];
  
  // Main classes
  BaseInterface;
  ConcreteInterface;
  HelperMixin;
  ConcreteClass;
  FallbackClass;
  
  // Main methods
  node [shape=ellipse];
  mainMethod1;
  mainMethod2;
  helperMethod1;
  fallbackMethod1;
  fallbackMethod2;
  
  // Helper methods
  helperMethod2;
  helperMethod3;
  helperMethod4;
  helperMethod5;
  helperMethod6;
  helperMethod7;
  helperMethod8;
  
  // Relationships
  BaseInterface -> mainMethod1 [label="defines"];
  BaseInterface -> mainMethod2 [label="defines"];
  BaseInterface -> fallbackMethod1;
  BaseInterface -> fallbackMethod2;
  ConcreteInterface -> BaseInterface [label="inherits"];
  ConcreteInterface -> helperMethod1;
  ConcreteInterface -> mainMethod1 [label="implements"];
  ConcreteInterface -> mainMethod2 [label="implements"];
  
  ConcreteInterface -> helperMethod2 [style=dotted];
  ConcreteInterface -> helperMethod3 [style=dotted];
  ConcreteInterface -> helperMethod4 [style=dotted];
  ConcreteInterface -> helperMethod5 [style=dotted];
  ConcreteInterface -> helperMethod6 [style=dotted];
  ConcreteInterface -> helperMethod7 [style=dotted];
  ConcreteInterface -> helperMethod8 [style=dotted];
  
  HelperMixin -> ConcreteClass [label="used by"];
  ConcreteClass -> FallbackClass [label="base for"];
  
  // Subgraph for mainMethod1
  subgraph cluster_mainMethod1 {
  label = "mainMethod1 flow";
  node [shape=box];
  helperMethod1 -> "step 1" -> "step 2";
  }
  
  // Subgraph for mainMethod2
  subgraph cluster_mainMethod2 {
  label = "mainMethod2 flow";
  node [shape=box];
  "check condition" -> helperMethod8 -> "perform action";
  }
  
  // Notes
  note1 [shape=note, label="HelperMixin provides\ncommon attributes\nand methods"];
  note2 [shape=note, label="FallbackClass is used when\nregular functionality is unavailable"];
  note3 [shape=note, label="Helper methods are called\nwithin main methods"];
  
  HelperMixin -> note1 [style=dotted];
  FallbackClass -> note2 [style=dotted];
  ConcreteInterface -> note3 [style=dotted];
  }
  
  Please provide a detailed function call flow diagram for the selected node following this format.`
  };