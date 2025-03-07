import React, { createContext, useContext, useState, ReactNode } from 'react';

export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_WIDTH_COLLAPSED = 80;

interface SidebarContextType {
  sidebarToggle: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  sidebarToggle: false,
  toggleSidebar: () => {}
});

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
