import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import CodeEditor from "./components/code-editor";
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from "./components/preview";

const App = () => {
  const ref = useRef<any>();
  
  const [input, setInput] = useState("");
  const [code, setCode] = useState("")
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
      
      setCode(res.outputFiles[0].text);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => {
          setInput(value);
        }}
      />
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code}/>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
