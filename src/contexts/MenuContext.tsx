import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MenuContextType {
  visibleSection: string;
  setVisibleSection: (section: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visibleSection, setVisibleSection] = useState<string>('all');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/dashboard') {
      setVisibleSection('all');
      return;
    }

    const section = path.split('/')[1];

    const sectionMap: { [key: string]: string } = {
      'usermanagement': 'user',
      'repair-panel': 'repair',
      'jobs-panel': 'jobs',
      'tracking-panel': 'tracking',
      'coding-panel': 'coding',
      'base-info-panel': 'baseInfo'
    };

    setVisibleSection(sectionMap[section] || 'all');
  }, [location.pathname]);

  return (
    <MenuContext.Provider value={{ visibleSection, setVisibleSection }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}; 