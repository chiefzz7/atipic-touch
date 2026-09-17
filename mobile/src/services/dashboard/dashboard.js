import { getToken } from "../auth/auth";

const API_URL = "https://atipic-touch-devlop.onrender.com";

/**
 * Lista o histórico alimentar de uma criança.
 *
 * Endpoint:GET /api/feeding-logs/crianca/{crianca_id}
 *
 * A API exige autenticação através do token salvo na sessão.
 */
export async function getFeedingLogs(criancaId) {
  if (!criancaId) {
    throw new Error("O ID da criança é obrigatório.");
  }

  const token = await getToken();

  if (!token) {
    throw new Error("Sessão não encontrada. Faça login novamente.");
  }

  const response = await fetch(
    `${API_URL}/api/feeding-logs/crianca/${criancaId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let errorMessage = "Erro ao buscar o histórico alimentar.";

    try {
      const errorData = await response.json();

      if (errorData?.detail) {
        errorMessage =
          typeof errorData.detail === "string"
            ? errorData.detail
            : "A API retornou um erro ao buscar o histórico alimentar.";
      }
    } catch {
      // Mantém a mensagem padrão caso a API não retorne JSON.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}