import axios from 'axios';

// Use Vite's environment variable syntax
const BASE_URL = import.meta.env.VITE_API_URL || 'https://onlinejudge.duckdns.org/';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => axiosInstance.post('/api/users/login', data),
  register: (data) => axiosInstance.post('/api/users/register', data),
  logout: () => axiosInstance.post('/api/users/logout'),
  getCurrentUser: () => axiosInstance.get('/api/users/me'),
};

// Event API
export const eventAPI = {
  getAllEvents: () => axiosInstance.get('/api/users/events'),
  getActiveEvents: () => axiosInstance.get('/api/users/events').then(response => ({
    events: response.data.events.filter(event => {
      const now = new Date();
      const startTime = new Date(event.start_time);
      const endTime = new Date(event.end_time);
      return now >= startTime && now <= endTime;
    })
  })),
};

// Team API
export const teamAPI = {
  registerTeam: (data) => axiosInstance.post('/api/teams/register', data),
  getTeamInfo: () => axiosInstance.get('/api/teams/info'),
};

// Problem API
export const problemAPI = {
  getAllProblems: () => axiosInstance.get('/api/problems'),
  getProblem: (id) => axiosInstance.get(`/api/problems/${id}`),
  getProblemStats: (id) => axiosInstance.get(`/api/problems/stats/${id}`),
  getTestCases: (id) => axiosInstance.get(`/api/problems/testcases/${id}`),
  submitSolution: (id, data) => axiosInstance.post(`/api/problems/${id}/submit`, data),
};

// Submission API
export const submissionAPI = {
  getSubmissions: (problemId) => axiosInstance.get(`/api/submissions?problem_id=${problemId}`),
  getSubmission: (id) => axiosInstance.get(`/api/submissions/${id}`),
};

// Leaderboard API
export const leaderboardAPI = {
  getLeaderboard: (eventId) => axiosInstance.get(`/api/leaderboard?event_id=${eventId}`),
};

export default axiosInstance; 