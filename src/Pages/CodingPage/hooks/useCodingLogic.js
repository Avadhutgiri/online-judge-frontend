import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { submitAPI, submissionAPI, problemAPI, pollingAPI } from "../../../utils/api";
import { toast } from "react-toastify";
import { languageOptions } from "../constants/languageOptions";

const BASE_URL = 'https://onlinejudge.duckdns.org';
// const BASE_URL = 'https://toylike-nicolette-unsensualistic.ngrok-free.dev';
const useCodingLogic = () => {
  const { id } = useParams();
  const socketRef = useRef(null);
  const submissionInProgressRef = useRef(false);

  // API & Problem state
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Code editing & submission states
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [testInput, setTestInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [testOutput, setTestOutput] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [testProcessing, setTestProcessing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Test case animation states
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [testCaseCount, setTestCaseCount] = useState(5);

  // Editor theme & language states
  const [language, setLanguage] = useState(languageOptions[0]);

  // Console visibility & tab states
  const [activeTab, setActiveTab] = useState("description");

  // Submission history state
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Encode code & input to base64
  const encodeBase64 = (text) => btoa(unescape(encodeURIComponent(text)));

  // Decode base64 encoded text
  const decodeBase64 = (text) => decodeURIComponent(escape(atob(text)));

  // Fetch the problem details
  useEffect(() => {
    problemAPI.getProblem(id)
      .then((response) => {
        setProblem(response.data);
        if (response.data.test_case_count) {
          setTestCaseCount(response.data.test_case_count);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching problem");
        setProblem(null);
        setLoading(false);
      });
  }, [id]);

  // Fetch submission history when the submissions tab is active
  useEffect(() => {
    if (activeTab === "submissions") {
      fetchSubmissionHistory();
    }
  }, [activeTab]);

  // Socket connection setup
  useEffect(() => {
    socketRef.current = io(BASE_URL, {
      path: "/socket.io",
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("🔥 Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.warn("💔 Socket disconnected");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("🚨 Socket.IO connection error:", err.message);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Fetch submission history
  const fetchSubmissionHistory = async () => {
    try {
      const response = await submissionAPI.getSubmissionHistory(id);
      setSubmissionHistory(response.data);
    } catch (error) {
      toast.error("Error fetching submission history!");
    }
  };

  const handleRunUserCode = async () => {
    setProcessing(true);
    setSubmissionResult(null);
    setTestCaseResults([]);
    setAnimationComplete(false);

    const formData = {
      problem_id: id,
      code: encodeBase64(code),
      customTestcase: customInput ? customInput : null,
      language: language.value,
    };

    try {
      const response = await submitAPI.runCode(formData);
      const submissionId = response.data.submission_id;
      socketRef.current.emit("subscribe", submissionId);
      toast.success("Code execution started...");
      
      socketRef.current.once("result", (data) => {
        if (data.submission_id === submissionId) {
          setOutputDetails({
            user_output: data.user_output || "",
            expected_output: data.expected_output || "",
            message: data.message || "",
            status: data.status || "",
            isSubmission: false,
          });
          setProcessing(false);
          toast.success("Code execution completed!");
        }
      });

      // Add timeout fallback
      setTimeout(() => {
        if (processing) {
          pollForResult(
            response.data.submission_id,
            setOutputDetails,
            setProcessing,
            "Code Execution Completed!",
            false
          );
        }
      }, 30000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error running code!");
      setProcessing(false);
    }
  };

  const handleSubmitCode = async () => {
    setSubmitting(true);
    submissionInProgressRef.current = true;
    setOutputDetails(null);
    setTestCaseResults([]);
    setAnimationComplete(false);

    const submissionData = {
      problem_id: id,
      code: encodeBase64(code),
      language: language.value,
    };

    try {
      const response = await submitAPI.submit(submissionData);
      const submissionId = response.data.submission_id;
      socketRef.current.emit("subscribe", submissionId);
      toast.success("Solution submitted successfully!");

      socketRef.current.on("result", (data) => {
        if (data.submission_id === submissionId && data.type === "submit") {
          const result = {
            status: data.status || "",
            message: data.message || "",
            failed_test_case: data.failed_test_case || null,
            isSubmission: true,
          };
          setSubmissionResult(result);

          if (data.status === "Accepted") {
            animateTestCaseResults(Array(testCaseCount).fill("Accepted"));
          } else if (data.failed_test_case) {
            const failedIndex = parseInt(data.failed_test_case.match(/\d+/)?.[0], 10);
            const simulatedResults = Array.from(
              { length: testCaseCount },
              (_, idx) =>
                idx + 1 < failedIndex
                  ? "Accepted"
                  : idx + 1 === failedIndex
                  ? "Wrong Answer"
                  : null
            );
            animateTestCaseResults(simulatedResults);
          } else {
            setAnimationComplete(true);
          }
          setSubmitting(false);
          submissionInProgressRef.current = false;
          toast.success("Submission completed!");
        }
      });

      // Add timeout fallback
      setTimeout(() => {
        if (submissionInProgressRef.current) {
          pollForResult(
            response.data.submission_id,
            setSubmissionResult,
            setSubmitting,
            "Submission Completed!",
            true
          );
        }
      }, 10000);
    } catch (error) {
      toast.error("Error submitting solution!");
      setSubmitting(false);
      submissionInProgressRef.current = false;
    }
  };

  const handleSystemRun = async () => {
    setTestProcessing(true);
    setTestCaseResults([]);
    setAnimationComplete(false);
    setSubmissionResult(null);

    const formData = {
      problem_id: id,
      customTestcase: testInput ? testInput : null,
    };

    try {
      const response = await submitAPI.runSystem(formData);
      const submissionId = response.data.submission_id;

      socketRef.current.emit("subscribe", submissionId);
      toast.success("System test execution started...");
      
      socketRef.current.once("result", (data) => {
        if (data.submission_id === submissionId && data.type === "system") {
          setTestOutput({
            expected_output: data.expected_output || "",
            message: data.message || "",
            status: data.status || "",
            isSubmission: false,
          });
          setTestProcessing(false);
          toast.success("System test completed!");
        }
      });

      // Add timeout fallback
      setTimeout(() => {
        if (testProcessing) {
          pollForResult(
            response.data.submission_id,
            setTestOutput,
            setTestProcessing,
            "System Test Completed!",
            false
          );
        }
      }, 30000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error running system test!");
      setTestProcessing(false);
    }
  };

  const pollForResult = async (
    submission_id,
    setOutput,
    setProcessingState,
    successMessage,
    isSubmission,
    attempts = 5
  ) => {
    try {
      let response = await pollingAPI.getResult(submission_id);

      if (response.data.status === "Pending") {
        setTimeout(
          () =>
            pollForResult(
              submission_id,
              setOutput,
              setProcessingState,
              successMessage,
              isSubmission,
              attempts - 1
            ),
          2000
        );
      } else {
        if (isSubmission) {
          const result = {
            status: response.data.status || "",
            message: response.data.message || "",
            failed_test_case: response.data.failed_test_case || null,
            isSubmission: true,
          };

          setOutput(result);

          if (
            response.data.test_case_results &&
            Array.isArray(response.data.test_case_results)
          ) {
            animateTestCaseResults(response.data.test_case_results);
          } else if (response.data.status === "Accepted") {
            animateTestCaseResults(Array(testCaseCount).fill("Accepted"));
          } else if (
            response.data.failed_test_case !== null &&
            response.data.failed_test_case !== undefined
          ) {
            const failedIndex = parseInt(
              response.data.failed_test_case.match(/\d+/)?.[0],
              10
            );

            const simulatedResults = Array.from(
              { length: testCaseCount },
              (_, idx) =>
                idx + 1 < failedIndex
                  ? "Accepted"
                  : idx + 1 === failedIndex
                  ? "Wrong Answer"
                  : null
            );

            animateTestCaseResults(simulatedResults);
          } else {
            setAnimationComplete(true);
          }
        } else {
          setOutput({
            user_output: response.data.user_output || "",
            expected_output: response.data.expected_output || "",
            message: response.data.message || "",
            status: response.data.status || "",
            isSubmission: false,
          });
        }

        setProcessingState(false);
        toast.success(successMessage);
      }
    } catch (err) {
      if (err.response?.status === 404 && attempts > 0) {
        setTimeout(
          () =>
            pollForResult(
              submission_id,
              setOutput,
              setProcessingState,
              successMessage,
              isSubmission,
              attempts - 1
            ),
          2000
        );
      } else {
        toast.error("Error fetching result!");
        setProcessingState(false);
        setAnimationComplete(true);
      }
    }
  };

  // Function to animate test case results
  const animateTestCaseResults = (results) => {
    setTestCaseResults([]);
    setAnimationComplete(false);

    if (!results || results.length === 0) {
      setAnimationComplete(true);
      return;
    }

    const animateTestCase = (index = 0) => {
      if (index >= results.length) {
        setAnimationComplete(true);
        return;
      }

      setTestCaseResults((prev) => [
        ...prev,
        {
          id: index + 1,
          status: results[index] || "Pending",
        },
      ]);

      setTimeout(() => animateTestCase(index + 1), 800);
    };

    animateTestCase();
  };

  // Get test case status icon and color
  const getTestCaseStatusInfo = (status) => {
    if (!status) return { icon: "⬜", color: "text-gray-400" };

    switch (status) {
      case "Accepted":
        return { icon: "✅", color: "text-green-500" };
      case "Wrong Answer":
        return { icon: "❌", color: "text-red-500" };
      case "Time Limit Exceeded":
        return { icon: "⏱️", color: "text-yellow-500" };
      case "Runtime Error":
        return { icon: "💥", color: "text-orange-500" };
      case "Compilation Error":
        return { icon: "🔧", color: "text-purple-500" };
      case "Memory Limit Exceeded":
        return { icon: "📈", color: "text-blue-500" };
      default:
        return { icon: "⬜", color: "text-gray-400" };
    }
  };

  // Format output for display
  const formatOutputForDisplay = (details) => {
    if (!details) return "Output will appear here...";

    if (details.isSubmission) {
      let output = [];

      if (details.status) {
        output.push(`Status: ${details.status}`);
      }

      if (details.message) {
        output.push(`Message: ${details.message}`);
      }

      if (details.failed_test_case) {
        output.push(`Failed Test Case: ${details.failed_test_case}`);
      }

      return output.join("\n");
    }

    return details.user_output || "No output generated.";
  };

  return {
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
    fetchSubmissionHistory,
    getTestCaseStatusInfo,
    formatOutputForDisplay,
    encodeBase64,
    decodeBase64,
  };
};

export default useCodingLogic; 
