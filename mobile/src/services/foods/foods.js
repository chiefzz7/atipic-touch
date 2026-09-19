import axios from "axios";
import { getToken } from "../auth/auth";

const API_URL = "https://atipic-touch-devlop.onrender.com";
/**
 * Retorna os alimentos cadastrados para o usuário autenticado.
 */
export async function getFoods() {
  const token = await getToken();

  const response = await axios.get(`${API_URL}/api/foods/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

/**
 * Cadastra um novo alimento.
 */
export async function createFood(foodData) {
  const token = await getToken();

  const response = await axios.post(
    `${API_URL}/api/foods/`,
    foodData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

/**
 * Atualiza um alimento existente.
 */
export async function updateFood(foodId, foodData) {
  const token = await getToken();

  const response = await axios.patch(
    `${API_URL}/api/foods/${foodId}`,
    foodData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

/**
 * Remove um alimento cadastrado.
 */
export async function deleteFood(foodId) {
  const token = await getToken();

  await axios.delete(`${API_URL}/api/foods/${foodId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}