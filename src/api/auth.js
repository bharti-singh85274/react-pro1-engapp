const BASE_URL = "http://127.0.0.1:8000/api"; 
// example: http://192.168.1.5:8000/api

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Network error" },
    };
  }
};