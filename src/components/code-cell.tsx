import React, { useState } from 'react'
import CodeEditor from './code-editor';
import bundle from '../bundler';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    
    if(!output) return;
    setCode(output);
  };
  return (
    <Resizable direction='vertical'>
      <div>
        <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => {
              setInput(value);
            }}
          />
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <Preview code={code}/>
      </div>
      </Resizable>
  )
}

export default CodeCell