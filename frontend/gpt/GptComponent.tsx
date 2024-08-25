// src/gpt/GptComponent.tsx

import React, { useState, useEffect } from 'react';
import { initializeAssistant, useAssistant } from './gptAssistant';
import { QueryType, queryDefinitions, generateContent } from './queryDefinitions';

interface GptComponentProps {
  queryType: QueryType;
  params?: Record<string, string>;
}

export const GptComponent: React.FC<GptComponentProps> = ({ queryType, params = {} }) => {
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeAssistant()
      .then(setAssistantId)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (assistantId) {
      setLoading(true);
      const { promptName } = queryDefinitions[queryType];
      const content = generateContent(queryType, params);
      useAssistant(assistantId, promptName, content)
        .then(setResponse)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [assistantId, queryType, params]);

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