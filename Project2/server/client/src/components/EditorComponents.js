import React from "react";
import Editor from "@monaco-editor/react";

function EditorComponent({ code, onChange }) {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      value={code}
      onChange={onChange}
      theme="vs-dark"
    />
  );
}

export default EditorComponent;