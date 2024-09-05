// src/gpt/prompts/projectOverview.ts

export const projectOverviewPrompt = {
  name: 'projectOverview',
  content: `Interpret this project and return the following information in JSON format:
1. Module Groups;
2. Description of module group and the file list and the path under the group;
3. Distribution of files in the project structure;
4. Relationships between each module group
5. Provide the output strictly in JSON format without any additional text or explanations. Use section indices to organize the sections.
Output like the following example:
json:{
“Module Group 1: xxxxx”: {
“Description”: xxxxx
“Files”: {
File1: description of the file
File2: description of the file
…
}
“Module Group 2: xxxxx”: {
“Description”: xxxxx
“Files”: {
File3: description of the file
File4: description of the file
…
}
“Module Group 3: xxxxx”: {
“Description”: xxxxx
“Files”: {
File5: description of the file
File6: description of the file
…
}
...
}`,
};
