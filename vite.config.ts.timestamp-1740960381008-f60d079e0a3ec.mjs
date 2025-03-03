// vite.config.ts
import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "file:///Users/danielaugustolibanori/Documents/GitHub/electron-vite-react/node_modules/vite/dist/node/index.js";
import react from "file:///Users/danielaugustolibanori/Documents/GitHub/electron-vite-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import electron from "file:///Users/danielaugustolibanori/Documents/GitHub/electron-vite-react/node_modules/vite-plugin-electron/dist/simple.mjs";

// package.json
var package_default = {
  name: "electron-vite-react",
  version: "2.2.0",
  main: "dist-electron/main/index.js",
  description: "Electron Vite React boilerplate.",
  author: "\u8349\u978B\u6CA1\u53F7 <308487730@qq.com>",
  license: "MIT",
  private: true,
  debug: {
    env: {
      VITE_DEV_SERVER_URL: "http://127.0.0.1:7777/"
    }
  },
  type: "module",
  scripts: {
    dev: "vite",
    build: "tsc && vite build && electron-builder",
    preview: "vite preview",
    pretest: "vite build --mode=test",
    test: "vitest run"
  },
  dependencies: {
    "electron-updater": "^6.3.9"
  },
  devDependencies: {
    "@playwright/test": "^1.48.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    autoprefixer: "^10.4.20",
    electron: "^33.2.0",
    "electron-builder": "^24.13.3",
    postcss: "^8.4.49",
    "postcss-import": "^16.1.0",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    tailwindcss: "^3.4.15",
    typescript: "^5.4.2",
    vite: "^5.4.11",
    "vite-plugin-electron": "^0.29.0",
    "vite-plugin-electron-renderer": "^0.14.6",
    vitest: "^2.1.5"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/danielaugustolibanori/Documents/GitHub/electron-vite-react";
var vite_config_default = defineConfig(({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    resolve: {
      alias: {
        "@": path.join(__vite_injected_original_dirname, "src")
      }
    },
    plugins: [
      react(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: "electron/main/index.ts",
          onstart(args) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */
                "[startup] Electron App"
              );
            } else {
              args.startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            }
          }
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            }
          }
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {}
      })
    ],
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(package_default.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port
      };
    })(),
    clearScreen: false
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RhbmllbGF1Z3VzdG9saWJhbm9yaS9Eb2N1bWVudHMvR2l0SHViL2VsZWN0cm9uLXZpdGUtcmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kYW5pZWxhdWd1c3RvbGliYW5vcmkvRG9jdW1lbnRzL0dpdEh1Yi9lbGVjdHJvbi12aXRlLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kYW5pZWxhdWd1c3RvbGliYW5vcmkvRG9jdW1lbnRzL0dpdEh1Yi9lbGVjdHJvbi12aXRlLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcm1TeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgZWxlY3Ryb24gZnJvbSAndml0ZS1wbHVnaW4tZWxlY3Ryb24vc2ltcGxlJ1xuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcbiAgcm1TeW5jKCdkaXN0LWVsZWN0cm9uJywgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pXG5cbiAgY29uc3QgaXNTZXJ2ZSA9IGNvbW1hbmQgPT09ICdzZXJ2ZSdcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcbiAgY29uc3Qgc291cmNlbWFwID0gaXNTZXJ2ZSB8fCAhIXByb2Nlc3MuZW52LlZTQ09ERV9ERUJVR1xuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnc3JjJylcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgZWxlY3Ryb24oe1xuICAgICAgICBtYWluOiB7XG4gICAgICAgICAgLy8gU2hvcnRjdXQgb2YgYGJ1aWxkLmxpYi5lbnRyeWBcbiAgICAgICAgICBlbnRyeTogJ2VsZWN0cm9uL21haW4vaW5kZXgudHMnLFxuICAgICAgICAgIG9uc3RhcnQoYXJncykge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LlZTQ09ERV9ERUJVRykge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygvKiBGb3IgYC52c2NvZGUvLmRlYnVnLnNjcmlwdC5tanNgICovJ1tzdGFydHVwXSBFbGVjdHJvbiBBcHAnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXJncy5zdGFydHVwKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpdGU6IHtcbiAgICAgICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICAgIHNvdXJjZW1hcCxcbiAgICAgICAgICAgICAgbWluaWZ5OiBpc0J1aWxkLFxuICAgICAgICAgICAgICBvdXREaXI6ICdkaXN0LWVsZWN0cm9uL21haW4nLFxuICAgICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKCdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHByZWxvYWQ6IHtcbiAgICAgICAgICAvLyBTaG9ydGN1dCBvZiBgYnVpbGQucm9sbHVwT3B0aW9ucy5pbnB1dGAuXG4gICAgICAgICAgLy8gUHJlbG9hZCBzY3JpcHRzIG1heSBjb250YWluIFdlYiBhc3NldHMsIHNvIHVzZSB0aGUgYGJ1aWxkLnJvbGx1cE9wdGlvbnMuaW5wdXRgIGluc3RlYWQgYGJ1aWxkLmxpYi5lbnRyeWAuXG4gICAgICAgICAgaW5wdXQ6ICdlbGVjdHJvbi9wcmVsb2FkL2luZGV4LnRzJyxcbiAgICAgICAgICB2aXRlOiB7XG4gICAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgICBzb3VyY2VtYXA6IHNvdXJjZW1hcCA/ICdpbmxpbmUnIDogdW5kZWZpbmVkLCAvLyAjMzMyXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcbiAgICAgICAgICAgICAgb3V0RGlyOiAnZGlzdC1lbGVjdHJvbi9wcmVsb2FkJyxcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cygnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30pLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAvLyBQbG95ZmlsbCB0aGUgRWxlY3Ryb24gYW5kIE5vZGUuanMgQVBJIGZvciBSZW5kZXJlciBwcm9jZXNzLlxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB1c2UgTm9kZS5qcyBpbiBSZW5kZXJlciBwcm9jZXNzLCB0aGUgYG5vZGVJbnRlZ3JhdGlvbmAgbmVlZHMgdG8gYmUgZW5hYmxlZCBpbiB0aGUgTWFpbiBwcm9jZXNzLlxuICAgICAgICAvLyBTZWUgXHVEODNEXHVEQzQ5IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi12aXRlL3ZpdGUtcGx1Z2luLWVsZWN0cm9uLXJlbmRlcmVyXG4gICAgICAgIHJlbmRlcmVyOiB7fSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgc2VydmVyOiBwcm9jZXNzLmVudi5WU0NPREVfREVCVUcgJiYgKCgpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGtnLmRlYnVnLmVudi5WSVRFX0RFVl9TRVJWRVJfVVJMKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaG9zdDogdXJsLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiArdXJsLnBvcnQsXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBjbGVhclNjcmVlbjogZmFsc2UsXG4gIH1cbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJlbGVjdHJvbi12aXRlLXJlYWN0XCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QtZWxlY3Ryb24vbWFpbi9pbmRleC5qc1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiRWxlY3Ryb24gVml0ZSBSZWFjdCBib2lsZXJwbGF0ZS5cIixcbiAgXCJhdXRob3JcIjogXCJcdTgzNDlcdTk3OEJcdTZDQTFcdTUzRjcgPDMwODQ4NzczMEBxcS5jb20+XCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJkZWJ1Z1wiOiB7XG4gICAgXCJlbnZcIjoge1xuICAgICAgXCJWSVRFX0RFVl9TRVJWRVJfVVJMXCI6IFwiaHR0cDovLzEyNy4wLjAuMTo3Nzc3L1wiXG4gICAgfVxuICB9LFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGQgJiYgZWxlY3Ryb24tYnVpbGRlclwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwicHJldGVzdFwiOiBcInZpdGUgYnVpbGQgLS1tb2RlPXRlc3RcIixcbiAgICBcInRlc3RcIjogXCJ2aXRlc3QgcnVuXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZWxlY3Ryb24tdXBkYXRlclwiOiBcIl42LjMuOVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBwbGF5d3JpZ2h0L3Rlc3RcIjogXCJeMS40OC4yXCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4xMlwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4zLjFcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMy4zXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMFwiLFxuICAgIFwiZWxlY3Ryb25cIjogXCJeMzMuMi4wXCIsXG4gICAgXCJlbGVjdHJvbi1idWlsZGVyXCI6IFwiXjI0LjEzLjNcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjQ5XCIsXG4gICAgXCJwb3N0Y3NzLWltcG9ydFwiOiBcIl4xNi4xLjBcIixcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjE1XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNC4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4xMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZWxlY3Ryb25cIjogXCJeMC4yOS4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlclwiOiBcIl4wLjE0LjZcIixcbiAgICBcInZpdGVzdFwiOiBcIl4yLjEuNVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVgsU0FBUyxjQUFjO0FBQzVZLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjOzs7QUNKckI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNS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
