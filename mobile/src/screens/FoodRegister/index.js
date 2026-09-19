import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import PrimaryButton from "../../components/PrimaryButton";
import {
  createFood,
  updateFood,
} from "../../services/foods/foods";

const COLORS = {
  background: "#FFFCEF",
  card: "#F4EEDB",
  input: "#FFFDF5",
  border: "#E4DBC3",
  text: "#554B41",
  muted: "#80775C",
  icon: "#6E6246",
  green: "#83BF6E",
  greenDark: "#4F8D42",
};

const OPTIONS = {
  categoria: [
    { label: "Fruta", icon: "nutrition-outline" },
    { label: "Verdura", icon: "leaf-outline" },
    { label: "Legume", icon: "nutrition-outline" },
    { label: "Cereal", icon: "layers-outline" },
    { label: "Leguminosa", icon: "ellipse-outline" },
    { label: "Proteína animal", icon: "restaurant-outline" },
    { label: "Laticínio", icon: "water-outline" },
    { label: "Panificado", icon: "pizza-outline" },
    { label: "Massa", icon: "restaurant-outline" },
    { label: "Sobremesa", icon: "ice-cream-outline" },
    { label: "Bebida", icon: "cafe-outline" },
    { label: "Outro", icon: "create-outline" },
  ],

  cor: [
    { label: "Vermelho", color: "#D9534F" },
    { label: "Laranja", color: "#E88935" },
    { label: "Amarelo", color: "#E5B83F" },
    { label: "Verde", color: "#83BF6E" },
    { label: "Azul", color: "#5D8FC7" },
    { label: "Roxo", color: "#8A6BBE" },
    { label: "Rosa", color: "#D989A7" },
    { label: "Marrom", color: "#8B6750" },
    { label: "Branco", color: "#FFFFFF" },
    { label: "Preto", color: "#383838" },
    { label: "Bege", color: "#C6BB9A" },
    { label: "Outro", icon: "create-outline" },
  ],

  textura: [
    { label: "Macio", icon: "cloud-outline" },
    { label: "Crocante", icon: "layers-outline" },
    { label: "Cremoso", icon: "water-outline" },
    { label: "Mastigável", icon: "happy-outline" },
    { label: "Fibroso", icon: "git-branch-outline" },
    { label: "Granulado", icon: "ellipsis-horizontal-outline" },
    { label: "Pegajoso", icon: "hand-left-outline" },
    { label: "Líquido", icon: "water-outline" },
    { label: "Pastoso", icon: "flask-outline" },
    { label: "Seco", icon: "sunny-outline" },
    { label: "Duro", icon: "square-outline" },
    { label: "Outro", icon: "create-outline" },
  ],

  sabor: [
    { label: "Doce", icon: "heart-outline" },
    { label: "Salgado", icon: "restaurant-outline" },
    { label: "Azedo", icon: "nutrition-outline" },
    { label: "Amargo", icon: "cafe-outline" },
    { label: "Umami", icon: "restaurant-outline" },
    { label: "Picante", icon: "flame-outline" },
    { label: "Neutro", icon: "remove-circle-outline" },
    { label: "Outro", icon: "create-outline" },
  ],

  cheiro: [
    { label: "Agradável", icon: "flower-outline" },
    { label: "Suave", icon: "leaf-outline" },
    { label: "Forte", icon: "radio-outline" },
    { label: "Doce", icon: "heart-outline" },
    { label: "Temperado", icon: "flame-outline" },
    { label: "Neutro", icon: "remove-circle-outline" },
    { label: "Desagradável", icon: "close-circle-outline" },
    { label: "Outro", icon: "create-outline" },
  ],

  temperatura: [
    { label: "Quente", icon: "flame-outline" },
    { label: "Temperatura ambiente", icon: "thermometer-outline" },
    { label: "Frio", icon: "snow-outline" },
  ],
};

function SelectionOption({
  option,
  selected,
  onPress,
  isColor = false,
}) {
  const selectionColor =
    isColor && option.color ? option.color : COLORS.green;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="rounded-[8px] mb-2"
      style={{
        width: "31.8%",
        minHeight: 48,
        paddingHorizontal: 7,
        paddingVertical: 6,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: selected
          ? isColor
            ? `${selectionColor}12`
            : "#F1F7ED"
          : COLORS.input,
        borderWidth: selected ? 1.2 : 1,
        borderColor: selected ? selectionColor : COLORS.border,
      }}
    >
      {isColor && option.color ? (
        <View
          style={{
            width: 19,
            height: 19,
            borderRadius: 10,
            marginRight: 6,
            backgroundColor: option.color,
            borderWidth: option.label === "Branco" ? 1 : 0,
            borderColor: "#C6BB9A",
          }}
        />
      ) : (
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 13,
            marginRight: 5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: selected ? COLORS.green : "#EDE8D0",
          }}
        >
          <Ionicons
            name={option.icon}
            size={14}
            color={selected ? "#FFFFFF" : COLORS.icon}
          />
        </View>
      )}

      <Text
        numberOfLines={2}
        style={{
          flex: 1,
          fontSize: 10.5,
          lineHeight: 13,
          fontWeight: selected ? "700" : "600",
          color: selected ? COLORS.greenDark : COLORS.text,
        }}
      >
        {option.label}
      </Text>

      {selected && (
        <Ionicons
          name="checkmark-circle"
          size={15}
          color={selectionColor}
          style={{ marginLeft: 2 }}
        />
      )}
    </TouchableOpacity>
  );
}

