// src/gpt/GptComponent.tsx

import React, { useState, useEffect } from 'react';
import { initializeAssistant, useAssistant } from './gptAssistant';
import { QueryType, queryDefinitions, generateContent } from './queryDefinitions';

interface GptComponentProps {
  queryType: QueryType;
  params?: Record<string, string>;
  onResponseReceived?: (response: any) => void; // 修改为 any 类型
}

export const GptComponent: React.FC<GptComponentProps> = ({ queryType, params = {}, onResponseReceived }) => {
  const [response, setResponse] = useState<any>(null); // 修改为 any 类型
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const assistantId = await initializeAssistant();
        const { promptName, responseFormat } = queryDefinitions[queryType];
        const content = generateContent(queryType, params);
        const result = await useAssistant(assistantId, promptName, content, responseFormat);
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
  }, [queryType, params, onResponseReceived]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{queryDefinitions[queryType].description}</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};