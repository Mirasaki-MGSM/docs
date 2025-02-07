/* eslint-disable @typescript-eslint/no-explicit-any */

import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { metadataImage } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { getGithubLastEdit } from 'fumadocs-core/server';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

const repo = {
  owner: 'Mirasaki-MGSM',
  repo: 'docs',
};

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const showGhDetails = page.file.path !== 'index.mdx';
  const ghPath = `content/docs/${page.file.path}`;
  const githubLastUpdated = await getGithubLastEdit({
    ...repo,
    path: ghPath,
  });

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={
        githubLastUpdated && showGhDetails
          ? new Date(githubLastUpdated)
          : undefined
      }
      editOnGithub={{
        className: cn(!showGhDetails && 'hidden'),
        ...repo,
        sha: 'main',
        path: ghPath,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            img: (props: any) => (
              <ImageZoom
                className="rounded"
                {...(props as any)}
              />
            ),
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('NEXT_PUBLIC_SITE_URL is required');
  }

  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return metadataImage.withImage(page.slugs, {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    title: page.data.title,
    description: page.data.description,
  });
}
