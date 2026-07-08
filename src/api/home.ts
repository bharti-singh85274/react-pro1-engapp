import client from "./client";

export const getHome = async () => {
    const response = await client.get("/home");
    return response.data;
};

export const getContinueLearning = async () => {
    const response = await client.get("/continue-learning");
    return response.data;
};