"use client";

import React from "react";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";
import { copyTextToClipboard } from "@/lib/dom-copy";
import { useConfiguredInstance } from "@/hooks/use-configured-instance";

const DiscordRedirectURL = ({ className }: { className?: string }) => {
  const [isClient, setIsClient] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const { instance } = useConfiguredInstance();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const Skeleton = () => (
    <CopyButton
      disabled={true}
      id="render-discord-redirect-url"
      className={cn("inline-flex w-full justify-start", className)}
      text="Loading..."
    >
      <span className="truncate">Loading...</span>
    </CopyButton>
  );

  if (!isClient) {
    return <Skeleton />;
  }

  const renderApiUrl = instance.apiUrl;
  const callbackUrl = `${renderApiUrl}/auth/discord/callback`;
  return (
    <CopyButton
      disabled={disabled}
      id="render-discord-redirect-url"
      className={cn("inline-flex w-full justify-start", className)}
      text={callbackUrl}
      onClick={(e) => {
        e.preventDefault();
        const element = e.currentTarget as HTMLButtonElement;
        const textEl = element.querySelector("span");
        if (textEl) {
          setDisabled(true);
          copyTextToClipboard(callbackUrl);
          textEl.textContent = "Copied!";
          setTimeout(() => {
            textEl.textContent = callbackUrl;
            setDisabled(false);
          }, 1000);
        }
      }}
    >
      <span className="truncate">{renderApiUrl}/auth/discord/callback</span>
    </CopyButton>
  );
};

export default DiscordRedirectURL;
