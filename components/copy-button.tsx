'use client';

import { copyTextToClipboard } from '@/lib/dom-copy';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import React from 'react';

export type CopyButtonProps = {
  text: string;
  className?: string;
};

const CopyButtonInner = ({
  text,
  className,
}: CopyButtonProps) => {
  return (
    <CopyIcon
      className={cn(
        'duration-300 min-h-5 min-w-5 shrink-0 hover:scale-110 hover:text-primary hover:cursor-pointer',
        className
      )}
      onClick={() =>
        copyTextToClipboard(text, () => {
          console.log(`Copied to clipboard: ${text}`);
        })
      }
    />
  );
};

export const CopyButton = ({
  text,
  className,
  children,
  ...props
}: ButtonProps &
  CopyButtonProps & {
    children?: React.ReactNode;
  }) => {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <Button
      variant="default"
      disabled={disabled}
      className={cn('group', className)}
      onClick={(e) => {
        e.preventDefault();
        copyTextToClipboard(text, () => {
          console.log(`Copied to clipboard: ${text}`);
        });

        // Make button green for a moment
        const element = e.currentTarget as HTMLButtonElement;

        // Replace icon with checkmark
        const icon = element.querySelector('svg');
        if (icon) {
          icon.classList.add('hidden');
        }
        const checkmark = element.querySelector('.checkmark');
        if (checkmark) {
          checkmark.classList.remove('hidden');
        }

        // Disable, prevents conflicting hover states
        setDisabled(true);

        // Reset button
        setTimeout(() => {
          const icon = element.querySelector('svg');
          if (icon) {
            icon.classList.remove('hidden');
          }
          const checkmark = element.querySelector('.checkmark');
          if (checkmark) {
            checkmark.classList.add('hidden');
          }
          setDisabled(false);
        }, 1000);
      }}
      {...props}
    >
      <CopyIcon className={cn('shrink-0 min-h-5 min-w-5', children && 'pr-1')} />
      <CheckIcon
        className={cn('shrink-0 min-h-5 min-w-5 hidden checkmark', children && 'pr-1')}
      />
      {children}
    </Button>
  );
};

export default CopyButtonInner;
