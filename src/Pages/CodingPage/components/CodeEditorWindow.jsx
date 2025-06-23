import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
    const [value, setValue] = useState(code || "");

    useEffect(() => {
        setValue(code || "");
    }, [code]);

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <div className="font-mono rounded-md overflow-hidden shadow-lg h-full w-full">
            <Editor
                height="100%"
                width="100%"
                language={language || "javascript"}
                value={value}
                theme={theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollbar: {
                        vertical: "visible",
                        horizontal: "visible",
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                    },
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: "all",
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    cursorStyle: "line",
                    automaticLayout: true,
                    theme: theme,
                }}
            />
        </div>
    );
};

export default CodeEditorWindow;
