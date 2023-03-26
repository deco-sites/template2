import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="32x32"
        href={asset("/apple-touch-icon.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <meta name="theme-color" content="#8a4f7d" />
      <meta name="msapplication-TileColor" content="#221E1F" />

      {
        /*
         * Include fonts
         * tip: It's always better copy fonts to the `/static/fonts` folder than serving from another
         * domain since DNS resolution times can really affect performance.
         */
      }
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* latin-ext */
            @font-face {
              font-family: 'Noto Sans';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/o-0IIpQlx3QUlC5A4PNr6zRAW_0.woff2",
            )
          }) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Noto Sans';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/o-0IIpQlx3QUlC5A4PNr5TRA.woff2",
            )
          }) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            /* latin-ext */
            @font-face {
              font-family: 'Noto Sans';
              font-style: normal;
              font-weight: 900;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/o-0NIpQlx3QUlC5A4PNjZhNVatyB1Wk.woff2",
            )
          }) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Noto Sans';
              font-style: normal;
              font-weight: 900;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/o-0NIpQlx3QUlC5A4PNjZhNVZNyB.woff2",
            )
          }) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            /* latin-ext */
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 300;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/KFOlCnqEu92Fr1MmSU5fChc4EsA.woff2",
            )
          }) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }

            /* latin */
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 300;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/KFOlCnqEu92Fr1MmSU5fBBc4.woff2",
            )
          }) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            /* latin-ext */
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/KFOmCnqEu92Fr1Mu7GxKOzY.woff2",
            )
          }) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }

            /* latin */
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/KFOmCnqEu92Fr1Mu4mxK.woff2",
            )
          }) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            /* latin-ext */
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 900;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/KFOlCnqEu92Fr1MmYUtfChc4EsA.woff2",
            )
          }) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }

            /* latin */
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 900;
              font-display: swap;
              src: url(${
            asset(
              "/fonts/KFOlCnqEu92Fr1MmYUtfBBc4.woff2",
            )
          }) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
          `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
