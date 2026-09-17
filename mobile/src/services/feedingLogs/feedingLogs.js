import { getToken } from "../auth/auth";

const API_URL = "https://atipic-touch-devlop.onrender.com";

/**
 * Cria um novo registro alimentar.
 *
 * Endpoint: POST /api/feeding-logs/
 */
export async function createFeedingLog({
  criancaId,
  alimentoId,
  reacao,
  origem = "MANUAL",
  feedbacks = [],
}) {
  console.log("========== CRIAR FEEDING LOG ==========");
  console.log("CRIANÇA ID:", criancaId);
  console.log("ALIMENTO ID:", alimentoId);
  console.log("REAÇÃO:", reacao);
  console.log("ORIGEM:", origem);
  console.log("FEEDBACKS:", feedbacks);

  if (!criancaId) {
    throw new Error("O ID da criança é obrigatório.");
  }

  if (!alimentoId) {
    throw new Error("O ID do alimento é obrigatório.");
  }

  if (![1, 2, 3].includes(reacao)) {
    throw new Error("A reação informada é inválida.");
  }

  const token = await getToken();

  console.log("TOKEN:", token ? "EXISTE" : "NÃO EXISTE");

  if (!token) {
    throw new Error("Sessão não encontrada. Faça login novamente.");
  }

  const payload = {
    criancaId,
    alimentoId,
    reacao,
    origem,
    feedbacks,
  };

  console.log("PAYLOAD:", payload);

  const response = await fetch(`${API_URL}/api/feeding-logs/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  console.log("STATUS:", response.status);
  console.log("OK:", response.ok);

  const responseText = await response.text();

  console.log("RESPOSTA DA API:", responseText);
  console.log("=======================================");

  if (!response.ok) {
    let errorMessage = `Erro na API (${response.status}).`;

    try {
      const errorData = JSON.parse(responseText);

      errorMessage =
        errorData?.detail?.[0]?.msg ||
        errorData?.detail ||
        errorMessage;
    } catch {
      if (responseText) {
        errorMessage = responseText;
      }
    }

    throw new Error(errorMessage);
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error("A API retornou uma resposta inválida.");
  }
}