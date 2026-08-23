// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  image: { responsiveStyles: true },
  fonts: [
    {
      name: 'Archivo',
      cssVariable: '--font-archivo',
      provider: fontProviders.fontsource(),
      weights: [500, 600, 700],
    },
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.fontsource(),
      weights: [400, 500],
    },
    {
      name: 'IBM Plex Mono',
      cssVariable: '--font-ibm-plex-mono',
      provider: fontProviders.fontsource(),
      weights: [400, 500],
    },
  ],
});
