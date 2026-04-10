import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import cssnano from "cssnano";

const isProd = process.env.NODE_ENV === "production";

/** @type {import('postcss').ProcessOptions & { plugins: import('postcss').AcceptedPlugin[] }} */
export default {
  plugins: [
    postcssImport(),
    tailwindcss(),
    postcssNesting(),
    autoprefixer(),
    ...(isProd
      ? [
          cssnano({
            preset: [
              "default",
              {
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
                minifySelectors: true,
              },
            ],
          }),
        ]
      : []),
  ],
};
