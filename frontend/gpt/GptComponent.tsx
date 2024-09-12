import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useAssistant } from './gptAssistant';
import { QueryType, queryDefinitions, generateContent } from './queryDefinitions';

interface GptComponentProps {
  queryType: QueryType;
  params?: Record<string, string>;
  onResponseReceived?: (response: string | null, error?: string | null, type?: string) => void;
  onLoadingChange?: (loading: boolean) => void;
}

export const GptComponent: React.FC<GptComponentProps> = React.memo(({ queryType, params = {}, onResponseReceived, onLoadingChange }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Use useMemo to cache the generated content
  const content = useMemo(() => generateContent(queryType, params), [queryType, params]);

  // Use useCallback to cache the fetchData function
  const fetchData = useCallback(async () => {
    if (loading) return; // Prevent duplicate requests
    console.info('started');
    try {
      setLoading(true);
      if (onLoadingChange) onLoadingChange(true);
      setError(null);
      const result = await useAssistant(queryDefinitions[queryType].promptName, content);
      setResponse(result);
      if (onResponseReceived) {
        onResponseReceived(result, null, queryType);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      if (onResponseReceived) {
        onResponseReceived(null, error); // Pass error message
      }
    } finally {
      setLoading(false);
      if (onLoadingChange) onLoadingChange(loading);
    }
  }, [queryType, content, onResponseReceived, onLoadingChange]);

  // Use useEffect to trigger data fetching
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Use useMemo to cache the rendering result
  const renderContent = useMemo(() => {
    if (error) {
      return <div>Error: {error}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (response) {
      return (
        <div>
          <h2>{queryDefinitions[queryType].description}</h2>
          <pre>{response}</pre>
        </div>
      );
    }

    return null;
  }, [error, loading, response, queryType]);

  return <div className='hidden'>{renderContent}</div>;
});

// Add display name for debugging purposes
GptComponent.displayName = 'GptComponent';