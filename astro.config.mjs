import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://quirkylabs.ai',
  output: 'static',
  integrations: [
    starlight({
      title: 'Phronesis Docs',
      description: 'The Black Box Flight Recorder for Agentic AI — Documentation',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Phronesis',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/madan-quirkylabs/phronesis-homepage' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'What is Phronesis?', slug: 'introduction' },
            { label: 'Connecting your OTel Exporter', slug: 'getting-started' },
          ],
        },
        {
          label: 'Architecture',
          items: [
            { label: 'Forensic Reasoning Replay', slug: 'architecture/forensic-reasoning-replay' },
            { label: 'Append-Only Ledger', slug: 'architecture/append-only-ledger' },
          ],
        },
        {
          label: 'Compliance',
          items: [
            { label: 'DORA Article 19 Requirements', slug: 'compliance/dora-article-19' },
            { label: 'SR 26-2 Alignment', slug: 'compliance/sr-26-2' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'FAQ', slug: 'faq' },
          ],
        },
      ],
      customCss: [
        './src/styles/starlight-theme.css',
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap',
          },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/madan-quirkylabs/phronesis-homepage/edit/main/',
      },
    }),
  ],
});
