import client from "./client";

export const getProfile = async () => {
    const res = await client.get("/profile");
    return res.data;
};

export const updateProfile = async (data) => {
    const res = await client.put("/profile", data);
    return res.data;
};

export const changePassword = async (data) => {
    const res = await client.put("/change-password", data);
    return res.data;
};

export const logout = async () => {
    const res = await client.post("/logout");
    return res.data;
};