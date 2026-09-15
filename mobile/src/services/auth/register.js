const API_URL = "https://atipic-touch-devlop.onrender.com";

export async function registerUser({ nome, email, telefone, senha, }) {
    const response = await fetch(`${API_URL}/api/users/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome,
            email,
            telefone,
            senha,
            perfil: "RESPONSAVEL",
        }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const message =
            data?.detail?.[0]?.msg ||
            "Não foi possível realizar o cadastro.";

        throw new Error(message);
    }

    return data;
}