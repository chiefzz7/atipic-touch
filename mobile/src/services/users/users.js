import {
  getToken,
} from "../auth/auth";

const API_URL =
  "https://atipic-touch-devlop.onrender.com";

export async function getCurrentUser() {
  const token =
    await getToken();

  if (!token) {
    throw new Error(
      "Sessão não encontrada. Faça login novamente."
    );
  }

  const response =
    await fetch(
      `${API_URL}/api/users/me`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  const data =
    await response
      .json()
      .catch(
        () => null
      );

  if (!response.ok) {
    throw new Error(
      typeof data?.detail ===
        "string"
        ? data.detail
        : "Não foi possível carregar os dados do responsável."
    );
  }

  return data;
}
