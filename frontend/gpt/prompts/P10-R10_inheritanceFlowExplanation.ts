// src/gpt/prompts/inheritanceFlowExplanation.ts

export const inheritanceFlowExplanationPrompt = {
    name: 'inheritanceFlowExplanation',
    content: `In this {selectedNode} inheritance graph, explain to me its relevant inheritance flow in a JSON format:
  
  {
    "project_name": "Generic Project Structure",
    "core_components": {
      "main_component": {
        "name": "MainComponent",
        "file": "main_component_file",
        "inherits_from": "BaseComponent",
        "key_relationships": [
          "creates ComponentA",
          "uses ComponentB",
          "manages ComponentC"
        ]
      },
      "base_component": {
        "name": "BaseComponent",
        "file": "base_component_file",
        "inherits_from": "RootComponent"
      },
      "root_component": {
        "name": "RootComponent",
        "file": "root_component_file",
        "inherits_from": null,
        "description": "Root component for the project structure"
      }
    },
    "key_modules": {
      "module_a": {
        "name": "ModuleA",
        "file": "module_a_file",
        "inherits_from": "ExternalBaseA",
        "description": "Handles specific functionality A"
      },
      "module_b": {
        "name": "ModuleB",
        "file": "module_b_file",
        "inherits_from": "ExternalBaseB",
        "description": "Handles specific functionality B"
      }
    },
    "auxiliary_components": {
      "component_a": {
        "name": "ComponentA",
        "file": "component_a_file",
        "inherits_from": null,
        "description": "Manages aspect A of the project"
      },
      "component_b": {
        "name": "ComponentB",
        "file": "component_b_file",
        "inherits_from": null,
        "description": "Manages aspect B of the project"
      }
    },
    "testing_utilities": {
      "test_utility": {
        "name": "TestUtility",
        "file": "test_utility_file",
        "inherits_from": "ExternalTestBase",
        "description": "Testing utility for the project"
      }
    },
    "inheritance_relationships": [
      {
        "child": "MainComponent",
        "parent": "BaseComponent"
      },
      {
        "child": "BaseComponent",
        "parent": "RootComponent"
      },
      {
        "child": "ModuleA",
        "parent": "ExternalBaseA"
      },
      {
        "child": "ModuleB",
        "parent": "ExternalBaseB"
      },
      {
        "child": "TestUtility",
        "parent": "ExternalTestBase"
      }
    ],
    "key_concepts": [
      "The project extends base and root components to provide core functionality",
      "Key modules extend external bases for specific functionalities",
      "Auxiliary components manage different aspects of the project",
      "TestUtility extends an external base for project-specific testing capabilities"
    ],
    "additional_notes": [
      "This structure is language-agnostic and can be applied to various software projects",
      "File names and component names should be adjusted based on the specific project",
      "Inheritance relationships and key concepts may vary depending on the project architecture"
    ]
  }
  `
  };