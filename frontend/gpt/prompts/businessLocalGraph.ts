// src/gpt/prompts/businessLocalGraph.ts

export const businessLocalGraphPrompt = {
  name: 'businessLocalGraph',
  content: `Generate a local map under the {selectedNode} business component:
1. Using DOT language
2. Annotate the purpose of each edge
3. Output important functions, variables, and file path

digraph component_map {
    rankdir=TB;
    node [shape=box, style="filled", color="lightblue"];
    
    // main file
    main_file [label="Main File\n({selectedNode} description)", shape=folder];
    
    // classes
    subgraph cluster_classes {
        label = "Classes";
        style = filled;
        color = lightgrey;
        node [style=filled, color=white];
        
        Class1 [label="Class1\n(Description)"];
        Class2 [label="Class2\n(Description)"];
        // more classes...
    }
    
    // functions
    subgraph cluster_functions {
        label = "Functions";
        style = filled;
        color = lightgrey;
        node [style=filled, color=white];
        
        Function1 [label="Function1()\n(Description)"];
        Function2 [label="Function2()\n(Description)"];
        // more functions...
    }
    
    // important vars
    subgraph cluster_variables {
        label = "Important Variables";
        style = filled;
        color = lightgrey;
        node [style=filled, color=white];
        
        Var1 [label="Variable1\n(Description)"];
        Var2 [label="Variable2\n(Description)"];
        // more vars...
    }
    
    // relationship connections
    main_file -> Class1 [label="defines"];
    main_file -> Function1 [label="contains"];
    Class1 -> Var1 [label="uses"];
    Function1 -> Class2 [label="creates"];
    // ... more connections
    
    subgraph cluster_note {
        style=filled;
        color=lightgrey;
        node [style=filled, color=white];
        note [label="File path: /path/to/component/file.py", shape=note];
    }
}
`
};