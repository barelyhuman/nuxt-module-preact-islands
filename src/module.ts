import { defineNuxtModule } from "@nuxt/kit";
import preactIsland, {
  Options,
} from "@barelyhuman/preact-island-plugins/rollup";
import { join } from "path";

export default defineNuxtModule<Options>({
  meta: {
    name: "preact-islands",
    configKey: "preactIslands",
  },
  // Default configuration options of the Nuxt module
  // @ts-ignore
  defaults: {
    rootDir: ".",
    baseURL: "/islands",
    atomic: true,
    //@ts-ignore
    tsconfig: false,
    hash: false,
    client: {
      output: ".islands",
      //@ts-ignore
      tsconfig: false,
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

      nitroConfig.esbuild.options.jsx = "automatic";
      nitroConfig.esbuild.options.jsxImportSource = "preact";
      nitroConfig.esbuild.options.loaders = {
        ".js": "jsx",
        ".ts": "tsx",
      };

      nitroConfig.rollupConfig.plugins.unshift(preactIsland(options));

      nitroConfig.publicAssets ||= [];
      nitroConfig.publicAssets.push({
        dir: join(process.cwd(), ".islands"),
        baseURL: "/islands",
        maxAge: Infinity,
      });
    });
  },
});
