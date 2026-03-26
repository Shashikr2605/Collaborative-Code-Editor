import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [code, setCode] = useState("// Start coding...");

  useEffect(() => {
    socket.on("receive_code", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("receive_code");
    };
  }, []);

  const handleChange = (value) => {
    setCode(value);
    socket.emit("send_code", value);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        🚀 Collaborative Code Editor
      </h2>

      <Editor
        height="90vh"
        defaultLanguage="javascript"
        value={code}
        onChange={handleChange}
        theme="vs-dark"
      />
    </div>
  );
}

export default App;