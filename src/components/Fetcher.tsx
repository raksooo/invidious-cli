import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {VideoData} from '../helpers/fetchFeed';

interface FetcherProps {
  fallback: JSX.Element | JSX.Element[];
  fetch: () => Promise<any>;
  children: JSX.Element | JSX.Element[];
}

export interface FetcherContextValue {
  feed: VideoData[];
  refetch: () => void;
}

export const FetcherContext = React.createContext<FetcherContextValue>(null);

const Fetcher: React.FC<FetcherProps> = (props) => {
  const {
    fallback,
    children,
    fetch,
  } = props;

  const [data, setData] = useState(null);

  const fetchImpl = useCallback(() => {
    setData(null);
    fetch().then(data => {
      setData(data);
    });
  }, [fetch])

  const value = useMemo(() => ({
    feed: data,
    refetch: fetchImpl
  }), [data, fetchImpl]);

  useEffect(() => fetchImpl, [fetchImpl]);

  if (data == null) {
    return (
      <>
        {fallback}
      </>
    );
  }

  return (
    <FetcherContext.Provider value={value}>
      {children}
    </FetcherContext.Provider>
  );
}

export default React.memo(Fetcher);

