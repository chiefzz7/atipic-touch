import AsyncStorage from "@react-native-async-storage/async-storage";

const SELECTED_CHILD_KEY = "@atipictouch:selected_child";

export async function getSelectedChild() {
  const storedChild = await AsyncStorage.getItem(SELECTED_CHILD_KEY);

  if (!storedChild) {
    return null;
  }

  try {
    return JSON.parse(storedChild);
  } catch {
    throw new Error(
      "Não foi possível recuperar a criança selecionada."
    );
  }
}

export async function saveSelectedChild(child) {
  if (!child?.id) {
    throw new Error("Criança inválida.");
  }

  await AsyncStorage.setItem(
    SELECTED_CHILD_KEY,
    JSON.stringify(child)
  );
}

export async function clearSelectedChild() {
  await AsyncStorage.removeItem(SELECTED_CHILD_KEY);
}