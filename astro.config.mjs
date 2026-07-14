// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
