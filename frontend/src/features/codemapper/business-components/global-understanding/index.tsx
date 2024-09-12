import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import Spinner from '@/components/Elements/Spinner/Spinner';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import IconButton from '@/components/Elements/Button/IconButton';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

const understandings = [
  {
    name: 'Project Overview',
    key: 'projectOverview',
    value:'',
  },
  {
    name: 'Key Modules',
    key: 'keyModules',
    value:'',
  },
  {
    name: 'Project Architecture Understanding Guide',
    key:'projectArchitectureGuide',
    value:'',
  }
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

const BizGlobalUnderstanding: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { bizGlobal, setBizGlobal } = useStore();

  useEffect(() => {
    if (bizGlobal) {
      setLoading(false);
      addDataToItems(bizGlobal);
    }
  }, [bizGlobal]);
  return (
    <>
      <IconButton
        icon={<ArrowPathIcon />}
        onClick={() => setBizGlobal(null)}
        disabled={!bizGlobal && loading}
        className='ml-auto'
      />
      <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
        {!bizGlobal && loading ? (
          <Spinner
            loadingText='Loading Project Overview...'
            className='mt-24'
          />
        ) : (
          <>{renderDisclosureItems(understandings)}</>
        )}
      </div>
    </>
  );
};

export default BizGlobalUnderstanding;
