import client from "./client";

import {
  saveToken,
  saveUser,
  clearStorage,
} from "../utils/storage";

export const login = async (
  email: string,
  password: string
) => {
  const response = await client.post(
    "/login",
    {
      email,
      password,
    }
  );

  await saveToken(response.data.token);
  await saveUser(response.data.user);

  return response.data;
};

export const logout = async () => {
  await client.post("/logout");

  await clearStorage();
};