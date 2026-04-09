import { apiRequest } from "./client";

export async function registerUser(data) {
  return apiRequest("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data) {
  return apiRequest("/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: data.username,
      password: data.password,
    }).toString(),
  });
}

export async function refreshToken() {
  return apiRequest("/v1/auth/refresh", {
    method: "GET",
  });
}

export async function getCurrentUser() {
  return apiRequest("/v1/user/me", {
    method: "GET",
  });
}