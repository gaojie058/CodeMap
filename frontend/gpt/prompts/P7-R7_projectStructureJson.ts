// src/gpt/prompts/projectStructureJson.ts

export const projectStructureJsonPrompt = {
    name: 'projectStructureJson',
    content: `Interpret this project and return the following information in JSON format: 
  1. Module Groups; 
  2. Description of module group and the file list and the path under the group; 
  3. Distribution of files in the project structure; 
  4. Relationships between each module group
  5. Provide the output strictly in JSON format without any additional text or explanations. Use section indices to organize the sections. 
  Output like the following json format
  {
    "project_name": "{project_name}",
    "module_groups": [
      {
        "name": "{module_group_1_name}",
        "description": "{module_group_1_description}",
        "files": [
          {
            "name": "{file_1_1_name}",
            "description": "{file_1_1_description}"
          },
          {
            "name": "{file_1_2_name}",
            "description": "{file_1_2_description}"
          }
        ]
      },
      {
        "name": "{module_group_2_name}",
        "description": "{module_group_2_description}",
        "files": [
          {
            "name": "{file_2_1_name}",
            "description": "{file_2_1_description}"
          },
          {
            "name": "{file_2_2_name}",
            "description": "{file_2_2_description}"
          }
        ]
      }
    ],
    "relationships": [
      {
        "from": "{source_file_1}",
        "to": "{target_file_1}",
        "description": "{relationship_description_1}"
      },
      {
        "from": "{source_file_2}",
        "to": "{target_file_2}",
        "description": "{relationship_description_2}"
      }
    ]
  }`,
  };