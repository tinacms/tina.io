'use client';

import {
  DocsNavigationProvider,
  useDocsNavigation,
} from 'components/AppRouterMigrationComponents/Docs/DocsNavigationContext';
import { LeftHandSideParentContainer } from 'components/AppRouterMigrationComponents/Docs/docsSearch/SearchNavigation';
import React, { createContext, useContext } from 'react';

// Create a context for the navigation data
type NavigationDataContextType = {
  NavigationDocsData: any;
  NavigationLearnData: any;
};

const NavigationDataContext = createContext<NavigationDataContextType>({
  NavigationDocsData: {},
  NavigationLearnData: {},
});

// Export a hook to access navigation data
export const useNavigationData = () => useContext(NavigationDataContext);

export default function DocsLayoutClient({
  children,
  NavigationDocsData,
  NavigationLearnData,
}: {
  children: React.ReactNode;
  NavigationDocsData: any;
  NavigationLearnData: any;
}) {
  return (
    <DocsNavigationProvider>
      <NavigationDataContext.Provider
        value={{ NavigationDocsData, NavigationLearnData }}
      >
        <DocsLayoutContent>{children}</DocsLayoutContent>
      </NavigationDataContext.Provider>
    </DocsNavigationProvider>
  );
}

function DocsLayoutContent({ children }: { children: React.ReactNode }) {
  const { learnActive, setLearnActive } = useDocsNavigation();
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();

  return (
    <div className="relative my-6 lg:mb-16 xl:mt-16 flex justify-center items-start">
      <div
        className={`xl:px-16 md:px-8 px-3 w-full max-w-[2000px] grid grid-cols-1 md:grid-cols-[1.25fr_3fr] xl:grid-cols-[1.25fr_3fr_0.75fr]`}
      >
        {/* LEFT COLUMN */}
        <div className={`sticky top-32 h-[calc(100vh)] hidden md:block`}>
          <LeftHandSideParentContainer
            tableOfContents={NavigationDocsData?.data}
            tableOfContentsLearn={NavigationLearnData?.data}
            learnActive={learnActive}
            setLearnActive={setLearnActive}
          />
        </div>
        {/* MIDDLE COLUMN */}
        <div className="col-span-2 md:col-span-1 xl:col-span-2">{children}</div>
      </div>
    </div>
  );
}
