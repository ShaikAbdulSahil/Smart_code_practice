
import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Editor } from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);
  const [theme, setTheme] = useState<"vs-light" | "vs-dark">("vs-light");
  
  // Detect and update theme when system preference changes
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "vs-dark" : "vs-light");
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDarkMode = document.documentElement.classList.contains("dark");
          setTheme(isDarkMode ? "vs-dark" : "vs-light");
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={language}
        value={value}
        theme={theme}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          fixedOverflowWidgets: true,
        }}
      />
    </div>
  );
}
