import MoncaoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <MoncaoEditor
      theme="dark"
      language="javascript"
      height={"500px"}
      options={{
        wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;
