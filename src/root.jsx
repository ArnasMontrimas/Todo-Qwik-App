import { component$, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';

// Global Styles
import globalStyles from "./global.css?inline";

export default component$(() => {
  useStyles$(globalStyles)

  return (
    // TODO: What is this component below?
    <QwikCityProvider>
      <head>
        <title>Todos App</title>
      </head>
      <body>
        <main>
          <RouterOutlet /> {/** Renders Our Routes */}
        </main>
      </body>
    </QwikCityProvider>
  );
});
