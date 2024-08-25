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
  digraph SystemStructure {
  // 全局设置
  node [shape=box, style="rounded,filled", fontname="Helvetica", fontsize=10]
  edge [fontname="Helvetica", fontsize=8, fontcolor=gray30]
  
  // 模块1
  subgraph cluster_module1 {
  label="Module 1"
  style=filled
  color=lightblue
  node [color=white]
  
  M1_Component1 [label="Component 1.1"]
  M1_Component2 [label="Component 1.2"]
  
  M1_Component1 -> M1_Component2 [label="relation"]
  }
  
  // 模块2
  subgraph cluster_module2 {
  label="Module 2"
  style=filled
  color=lightgreen
  node [color=white]
  
  M2_Component1 [label="Component 2.1"]
  M2_Component2 [label="Component 2.2"]
  
  M2_Component1 -> M2_Component2 [label="relation"]
  }
  
  // 模块3
  subgraph cluster_module3 {
  label="Module 3"
  style=filled
  color=lightyellow
  node [color=white]
  
  M3_Component1 [label="Component 3.1"]
  M3_Component2 [label="Component 3.2"]
  
  M3_Component1 -> M3_Component2 [label="relation"]
  }
  
  // 模块4
  subgraph cluster_module4 {
  label="Module 4"
  style=filled
  color=lightpink
  node [color=white]
  
  M4_Component1 [label="Component 4.1"]
  M4_Component2 [label="Component 4.2"]
  
  M4_Component1 -> M4_Component2 [label="relation"]
  }
  
  // 模块间关系
  M1_Component1 -> M2_Component1 [label="inter-module relation"]
  M2_Component2 -> M3_Component1 [label="inter-module relation"]
  M3_Component2 -> M4_Component1 [label="inter-module relation"]
  M4_Component2 -> M1_Component2 [label="inter-module relation"]
  
  // 可选的外部依赖
  ExternalEntity [label="External Entity", shape=ellipse, style=dashed]
  M1_Component2 -> ExternalEntity [label="external relation", style=dashed]
  }`
  };