import { defineNuxtModule } from "@nuxt/kit";
import preactIslandPlugins, {
  Options,
} from "@barelyhuman/preact-island-plugins/rollup";
import babel from "@rollup/plugin-babel";
// @ts-expect-error upstream issue
import babelJSX from "@babel/plugin-transform-react-jsx";

export default defineNuxtModule<Options>({
  meta: {
    name: "preact-islands",
    configKey: "preactIslands",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    rootDir: ".",
    baseURL: "/",
    atomic: true,
    hash: false,
    tsconfig: "./tsconfig.json",
    client: {
      tsconfig: "./tsconfig.json",
      output: "./dist/client",
    },
  },
  setup(options, nuxt) {
    nuxt.hook("nitro:config", async (nitroConfig) => {
      nitroConfig.rollupConfig ||= {};
      nitroConfig.rollupConfig.plugins ||= [];
      if (
        !(
          typeof nitroConfig.rollupConfig.plugins === "object" &&
          Array.isArray(nitroConfig.rollupConfig.plugins)
        )
      )
        return;

      nitroConfig.imports = {
        imports: [
          {
            name: "renderToString",
            as: "renderComponent",
            from: "preact-render-to-string",
          },
        ],
      };

      nitroConfig.esbuild ||= {};
      nitroConfig.esbuild.options ||= {};

      nitroConfig.esbuild.options.jsxFactory = "h";
      nitroConfig.esbuild.options.jsxImportSource = "Fragment";
      nitroConfig.esbuild.options.loaders = {
        ".js": "jsx",
      };

      nitroConfig.rollupConfig.plugins.push(
        babel({
          babelHelpers: "bundled",
          plugins: [
            [
              babelJSX,
              {
                runtime: "automatic",
                importSource: "preact",
              },
            ],
          ],
        })
      );

      nitroConfig.rollupConfig.plugins.push(preactIslandPlugins(options));
    });
  },
});
