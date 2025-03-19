'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

type DocsNavigationContextType = {
  learnActive: boolean;
  setLearnActive: (value: boolean) => void;
};

const defaultContext: DocsNavigationContextType = {
  learnActive: false,
  setLearnActive: () => {},
};

const DocsNavigationContext =
  createContext<DocsNavigationContextType>(defaultContext);

export const useDocsNavigation = () => useContext(DocsNavigationContext);

export const DocsNavigationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [learnActive, setLearnActive] = useState(false);

  return (
    <DocsNavigationContext.Provider value={{ learnActive, setLearnActive }}>
      {children}
    </DocsNavigationContext.Provider>
  );
};
