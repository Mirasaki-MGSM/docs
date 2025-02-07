import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import * as React from 'react';

export const source = loader({
  baseUrl: '/docs',
  // @ts-expect-error - Docs is of type never?
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }

    if (icon in icons)
      return React.createElement(icons[icon as keyof typeof icons]);
  },
});
