import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    try {
      const res = await ref.current.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [fetchPlugin(input), unpkgPathPlugin()],
        define: {
          "process.env.NODE_ENV": '"production"',
          global: "window",
        },
      });
      console.log(res);
      // setCode(res.outputFiles[0].text);
      iframe.current.contentWindow.postMessage(res.outputFiles[0].text, "*");
    } catch (error) {
      console.log(error);
    }
  };

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message',(event)=>{
          try {
            eval(event.data);
          } catch(err) {
            console.log(err);
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color : red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        },false)
      </script>
    </body>
  </html>
  
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {code && <pre>{code}</pre>}
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
