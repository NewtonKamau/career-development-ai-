import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: false,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const courseService = {
  getRecommendations: async () => {
    try {
      const response = await api.get('/courses/recommendations');
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to load course recommendations');
      }
      return response.data.courses;
    } catch (error) {
      console.error('Error fetching course recommendations:', error);
      throw new Error('Failed to load course recommendations');
    }
  },

  searchCourses: async (query: string) => {
    try {
      const response = await api.get(`/courses/search?query=${encodeURIComponent(query)}`);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to search courses');
      }
      return response.data.courses;
    } catch (error) {
      console.error('Error searching courses:', error);
      throw new Error('Failed to search courses');
    }
  },
};

export const interviewService = {
  getQuestions: async () => {
    try {
      const response = await api.get('/interviews/questions');
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to load interview questions');
      }
      return response.data.questions;
    } catch (error) {
      console.error('Error fetching interview questions:', error);
      throw new Error('Failed to load interview questions');
    }
  },

  getRecommended: async () => {
    try {
      const response = await api.get('/interviews/recommended');
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to load recommended questions');
      }
      return response.data.questions;
    } catch (error) {
      console.error('Error fetching recommended questions:', error);
      throw new Error('Failed to load recommended questions');
    }
  },
};

export default api;
