"use client";

import { defaultInstance, Instance, useConfiguredInstance } from "@/hooks/use-configured-instance";
import { useEffect, useState } from "react";

// Note: We use suppressHydrationWarning because the data is resolved from localStorage

export const InstanceProperty = ({ property, stripSchemeFromUrls = false }: {
  property: keyof Instance;
  stripSchemeFromUrls?: boolean;
}) => {
  const { instance } = useConfiguredInstance();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return defaultInstance[property];
  }

  if (property.endsWith('Url') && stripSchemeFromUrls) {
    return instance[property].replace(/(^\w+:|^)\/\//, '');
  }

  return instance[property];
};
