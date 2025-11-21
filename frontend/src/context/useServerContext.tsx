import { useContext } from 'react';

import { ServerContext } from './ServerContext';

const useServerContext = () => {
  const context = useContext(ServerContext);

  if (context === undefined) {
    throw new Error('useServerContext must be used within a server provider!');
  }

  return context;
};

export default useServerContext;
