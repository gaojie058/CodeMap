export const extractDotContent = (responseText: string): string | null => {
  const regex = /```dot\n([\s\S]*?)\n```/;
  const match = responseText.match(regex);
  return match ? match[1] : null;
};