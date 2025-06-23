import React from "react";
import { classnames } from "../utils/general";

const ProblemDetails = ({
  problem,
  activeTab,
  setActiveTab,
  submissionHistory,
  setSelectedSubmission,
  decodeBase64,
}) => {
  return (
    <div className="w-full h-full flex flex-col p-4">
      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-4 flex-shrink-0">
        <button
          onClick={() => setActiveTab("description")}
          className={classnames(
            "px-4 py-2 border border-[#86C232] rounded font-bold text-black bg-[#86C232] hover:bg-transparent hover:text-[#86C232]",
            activeTab === "description" ? "bg-[#86C232]" : ""
          )}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("samples")}
          className={classnames(
            "px-4 py-2 border border-[#86C232] rounded font-bold text-black bg-[#86C232] hover:bg-transparent hover:text-[#86C232]",
            activeTab === "samples" ? "bg-[#86C232]" : ""
          )}
        >
          Samples
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={classnames(
            "px-4 py-2 border border-[#86C232] rounded font-bold text-black bg-[#86C232] hover:bg-transparent hover:text-[#86C232]",
            activeTab === "submissions" ? "bg-[#86C232]" : ""
          )}
        >
          Submissions
        </button>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "description" && (
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-xl font-bold text-white">{problem.title}</h1>
            {/* Description */}
            <p className="text-white">{problem.description}</p>

            {/* Input Format */}
            <div>
              <h2 className="text-lg font-semibold text-white">Input Format</h2>
              <p className="bg-[#262626] p-4 rounded text-white">
                {problem.input_format}
              </p>
            </div>

            {/* Output Format */}
            <div>
              <h2 className="text-lg font-semibold text-white">Output Format</h2>
              <p className="bg-[#262626] p-4 rounded text-white">
                {problem.output_format}
              </p>
            </div>

            {/* Constraints */}
            <div>
              <h2 className="text-lg font-semibold text-white">Constraints</h2>
              <p className="bg-[#262626] p-4 rounded text-white">
                {problem.constraints}
              </p>
            </div>
          </div>
        )}

        {activeTab === "samples" && (
          <div className="bg-[#262626] p-4 rounded text-white">
            <h2 className="text-lg font-semibold text-white mb-2">Samples</h2>
            {problem.samples?.length > 0 ? (
              problem.samples.map((sample, index) => (
                <div
                  key={index}
                  className="bg-[#1e1e1e] p-4 rounded text-white mt-2"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <strong>Input:</strong>
                      <pre className="bg-black p-2 rounded overflow-x-auto">
                        {sample.input}
                      </pre>
                    </div>
                    <div className="flex-1">
                      <strong>Output:</strong>
                      <pre className="bg-black p-2 rounded overflow-x-auto">
                        {sample.output}
                      </pre>
                    </div>
                  </div>
                  {sample.explanation && (
                    <p className="text-gray-300 mt-1">{sample.explanation}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white">No samples available.</p>
            )}
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="bg-[#262626] p-4 rounded text-white">
            <h2 className="text-lg font-semibold text-white mb-2">Submissions</h2>
            {submissionHistory.length > 0 ? (
              submissionHistory.map((submission, index) => (
                <div
                  key={index}
                  className="bg-[#1e1e1e] p-4 rounded text-white mt-2 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <span className="text-sm text-gray-400">
                      Language: {submission.language}
                    </span>
                    <span className="text-sm text-gray-400">
                      Status: {submission.result}
                    </span>
                    <span className="text-sm text-gray-400">
                      Time:{" "}
                      {new Date(submission.submitted_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No submissions available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails; 