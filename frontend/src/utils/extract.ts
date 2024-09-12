export const extractDotContent = (responseText: string): string | null => {
  const regex = /```dot\n([\s\S]*?)\n```/;
  const match = responseText.match(regex);
  return match ? match[1] : null;
};

export const extractJsonFromText = (responseText: string) => {
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  }
  console.error('No valid JSON found in the response');
  return null;
}