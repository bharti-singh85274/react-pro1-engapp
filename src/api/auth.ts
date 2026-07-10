import client from "./client";
import { saveToken, saveUser, clearStorage } from "../utils/storage";

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await client.post("/login", {
    email,
    password,
  });

  await saveToken(response.data.token);
  await saveUser(response.data.user);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

export const forgotPassword = async (email: string) => {
  const response = await client.post("/forgot-password", {
    email,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyOtp = async (
  email: string,
  otp: string
) => {

  const response = await client.post(
    "/verify-otp",
    {
      email,
      otp,
    }
  );

  return response.data;

};

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

export const resetPassword = async (
  email: string,
  otp: string,
  password: string,
  passwordConfirmation: string
) => {

  const response = await client.post(
    "/reset-password",
    {
      email,
      otp,
      password,
      password_confirmation: passwordConfirmation,
    }
  );

  console.log("RESET RESPONSE STATUS:", response.status);
console.log("RESET RESPONSE DATA:", response.data);

  return response.data;

};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/




export const logoutUser = async () => {

  try {

    await client.post("/logout");

  } catch(error:any){

    console.log(
      "Logout API error",
      error.response?.data
    );

  } finally {

    await clearStorage();

  }

};





export const registerUser = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  const response = await client.post("/register", {
    name,
    email,
    password,
    password_confirmation,
  });

  await saveToken(response.data.token);
  await saveUser(response.data.user);

  return response.data;
};

//   name: string,
//   email: string,
//   password: string,
//   password_confirmation: string
// ) => {

//   const response = await client.post("/register", {

//     name,

//     email,

//     password,

//     password_confirmation,

//   });

//   await saveToken(response.data.token);

//   await saveUser(response.data.user);

//   return response.data;
// };