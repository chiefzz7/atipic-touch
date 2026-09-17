
import { getToken } from "../auth/auth";

const API_URL = "https://atipic-touch-devlop.onrender.com";

/**
 * Lista o histórico alimentar de uma criança.
 *
 * Endpoint:
 * GET /api/feeding-logs/crianca/{crianca_id}
 */
export async function getFeedingLogs(criancaId) {
  console.log("========== DASHBOARD API ==========");
  console.log("CRIANÇA ID:", criancaId);

  if (!criancaId) {
    console.error("ERRO: criancaId não foi informado.");
    throw new Error("O ID da criança é obrigatório.");
  }

  const token = await getToken();

  console.log("TOKEN:", token ? "EXISTE" : "NÃO EXISTE");

  if (!token) {
    console.error("ERRO: token não encontrado.");
    throw new Error("Sessão não encontrada. Faça login novamente.");
  }

  const url = `${API_URL}/api/feeding-logs/crianca/${criancaId}`;

  console.log("URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("STATUS:", response.status);
  console.log("OK:", response.ok);

  const responseText = await response.text();

  console.log("RESPOSTA DA API:", responseText);
  console.log("===================================");

  if (!response.ok) {
    throw new Error(
      `Erro na API (${response.status}): ${responseText}`
    );
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error("A API retornou uma resposta inválida.");
  }
}
