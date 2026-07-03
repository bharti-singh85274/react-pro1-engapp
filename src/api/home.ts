import client from "./client";

export const getHome = async () => {
    const response = await client.get("/home");
    return response.data;
};