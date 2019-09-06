import { useState, useCallback } from 'react';

export const useToggle: (initial?: boolean) => [boolean, () => void] = (
  initial: boolean = false
) => {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState(state => !state), []);
  return [state, toggle];
};