function SectionHeader({ title, subtitle, icon }) {
  return (
    <View className="flex-row items-center mb-2">
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: "#EDE8D0",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 8,
        }}
      >
        <Ionicons name={icon} size={16} color={COLORS.icon} />
      </View>

      <View className="flex-1">
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: COLORS.text,
          }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            style={{
              fontSize: 10,
              color: COLORS.muted,
              marginTop: 1,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

function FoodCharacteristic({
  title,
  subtitle,
  icon,
  options,
  value,
  customValue,
  onSelect,
  onCustomChange,
  isColor = false,
}) {
  const isOtherSelected = value === "Outro";

  return (
    <View
      style={{
        backgroundColor: COLORS.card,
        borderRadius: 9,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
      />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        {options.map((option) => (
          <SelectionOption
            key={option.label}
            option={option}
            selected={value === option.label}
            onPress={() => onSelect(option.label)}
            isColor={isColor}
          />
        ))}
      </View>

      {isOtherSelected && (
        <TextInput
          value={customValue}
          onChangeText={onCustomChange}
          placeholder="Não encontrou? Escreva aqui..."
          placeholderTextColor="#A8A8A8"
          editable
          style={{
            height: 42,
            backgroundColor: COLORS.input,
            borderRadius: 7,
            paddingHorizontal: 12,
            color: "#444",
            borderWidth: 1,
            borderColor: COLORS.border,
            fontSize: 12,
            marginTop: 2,
          }}
        />
      )}
    </View>
  );
}

export default function FoodRegisterScreen() {
  const router = useRouter();
  const { mode, food } = useLocalSearchParams();

  const isEditing = mode === "edit";

  // O alimento chega serializado pela rota quando a tela é aberta para edição.
  let selectedFood = null;

  if (isEditing && food) {
    try {
      selectedFood = JSON.parse(food);
    } catch (error) {
      console.error("ERRO AO LER ALIMENTO:", error);
    }
  }

  const [error, setError] = useState("");

  const [foodData, setFoodData] = useState(() => ({
    nome: selectedFood?.nome || "",
    categoria: selectedFood?.categoria || "",
    cor: selectedFood?.cor || "",
    textura: selectedFood?.textura || "",
    sabor: selectedFood?.sabor || "",
    cheiro: selectedFood?.cheiro || "",
    temperatura: selectedFood?.temperatura || "",
  }));

  const [customValues, setCustomValues] = useState(() => ({
    categoria: isCustomValue("categoria", selectedFood?.categoria)
      ? selectedFood.categoria
      : "",
    cor: isCustomValue("cor", selectedFood?.cor)
      ? selectedFood.cor
      : "",
    textura: isCustomValue("textura", selectedFood?.textura)
      ? selectedFood.textura
      : "",
    sabor: isCustomValue("sabor", selectedFood?.sabor)
      ? selectedFood.sabor
      : "",
    cheiro: isCustomValue("cheiro", selectedFood?.cheiro)
      ? selectedFood.cheiro
      : "",
  }));

  const [loading, setLoading] = useState(false);

  function isCustomValue(field, value) {
    if (!value || !OPTIONS[field]) {
      return false;
    }

    return !OPTIONS[field].some(
      (option) => option.label === value
    );
  }

  function updateFood(field, value) {
    setFoodData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function updateCustomValue(field, value) {
    setCustomValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function getFinalValue(field) {
    return foodData[field] === "Outro"
      ? customValues[field].trim()
      : foodData[field];
  }

  async function handleSave() {
    const data = {
      nome: foodData.nome.trim(),
      categoria: getFinalValue("categoria"),
      cor: getFinalValue("cor"),
      textura: getFinalValue("textura"),
      sabor: getFinalValue("sabor"),
      cheiro: getFinalValue("cheiro"),
      temperatura: foodData.temperatura,
    };

    const hasEmptyField = Object.values(data).some(
      (value) => !value
    );

    if (hasEmptyField) {
      setError(
        "Preencha todas as características do alimento."
      );
      return;
    }

    if (isEditing && !selectedFood?.id) {
      setError(
        "Não foi possível identificar o alimento para atualização."
      );
      return;
    }

    try {
      setError("");
      setLoading(true);

      if (isEditing) {
        await updateFood(selectedFood.id, data);
      } else {
        await createFood(data);
      }

      router.replace("/management-food");
    } catch (error) {
      console.error(
        isEditing
          ? "ERRO AO ATUALIZAR ALIMENTO:"
          : "ERRO AO CADASTRAR ALIMENTO:",
        error?.response?.data || error
      );

      setError(
        error?.response?.data?.detail ||
          (isEditing
            ? "Não foi possível atualizar o alimento. Verifique sua conexão e tente novamente."
            : "Não foi possível cadastrar o alimento. Verifique sua conexão e tente novamente.")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 14,
            paddingTop: 8,
            paddingBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace("/management-food")}
            disabled={loading}
            style={{
              width: 34,
              height: 34,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={COLORS.text}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              marginLeft: 4,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: COLORS.text,
              }}
            >
              {isEditing
                ? "Editar alimento"
                : "Cadastrar alimento"}
            </Text>

            <Text
              style={{
                fontSize: 10,
                color: COLORS.muted,
                marginTop: 1,
              }}
            >
              {isEditing
                ? "Atualize as características do alimento"
                : "Informe as características do alimento"}
            </Text>
          </View>

          <TouchableOpacity disabled={loading}>
            <Ionicons
              name="help-circle-outline"
              size={19}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: 2,
            paddingBottom: 25,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 9,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <SectionHeader
              title="Nome do alimento"
              subtitle="Como ele é chamado?"
              icon="restaurant-outline"
            />

            <TextInput
              value={foodData.nome}
              onChangeText={(value) =>
                updateFood("nome", value)
              }
              placeholder="Ex.: Arroz"
              placeholderTextColor="#A8A8A8"
              editable={!loading}
              style={{
                height: 43,
                backgroundColor: COLORS.input,
                borderRadius: 7,
                paddingHorizontal: 12,
                color: "#444",
                borderWidth: 1,
                borderColor: COLORS.border,
                fontSize: 12,
                marginTop: 2,
              }}
            />
          </View>

          <FoodCharacteristic
            title="Categoria"
            subtitle="Que tipo de alimento é?"
            icon="grid-outline"
            options={OPTIONS.categoria}
            value={foodData.categoria}
            customValue={customValues.categoria}
            onSelect={(value) =>
              updateFood("categoria", value)
            }
            onCustomChange={(value) =>
              updateCustomValue("categoria", value)
            }
          />

          <FoodCharacteristic
            title="Cor"
            subtitle="Qual é a cor predominante?"
            icon="color-palette-outline"
            options={OPTIONS.cor}
            value={foodData.cor}
            customValue={customValues.cor}
            onSelect={(value) =>
              updateFood("cor", value)
            }
            onCustomChange={(value) =>
              updateCustomValue("cor", value)
            }
            isColor
          />

          <FoodCharacteristic
            title="Textura"
            subtitle="Como o alimento é ao tocar ou mastigar?"
            icon="hand-left-outline"
            options={OPTIONS.textura}
            value={foodData.textura}
            customValue={customValues.textura}
            onSelect={(value) =>
              updateFood("textura", value)
            }
            onCustomChange={(value) =>
              updateCustomValue("textura", value)
            }
          />

          <FoodCharacteristic
            title="Sabor"
            subtitle="Qual é o sabor predominante?"
            icon="restaurant-outline"
            options={OPTIONS.sabor}
            value={foodData.sabor}
            customValue={customValues.sabor}
            onSelect={(value) =>
              updateFood("sabor", value)
            }
            onCustomChange={(value) =>
              updateCustomValue("sabor", value)
            }
          />

          <FoodCharacteristic
            title="Cheiro"
            subtitle="Como o cheiro é percebido?"
            icon="leaf-outline"
            options={OPTIONS.cheiro}
            value={foodData.cheiro}
            customValue={customValues.cheiro}
            onSelect={(value) =>
              updateFood("cheiro", value)
            }
            onCustomChange={(value) =>
              updateCustomValue("cheiro", value)
            }
          />

          <FoodCharacteristic
            title="Temperatura"
            subtitle="Como o alimento será servido?"
            icon="thermometer-outline"
            options={OPTIONS.temperatura}
            value={foodData.temperatura}
            onSelect={(value) =>
              updateFood("temperatura", value)
            }
          />

          {error && (
            <View className="w-full bg-[#E8C9C9] rounded-[7px] px-4 py-3 mb-4">
              <Text className="text-[#9A2F2F] text-center font-medium">
                {error}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 1 }}>
            {loading ? (
              <View
                style={{
                  height: 48,
                  borderRadius: 7,
                  backgroundColor: COLORS.green,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />
              </View>
            ) : (
              <PrimaryButton
                title={
                  isEditing
                    ? "Salvar alterações"
                    : "Cadastrar alimento"
                }
                onPress={handleSave}
              />
            )}
          </View>

          <View style={{ height: 8 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}