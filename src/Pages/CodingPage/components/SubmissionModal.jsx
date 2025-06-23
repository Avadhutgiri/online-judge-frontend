import React from "react";

const SubmissionModal = ({ selectedSubmission, setSelectedSubmission, decodeBase64 }) => {
  if (!selectedSubmission) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#262626] p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Submission Code
        </h2>
        <pre className="bg-[#1e1e1e] p-4 rounded text-white overflow-x-auto">
          {decodeBase64(selectedSubmission.code)}
        </pre>
        <button
          className="mt-4 bg-[#86C232] hover:bg-[#61892F] text-white font-bold py-2 px-4 rounded"
          onClick={() => setSelectedSubmission(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmissionModal; 