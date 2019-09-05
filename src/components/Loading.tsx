import React, { useRef, useState, useEffect } from 'react';
import CenteredText from './CenteredText';

const generateLoadingText = (elapsedSeconds: number) => {
  const maxDots = 3;
  const numberOfDots = elapsedSeconds % (maxDots + 1);
  const numberOfSpaces = maxDots - numberOfDots;
  const dots = '.'.repeat(numberOfDots);
  const spaces = ' '.repeat(numberOfSpaces);
  const seconds = ` (${elapsedSeconds}s)`;
  return `Loading${dots}${spaces}${seconds}`;
}

const Loading: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const timerRef =  useRef(null);
  const loadingText = generateLoadingText(seconds);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds(seconds => seconds + 1), 1000);
    return () => clearInterval(timerRef.current);
  });

  return (
    <CenteredText text={loadingText} />
  );
};

export default React.memo(Loading);

