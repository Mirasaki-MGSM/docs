import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { Callout } from 'fumadocs-ui/components/callout';
import Link from 'next/link';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        banner: (
          <Callout className="shadow-none">
            This documentation is a work in progress. If you have any questions
            or need help, please reach out to us on our{' '}
            <Link
              href="https://discord.gg/mgsm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              Discord server
            </Link>
            .
          </Callout>
        ),
      }}
      // sidebar={{
      //   banner: (
      //     <RootToggle
      //       options={[
      //         {
      //           title: 'Folder 1',
      //           description: 'Pages in folder 1',
      //           url: '/docs',

      //         },
      //         {
      //           title: 'Folder 2',
      //           description: 'Pages in folder 2',
      //           url: '/docs',
      //         },
      //       ]}
      //     />
      //   ),
      // }}
    >
      {/* <ScrollProgressBar /> */}
      {children}
    </DocsLayout>
  );
}
