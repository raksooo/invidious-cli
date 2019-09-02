import React, {useCallback} from 'react';
import { Config } from '../config';
import Loading from './Loading';
import Feed from './Feed';
import Fetcher from './Fetcher';
import {getFeed} from '../helpers/fetch';

interface AppProps {
  config: Config;
}

export const ConfigContext = React.createContext<Config>({});

const App: React.FC<AppProps> = (props) => {
  const {
    config,
  } = props;

  const fetch = useCallback(() => {
    return getFeed(config.feed)
  }, [config.feed]);

  return (
    <ConfigContext.Provider value={config}>
      <Fetcher fetch={fetch} fallback={<Loading />}>
        <Feed />
      </Fetcher>
    </ConfigContext.Provider>
  )
};

export default React.memo(App);

