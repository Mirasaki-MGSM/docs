'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import * as React from 'react';

export type ResponsiveDialogProps = {
  triggerContent: React.ReactNode;
  titleContent: React.ReactNode;
  descriptionContent?: React.ReactNode;
  closeContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
};

export function useResponsiveDialog({
  triggerContent,
  titleContent,
  descriptionContent,
  closeContent,
  footerContent,
  children,
  contentClassName,
  headerClassName,
}: ResponsiveDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;

  if (isDesktop)
    return {
      open,
      setOpen,
      Component: () => (
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>{triggerContent}</DialogTrigger>
          <DialogContent
            className={cn(contentClassName, 'sm:max-w-[425px] max-w-full')}
          >
            <DialogHeader className={cn('max-w-full', headerClassName)}>
              <DialogTitle>{titleContent}</DialogTitle>
              {descriptionContent && (
                <DialogDescription>{descriptionContent}</DialogDescription>
              )}
            </DialogHeader>

            {children}

            {(closeContent || footerContent) && (
              <DialogFooter className="sm:justify-start">
                {closeContent && (
                  <DialogClose asChild>{closeContent}</DialogClose>
                )}
                {footerContent}
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      ),
    };
  else
    return {
      open,
      setOpen,
      Component: () => (
        <Drawer
          open={open}
          onOpenChange={setOpen}
        >
          <DrawerTrigger asChild>{triggerContent}</DrawerTrigger>
          <DrawerContent className={cn('max-w-full', contentClassName)}>
            <DrawerHeader
              className={cn('max-w-full text-left', headerClassName)}
            >
              <DrawerTitle>{titleContent}</DrawerTitle>
              {descriptionContent && (
                <DrawerDescription>{descriptionContent}</DrawerDescription>
              )}
            </DrawerHeader>
            <div className={'grid gap-1.5 p-4 text-left'}>{children}</div>
            {(closeContent || footerContent) && (
              <DrawerFooter className="pt-2">
                {footerContent}
                {closeContent && (
                  <DrawerClose asChild>{closeContent}</DrawerClose>
                )}
              </DrawerFooter>
            )}
          </DrawerContent>
        </Drawer>
      ),
    };
}
