import client from "./client";
import { saveToken, saveUser, clearStorage } from "../utils/storage";

export const loginUser = async (email: string, password: string) => {
  const response = await client.post("/login", {
    email,
    password,
  });

  // IMPORTANT: single source of truth
  await saveToken(response.data.token);
  await saveUser(response.data.user);

  return response.data;
};

export const logoutUser = async () => {
  await client.post("/logout");
  await clearStorage();
};