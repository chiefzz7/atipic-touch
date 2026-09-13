import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://atipic-touch-devlop.onrender.com";
const TOKEN_KEY = "@atipictouch:token";
let listeners = [];

export function subscribeAuth(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function notifyAuth(value) {
  listeners.forEach((l) => l(value));
}
export async function saveSession(accessToken) {
  await AsyncStorage.setItem(TOKEN_KEY, accessToken);
  notifyAuth(true);
}

export async function getToken() {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return token;
}

export async function validateSession() {
  const token = await getToken();

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      await clearSession();
      return false;
    }

    return response.ok;
  } catch (error) {
    return false;
  }
}
export async function clearSession() {
  await AsyncStorage.removeItem(TOKEN_KEY);
  notifyAuth(false);
}