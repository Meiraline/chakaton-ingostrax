import { apiRequest } from "./client";

export async function createSession(data) {
  return apiRequest("/v1/session_game", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteSession(sessionGameID) {
  return apiRequest(`/v1/session_game/${sessionGameID}`, {
    method: "DELETE",
  });
}

export async function getBackground(difficultyLevel, sessionGameID) {
  return apiRequest(`/v1/background/${difficultyLevel}/${sessionGameID}`, {
    method: "GET",
  });
}

export async function getRound(sessionGameID) {
  return apiRequest(`/v1/round/${sessionGameID}`, {
    method: "GET",
  });
}

export async function submitRound(sessionGameID, solving) {
  return apiRequest(`/v1/round/${sessionGameID}?solving=${encodeURIComponent(solving)}`, {
    method: "POST",
  });
}