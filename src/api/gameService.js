import apiClient from './apiClient';

const STORAGE_KEY = 'savedGameSessions';

const createSession = async (fullName) => {
  return apiClient.post('/v1/session_game', { fullName });
};

const deleteSession = async (sessionGameID) => {
  return apiClient.delete(`/v1/session_game/${sessionGameID}`);
};

const getSessions = async () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveSessions = (sessions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // ignore write errors
  }
};

const getBackground = async (difficultyLevel, sessionGameID) => {
  return apiClient.get(`/v1/background/${difficultyLevel}/${sessionGameID}`);
};

const getRound = async (sessionGameID) => {
  return apiClient.get(`/v1/round/${sessionGameID}`);
};

const submitRound = async (sessionGameID, solving) => {
  return apiClient.post(`/v1/round/${sessionGameID}`, { solving });
};

export default {
  createSession,
  deleteSession,
  getSessions,
  getBackground,
  getRound,
  submitRound,
};
