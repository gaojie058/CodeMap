// src/gpt/prompts/projectOverview.ts

export const projectOverviewPrompt = {
    name: 'projectOverview',
    content: `Based on the codebase I uploaded, generating a project overview, which must be comprehensive and detailed, and return it in dot language with the following structure:
  
  digraph Project_Structure {
  node [shape=box, style=filled];
  
  # Module Group 1
  subgraph cluster_module1 {
  label = "{module_group1_label}\n{module_group1_description}";
  style=filled;
  color=lightblue;
  "{module1_file1}" [label="{module1_file1}\n{module1_file1_description}"];
  "{module1_file2}" [label="{module1_file2}\n{module1_file2_description}"];
  "{module1_file3}" [label="{module1_file3}\n{module1_file3_description}"];
  # Add more files or components for Module Group 1 as needed
  }
  
  # Module Group 2
  subgraph cluster_module2 {
  label = "{module_group2_label}\n{module_group2_description}";
  style=filled;
  color=lightgoldenrod;
  "{module2_file1}" [label="{module2_file1}\n{module2_file1_description}"];
  "{module2_file2}" [label="{module2_file2}\n{module2_file2_description}"];
  "{module2_file3}" [label="{module2_file3}\n{module2_file3_description}"];
  # Add more files or components for Module Group 2 as needed
  }
  
  # Module Group 3
  subgraph cluster_module3 {
  label = "{module_group3_label}\n{module_group3_description}";
  style=filled;
  color=lightcoral;
  "{module3_file1}" [label="{module3_file1}\n{module3_file1_description}"];
  "{module3_file2}" [label="{module3_file2}\n{module3_file2_description}"];
  "{module3_file3}" [label="{module3_file3}\n{module3_file3_description}"];
  # Add more files or components for Module Group 3 as needed
  }
  
  # Specialized Module Group (Optional)
  subgraph cluster_specialized {
  label = "{specialized_group_label}\n{specialized_group_description}";
  style=filled;
  color=lightgreen;
  "{specialized_file1}" [label="{specialized_file1}\n{specialized_file1_description}"];
  "{specialized_file2}" [label="{specialized_file2}\n{specialized_file2_description}"];
  "{specialized_file3}" [label="{specialized_file3}\n{specialized_file3_description}"];
  }
  
  # Relationships
  "{module1_file1}" -> "{module2_file2}" [label="{relationship_m1_f1_m2_f2_description}"];
  "{module1_file3}" -> "{module3_file1}" [label="{relationship_m1_f3_m3_f1_description}"];
  "{module2_file1}" -> "{module3_file2}" [label="{relationship_m2_f1_m3_f2_description}"];
  }
  
  Please provide a comprehensive and detailed project overview based on the uploaded codebase, following this structure.`
  };