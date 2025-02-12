"use client";

import { defaultInstance, Instance, useConfiguredInstance } from "@/hooks/use-configured-instance";
import { useEffect, useState } from "react";

export const getPropertyValue = (
  instance: Instance,
  property: keyof Instance,
  stripSchemeFromUrls: boolean,
  transformRegionToProxyServer: boolean
) => {
  const value = instance[property];

  if (stripSchemeFromUrls && property.endsWith('Url')) {
    return value.replace(/(^\w+:|^)\/\//, '');
  }

  if (transformRegionToProxyServer && property === 'region') {
    if (value === 'EU1') {
      return 'proxy-eu-1.mgsm.io';
    }

    if (value === 'NA1') {
      return 'proxy-na-1.mgsm.io';
    }  
  }

  return value;
}

export const InstanceProperty = ({ property, stripSchemeFromUrls = false, transformRegionToProxyServer = false }: {
  property: keyof Instance;
  stripSchemeFromUrls?: boolean;
  transformRegionToProxyServer?: boolean;
}) => {
  const { instance } = useConfiguredInstance();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return getPropertyValue(defaultInstance, property, stripSchemeFromUrls, transformRegionToProxyServer);
  }

  return getPropertyValue(instance, property, stripSchemeFromUrls, transformRegionToProxyServer);
};
