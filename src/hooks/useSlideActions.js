import { useEffect, useState } from 'react';

import { useKeyPress } from './';

const useSlideActions = (slideActions = []) => {
  const [slideNumber, setSlideNumber] = useState(null);

  useKeyPress('ArrowDown', () => {
    if (slideNumber === null) {
      setSlideNumber(0);
    } else if (slideNumber < slideActions.length - 1) {
      setSlideNumber(slideNumber + 1);
    }
  });

  useKeyPress('ArrowUp', () => {
    if (slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    }
  });

  useEffect(() => {
    const slideAction = slideActions[slideNumber];

    if (typeof slideAction === 'function') {
      slideAction();
    }
    // eslint-disable-next-line
  }, [slideNumber]);
};

export default useSlideActions;
