import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CenteredText from './CenteredText';

interface FetcherProps {
  fallback: React.ReactElement;
  children: React.ReactElement;
  fetch: () => Promise<any>;
}

export interface FetcherContextValue {
  data: any;
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
  const [error, setError] = useState<boolean>(false);

  const fetchImpl = useCallback(() => {
    setData(null);
    fetch()
      .then(setData)
      .catch(_ => setError(true));
  }, [fetch])

  const value = useMemo(() => ({
    data,
    refetch: fetchImpl
  }), [data, fetchImpl]);

  useEffect(fetchImpl, [fetchImpl]);

  if (error) {
    return (
      <CenteredText text="An error occured." />
    );
  }

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

