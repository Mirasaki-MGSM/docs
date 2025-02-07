'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Instance = {
  name: string;
  webUrl: string;
  apiUrl: string;
  cmsUrl: string;
};

const STORAGE_KEY = 'configuredInstance';

export const defaultInstance: Instance = {
  name: 'MGSM Demo',
  webUrl: 'https://demo.mgsm.io',
  apiUrl: 'https://api.mgsm.io',
  cmsUrl: 'https://cms.mgsm.io',
};

type ConfiguredInstanceContextType = {
  instance: Instance;
  setInstance: (config: Instance) => void;
};

const ConfiguredInstanceContext = createContext<ConfiguredInstanceContextType | undefined>(undefined);

export const ConfiguredInstanceProvider = ({ children }: { children: ReactNode }) => {
  const [instance, _setInstance] = useState<Instance>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultInstance;
    } catch {
      return defaultInstance;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(instance));
  }, [instance]);

  const setInstance = (config: Instance) => {
    _setInstance(config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  };

  return (
    <ConfiguredInstanceContext.Provider value={{ instance, setInstance }}>
      {children}
    </ConfiguredInstanceContext.Provider>
  );
};

export const useConfiguredInstance = () => {
  const context = useContext(ConfiguredInstanceContext);
  if (!context) {
    throw new Error('useConfiguredInstance must be used within a ConfiguredInstanceProvider');
  }
  return context;
};
