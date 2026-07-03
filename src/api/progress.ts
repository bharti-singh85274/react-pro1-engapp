import client from "./client";

export const completeLesson = async (
  lessonId: number
) => {
  const response = await client.post(
    "/lesson/complete",
    {
      lesson_id: lessonId,
    }
  );

  return response.data;
};

export const getProgress = async () => {
  const response = await client.get("/progress");

  return response.data;
};