import React, { useState, useEffect } from 'react';

interface FetcherProps {
  fallback: JSX.Element | JSX.Element[];
  fetch: () => Promise<any>;
  children: JSX.Element | JSX.Element[];
}

export const FetcherContext = React.createContext<any>(null);

const Fetcher: React.FC<FetcherProps> = (props) => {
  const {
    fallback,
    children,
    fetch,
  } = props;

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    fetch().then(data => {
      setData(data);
    });
  }, [fetch]);

  if (data == null) {
    return (
      <>
        {fallback}
      </>
    );
  }

  return (
    <FetcherContext.Provider value={data}>
      {children}
    </FetcherContext.Provider>
  );
}

export default React.memo(Fetcher);

