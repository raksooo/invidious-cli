import React, { useRef, useState, useEffect } from 'react';
import CenteredText from './CenteredText';

interface LoadingProps {
  noTime?: boolean;
}

const generateLoadingText = (elapsedSeconds: number, noTime: boolean) => {
  const maxDots = 3;
  const numberOfDots = elapsedSeconds % (maxDots + 1);
  const numberOfSpaces = maxDots - numberOfDots;
  const dots = '.'.repeat(numberOfDots);
  const spaces = ' '.repeat(numberOfSpaces);
  const seconds = noTime ? '' : ` (${elapsedSeconds}s)`;
  return `Loading${dots}${spaces}${seconds}`;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const {
    noTime = false,
  } = props;


  const [seconds, setSeconds] = useState(0);
  const timerRef =  useRef(null);
  const loadingText = generateLoadingText(seconds, noTime);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds(seconds => seconds + 1), 1000);
    return () => clearInterval(timerRef.current);
  });

  return (
    <CenteredText text={loadingText} />
  );
};

export default React.memo(Loading);

