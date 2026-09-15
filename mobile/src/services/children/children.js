import { getToken } from "../auth/auth";

const API_URL = "https://atipic-touch-devlop.onrender.com";

export async function registerChild({ nome, dataNascimento, temasPreferidos, restricoesMedicas, }) {
    const token = await getToken();

    if (!token) {
        throw new Error("Sessão não encontrada. Faça login novamente.");
    }

    const response = await fetch(`${API_URL}/api/children/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nome,
            dataNascimento,
            temasPreferidos,
            restricoesMedicas,
        }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.detail?.[0]?.msg ||
            "Não foi possível cadastrar a criança."
        );
    }

    return data;
}

export async function getChildren() {
    const token = await getToken();

    if (!token) {
        throw new Error("Sessão não encontrada.");
    }

    const response = await fetch(`${API_URL}/api/children/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.detail?.[0]?.msg ||
            "Não foi possível verificar o cadastro da criança."
        );
    }

    return data;
}