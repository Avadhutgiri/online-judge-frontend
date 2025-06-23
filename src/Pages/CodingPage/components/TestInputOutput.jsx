import React from "react";

const TestInputOutput = ({
  testInput,
  setTestInput,
  testOutput,
  testProcessing,
  handleSystemRun,
}) => {
  return (
    <div className="bg-[#262626] p-4 rounded">
      <div className="text-white text-lg mb-2 text-center">
        Test Your Solution
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Input Field */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-2">Input</h3>
          <textarea
            className="w-full h-20 lg:h-24 bg-[#1e1e1e] text-white p-2 rounded resize-none"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter your test input here..."
            disabled={testProcessing}
          ></textarea>
        </div>

        {/* Output Display */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-2">Expected Output</h3>
          <div className="w-full h-20 lg:h-24 bg-[#1e1e1e] text-white p-2 rounded overflow-auto">
            {testProcessing ? (
              <p className="text-yellow-400">Processing system test...</p>
            ) : testOutput ? (
              <pre className="text-sm">
                {testOutput.expected_output || "No expected output available."}
              </pre>
            ) : (
              <p className="text-gray-400">
                Expected output will appear here...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Run System Test Button */}
      <div className="mt-4">
        <button
          className="btn-primary bg-[#86C232] hover:bg-[#61892F] text-white font-bold py-2 rounded w-full"
          onClick={handleSystemRun}
          disabled={testProcessing}
        >
          {testProcessing ? "Processing..." : "Run System Test"}
        </button>
      </div>
    </div>
  );
};

export default TestInputOutput; 