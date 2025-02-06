import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
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
      {children}
    </DocsLayout>
  );
}
