import { useState, useCallback } from 'react';

const useHovering = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  return { isHovering, handleMouseEnter, handleMouseLeave };
};

export default useHovering;
