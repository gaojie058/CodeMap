// src/gpt/GptComponent.tsx

import React, { useState, useEffect } from 'react';
import { initializeAssistant, useAssistant } from './gptAssistant';
import { QueryType, queryDefinitions, generateContent } from './queryDefinitions';

interface GptComponentProps {
  queryType: QueryType;
  params?: Record<string, string>;
  onResponseReceived?: (response: string | null) => void;
}

export const GptComponent: React.FC<GptComponentProps> = ({ queryType, params = {}, onResponseReceived }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const assistantId = await initializeAssistant();
        const { promptName } = queryDefinitions[queryType];
        const content = generateContent(queryType, params);
        const result = await useAssistant(assistantId, promptName, content);
        setResponse(result);
        if (onResponseReceived) {
          onResponseReceived(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 空依赖数组，确保只运行一次

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{queryDefinitions[queryType].description}</h2>
      <pre>{response}</pre>
    </div>
  );
};