import axios from 'axios';

// Use Vite's environment variable syntax
const BASE_URL = import.meta.env.VITE_API_URL || 'https://onlinejudge.duckdns.org';

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
  getAllEvents: async () => {
    try {
      const url = `${BASE_URL}/api/users/events`;
      console.log('Fetching events from:', url);
      const response = await axiosInstance.get('/api/users/events');
      console.log('Events API response:', response);
      return response.data;
    } catch (error) {
      console.error('Events API error:', error);
      throw error;
    }
  },
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
  registerTeam: (data) => axiosInstance.post('/api/users/registerTeam', data),
  
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
  getLeaderboard: async (eventId, isJunior) => {
    try {
      const url = `${BASE_URL}/api/leaderboard?event_id=${eventId}&is_junior=${isJunior}`;
      console.log('Fetching leaderboard from:', url);
      const response = await axiosInstance.get(`/api/leaderboard?event_id=${eventId}&is_junior=${isJunior}`);
      console.log('Raw leaderboard response:', response);
      return response;
    } catch (error) {
      console.error('Leaderboard API error:', error);
      throw error;
    }
  },
};

// Result API
export const resultAPI = {
  getResult: () => axiosInstance.get('/result'),
};

export default axiosInstance; 