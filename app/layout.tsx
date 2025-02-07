import { ConfiguredInstanceProvider } from '@/hooks/use-configured-instance';
import './global.css';
import { Banner } from 'fumadocs-ui/components/banner';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.className}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <Banner
          id="mgsm-release-banner"
          variant="rainbow"
        >
          <Link
            href="https://github.com/Mirasaki-MGSM/issue-tracker/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="h-full w-full flex items-center justify-center"
          >
            MGSM is currently in beta. Please report any issues on our GitHub
            issue tracker.
          </Link>
        </Banner>
        <RootProvider>
          <ConfiguredInstanceProvider>
            {children}
          </ConfiguredInstanceProvider>
        </RootProvider>
      </body>
    </html>
  );
}
