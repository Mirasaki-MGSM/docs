'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Instance = {
  name: string;
  region: 'EU1' | 'NA1';
  webUrl: string;
  apiUrl: string;
  cmsUrl: string;
};

const STORAGE_KEY = 'configuredInstance';

export const defaultInstance: Instance = {
  name: 'MGSM Demo',
  region: 'EU1',
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
      const data = stored ? JSON.parse(stored) : defaultInstance
      return {
        ...data,
        region: data.region === 'EU1' || data.region === 'NA1' ? data.region : 'EU1',
      }
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
