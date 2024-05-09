import './code-editor.css';
import './syntax.css';
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import prettier from "prettier";
import parser from 'prettier/parser-babel'
import { useRef } from "react";
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const editorDidMount: EditorDidMount = (
    getValue: () => string,
    monacoEditor
  ) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      // 하이라이터 패키지를 사용하면 여기 패키지에 window 내 monaco 프로퍼티를 할당시켜놓음
      window.monaco,
      codeShift,
      monacoEditor
    )

    // JSX 하이라이터(Highlighter 클래스)의 메서드
    // 에디터 내용이 변경될때마다 호출되는 콜백 함수
    highlighter.highLightOnDidChangeModelContent(() =>{}, ()=>{}, undefined, ()=>{});
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current?.getModel()?.getValue();

    if (!unformatted) return;
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    }).replace(/\n$/,'');

    editorRef.current?.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
        
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={editorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height={"500px"}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      
    </div>
  );
};

export default CodeEditor;
