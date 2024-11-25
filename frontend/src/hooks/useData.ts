import useSWR from 'swr';
import { courseService, interviewService } from '../services/api';

export function useCourseRecommendations() {
  const { data, error, mutate } = useSWR(
    'course-recommendations',
    courseService.getRecommendations
  );

  return {
    courses: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useInterviewQuestions() {
  const { data, error, mutate } = useSWR(
    'interview-questions',
    interviewService.getQuestions
  );

  return {
    questions: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useRecommendedQuestions() {
  const { data, error, mutate } = useSWR(
    'recommended-questions',
    interviewService.getRecommended
  );

  return {
    questions: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
