'use client';

import { useState, useEffect } from "react";

export type Instance = {
    name: string;
    webUrl: string;
    apiUrl: string;
    cmsUrl: string;
    color?: string;
};

const STORAGE_KEY = "configuredInstance";

export const defaultInstance: Instance = {
    name: "MGSM Demo",
    webUrl: "https://demo.mgsm.io",
    apiUrl: "https://api.mgsm.io",
    cmsUrl: "https://cms.mgsm.io",
    color: "#FF0000",
};

/**
 * React hook that resolves the configured instance
 * @returns The configured instance and a setter function
 */
export const useConfiguredInstance = (): [Instance, (config: Instance) => void] => {
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

    return [instance, setInstance];
};
