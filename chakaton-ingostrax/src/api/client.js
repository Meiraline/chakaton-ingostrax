const API_BASE_URL = "http://109.174.15.54:22241/api";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("authToken");

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    ...options,
    headers,
  };

  const url = `${API_BASE_URL}${endpoint}`;

  console.log("=== API REQUEST ===");
  console.log("URL:", url);
  console.log("CONFIG:", config);

  const response = await fetch(url, config);

  const rawText = await response.text();

  console.log("=== API RESPONSE ===");
  console.log("STATUS:", response.status);
  console.log("RAW:", rawText);

  let data = null;

  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    data = rawText;
  }

  if (!response.ok) {
    let errorMessage = "Ошибка API";

    if (response.status === 409) {
      errorMessage = "Пользователь с таким именем уже существует";
    } else if (typeof data === "string" && data.trim()) {
      errorMessage = data;
    } else if (data?.detail) {
      errorMessage =
        typeof data.detail === "string"
          ? data.detail
          : JSON.stringify(data.detail);
    } else if (data?.message) {
      errorMessage = data.message;
    }

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
    }

    throw new Error(errorMessage);
  }

  return data;
}