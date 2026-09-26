import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  StatusBar,
} from "expo-status-bar";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import PrimaryButton from "../../components/PrimaryButton";

import {
  createFood,
  updateFood,
} from "../../services/foods/foods";

const COLORS = {
  background:
    "#FFFCEF",

  card:
    "#E5DCC4",

  input:
    "#F7F0DC",

  option:
    "#FFFCEF",

  border:
    "#DDD3B9",

  text:
    "#554B41",

  muted:
    "#80775C",

  icon:
    "#806A42",

  green:
    "#83BF6E",

  greenDark:
    "#4D9B43",

  softGreen:
    "#EDF6E8",
};

const OPTIONS = {
  categoria: [
    {
      label:
        "Fruta",
      icon:
        "nutrition-outline",
    },
    {
      label:
        "Verdura",
      icon:
        "leaf-outline",
    },
    {
      label:
        "Legume",
      icon:
        "nutrition-outline",
    },
    {
      label:
        "Cereal",
      icon:
        "layers-outline",
    },
    {
      label:
        "Leguminosa",
      icon:
        "ellipse-outline",
    },
    {
      label:
        "Proteína animal",
      icon:
        "restaurant-outline",
    },
    {
      label:
        "Laticínio",
      icon:
        "water-outline",
    },
    {
      label:
        "Panificado",
      icon:
        "pizza-outline",
    },
    {
      label:
        "Massa",
      icon:
        "restaurant-outline",
    },
    {
      label:
        "Sobremesa",
      icon:
        "ice-cream-outline",
    },
    {
      label:
        "Bebida",
      icon:
        "cafe-outline",
    },
    {
      label:
        "Outro",
      icon:
        "create-outline",
    },
  ],

  cor: [
    {
      label:
        "Vermelho",
      color:
        "#D9534F",
    },
    {
      label:
        "Laranja",
      color:
        "#E88935",
    },
    {
      label:
        "Amarelo",
      color:
        "#E5B83F",
    },
    {
      label:
        "Verde",
      color:
        "#83BF6E",
    },
    {
      label:
        "Azul",
      color:
        "#5D8FC7",
    },
    {
      label:
        "Roxo",
      color:
        "#8A6BBE",
    },
    {
      label:
        "Rosa",
      color:
        "#D989A7",
    },
    {
      label:
        "Marrom",
      color:
        "#8B6750",
    },
    {
      label:
        "Branco",
      color:
        "#FFFFFF",
    },
    {
      label:
        "Preto",
      color:
        "#383838",
    },
    {
      label:
        "Bege",
      color:
        "#C6BB9A",
    },
    {
      label:
        "Outro",
      icon:
        "create-outline",
    },
  ],

  textura: [
    {
      label:
        "Macio",
      icon:
        "cloud-outline",
    },
    {
      label:
        "Crocante",
      icon:
        "layers-outline",
    },
    {
      label:
        "Cremoso",
      icon:
        "water-outline",
    },
    {
      label:
        "Mastigável",
      icon:
        "happy-outline",
    },
    {
      label:
        "Fibroso",
      icon:
        "git-branch-outline",
    },
    {
      label:
        "Granulado",
      icon:
        "ellipsis-horizontal-outline",
    },
    {
      label:
        "Pegajoso",
      icon:
        "hand-left-outline",
    },
    {
      label:
        "Líquido",
      icon:
        "water-outline",
    },
    {
      label:
        "Pastoso",
      icon:
        "flask-outline",
    },
    {
      label:
        "Seco",
      icon:
        "sunny-outline",
    },
    {
      label:
        "Duro",
      icon:
        "square-outline",
    },
    {
      label:
        "Outro",
      icon:
        "create-outline",
    },
  ],

  sabor: [
    {
      label:
        "Doce",
      icon:
        "heart-outline",
    },
    {
      label:
        "Salgado",
      icon:
        "restaurant-outline",
    },
    {
      label:
        "Azedo",
      icon:
        "nutrition-outline",
    },
    {
      label:
        "Amargo",
      icon:
        "cafe-outline",
    },
    {
      label:
        "Umami",
      icon:
        "restaurant-outline",
    },
    {
      label:
        "Picante",
      icon:
        "flame-outline",
    },
    {
      label:
        "Neutro",
      icon:
        "remove-circle-outline",
    },
    {
      label:
        "Outro",
      icon:
        "create-outline",
    },
  ],

  cheiro: [
    {
      label:
        "Agradável",
      icon:
        "flower-outline",
    },
    {
      label:
        "Suave",
      icon:
        "leaf-outline",
    },
    {
      label:
        "Forte",
      icon:
        "radio-outline",
    },
    {
      label:
        "Doce",
      icon:
        "heart-outline",
    },
    {
      label:
        "Temperado",
      icon:
        "flame-outline",
    },
    {
      label:
        "Neutro",
      icon:
        "remove-circle-outline",
    },
    {
      label:
        "Desagradável",
      icon:
        "close-circle-outline",
    },
    {
      label:
        "Outro",
      icon:
        "create-outline",
    },
  ],

  temperatura: [
    {
      label:
        "Quente",
      icon:
        "flame-outline",
    },
    {
      label:
        "Temperatura ambiente",
      icon:
        "thermometer-outline",
    },
    {
      label:
        "Frio",
      icon:
        "snow-outline",
    },
  ],
};

