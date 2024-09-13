import React, { useCallback, useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import Spinner from '@/components/Elements/Spinner/Spinner';
import IconButton from '@/components/Elements/Button/IconButton';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import { extractJsonFromText } from '@/utils/extract';

const understandings = [
  { name: 'Overview', key: 'Overview', value: '' },
  { name: 'Modules', key: 'Modules', value: '' },
  { name: 'Relationships', key: 'Relationships', value: '' },
];

const addDataToItems = (data: any) => {
  understandings.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(data, item.key)) {
      item.value = JSON.stringify(data[item.key]);
    }
  });
}

const renderDisclosureItems = (items: any[]) => {
  if (!items) return null;
  return items.map((item, index) => (
    <DisclosureItem
      key={index}
      item={{
        name: item.name,
        key: item.key,
        value: typeof item.value === 'object' 
          ? JSON.stringify(item.value, null, 2) 
          : item.value || 'No data available'
      }}
    />
  ));
};

const FnGlobalUnderstanding: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { funcGlobal, setFuncGlobal } = useStore();

  const handleResponseReceived = useCallback(
    (receivedResponse: string | null, receivedError?: string | null) => {
      if (receivedResponse) {
        const jsonResponse = extractJsonFromText(receivedResponse);
        setFuncGlobal(jsonResponse);
      }
      if (receivedError) setError(receivedError);
    },
    []
  );

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
  }, []);

  useEffect(() => {
    if (funcGlobal) {
      setLoading(false);
      addDataToItems(funcGlobal);
    }
  }, [funcGlobal]);
  return (
    <>
      <IconButton
        icon={<ArrowPathIcon />}
        onClick={() => setFuncGlobal(null)}
        disabled={!funcGlobal && loading}
        className='ml-auto'
      />
      {error && <div>Error: {error}</div>}
      <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
        {!funcGlobal && loading ? (
          <Spinner
            loadingText='Loading Project Overview...'
            className='mt-24'
          />
        ) : (
          <>{renderDisclosureItems(understandings)}</>
        )}
      </div>
      {!loading && !funcGlobal && (
        <GptComponent
          queryType='P7_R7_projectStructureJson'
          onResponseReceived={handleResponseReceived}
          onLoadingChange={handleLoadingChange}
        />
      )}
    </>
  );
};

export default FnGlobalUnderstanding;
