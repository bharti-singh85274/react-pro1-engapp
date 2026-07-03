import client from "./client";

/**
 * Get lessons of a course
 */
export const getLessons = async (slug: string) => {
  const response = await client.get(`/courses/${slug}/lessons`);

  return response.data;
};

/**
 * Get single lesson
 */
export const getLessonById = async (lessonId: number) => {
  const response = await client.get(`/lessons/${lessonId}`);

  return response.data;
};

/**
 * Continue learning API
 */
export const continueLearning = async () => {
  const response = await client.get("/continue-learning");

  return response.data;
};