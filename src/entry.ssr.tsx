/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest, // TODO: Need Some explanation on this manifest what it is & what for
    ...opts, // TODO: Explanations on this opts also
    // Use container attributes to set attributes on the html tag.
    containerAttributes: { // TODO: Explain this also
      lang: 'en-us',
      ...opts.containerAttributes,
    },
  });
}
