import client from "./client";
import { clearStorage } from "../utils/storage";

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

    try {

        await client.post("/logout");

    } catch(error:any) {

        console.log(
            "Logout API failed:",
            error.response?.data
        );

    } finally {

        // Always remove token locally
        await clearStorage();

    }

};