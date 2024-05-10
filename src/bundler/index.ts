import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

let service: esbuild.Service | null = null;

const bundle = async (rawCode: string) => {
    if(!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
          });
    }

      try {
        const result = await service.build({
          entryPoints: ["index.js"],
          bundle: true,
          write: false,
          plugins: [fetchPlugin(rawCode), unpkgPathPlugin()],
          define: {
            "process.env.NODE_ENV": '"production"',
            global: "window",
          },
        });
        return {
          code : result.outputFiles[0].text,
          err: ''
        }
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          return {
            code: "",
            err: err.message,
          };
        } else {
          throw err;
        }
      }
}

export default bundle