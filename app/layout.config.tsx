import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

import githubLogo from '../public/logos/github-mark.svg';
import githubLogoWhite from '../public/logos/github-mark-white.svg';
import discordLogo from '../public/logos/discord-mark-blue.svg';

import Logo from '@/components/logo';
import { InstanceConfigDialog } from '@/components/configure-instance';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo />,
    enabled: true,
    enableSearch: true,
    transparentMode: 'always',
    url: '/',
    children:  <InstanceConfigDialog />
  },
  // githubUrl: 'https://github.com/Mirasaki-MGSM/docs',
  links: [
    {
      text: 'Report Issue',
      url: 'https://github.com/Mirasaki-MGSM/issue-tracker/issues',
      active: 'nested-url',
      external: true,
      icon: (
        <>
          <Image
            src={githubLogo}
            alt="Github Logo"
            width={24}
            height={24}
            className="block dark:hidden"
          />
          <Image
            src={githubLogoWhite}
            alt="Github Logo"
            width={24}
            height={24}
            className="hidden dark:block"
          />
        </>
      ),
    },
    {
      text: 'Discord',
      url: 'https://discord.gg/mgsm',
      active: 'nested-url',
      external: true,
      icon: (
        <Image
          src={discordLogo}
          alt="Discord Logo"
          width={24}
          height={24}
        />
      ),
    },
  ],
};
