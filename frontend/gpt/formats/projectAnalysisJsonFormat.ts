// src/gpt/formats/projectAnalysisJsonFormat.ts

export const projectAnalysisJsonFormat = {
    type: "json_schema",
    json_schema: {
      name: "project_analysis",
      strict: true,
      schema: {
        type: "object",
        properties: {
          project_structure: {
            type: "object",
            additionalProperties: { type: "string" }
          },
          module_distribution: {
            type: "object",
            additionalProperties: { type: "string" }
          },
          file_distribution: {
            type: "object",
            additionalProperties: { type: "string" }
          },
          functional_relationships_modules: {
            type: "object",
            additionalProperties: { type: "string" }
          },
          business_relations_files: {
            type: "object",
            additionalProperties: { type: "string" }
          },
          functional_descriptions_modules: {
            type: "object",
            additionalProperties: { type: "string" }
          },
          functional_descriptions_files: {
            type: "object",
            additionalProperties: { type: "string" }
          }
        },
        required: [
          "project_structure",
          "module_distribution",
          "file_distribution",
          "functional_relationships_modules",
          "business_relations_files",
          "functional_descriptions_modules",
          "functional_descriptions_files"
        ],
        additionalProperties: false
      }
    }
  };