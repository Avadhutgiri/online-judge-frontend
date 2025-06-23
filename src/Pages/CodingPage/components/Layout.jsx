import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import ProblemDetails from "./ProblemDetails";
import TestInputOutput from "./TestInputOutput";
import CodeExecutionPanel from "./CodeExecutionPanel";
import SubmissionModal from "./SubmissionModal";
import SimpleResizableSplitPane from "./SimpleResizableSplitPane";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../lib/defineTheme";
import useCodingLogic from "../hooks/useCodingLogic";

const Layout = () => {
  // Use the custom hook for all coding logic
  const {
    // State
    problem,
    loading,
    error,
    code,
    customInput,
    testInput,
    outputDetails,
    testOutput,
    processing,
    testProcessing,
    submitting,
    submissionResult,
    testCaseResults,
    animationComplete,
    testCaseCount,
    language,
    activeTab,
    submissionHistory,
    selectedSubmission,

    // Setters
    setCode,
    setCustomInput,
    setTestInput,
    setLanguage,
    setActiveTab,
    setSelectedSubmission,

    // Functions
    handleRunUserCode,
    handleSubmitCode,
    handleSystemRun,
    getTestCaseStatusInfo,
    formatOutputForDisplay,
    decodeBase64,
  } = useCodingLogic();

  // Theme state
  const [theme, setTheme] = useState({ value: "cobalt", label: "Cobalt" });

  // Load default theme
  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  // Language & theme changes
  const onSelectChange = (selectedLang) => {
    setLanguage(selectedLang);
    setCode(""); // Reset code on language change
  };

  const handleThemeChange = (th) => {
    if (["light", "vs-dark"].includes(th.value)) {
      setTheme(th);
    } else {
      defineTheme(th.value).then(() => setTheme(th));
    }
  };

  // Loading states & error handling
  if (loading) {
    return <div className="text-white text-center">Loading problem...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }
  if (!problem) {
    return <div className="text-white text-center">Problem not found.</div>;
  }

  return (
    <>
      <div className="h-screen w-full font-serif">
        {/* Main Horizontal Split */}
        <SimpleResizableSplitPane
          direction="horizontal"
          defaultSizes={[50, 50]}
          minSize={300}
        >
          {/* Left Panel - Problem Details & Test Input/Output */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* Problem Details Component */}
            <div className="flex-1 overflow-hidden">
              <ProblemDetails
                problem={problem}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                submissionHistory={submissionHistory}
                setSelectedSubmission={setSelectedSubmission}
                decodeBase64={decodeBase64}
              />
            </div>

            {/* Test Input/Output Component */}
            <div className="flex-shrink-0">
              <TestInputOutput
                testInput={testInput}
                setTestInput={setTestInput}
                testOutput={testOutput}
                testProcessing={testProcessing}
                handleSystemRun={handleSystemRun}
              />
            </div>
          </div>

          {/* Right Panel - Code Editor & Console */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header with language and theme dropdowns */}
            <div className="flex justify-between mb-4 p-4 flex-shrink-0">
              <LanguagesDropdown
                onSelectChange={onSelectChange}
                language={language}
              />
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
            </div>

            {/* Code Editor */}
            <div className="flex-1 min-h-0 p-4 pt-0">
              <CodeEditorWindow
                code={code}
                onChange={(action, data) => action === "code" && setCode(data)}
                language={language?.value}
                theme={theme.value}
              />
            </div>

            {/* Code Execution Panel */}
            <div className="flex-shrink-0 p-4 pt-0">
              <CodeExecutionPanel
                submitting={submitting}
                submissionResult={submissionResult}
                processing={processing}
                outputDetails={outputDetails}
                customInput={customInput}
                setCustomInput={setCustomInput}
                formatOutputForDisplay={formatOutputForDisplay}
                testCaseResults={testCaseResults}
                animationComplete={animationComplete}
                testCaseCount={testCaseCount}
                getTestCaseStatusInfo={getTestCaseStatusInfo}
              />

              {/* Run & Submit Buttons */}
              <div className="flex gap-4 mt-4">
                {/* Run Code Button */}
                <button
                  className="flex-1 bg-[#86C232] hover:bg-[#61892F] text-white font-bold py-3 px-4 rounded"
                  onClick={handleRunUserCode}
                  disabled={!code || processing || submitting}
                >
                  {processing ? "Running..." : "Run Code"}
                </button>

                {/* Submit Solution Button */}
                <button
                  className="flex-1 bg-[#4B90FF] hover:bg-[#3575E0] text-white font-bold py-3 px-4 rounded"
                  onClick={handleSubmitCode}
                  disabled={!code || submitting || processing}
                >
                  {submitting ? "Submitting..." : "Submit Solution"}
                </button>
              </div>
            </div>
          </div>
        </SimpleResizableSplitPane>
      </div>

      {/* Submission Modal */}
      <SubmissionModal
        selectedSubmission={selectedSubmission}
        setSelectedSubmission={setSelectedSubmission}
        decodeBase64={decodeBase64}
      />

      {/* CSS for animations and responsive behavior */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #262626;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #86C232;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #61892F;
        }
        
        /* Resizer styles */
        .resizer {
          background: #86C232;
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        .resizer:hover {
          opacity: 1;
        }
        
        /* Resizer handle styles */
        .resizer-handle {
          background: #86C232;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        
        .resizer:hover .resizer-handle {
          background: #61892F;
          transform: scale(1.2);
        }
        
        /* Prevent text selection during resize */
        .resizing {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        /* Responsive text sizing */
        @media (max-width: 1024px) {
          .responsive-text {
            font-size: 0.875rem;
          }
        }
        
        @media (max-width: 768px) {
          .responsive-text {
            font-size: 0.75rem;
          }
        }
        
        /* Smooth transitions for all resizable elements */
        * {
          transition: none;
        }
        
        .resizable-panel {
          transition: none;
        }
      `}</style>
      
      <ToastContainer />
    </>
  );
};

export default Layout;
