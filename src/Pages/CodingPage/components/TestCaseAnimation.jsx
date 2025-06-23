import React from "react";

const TestCaseAnimation = ({
  submitting,
  testCaseResults,
  animationComplete,
  testCaseCount,
  getTestCaseStatusInfo,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-white font-semibold mb-2">Test Cases</h3>
      <div className="bg-[#1e1e1e] p-4 rounded">
        {submitting ? (
          <p className="text-yellow-400">Running test cases...</p>
        ) : testCaseResults.length > 0 ? (
          <div className="flex flex-wrap gap-2 lg:gap-3 items-center">
            {testCaseResults.map((testCase) => {
              const { icon, color } = getTestCaseStatusInfo(testCase.status);
              return (
                <div
                  key={testCase.id}
                  className={`flex items-center gap-1 lg:gap-2 p-2 bg-[#262626] rounded-md animate-fadeIn ${color} text-sm lg:text-base`}
                >
                  <span className="text-base lg:text-lg">{icon}</span>
                  <span>Test {testCase.id}</span>
                </div>
              );
            })}

            {/* Placeholder for test cases not yet shown */}
            {animationComplete === false &&
              Array(testCaseCount - testCaseResults.length)
                .fill()
                .map((_, idx) => (
                  <div
                    key={`pending-${idx}`}
                    className="flex items-center gap-1 lg:gap-2 p-2 bg-[#262626] rounded-md text-gray-400 text-sm lg:text-base"
                  >
                    <span className="text-base lg:text-lg">⏳</span>
                    <span>Waiting...</span>
                  </div>
                ))}
          </div>
        ) : animationComplete ? (
          <p className="text-gray-400">No test case details available.</p>
        ) : (
          <p className="text-yellow-400">Preparing test cases...</p>
        )}
      </div>
    </div>
  );
};

export default TestCaseAnimation; 