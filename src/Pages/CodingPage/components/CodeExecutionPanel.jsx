import React from "react";
import TestCaseAnimation from "./TestCaseAnimation";
import SimpleResizableSplitPane from "./SimpleResizableSplitPane";

const CodeExecutionPanel = ({
  submitting,
  submissionResult,
  processing,
  outputDetails,
  customInput,
  setCustomInput,
  formatOutputForDisplay,
  testCaseResults,
  animationComplete,
  testCaseCount,
  getTestCaseStatusInfo,
}) => {
  return (
    <div className="bg-[#262626] p-4 rounded">
      <div className="text-white text-lg mb-2 text-center">
        {submitting || submissionResult ? "Submission Result" : "Code Output"}
      </div>

      {submitting || submissionResult ? (
        // For submissions, show full-width output box with test case animation
        <div className="w-full">
          {/* Test Case Animation Area */}
          <div className="mb-4">
            <TestCaseAnimation
              submitting={submitting}
              testCaseResults={testCaseResults}
              animationComplete={animationComplete}
              testCaseCount={testCaseCount}
              getTestCaseStatusInfo={getTestCaseStatusInfo}
            />
          </div>

          {/* Submission Result Details */}
          <div className="bg-[#1e1e1e] text-white p-2 rounded min-h-[80px]">
            {submitting ? (
              <p className="text-yellow-400">
                Submitting and testing your solution...
              </p>
            ) : submissionResult ? (
              <pre className="text-sm whitespace-pre-wrap break-words">
                {formatOutputForDisplay(submissionResult)}
              </pre>
            ) : (
              <p className="text-gray-400">
                Submission results will appear here...
              </p>
            )}
          </div>
        </div>
      ) : (
        // For normal runs, show input & output side by side with horizontal resizing
        <div>
          <SimpleResizableSplitPane
            direction="horizontal"
            defaultSizes={[50, 50]}
            minSize={150}
          >
            {/* Input Box */}
            <div className="flex flex-col">
              <h3 className="text-white font-semibold mb-2">Input</h3>
              <textarea
                className="bg-[#1e1e1e] text-white p-2 rounded resize-none h-24"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter your input here..."
                disabled={processing}
              ></textarea>
            </div>

            {/* Output Box */}
            <div className="flex flex-col">
              <h3 className="text-white font-semibold mb-2">Output</h3>
              <div
                className="bg-[#1e1e1e] text-white p-2 rounded h-24 overflow-auto"
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  lineHeight: "1.2",
                }}
              >
                {processing ? (
                  <p className="text-yellow-400">Running code...</p>
                ) : outputDetails && !outputDetails.isSubmission ? (
                  <pre className="w-full whitespace-pre-wrap break-words text-sm">
                    {formatOutputForDisplay(outputDetails)}
                  </pre>
                ) : (
                  <p className="text-gray-400">Output will appear here...</p>
                )}
              </div>
            </div>
          </SimpleResizableSplitPane>
        </div>
      )}
    </div>
  );
};

export default CodeExecutionPanel; 