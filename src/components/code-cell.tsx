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
      <div style={{ height: '100%', display:'flex', flexDirection:'row' }}>
        <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => {
              setInput(value);
            }}
          />
        <Preview code={code}/>
      </div>
      </Resizable>
  )
}

export default CodeCell