function SelectionOption({
  option,
  selected,
  onPress,
  isColor = false,
}) {
  const selectionColor =
    isColor &&
    option.color
      ? option.color
      : COLORS.green;

  return (
    <TouchableOpacity
      activeOpacity={
        0.8
      }
      onPress={
        onPress
      }
      style={{
        width:
          "31.8%",

        minHeight:
          62,

        paddingHorizontal:
          8,

        paddingVertical:
          8,

        marginBottom:
          10,

        flexDirection:
          "row",

        alignItems:
          "center",

        borderRadius:
          10,

        backgroundColor:
          selected
            ? isColor
              ? `${selectionColor}18`
              : COLORS.softGreen
            : COLORS.option,

        borderWidth:
          selected
            ? 1.4
            : 1,

        borderColor:
          selected
            ? selectionColor
            : COLORS.border,
      }}
    >
      {isColor &&
      option.color ? (
        <View
          style={{
            width:
              23,

            height:
              23,

            borderRadius:
              12,

            marginRight:
              7,

            backgroundColor:
              option.color,

            borderWidth:
              option.label ===
              "Branco"
                ? 1
                : 0,

            borderColor:
              "#C6BB9A",
          }}
        />
      ) : (
        <View
          style={{
            width:
              30,

            height:
              30,

            borderRadius:
              15,

            marginRight:
              7,

            alignItems:
              "center",

            justifyContent:
              "center",

            backgroundColor:
              selected
                ? COLORS.green
                : "#EDE8D0",
          }}
        >
          <Ionicons
            name={
              option.icon
            }
            size={
              16
            }
            color={
              selected
                ? "#FFFFFF"
                : COLORS.icon
            }
          />
        </View>
      )}

      <Text
        numberOfLines={
          2
        }
        style={{
          flex:
            1,

          fontSize:
            11.5,

          lineHeight:
            14,

          fontWeight:
            selected
              ? "700"
              : "600",

          color:
            selected
              ? COLORS.greenDark
              : COLORS.text,
        }}
      >
        {option.label}
      </Text>

      {selected && (
        <Ionicons
          name="checkmark-circle"
          size={
            15
          }
          color={
            selectionColor
          }
          style={{
            marginLeft:
              2,
          }}
        />
      )}
    </TouchableOpacity>
  );
}

