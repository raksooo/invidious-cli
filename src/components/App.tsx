import React, {useCallback, useState, useMemo} from 'react';
import { Config, saveLast } from '../config';
import Loading from './Loading';
import Feed from './Feed';
import Fetcher from './Fetcher';
import {getFeed} from '../helpers/fetchFeed';

interface AppProps {
  config: Config;
}

export interface ConfigUpdater {
  setLast: (date: Date) => void;
}

export const ConfigContext = React.createContext<Config>({});
export const ConfigUpdaterContext = React.createContext<ConfigUpdater>({ setLast: _ => {} });

const App: React.FC<AppProps> = (props) => {
  const {
    config: configProp,
  } = props;

  const [config, setConfig] = useState<Config>(configProp);

  const fetch = useCallback(() => getFeed(config.feed), [config.feed]);

  const setLast = useCallback(date => {
    saveLast(date);
    setConfig({ ...config, last: date });
  }, [config])

  const configUpdater = useMemo<ConfigUpdater>(() => ({ setLast }), [setLast]);

  return (
    <ConfigContext.Provider value={config}>
      <ConfigUpdaterContext.Provider value={configUpdater}>
        <Fetcher fetch={fetch} fallback={<Loading />}>
          <Feed />
        </Fetcher>
      </ConfigUpdaterContext.Provider>
    </ConfigContext.Provider>
  )
};

export default React.memo(App);

