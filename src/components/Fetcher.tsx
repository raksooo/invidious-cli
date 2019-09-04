import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { VideoData } from '../helpers/fetchFeed';

interface FetcherProps {
  fallback: React.ReactElement;
  children: React.ReactElement;
  fetch: () => Promise<any>;
}

export interface FetcherContextValue {
  videos: VideoData[];
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
    fetch().then(setData);
  }, [fetch])

  const value = useMemo(() => ({
    videos: data,
    refetch: fetchImpl
  }), [data, fetchImpl]);

  useEffect(() => fetchImpl, [fetchImpl]);

  if (data == null) {
    return fallback;
  }

  return (
    <FetcherContext.Provider value={value}>
      {children}
    </FetcherContext.Provider>
  );
}

export default React.memo(Fetcher);

