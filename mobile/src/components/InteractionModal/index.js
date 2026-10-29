import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
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

import bluetoothService from "../../services/bluetooth/bluetoothService";

import {
  getFoods,
} from "../../services/foods/foods";

const REACTIONS = [
  {
    value: 1,
    label: "Gostou",
    icon: "happy-outline",
    color: "#4D9B43",
    background: "#EDF6E8",
  },
  {
    value: 3,
    label: "Neutro",
    icon: "remove-circle-outline",
    color: "#C29424",
    background: "#F8F0D9",
  },
  {
    value: 2,
    label: "Não gostou",
    icon: "sad-outline",
    color: "#D9534F",
    background: "#FCEBE8",
  },
];

const SENSORY_ASPECTS = [
  {
    key: "cor",
    label: "Cor",
    icon: "color-palette-outline",
  },
  {
    key: "sabor",
    label: "Sabor",
    icon: "restaurant-outline",
  },
  {
    key: "cheiro",
    label: "Cheiro",
    icon: "water-outline",
  },
  {
    key: "textura",
    label: "Textura",
    icon: "hand-left-outline",
  },
  {
    key: "temperatura",
    label: "Temperatura",
    icon: "thermometer-outline",
  },
];

// Opções de características (mesmos valores do cadastro de alimento)
const CHARACTERISTIC_OPTIONS = {
  cor: [
    "Vermelho", "Laranja", "Amarelo", "Verde", "Azul", "Roxo",
    "Rosa", "Marrom", "Branco", "Preto", "Bege",
  ],
  sabor: [
    "Doce", "Salgado", "Azedo", "Amargo", "Umami", "Picante", "Neutro",
  ],
  cheiro: [
    "Agradável", "Suave", "Forte", "Doce", "Temperado", "Neutro", "Desagradável",
  ],
  textura: [
    "Macio", "Crocante", "Cremoso", "Mastigável", "Fibroso", "Granulado",
    "Pegajoso", "Líquido", "Pastoso", "Seco", "Duro",
  ],
  temperatura: [
    "Quente", "Temperatura ambiente", "Frio",
  ],
};

const FEEDBACK_CHOICES = [
  {
    gostou: true,
    label: "Gostou",
    icon: "happy-outline",
    color: "#4D9B43",
    background: "#EDF6E8",
  },
  {
    gostou: false,
    label: "Não gostou",
    icon: "sad-outline",
    color: "#D9534F",
    background: "#FCEBE8",
  },
];

function getReactionValue(
  emotion
) {
  switch (emotion) {
    case "Gostou":
      return 1;

    case "Não gostou":
      return 2;

    case "Neutro":
      return 3;

    default:
      return 3;
  }
}

function getReactionLabel(
  value
) {
  switch (
    Number(value)
  ) {
    case 1:
      return "Gostou";

    case 2:
      return "Não gostou";

    case 3:
      return "Neutro";

    default:
      return null;
  }
}

function getReactionFromBleEvent(
  evento
) {
  if (
    evento?.tipo ===
    "sensorial"
  ) {
    return null;
  }

  if (
    evento?.botao ===
      "aceitou" ||
    Number(
      evento?.value
    ) === 1
  ) {
    return 1;
  }

  if (
    evento?.botao ===
      "rejeitou" ||
    Number(
      evento?.value
    ) === 2
  ) {
    return 2;
  }

  if (
    evento?.botao ===
      "neutro" ||
    Number(
      evento?.value
    ) === 3
  ) {
    return 3;
  }

  return null;
}