function SectionHeader({
  title,
  subtitle,
  icon,
}) {
  return (
    <View className="flex-row items-center mb-3">
      <View
        style={{
          width:
            38,

          height:
            38,

          borderRadius:
            19,

          backgroundColor:
            "#C6BB9A",

          alignItems:
            "center",

          justifyContent:
            "center",

          marginRight:
            10,
        }}
      >
        <Ionicons
          name={
            icon
          }
          size={
            19
          }
          color={
            COLORS.text
          }
        />
      </View>

      <View className="flex-1">
        <Text
          style={{
            fontSize:
              17,

            fontWeight:
              "700",

            color:
              COLORS.text,
          }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            style={{
              fontSize:
                13,

              lineHeight:
                17,

              color:
                COLORS.muted,

              marginTop:
                1,
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
  const isOtherSelected =
    value === "Outro";

  return (
    <View
      style={{
        backgroundColor:
          COLORS.card,

        borderRadius:
          10,

        padding:
          14,

        marginBottom:
          14,
      }}
    >
      <SectionHeader
        title={
          title
        }
        subtitle={
          subtitle
        }
        icon={
          icon
        }
      />

      <View
        style={{
          flexDirection:
            "row",

          flexWrap:
            "wrap",

          justifyContent:
            "space-between",
        }}
      >
        {options.map(
          (
            option
          ) => (
            <SelectionOption
              key={
                option.label
              }
              option={
                option
              }
              selected={
                value ===
                option.label
              }
              onPress={() =>
                onSelect(
                  option.label
                )
              }
              isColor={
                isColor
              }
            />
          )
        )}
      </View>

      {isOtherSelected && (
        <TextInput
          value={
            customValue
          }
          onChangeText={
            onCustomChange
          }
          placeholder="Não encontrou? Escreva aqui..."
          placeholderTextColor="#A8A8A8"
          editable
          style={{
            height:
              50,

            backgroundColor:
              COLORS.input,

            borderRadius:
              10,

            paddingHorizontal:
              14,

            color:
              COLORS.text,

            borderWidth:
              1,

            borderColor:
              COLORS.border,

            fontSize:
              14,

            marginTop:
              2,
          }}
        />
      )}
    </View>
  );
}

export default function FoodRegisterScreen() {
  const router =
    useRouter();

  const insets =
    useSafeAreaInsets();

  const {
    mode,
    food,
  } =
    useLocalSearchParams();

  const isEditing =
    mode === "edit";

  let selectedFood =
    null;

  if (
    isEditing &&
    food
  ) {
    try {
      selectedFood =
        JSON.parse(
          food
        );
    } catch (error) {
      console.error(
        "ERRO AO LER ALIMENTO:",
        error
      );
    }
  }

  const [
    error,
    setError,
  ] = useState("");

  const [
    foodData,
    setFoodData,
  ] = useState(
    () => ({
      nome:
        selectedFood?.nome ||
        "",

      categoria:
        selectedFood?.categoria ||
        "",

      cor:
        selectedFood?.cor ||
        "",

      textura:
        selectedFood?.textura ||
        "",

      sabor:
        selectedFood?.sabor ||
        "",

      cheiro:
        selectedFood?.cheiro ||
        "",

      temperatura:
        selectedFood?.temperatura ||
        "",
    })
  );

  const [
    customValues,
    setCustomValues,
  ] = useState(
    () => ({
      categoria:
        isCustomValue(
          "categoria",
          selectedFood?.categoria
        )
          ? selectedFood.categoria
          : "",

      cor:
        isCustomValue(
          "cor",
          selectedFood?.cor
        )
          ? selectedFood.cor
          : "",

      textura:
        isCustomValue(
          "textura",
          selectedFood?.textura
        )
          ? selectedFood.textura
          : "",

      sabor:
        isCustomValue(
          "sabor",
          selectedFood?.sabor
        )
          ? selectedFood.sabor
          : "",

      cheiro:
        isCustomValue(
          "cheiro",
          selectedFood?.cheiro
        )
          ? selectedFood.cheiro
          : "",
    })
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  function isCustomValue(
    field,
    value
  ) {
    if (
      !value ||
      !OPTIONS[field]
    ) {
      return false;
    }

    return !OPTIONS[
      field
    ].some(
      (
        option
      ) =>
        option.label ===
        value
    );
  }

  function updateFood(
    field,
    value
  ) {
    setFoodData(
      (
        previous
      ) => ({
        ...previous,
        [field]:
          value,
      })
    );
  }

  function updateCustomValue(
    field,
    value
  ) {
    setCustomValues(
      (
        previous
      ) => ({
        ...previous,
        [field]:
          value,
      })
    );
  }

  function getFinalValue(
    field
  ) {
    return foodData[
      field
    ] === "Outro"
      ? customValues[
          field
        ].trim()
      : foodData[
          field
        ];
  }

  async function handleSave() {
    const data = {
      nome:
        foodData.nome.trim(),

      categoria:
        getFinalValue(
          "categoria"
        ),

      cor:
        getFinalValue(
          "cor"
        ),

      textura:
        getFinalValue(
          "textura"
        ),

      sabor:
        getFinalValue(
          "sabor"
        ),

      cheiro:
        getFinalValue(
          "cheiro"
        ),

      temperatura:
        foodData.temperatura,
    };

    const hasEmptyField =
      Object.values(
        data
      ).some(
        (value) =>
          !value
      );

    if (
      hasEmptyField
    ) {
      setError(
        "Preencha todas as características do alimento."
      );

      return;
    }

    if (
      isEditing &&
      !selectedFood?.id
    ) {
      setError(
        "Não foi possível identificar o alimento para atualização."
      );

      return;
    }

    try {
      setError("");

      setLoading(
        true
      );

      if (
        isEditing
      ) {
        await updateFood(
          selectedFood.id,
          data
        );
      } else {
        await createFood(
          data
        );
      }

      router.replace(
        "/management-food"
      );
    } catch (error) {
      console.error(
        isEditing
          ? "ERRO AO ATUALIZAR ALIMENTO:"
          : "ERRO AO CADASTRAR ALIMENTO:",
        error?.response
          ?.data ||
          error
      );

      setError(
        error?.response
          ?.data
          ?.detail ||
          (
            isEditing
              ? "Não foi possível atualizar o alimento. Verifique sua conexão e tente novamente."
              : "Não foi possível cadastrar o alimento. Verifique sua conexão e tente novamente."
          )
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  return (
    <View
      style={{
        flex:
          1,

        backgroundColor:
          COLORS.background,

        paddingTop:
          insets.top,

        paddingBottom:
          insets.bottom,
      }}
    >
      <StatusBar
        style="dark"
      />

      <View
        style={{
          paddingHorizontal:
            12,

          paddingTop:
            8,

          paddingBottom:
            10,

          flexDirection:
            "row",

          alignItems:
            "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={
            0.8
          }
          onPress={() =>
            router.replace(
              "/management-food"
            )
          }
          disabled={
            loading
          }
          style={{
            width:
              40,

            height:
              40,

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={
              24
            }
            color={
              COLORS.text
            }
          />
        </TouchableOpacity>

        <View
          style={{
            flex:
              1,

            marginLeft:
              4,
          }}
        >
          <Text
            style={{
              fontSize:
                22,

              fontWeight:
                "700",

              color:
                COLORS.text,
            }}
          >
            {isEditing
              ? "Editar alimento"
              : "Cadastrar alimento"}
          </Text>

          <Text
            style={{
              fontSize:
                13,

              color:
                COLORS.muted,

              marginTop:
                1,
            }}
          >
            {isEditing
              ? "Atualize as características do alimento"
              : "Informe as características do alimento"}
          </Text>
        </View>

        <TouchableOpacity
          disabled={
            loading
          }
          style={{
            width:
              40,

            height:
              40,

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >
          <Ionicons
            name="help-circle-outline"
            size={
              23
            }
            color={
              COLORS.muted
            }
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingHorizontal:
            12,

          paddingTop:
            4,

          paddingBottom:
            32,
        }}
      >
        <View
          style={{
            backgroundColor:
              COLORS.card,

            borderRadius:
              10,

            padding:
              14,

            marginBottom:
              14,
          }}
        >
          <SectionHeader
            title="Nome do alimento"
            subtitle="Como ele é chamado?"
            icon="restaurant-outline"
          />

          <TextInput
            value={
              foodData.nome
            }
            onChangeText={(
              value
            ) =>
              updateFood(
                "nome",
                value
              )
            }
            placeholder="Ex.: Arroz"
            placeholderTextColor="#A8A8A8"
            editable={
              !loading
            }
            style={{
              height:
                52,

              backgroundColor:
                COLORS.input,

              borderRadius:
                10,

              paddingHorizontal:
                14,

              color:
                COLORS.text,

              borderWidth:
                1,

              borderColor:
                COLORS.border,

              fontSize:
                14,
            }}
          />
        </View>

        <FoodCharacteristic
          title="Categoria"
          subtitle="Que tipo de alimento é?"
          icon="grid-outline"
          options={
            OPTIONS.categoria
          }
          value={
            foodData.categoria
          }
          customValue={
            customValues.categoria
          }
          onSelect={(
            value
          ) =>
            updateFood(
              "categoria",
              value
            )
          }
          onCustomChange={(
            value
          ) =>
            updateCustomValue(
              "categoria",
              value
            )
          }
        />

        <FoodCharacteristic
          title="Cor"
          subtitle="Qual é a cor predominante?"
          icon="color-palette-outline"
          options={
            OPTIONS.cor
          }
          value={
            foodData.cor
          }
          customValue={
            customValues.cor
          }
          onSelect={(
            value
          ) =>
            updateFood(
              "cor",
              value
            )
          }
          onCustomChange={(
            value
          ) =>
            updateCustomValue(
              "cor",
              value
            )
          }
          isColor
        />

        <FoodCharacteristic
          title="Textura"
          subtitle="Como o alimento é ao tocar ou mastigar?"
          icon="hand-left-outline"
          options={
            OPTIONS.textura
          }
          value={
            foodData.textura
          }
          customValue={
            customValues.textura
          }
          onSelect={(
            value
          ) =>
            updateFood(
              "textura",
              value
            )
          }
          onCustomChange={(
            value
          ) =>
            updateCustomValue(
              "textura",
              value
            )
          }
        />

        <FoodCharacteristic
          title="Sabor"
          subtitle="Qual é o sabor predominante?"
          icon="restaurant-outline"
          options={
            OPTIONS.sabor
          }
          value={
            foodData.sabor
          }
          customValue={
            customValues.sabor
          }
          onSelect={(
            value
          ) =>
            updateFood(
              "sabor",
              value
            )
          }
          onCustomChange={(
            value
          ) =>
            updateCustomValue(
              "sabor",
              value
            )
          }
        />

        <FoodCharacteristic
          title="Cheiro"
          subtitle="Como o cheiro é percebido?"
          icon="leaf-outline"
          options={
            OPTIONS.cheiro
          }
          value={
            foodData.cheiro
          }
          customValue={
            customValues.cheiro
          }
          onSelect={(
            value
          ) =>
            updateFood(
              "cheiro",
              value
            )
          }
          onCustomChange={(
            value
          ) =>
            updateCustomValue(
              "cheiro",
              value
            )
          }
        />

        <FoodCharacteristic
          title="Temperatura"
          subtitle="Como o alimento será servido?"
          icon="thermometer-outline"
          options={
            OPTIONS.temperatura
          }
          value={
            foodData.temperatura
          }
          onSelect={(
            value
          ) =>
            updateFood(
              "temperatura",
              value
            )
          }
        />

        {error ? (
          <View className="w-full bg-[#FCEBE8] rounded-[10px] px-4 py-3 mb-4">
            <Text className="text-[#D9534F] text-[14px] text-center font-medium">
              {error}
            </Text>
          </View>
        ) : null}

        {loading ? (
          <View
            style={{
              height:
                54,

              borderRadius:
                10,

              backgroundColor:
                COLORS.green,

              alignItems:
                "center",

              justifyContent:
                "center",

              opacity:
                0.7,
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
            onPress={
              handleSave
            }
          />
        )}
      </ScrollView>
    </View>
  );
}
