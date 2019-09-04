import React, { useCallback, useState, useMemo } from 'react';
import { Config, saveLast } from '../config';
import Loading from './Loading';
import Feed from './Feed';
import Fetcher from './Fetcher';
import { getFeed } from '../helpers/fetchFeed';

export interface ConfigContextValue extends Config {
  setLast: (date: Date) => void;
}

interface AppProps {
  config: Config;
}

export const ConfigContext = React.createContext<ConfigContextValue>(null);

const App: React.FC<AppProps> = (props) => {
  const {
    config: configProp,
  } = props;

  const [config, setConfig] = useState<Config>(configProp);
  const setLast = useCallback(date => {
    saveLast(date);
    setConfig(config => ({ ...config, last: date }));
  }, [])

  const configContextValue = useMemo<ConfigContextValue>(() => ({
    ...config,
    setLast,
  }), [config, setLast]);

  const fetch = useCallback(() => getFeed(config.feed), [config.feed]);

  return (
    <ConfigContext.Provider value={configContextValue}>
      <Fetcher fetch={fetch} fallback={<Loading />}>
        <Feed />
      </Fetcher>
    </ConfigContext.Provider>
  )
};

export default React.memo(App);

