'use client';

import {
  DocsNavigationProvider,
  useDocsNavigation,
} from 'components/AppRouterMigrationComponents/Docs/DocsNavigationContext';
import { LeftHandSideParentContainer } from 'components/AppRouterMigrationComponents/Docs/docsSearch/SearchNavigation';
import { screenResizer } from 'components/hooks/ScreenResizer';
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
  const isScreenSmallerThan840 = screenResizer().isScreenSmallerThan840;

  return (
    <div className="relative flex justify-center">
      <div className="w-full max-w-[2000px]">
        {/* Left sidebar for navigation - always visible on larger screens */}
        {!isScreenSmallerThan840 && (
          <div className="fixed top-32 h-[calc(100vh)] w-[250px] lg:w-[300px]">
            <LeftHandSideParentContainer
              tableOfContents={NavigationDocsData.data}
              tableOfContentsLearn={NavigationLearnData.data}
              learnActive={learnActive}
              setLearnActive={setLearnActive}
            />
          </div>
        )}

        {/* Main content shifted to the right on larger screens */}
        <div className={`${!isScreenSmallerThan840 ? 'ml-[300px]' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
