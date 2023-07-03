import { defineNuxtModule } from "@nuxt/kit";
// @ts-expect-error upstream types invalid
import preactIslandPlugins from "@barelyhuman/preact-island-plugins/rollup";
import babel from "@rollup/plugin-babel";
// @ts-expect-error upstream issue
import babelJSX from "@babel/plugin-transform-react-jsx";

// Module options TypeScript interface definition
export interface ModuleOptions {
  rootDir: string;
  atomic: boolean;
  hash: boolean;
  baseURL: string;
  bundleClient: {
    outDir: string;
  };
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "preact-islands",
    configKey: "preactIslands",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    rootDir: ".",
    atomic: true,
    hash: false,
    baseURL: "/",
    bundleClient: {
      outDir: "something",
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
