const API_BASE_URL = "http://109.174.15.54:22241/api";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("authToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: "Ошибка запроса" };
    }

    let errorMessage = "Ошибка API";
    if (response.status === 409) {
      errorMessage = "Пользователь с таким именем уже существует";
    } else if (errorData.detail) {
      if (typeof errorData.detail === 'string') {
        errorMessage = errorData.detail;
      } else if (errorData.detail.message) {
        errorMessage = errorData.detail.message;
      } else {
        errorMessage = JSON.stringify(errorData.detail);
      }
    } else if (errorData.message) {
      errorMessage = errorData.message;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}