export default function InteractionModal({
  visible,
  onClose,
  onSubmit,
  initialEmotion = "Gostou",
}) {
  const insets =
    useSafeAreaInsets();

  const [
    emotion,
    setEmotion,
  ] = useState(
    initialEmotion
  );

  const [
    sensoryContext,
    setSensoryContext,
  ] = useState(
    getReactionValue(
      initialEmotion
    )
  );

  const sensoryContextRef =
    useRef(
      getReactionValue(
        initialEmotion
      )
    );

  const [
    sensoryFeedbacks,
    setSensoryFeedbacks,
  ] = useState([]);

  const [
    foods,
    setFoods,
  ] = useState([]);

  const [
    selectedFood,
    setSelectedFood,
  ] = useState(null);

  const [
    foodSearch,
    setFoodSearch,
  ] = useState("");

  const [
    loadingFoods,
    setLoadingFoods,
  ] = useState(false);

  const [
    foodsError,
    setFoodsError,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    captureMessage,
    setCaptureMessage,
  ] = useState("");

  // Ajustes de características válidos somente para esta refeição
  const [
    mealCharacteristics,
    setMealCharacteristics,
  ] = useState({});

  const [
    editingAspect,
    setEditingAspect,
  ] = useState(null);

  // ========================================
  // Abrir modal / resetar interação
  // ========================================

  useEffect(() => {
    if (!visible) {
      return;
    }

    const initialValue =
      getReactionValue(
        initialEmotion
      );

    setEmotion(
      initialEmotion
    );

    setSensoryContext(
      initialValue
    );

    sensoryContextRef.current =
      initialValue;

    setSensoryFeedbacks(
      []
    );

    setSelectedFood(
      null
    );

    setFoodSearch(
      ""
    );

    setSubmitError(
      ""
    );

    setCaptureMessage(
      ""
    );

    setMealCharacteristics({});

    setEditingAspect(null);
  }, [
    visible,
    initialEmotion,
  ]);

  // ========================================
  // Carregar alimentos reais
  // ========================================

  useEffect(() => {
    if (!visible) {
      return;
    }

    let active =
      true;

    async function loadFoods() {
      try {
        setLoadingFoods(
          true
        );

        setFoodsError(
          ""
        );

        const data =
          await getFoods();

        if (!active) {
          return;
        }

        setFoods(
          Array.isArray(
            data
          )
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Erro ao carregar alimentos:",
          error
        );

        if (!active) {
          return;
        }

        setFoodsError(
          "Não foi possível carregar os alimentos."
        );
      } finally {
        if (
          active
        ) {
          setLoadingFoods(
            false
          );
        }
      }
    }

    loadFoods();

    return () => {
      active =
        false;
    };
  }, [
    visible,
  ]);

  // ========================================
  // Eventos BLE enquanto modal está aberto
  // ========================================

  useEffect(() => {
    if (!visible) {
      return;
    }

    const removerListener =
      bluetoothService
        .adicionarListener(
          (
            evento
          ) => {
            const reaction =
              getReactionFromBleEvent(
                evento
              );

            // =================================
            // Reação recebida
            //
            // Enquanto o modal está aberto,
            // altera somente o CONTEXTO para
            // o próximo aspecto sensorial.
            //
            // A reação geral permanece a que
            // abriu a interação.
            // =================================

            if (
              reaction !==
              null
            ) {
              sensoryContextRef.current =
                reaction;

              setSensoryContext(
                reaction
              );

              const label =
                getReactionLabel(
                  reaction
                );

              setCaptureMessage(
                reaction ===
                  3
                  ? "Contexto neutro selecionado. Para registrar um aspecto sensorial, use Gostou ou Não gostou."
                  : `Contexto sensorial alterado para: ${label}.`
              );

              return;
            }

            // =================================
            // Aspecto sensorial
            // =================================

            if (
              evento?.tipo !==
              "sensorial"
            ) {
              return;
            }

            const atributo =
              String(
                evento?.atributo ||
                  ""
              )
                .trim()
                .toLowerCase();

            const validAttribute =
              SENSORY_ASPECTS.some(
                (
                  item
                ) =>
                  item.key ===
                  atributo
              );

            if (
              !validAttribute
            ) {
              console.warn(
                "Atributo sensorial inválido recebido:",
                atributo
              );

              return;
            }

            const context =
              sensoryContextRef
                .current;

            if (
              context !== 1 &&
              context !== 2
            ) {
              setCaptureMessage(
                "Escolha Gostou ou Não gostou antes de registrar um aspecto sensorial."
              );

              return;
            }

            const gostou =
              context === 1;

            setSensoryFeedbacks(
              (
                previous
              ) => {
                const others =
                  previous.filter(
                    (
                      feedback
                    ) =>
                      feedback.atributo !==
                      atributo
                  );

                return [
                  ...others,
                  {
                    atributo,
                    gostou,
                  },
                ];
              }
            );

            const aspect =
              SENSORY_ASPECTS.find(
                (
                  item
                ) =>
                  item.key ===
                  atributo
              );

            setCaptureMessage(
              `${aspect?.label || atributo}: ${
                gostou
                  ? "Gostou"
                  : "Não gostou"
              }.`
            );
          }
        );

    return removerListener;
  }, [
    visible,
  ]);

  // ========================================
  // Alimentos filtrados
  // ========================================

  const filteredFoods =
    useMemo(
      () => {
        const normalized =
          foodSearch
            .trim()
            .toLowerCase();

        if (
          !normalized
        ) {
          return foods;
        }

        return foods.filter(
          (
            food
          ) =>
            food?.nome
              ?.toLowerCase()
              .includes(
                normalized
              )
        );
      },
      [
        foods,
        foodSearch,
      ]
    );

  // ========================================
  // Alterar reação manualmente
  // ========================================

  function handleReactionPress(
    reaction
  ) {
    setEmotion(
      reaction.label
    );

    setSensoryContext(
      reaction.value
    );

    sensoryContextRef.current =
      reaction.value;

    if (
      reaction.value ===
      3
    ) {
      setCaptureMessage(
        "Reação geral alterada para Neutro. Use Gostou ou Não gostou antes de registrar um aspecto sensorial."
      );
    } else {
      setCaptureMessage(
        `Reação geral e contexto sensorial alterados para: ${reaction.label}.`
      );
    }
  }

  // ========================================
  // Remover feedback capturado
  // ========================================

  function removeFeedback(
    atributo
  ) {
    setSensoryFeedbacks(
      (
        previous
      ) =>
        previous.filter(
          (
            feedback
          ) =>
            feedback.atributo !==
            atributo
        )
    );
  }

  // ========================================
  // Corrigir feedback sensorial manualmente
  // (caso a criança aperte o botão errado)
  // ========================================

  function handleSetFeedback(
    atributo,
    gostou
  ) {
    setSensoryFeedbacks(
      (previous) => {
        const current =
          previous.find(
            (feedback) =>
              feedback.atributo ===
              atributo
          );

        const others =
          previous.filter(
            (feedback) =>
              feedback.atributo !==
              atributo
          );

        // Tocar de novo na mesma opção remove o feedback
        if (
          current &&
          current.gostou ===
            gostou
        ) {
          return others;
        }

        return [
          ...others,
          {
            atributo,
            gostou,
          },
        ];
      }
    );

    const aspect =
      SENSORY_ASPECTS.find(
        (item) =>
          item.key ===
          atributo
      );

    setCaptureMessage(
      `${aspect?.label || atributo}: corrigido manualmente.`
    );
  }

  // ========================================
  // Ajustar característica SÓ nesta refeição
  // (não altera o cadastro do alimento)
  // ========================================

  function handleSelectCharacteristic(
    key,
    value
  ) {
    setMealCharacteristics(
      (previous) => {
        const next = {
          ...previous,
        };

        if (
          selectedFood?.[key] ===
          value
        ) {
          delete next[key];
        } else {
          next[key] = value;
        }

        return next;
      }
    );
  }

  function handleResetCharacteristic(
    key
  ) {
    setMealCharacteristics(
      (previous) => {
        const next = {
          ...previous,
        };

        delete next[key];

        return next;
      }
    );
  }

  const changedCharacteristicsCount =
    Object.keys(
      mealCharacteristics
    ).length;

  // ========================================
  // Confirmar
  // ========================================

  async function handleSubmit() {
    if (
      !selectedFood?.id
    ) {
      setSubmitError(
        "Selecione o alimento oferecido."
      );

      return;
    }

    try {
      setSaving(
        true
      );

      setSubmitError(
        ""
      );

      await onSubmit?.({
        reaction:
          getReactionValue(
            emotion
          ),

        food:
          selectedFood,

        feedbacks:
          sensoryFeedbacks,

        mealCharacteristics,
      });

      onClose?.();
    } catch (error) {
      console.error(
        "Erro ao salvar interação:",
        error
      );

      setSubmitError(
        error?.message ||
          "Não foi possível salvar a interação."
      );
    } finally {
      setSaving(
        false
      );
    }
  }

  // ========================================
  // Data atual
  // ========================================

  const currentDate =
    new Date()
      .toLocaleString(
        "pt-BR",
        {
          day:
            "2-digit",
          month:
            "2-digit",
          year:
            "numeric",
          hour:
            "2-digit",
          minute:
            "2-digit",
        }
      );

  return (
    <Modal
      visible={
        visible
      }
      animationType="slide"
      onRequestClose={
        saving
          ? undefined
          : onClose
      }
    >
      <View
        className="flex-1 bg-[#FFFCEF]"
        style={{
          paddingTop:
            insets.top,
          paddingBottom:
            insets.bottom,
        }}
      >
        <StatusBar
          style="dark"
        />

        <ScrollView
          className="flex-1 px-3"
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            paddingBottom:
              40,
          }}
        >
          {/* =================================
              Cabeçalho
              ================================= */}

          <View className="mt-3 flex-row items-center">
            <TouchableOpacity
              activeOpacity={
                0.8
              }
              disabled={
                saving
              }
              onPress={
                onClose
              }
              className="w-[42px] h-[42px] items-center justify-center"
            >
              <Ionicons
                name="arrow-back"
                size={26}
                color="#554B41"
              />
            </TouchableOpacity>

            <View className="flex-1 ml-2">
              <Text className="text-[#554B41] text-[25px] font-bold">
                Confirmar interação
              </Text>

              <Text className="text-[#80775C] text-[13px] mt-1">
                Revise os dados recebidos antes de salvar.
              </Text>
            </View>
          </View>

          {/* =================================
              Reação geral
              ================================= */}

          <View className="bg-white border border-[#EFE7D0] shadow-sm rounded-[16px] px-4 py-5 mt-5">
            <Text className="text-[#554B41] text-[20px] font-bold">
              Reação geral
            </Text>

            <Text className="text-[#80775C] text-[13px] mt-1">
              Como a criança reagiu ao alimento?
            </Text>

            <View className="flex-row mt-4">
              {REACTIONS.map(
                (
                  reaction,
                  index
                ) => {
                  const selected =
                    emotion ===
                    reaction.label;

                  return (
                    <TouchableOpacity
                      key={
                        reaction.value
                      }
                      activeOpacity={
                        0.8
                      }
                      onPress={() =>
                        handleReactionPress(
                          reaction
                        )
                      }
                      className={`flex-1 min-h-[104px] rounded-[16px] border items-center justify-center ${
                        index !==
                        REACTIONS.length -
                          1
                          ? "mr-2"
                          : ""
                      }`}
                      style={{
                        borderColor:
                          selected
                            ? reaction.color
                            : "#E7DFC6",

                        backgroundColor:
                          selected
                            ? reaction.background
                            : "#FFFCEF",
                      }}
                    >
                      <Ionicons
                        name={
                          reaction.icon
                        }
                        size={34}
                        color={
                          reaction.color
                        }
                      />

                      <Text
                        numberOfLines={
                          1
                        }
                        adjustsFontSizeToFit
                        minimumFontScale={
                          0.72
                        }
                        className="text-[14px] font-bold mt-2"
                        style={{
                          color:
                            selected
                              ? reaction.color
                              : "#554B41",
                        }}
                      >
                        {
                          reaction.label
                        }
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          </View>

          {/* =================================
              Contexto sensorial
              ================================= */}

          <View className="bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 py-4 mt-4">
            <View className="flex-row items-center">
              <View className="w-[40px] h-[40px] rounded-full bg-[#EFEAD6] items-center justify-center">
                <Ionicons
                  name="radio-outline"
                  size={21}
                  color="#554B41"
                />
              </View>

              <View className="flex-1 ml-3">
                <Text className="text-[#554B41] text-[15px] font-bold">
                  Contexto sensorial atual
                </Text>

                <Text className="text-[#80775C] text-[13px] mt-1">
                  {sensoryContext ===
                  1
                    ? "Gostou"
                    : sensoryContext ===
                      2
                    ? "Não gostou"
                    : "Neutro"}
                </Text>
              </View>
            </View>

            <Text className="text-[#80775C] text-[12px] leading-5 mt-3">
              Depois da reação, pressione Cor, Sabor, Cheiro, Textura ou Temperatura no dispositivo.
            </Text>

            {captureMessage ? (
              <View className="bg-[#FFFCEF] rounded-[16px] px-3 py-3 mt-3">
                <Text className="text-[#554B41] text-[13px] font-medium">
                  {captureMessage}
                </Text>
              </View>
            ) : null}
          </View>

          {/* =================================
              Alimento
              ================================= */}

          <View className="bg-white border border-[#EFE7D0] shadow-sm rounded-[16px] px-4 py-5 mt-4">
            <Text className="text-[#554B41] text-[20px] font-bold">
              Alimento
            </Text>

            <Text className="text-[#80775C] text-[13px] mt-1">
              Selecione o alimento oferecido nesta interação.
            </Text>

            <View className="h-[50px] bg-white border border-[#E7DFC6] rounded-[16px] px-3 flex-row items-center mt-4">
              <Ionicons
                name="search"
                size={20}
                color="#80775C"
              />

              <TextInput
                value={
                  foodSearch
                }
                onChangeText={
                  setFoodSearch
                }
                placeholder="Buscar alimento..."
                placeholderTextColor="#A3987B"
                className="flex-1 ml-2 text-[#554B41] text-[15px]"
              />
            </View>

            {loadingFoods ? (
              <View className="items-center py-8">
                <ActivityIndicator
                  size="large"
                  color="#4D9B43"
                />

                <Text className="text-[#80775C] text-[13px] mt-3">
                  Carregando alimentos...
                </Text>
              </View>
            ) : foodsError ? (
              <View className="bg-[#FCEBE8] rounded-[16px] px-3 py-3 mt-4">
                <Text className="text-[#D9534F] text-[13px] text-center font-medium">
                  {foodsError}
                </Text>
              </View>
            ) : filteredFoods.length ===
              0 ? (
              <Text className="text-[#80775C] text-[13px] text-center py-7">
                Nenhum alimento encontrado.
              </Text>
            ) : (
              <View className="mt-3">
                {filteredFoods.map(
                  (
                    food
                  ) => {
                    const selected =
                      selectedFood?.id ===
                      food.id;

                    return (
                      <TouchableOpacity
                        key={
                          food.id
                        }
                        activeOpacity={
                          0.8
                        }
                        onPress={() => {
                          if (
                            selectedFood?.id !==
                            food.id
                          ) {
                            setMealCharacteristics({});

                            setEditingAspect(null);
                          }

                          setSelectedFood(
                            food
                          );

                          setSubmitError(
                            ""
                          );
                        }}
                        className="min-h-[58px] rounded-[16px] border px-3 mb-2 flex-row items-center"
                        style={{
                          backgroundColor:
                            selected
                              ? "#EDF6E8"
                              : "#FFFFFF",

                          borderColor:
                            selected
                              ? "#438C3B"
                              : "#E7DFC6",
                        }}
                      >
                        <View className="w-[38px] h-[38px] rounded-full bg-[#EFEAD6] items-center justify-center">
                          <Ionicons
                            name="restaurant-outline"
                            size={20}
                            color="#554B41"
                          />
                        </View>

                        <View className="flex-1 ml-3">
                          <Text
                            numberOfLines={
                              1
                            }
                            className="text-[#554B41] text-[15px] font-bold"
                          >
                            {
                              food.nome
                            }
                          </Text>

                          <Text
                            numberOfLines={
                              1
                            }
                            className="text-[#80775C] text-[12px] mt-1"
                          >
                            {
                              food.categoria
                            }
                          </Text>
                        </View>

                        {selected ? (
                          <Ionicons
                            name="checkmark-circle"
                            size={23}
                            color="#4D9B43"
                          />
                        ) : (
                          <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#A3987B"
                          />
                        )}
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            )}
          </View>

          {/* =================================
              Feedbacks sensoriais + características
              ================================= */}

          <View className="bg-white border border-[#EFE7D0] shadow-sm rounded-[16px] px-4 py-5 mt-4">
            <Text className="text-[#554B41] text-[20px] font-bold">
              Feedback sensorial
            </Text>

            <Text className="text-[#80775C] text-[13px] mt-1 leading-5">
              Preenchido pelos botões físicos. Se a criança apertou errado, toque abaixo para corrigir.
            </Text>

            <View className="mt-4">
              {SENSORY_ASPECTS.map((aspect) => {
                const feedback =
                  sensoryFeedbacks.find(
                    (item) =>
                      item.atributo ===
                      aspect.key
                  );

                const originalValue =
                  selectedFood?.[
                    aspect.key
                  ];

                const editedValue =
                  mealCharacteristics[
                    aspect.key
                  ];

                const currentValue =
                  editedValue ||
                  originalValue;

                const isEdited =
                  Boolean(editedValue);

                const isEditing =
                  editingAspect ===
                  aspect.key;

                const options =
                  CHARACTERISTIC_OPTIONS[
                    aspect.key
                  ] || [];

                return (
                  <View
                    key={aspect.key}
                    className="bg-white border rounded-[16px] px-3 py-3 mb-3"
                    style={{
                      borderColor: isEdited
                        ? "#C29424"
                        : "#E7DFC6",
                    }}
                  >
                    <View className="flex-row items-center">
                      <View className="w-[42px] h-[42px] rounded-full bg-[#EFEAD6] items-center justify-center">
                        <Ionicons
                          name={aspect.icon}
                          size={21}
                          color="#554B41"
                        />
                      </View>

                      <View className="flex-1 ml-3">
                        <Text className="text-[#554B41] text-[15px] font-bold">
                          {aspect.label}
                        </Text>

                        <View className="flex-row items-center mt-1">
                          <Text
                            numberOfLines={1}
                            className="text-[#80775C] text-[12px]"
                            style={{
                              flexShrink: 1,
                            }}
                          >
                            {currentValue ||
                              "Selecione um alimento"}
                          </Text>

                          {isEdited ? (
                            <View className="ml-2 bg-[#F8F0D9] rounded-full px-2 py-0.5">
                              <Text className="text-[#8A6A12] text-[10px] font-bold">
                                só nesta refeição
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      </View>

                      {selectedFood ? (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            setEditingAspect(
                              isEditing
                                ? null
                                : aspect.key
                            )
                          }
                          accessibilityRole="button"
                          accessibilityLabel={`Editar ${aspect.label} nesta refeição`}
                          className="flex-row items-center bg-[#F4EEDA] rounded-full px-3 py-1.5 ml-2"
                        >
                          <Ionicons
                            name={
                              isEditing
                                ? "chevron-up"
                                : "create-outline"
                            }
                            size={14}
                            color="#554B41"
                          />

                          <Text className="text-[#554B41] text-[11px] font-bold ml-1">
                            {isEditing
                              ? "Fechar"
                              : "Editar"}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>

                    {isEditing ? (
                      <View className="mt-3 bg-[#FBF8EE] border border-[#E7DFC6] rounded-[14px] px-3 py-3">
                        <Text className="text-[#80775C] text-[12px] leading-5">
                          Altera apenas esta refeição. O cadastro do alimento não é modificado.
                        </Text>

                        <View className="flex-row flex-wrap mt-2">
                          {options.map((option) => {
                            const selected =
                              currentValue ===
                              option;

                            return (
                              <TouchableOpacity
                                key={option}
                                activeOpacity={0.8}
                                onPress={() =>
                                  handleSelectCharacteristic(
                                    aspect.key,
                                    option
                                  )
                                }
                                accessibilityRole="button"
                                accessibilityState={{
                                  selected,
                                }}
                                className="rounded-full border px-3 py-1.5 mr-2 mb-2"
                                style={{
                                  borderColor: selected
                                    ? "#438C3B"
                                    : "#E7DFC6",
                                  backgroundColor: selected
                                    ? "#EDF6E8"
                                    : "#FFFFFF",
                                }}
                              >
                                <Text
                                  className="text-[13px] font-medium"
                                  style={{
                                    color: selected
                                      ? "#2F6B28"
                                      : "#554B41",
                                  }}
                                >
                                  {option}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>

                        {isEdited ? (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                              handleResetCharacteristic(
                                aspect.key
                              )
                            }
                            className="mt-1 self-start"
                          >
                            <Text className="text-[#9B5547] text-[12px] font-bold">
                              {`Restaurar original${
                                originalValue
                                  ? ` (${originalValue})`
                                  : ""
                              }`}
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    ) : null}

                    <View className="flex-row mt-3">
                      {FEEDBACK_CHOICES.map(
                        (choice, index) => {
                          const selected =
                            feedback?.gostou ===
                            choice.gostou;

                          return (
                            <TouchableOpacity
                              key={choice.label}
                              activeOpacity={0.8}
                              onPress={() =>
                                handleSetFeedback(
                                  aspect.key,
                                  choice.gostou
                                )
                              }
                              accessibilityRole="button"
                              accessibilityState={{
                                selected,
                              }}
                              className={`flex-1 h-[44px] rounded-[14px] border flex-row items-center justify-center ${
                                index === 0
                                  ? "mr-2"
                                  : ""
                              }`}
                              style={{
                                borderColor: selected
                                  ? choice.color
                                  : "#E7DFC6",
                                backgroundColor: selected
                                  ? choice.background
                                  : "#FFFFFF",
                              }}
                            >
                              <Ionicons
                                name={choice.icon}
                                size={20}
                                color={choice.color}
                              />

                              <Text
                                className="text-[13px] font-bold ml-2"
                                style={{
                                  color: selected
                                    ? choice.color
                                    : "#554B41",
                                }}
                              >
                                {choice.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        }
                      )}
                    </View>

                    <Text className="text-[#A3987B] text-[11px] mt-2">
                      {feedback
                        ? "Toque novamente na opção escolhida para remover."
                        : "Não informado."}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* =================================
              Resumo
              ================================= */}

          <View className="bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 py-4 mt-4">
            <Text className="text-[#554B41] text-[18px] font-bold">
              Resumo
            </Text>

            <View className="flex-row items-center mt-3">
              <Ionicons
                name="happy-outline"
                size={20}
                color="#806A42"
              />

              <Text className="text-[#554B41] text-[14px] ml-2">
                Reação:{" "}
                <Text className="font-bold">
                  {emotion}
                </Text>
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Ionicons
                name="restaurant-outline"
                size={20}
                color="#806A42"
              />

              <Text className="flex-1 text-[#554B41] text-[14px] ml-2">
                Alimento:{" "}
                <Text className="font-bold">
                  {selectedFood?.nome ||
                    "não selecionado"}
                </Text>
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Ionicons
                name="analytics-outline"
                size={20}
                color="#806A42"
              />

              <Text className="text-[#554B41] text-[14px] ml-2">
                Feedbacks sensoriais:{" "}
                <Text className="font-bold">
                  {
                    sensoryFeedbacks.length
                  }
                </Text>
              </Text>
            </View>

            {changedCharacteristicsCount > 0 ? (
              <View className="flex-row items-center mt-2">
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#806A42"
                />

                <Text className="flex-1 text-[#554B41] text-[14px] ml-2">
                  Características ajustadas nesta refeição:{" "}
                  <Text className="font-bold">
                    {changedCharacteristicsCount}
                  </Text>
                </Text>
              </View>
            ) : null}

            <View className="flex-row items-center mt-2">
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#806A42"
              />

              <Text className="text-[#554B41] text-[14px] ml-2">
                {currentDate}
              </Text>
            </View>
          </View>

          {submitError ? (
            <View className="bg-[#FCEBE8] rounded-[16px] px-3 py-3 mt-4">
              <Text className="text-[#D9534F] text-[14px] font-medium text-center">
                {submitError}
              </Text>
            </View>
          ) : null}

          {/* =================================
              Ações
              ================================= */}

          <TouchableOpacity
            activeOpacity={
              0.85
            }
            onPress={
              handleSubmit
            }
            disabled={
              saving
            }
            className="h-[56px] bg-[#438C3B] rounded-[18px] items-center justify-center flex-row mt-5"
            style={{
              opacity:
                saving
                  ? 0.65
                  : 1,
            }}
          >
            {saving ? (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />
            ) : (
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#FFFFFF"
              />
            )}

            <Text className="text-white text-[16px] font-bold ml-2">
              {saving
                ? "Salvando..."
                : "Confirmar e salvar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={
              0.8
            }
            disabled={
              saving
            }
            onPress={
              onClose
            }
            className="h-[52px] border border-[#C98F7C] rounded-[16px] items-center justify-center mt-3"
          >
            <Text className="text-[#9B5547] text-[15px] font-medium">
              Cancelar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
