import { useState, useEffect, useRef } from 'react';

const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        setWindowSize(getWindowSize());
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return {
    windowSize,
  };
};

export default useWindowSize;
