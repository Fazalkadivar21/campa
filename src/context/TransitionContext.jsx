
import { createContext, useContext } from 'react';
import barba from '@barba/core';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  return (
    <TransitionContext.Provider value={barba}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  return useContext(TransitionContext);
};
