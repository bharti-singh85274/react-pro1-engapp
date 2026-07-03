import client from "./client";

export const getCourses = async () => {
  const response = await client.get("/courses");

  return response.data;
};

export const getCourseBySlug = async (slug: string) => {
  const response = await client.get(`/courses/${slug}`);

  return response.data;
};

export const searchCourses = async (keyword: string) => {
  const response = await client.get(`/search?keyword=${keyword}`);

  return response.data;
};

export const filterCourses = async (params: any) => {
  const response = await client.get("/courses", {
    params,
  });

  return response.data;
};