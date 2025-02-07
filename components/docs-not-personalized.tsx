"use client";

import React from "react";
import { defaultInstance, useConfiguredInstance } from "@/hooks/use-configured-instance";
import { Callout } from "fumadocs-ui/components/callout";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DocsNotPersonalized = ({ className }: { className?: string }) => {
  const [isClient, setIsClient] = React.useState(false);
  const { instance } = useConfiguredInstance();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (instance.apiUrl !== defaultInstance.apiUrl) {
    return null;
  }

  return (
    <Callout type="warn" className={cn(className)}>
      You haven&apos;t <Link href="/docs/getting-started#personalization">personalized the docs</Link> for your instance. You should do so before continuing.
    </Callout>
  );
};

export default DocsNotPersonalized;
