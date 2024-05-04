import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

(async () => {
  await fileCache.setItem("color", "red");

  const color = await fileCache.getItem("color");
  console.log(color);
})();

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // index.js의 진입 파일 처리
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: "index.js",
          namespace: "a",
        };
      });

      // 모듈 내 상대 경로로 되어있는 패키지들 처리
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      // 모듈의 메인 파일 처리
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/, namespace: "a" }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        const { data, request } = await axios.get(args.path);

        const cachedResult = await localForage.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await localForage.setItem(args.path, result);
        return result;
      });
    },
  };
};
