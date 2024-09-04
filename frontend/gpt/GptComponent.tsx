// src/gpt/GptComponent.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeAssistant, useAssistant } from './gptAssistant';
import { QueryType, queryDefinitions, generateContent } from './queryDefinitions';

interface GptComponentProps {
  queryType: QueryType;
  params?: Record<string, string>;
  onResponseReceived?: (response: string | null) => void;
  onLoadingChange?: (loading: boolean) => void;
}

export const GptComponent: React.FC<GptComponentProps> = React.memo(({ queryType, params = {}, onResponseReceived, onLoadingChange }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 使用 useMemo 缓存生成的内容
  const content = useMemo(() => generateContent(queryType, params), [queryType, params]);

  // 使用 useCallback 缓存 fetchData 函数
  const fetchData = useCallback(async () => {
    if (loading) return; // 防止重复请求

    try {
      setLoading(true);
      if (onLoadingChange) onLoadingChange(true);
      setError(null);
      const result = await useAssistant(queryDefinitions[queryType].promptName, content);
      setResponse(result);
      if (onResponseReceived) {
        onResponseReceived(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
      if (onLoadingChange) onLoadingChange(loading);
    }
  }, [queryType, content, onResponseReceived, onLoadingChange]);

  // 使用 useEffect 触发数据获取
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 使用 useMemo 缓存渲染结果
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

// 添加显示名称，有助于调试
GptComponent.displayName = 'GptComponent';