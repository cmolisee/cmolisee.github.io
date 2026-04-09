import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import cssnano from "cssnano";

/** @type {import('postcss').ProcessOptions & { plugins: import('postcss').AcceptedPlugin[] }} */
export default {
  plugins: {
    "postcss-import": postcssImport(),
    "@tailwind/postcss": tailwindcss(),
    "postcss-nesting": postcssNesting(),
    autoprefixer: autoprefixer(),
    ...(procecss.env.NODE_ENV === "production" && {
      cssnano: cssnano({
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            minifySelectors: true,
          },
        ],
      }),
    }),
  },
};
