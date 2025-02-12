'use client';

import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useConfiguredInstance } from '@/hooks/use-configured-instance';
import { useResponsiveDialog } from './responsive/dialog';
import { SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const instanceFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  region: z.enum(['EU1', 'NA1']),
  webUrl: z.string().url(),
  apiUrl: z.string().url(),
  cmsUrl: z.string().url(),
  color: z.string().optional(),
});

export const InstanceConfigDialog = ({
  name = 'Instance Settings/Configuration',
  triggerContent = (
    <motion.span
      suppressHydrationWarning
      className={cn(
        'group size-6 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center',
        typeof window !== 'undefined' &&
          window.location.pathname !== '/' &&
          'ml-2'
      )}
      initial={{
        scale: 0,
        rotate: 360,
      }}
      transition={{
        type: 'spring',
        damping: 10,
        stiffness: 100,
      }}
      animate={{
        scale: 1,
        rotate: 0,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <SettingsIcon
        tabIndex={0}
        size={16}
        className="group-hover:scale-90 group-active:scale-90 group-focus:scale-90 transition-transform"
      />
    </motion.span>
  ),
}: {
  name?: string;
  triggerContent?: React.ReactNode;
}) => {
  const { Component, setOpen } = useResponsiveDialog({
    titleContent: name,
    descriptionContent: [
      'You can configure your instance settings here to personalize the documentation for your environment.',
      'Please note that these settings are only stored in your (current) browser,',
      'and that they are only used to personalize your experience - they do not affect the actual instance.',
    ].join(' '),
    triggerContent,
    children: (
      <ConfiguredInstanceForm
        onSubmit={(values) => {
          console.log('Instance form submitted:', values);
          setOpen(false);
        }}
      />
    ),
  });

  return <Component />;
};

export const ConfiguredInstanceForm = ({
  onSubmit: _onSubmit,
}: {
  onSubmit?: (values: z.infer<typeof instanceFormSchema>) => void;
}) => {
  const { instance, setInstance } = useConfiguredInstance();

  const form = useForm<z.infer<typeof instanceFormSchema>>({
    resolver: zodResolver(instanceFormSchema),
    defaultValues: instance,
  });

  function onSubmit(values: z.infer<typeof instanceFormSchema>) {
    setInstance(values);
    _onSubmit?.(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="MGSM Demo"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The name of your instance - this will be displayed in the
                header.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Regions</SelectLabel>
                      {['EU1', 'NA1'].map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                The region of your instance - aka. where it is hosted, or where you want it to be hosted.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="webUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Web URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://demo.mgsm.io"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The URL of your instance website/frontend.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://api.mgsm.io"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The URL of the API for your instance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cmsUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CMS URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://cms.mgsm.io"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The URL of the CMS for your instance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={'default'}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
