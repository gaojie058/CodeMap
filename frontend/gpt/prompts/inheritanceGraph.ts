// src/gpt/prompts/inheritanceGraph.ts

export const inheritanceGraphPrompt = {
    name: 'inheritanceGraph',
    content: `Generate an inheritance graph:
  
  Output format:
  Using dot language
  Each node contains "Classname, function name, important variable name, file path"
  Edge name for the relation
  
  Few-shot example:
  generate the inheritance graph based on the prompt I provided, following the above dot language format:
  digraph GenericInheritanceGraph {
      rankdir=TB;
      ranksep=0.7;
      nodesep=0.5;
      node [fontname="Arial", fontsize=9, shape=record, style="rounded,filled", color="#2C3E50"];
      edge [fontname="Arial", fontsize=8, color="#34495E", arrowsize=0.7];
  
      // Core classes
      subgraph cluster_core {
          style=filled;
          color="#E8F1F8";
          label="Core Module";
          
          BaseClass [label="{{BaseClass|base_file.py}|{+ attribute1: Type\l+ attribute2: Type\l}|{+ method1()\l+ method2()\l+ method3()\l}}", fillcolor="#D4E6F1"];
          
          MainClass [label="{{MainClass|main_file.py}|{+ attribute3: Type\l+ attribute4: Type\l}|{+ method4()\l+ method5()\l+ method6()\l}}", fillcolor="#AED6F1"];
      }
  
      // Module A classes
      subgraph cluster_module_a {
          style=filled;
          color="#E8F8F5";
          label="Module A";
          
          ClassA1 [label="{{ClassA1|module_a_file.py}|{+ attributeA1: Type\l+ attributeA2: Type\l}|{+ methodA1()\l+ methodA2()\l}}", fillcolor="#D1F2EB"];
          
          ClassA2 [label="{{ClassA2|module_a_file.py}|{+ attributeA3: Type\l+ attributeA4: Type\l}|{+ methodA3()\l+ methodA4()\l}}", fillcolor="#A3E4D7"];
      }
  
      // Module B classes
      subgraph cluster_module_b {
          style=filled;
          color="#FCF3CF";
          label="Module B";
          
          ClassB1 [label="{{ClassB1|module_b_file.py}|{+ attributeB1: Type\l+ attributeB2: Type\l}|{+ methodB1()\l+ methodB2()\l}}", fillcolor="#F9E79F"];
          
          ClassB2 [label="{{ClassB2|module_b_file.py}|{+ attributeB3: Type\l+ attributeB4: Type\l}|{+ methodB3()\l+ methodB4()\l}}", fillcolor="#F7DC6F"];
      }
  
      // Module C classes
      subgraph cluster_module_c {
          style=filled;
          color="#F4ECF7";
          label="Module C";
          
          ClassC1 [label="{{ClassC1|module_c_file.py}|{+ attributeC1: Type\l+ attributeC2: Type\l}|{+ methodC1()\l+ methodC2()\l}}", fillcolor="#E8DAEF"];
          
          ClassC2 [label="{{ClassC2|module_c_file.py}|{+ attributeC3: Type\l+ attributeC4: Type\l}|{+ methodC3()\l+ methodC4()\l}}", fillcolor="#D7BDE2"];
      }
  
      // Utility classes
      UtilityClass1 [label="{{UtilityClass1|utility_file.py}|{+ utilityAttribute1: Type\l}|{+ utilityMethod1()\l+ utilityMethod2()\l}}", fillcolor="#FAD7A0", shape=component];
      
      UtilityClass2 [label="{{UtilityClass2|utility_file.py}|{+ utilityAttribute2: Type\l}|{+ utilityMethod3()\l+ utilityMethod4()\l}}", fillcolor="#ABEBC6", shape=component];
  
      // Helper class
      HelperClass [label="{{HelperClass|helper_file.py}|{+ helperAttribute: Type\l}|{+ helperMethod1()\l+ helperMethod2()\l}}", fillcolor="#F5B7B1", shape=ellipse];
  
      // Inheritance relationships
      BaseClass -> MainClass [label="inherits\n(MainClass extends BaseClass functionality)", color="#2980B9", penwidth=2];
      ClassA1 -> ClassA2 [label="inherits\n(ClassA2 adds specific features to ClassA1)", color="#2980B9", penwidth=2];
      ClassB1 -> ClassB2 [label="inherits\n(ClassB2 specializes ClassB1 behavior)", color="#2980B9", penwidth=2];
  
      // Composition and usage relationships
      MainClass -> ClassA2 [label="contains\n(MainClass can have multiple ClassA2 instances)", style=dashed, color="#27AE60"];
      MainClass -> ClassB2 [label="uses\n(MainClass uses ClassB2 for specific operations)", style=dotted, color="#8E44AD"];
      MainClass -> UtilityClass1 [label="has\n(MainClass has one UtilityClass1 instance)", style=dashed, color="#27AE60"];
      MainClass -> ClassC1 [label="creates\n(MainClass creates ClassC1 instances as needed)", style=dotted, color="#8E44AD"];
      MainClass -> ClassC2 [label="creates\n(MainClass creates ClassC2 for each operation)", style=dotted, color="#8E44AD"];
      MainClass -> UtilityClass2 [label="uses\n(MainClass uses UtilityClass2 functions)", style=dotted, color="#8E44AD"];
      ClassC1 -> HelperClass [label="contains\n(ClassC1 has one HelperClass instance)", style=dashed, color="#27AE60"];
      ClassC2 -> UtilityClass2 [label="uses\n(ClassC2 utilizes UtilityClass2 for operations)", style=dotted, color="#8E44AD"];
      ClassA2 -> ClassB1 [label="uses\n(ClassA2 uses ClassB1 for certain tasks)", style=dotted, color="#8E44AD"];
      ClassB2 -> MainClass [label="references\n(ClassB2 holds a reference to MainClass)", style=dotted, color="#8E44AD"];
  }
  
  Based on the uploaded codebase, generate an inheritance graph following this format.`
  };