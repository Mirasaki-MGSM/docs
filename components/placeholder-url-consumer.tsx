"use client";

import {
  Instance,
  useConfiguredInstance,
} from "@/hooks/use-configured-instance";
import React from "react";

const urls: Record<string, [keyof Instance, string | undefined]> = {
  INSTANCE_CMS_URL: [ "cmsUrl", '/admin' ],
  INSTANCE_WEB_URL: [ "webUrl", undefined ],
  INSTANCE_API_URL: [ "apiUrl", '/admin' ],
};

const PlaceholderUrlConsumer = () => {
  const { instance } = useConfiguredInstance();

  // When the component is initialized, we find all anchor tags with the href attribute set to
  // a placeholder and replace the href attribute with the actual URL.

  React.useEffect(() => {
    if (!instance) return;

    for (const [placeholder, [key, suffix]] of Object.entries(urls)) {
      const elements = document.querySelectorAll(`a[href="{{${placeholder}}}"`);

      elements.forEach((element) => {
        element.setAttribute("href", instance[key] + (suffix ?? ""));
      });
    }
  }, [instance]);

  return null;
};

export default PlaceholderUrlConsumer;
