import {
  cachedFetch,
  invalidateCache,
  CACHE_TTL,
} from "../cache/cache";
import axios from "axios";
import { getToken } from "../auth/auth";

const API_URL = "https://atipic-touch-devlop.onrender.com";
/**
 * Retorna os alimentos cadastrados para o usuário autenticado.
 */
async function fetchFoods() {
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
async function createFoodRequest(foodData) {
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
async function updateFoodRequest(foodId, foodData) {
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
async function deleteFoodRequest(foodId) {
  const token = await getToken();

  await axios.delete(`${API_URL}/api/foods/${foodId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getFoods({ force = false } = {}) {
  return cachedFetch("foods", fetchFoods, {
    ttl: CACHE_TTL.foods,
    force,
  });
}

export async function createFood(...args) {
  const result = await createFoodRequest(...args);

  invalidateCache("foods");

  return result;
}

export async function updateFood(...args) {
  const result = await updateFoodRequest(...args);

  invalidateCache("foods");
  invalidateCache("logs");

  return result;
}

export async function deleteFood(...args) {
  const result = await deleteFoodRequest(...args);

  invalidateCache("foods");
  invalidateCache("logs");

  return result;
}
