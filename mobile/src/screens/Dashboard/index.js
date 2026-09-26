import React, {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
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
  getChildren,
} from "../../services/children/children";

import {
  getSelectedChild,
  saveSelectedChild,
} from "../../services/children/selectedChild";

import {
  getFeedingLogs,
} from "../../services/dashboard/dashboard";

import bluetoothService from "../../services/bluetooth/bluetoothService";

import AvatarHeader from "../../components/AvatarHeader";
import BottomNavigation from "../../components/BottomNavigation";
import SectionCard from "../../components/SectionCard";
import InteractionModal from "../../components/InteractionModal";

export default function DashboardScreen() {
  const insets =
    useSafeAreaInsets();

  const [modalVisible, setModalVisible] =
    useState(false);

  const [feedingLogs, setFeedingLogs] =
    useState([]);

  const [child, setChild] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [bleReaction, setBleReaction] =
    useState("Gostou");

  const [
    availableChildren,
    setAvailableChildren,
  ] = useState([]);

  const [
    childSelectionVisible,
    setChildSelectionVisible,
  ] = useState(false);

  const [
    selectingChildId,
    setSelectingChildId,
  ] = useState(null);

  // ========================================
  // Eventos do ESP32
  // ========================================

  useEffect(() => {
    const removerListener =
      bluetoothService.adicionarListener(
        (evento) => {
          let reaction = null;

          if (
            evento?.botao === "aceitou" ||
            evento?.value === 1
          ) {
            reaction = "Gostou";

          } else if (
            evento?.botao === "rejeitou" ||
            evento?.value === 2
          ) {
            reaction = "Não gostou";

          } else if (
            evento?.botao === "neutro" ||
            evento?.value === 3
          ) {
            reaction = "Neutro";
          }

          if (!reaction) {
            return;
          }

          console.log(
            "REAÇÃO RECEBIDA DO ESP32:",
            reaction
          );

          setBleReaction(
            reaction
          );

          setModalVisible(
            true
          );
        }
      );

    return removerListener;
  }, []);

  // ========================================
  // Carregar dados da criança
  // ========================================

  async function loadChildData(
    selectedChild
  ) {
    if (!selectedChild?.id) {
      throw new Error(
        "Criança inválida."
      );
    }

    console.log(
      "CRIANÇA SELECIONADA:",
      selectedChild
    );

    console.log(
      "CRIANÇA ID:",
      selectedChild.id
    );

    setChild(
      selectedChild
    );

    const data =
      await getFeedingLogs(
        selectedChild.id
      );

    console.log(
      "HISTÓRICO ALIMENTAR:",
      data
    );

    setFeedingLogs(
      Array.isArray(data)
        ? data
        : []
    );
  }

  // ========================================
  // Inicialização do Dashboard
  // ========================================

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        // Busca somente as crianças
        // vinculadas ao responsável
        // autenticado.
        const children =
          await getChildren();

        const childrenList =
          Array.isArray(children)
            ? children
            : [];

        console.log(
          "CRIANÇAS DO RESPONSÁVEL:",
          childrenList
        );

        setAvailableChildren(
          childrenList
        );

        // Nenhuma criança cadastrada.
        if (
          childrenList.length === 0
        ) {
          throw new Error(
            "Nenhuma criança cadastrada para este responsável."
          );
        }

        const storedChild =
          await getSelectedChild();

        // ====================================
        // Apenas uma criança
        // ====================================

        if (
          childrenList.length === 1
        ) {
          const onlyChild =
            childrenList[0];

          await saveSelectedChild(
            onlyChild
          );

          await loadChildData(
            onlyChild
          );

          return;
        }

        // ====================================
        // Mais de uma criança
        // ====================================

        const storedChildIsValid =
          storedChild?.id &&
          childrenList.some(
            (currentChild) =>
              currentChild.id ===
              storedChild.id
          );

        // Já existe uma criança selecionada
        // e ela pertence ao responsável atual.
        if (
          storedChildIsValid
        ) {
          const currentChild =
            childrenList.find(
              (item) =>
                item.id ===
                storedChild.id
            );

          await loadChildData(
            currentChild
          );

          return;
        }

        // Não existe seleção válida.
        // O responsável precisa escolher.
        setChildSelectionVisible(
          true
        );

      } catch (err) {
        console.error(
          "Erro ao carregar Dashboard:",
          err
        );

        setError(
          err?.message ||
          "Não foi possível carregar o Dashboard."
        );

      } finally {
        setLoading(false);
      }
    }

    loadDashboard();

  }, []);

  // ========================================
  // Selecionar criança no modal
  // ========================================

  async function handleSelectChild(
    selectedChild
  ) {
    if (
      !selectedChild?.id ||
      selectingChildId
    ) {
      return;
    }

    try {
      setSelectingChildId(
        selectedChild.id
      );

      setError(null);

      await saveSelectedChild(
        selectedChild
      );

      setChildSelectionVisible(
        false
      );

      setLoading(
        true
      );

      await loadChildData(
        selectedChild
      );

    } catch (err) {
      console.error(
        "Erro ao selecionar criança:",
        err
      );

      setError(
        err?.message ||
        "Não foi possível selecionar a criança."
      );

    } finally {
      setSelectingChildId(
        null
      );

      setLoading(
        false
      );
    }
  }

  // ========================================
  // Dados do Dashboard
  // ========================================

  const sortedLogs =
    [...feedingLogs].sort(
      (a, b) =>
        new Date(b.timestamp) -
        new Date(a.timestamp)
    );

  const lastMeal =
    sortedLogs[0];

  const recentLogs =
    sortedLogs.slice(
      0,
      5
    );

  const getReactionLabel =
    (reaction) => {
      if (
        typeof reaction === "string"
      ) {
        return reaction;
      }

      switch (reaction) {
        case 1:
          return "Gostou";

        case 2:
          return "Não gostou";

        case 3:
          return "Neutro";

        default:
          return "Neutro";
      }
    };

  const reactionData = [
    {
      label: "Gostou",

      value:
        recentLogs.filter(
          (log) =>
            getReactionLabel(
              log.reacao
            ) === "Gostou"
        ).length,

      icon:
        "happy-outline",

      iconColor:
        "#4D9B43",

      background:
        "#EDF6E8",
    },

    {
      label: "Neutro",

      value:
        recentLogs.filter(
          (log) =>
            getReactionLabel(
              log.reacao
            ) === "Neutro"
        ).length,

      icon:
        "remove-circle-outline",

      iconColor:
        "#C29424",

      background:
        "#F8F0D9",
    },

    {
      label:
        "Não gostou",

      value:
        recentLogs.filter(
          (log) =>
            getReactionLabel(
              log.reacao
            ) ===
            "Não gostou"
        ).length,

      icon:
        "sad-outline",

      iconColor:
        "#D9534F",

      background:
        "#FCEBE8",
    },
  ];

  const formatDate =
    (timestamp) => {
      if (!timestamp) {
        return "";
      }

      const date =
        new Date(
          timestamp
        );

      return date.toLocaleString(
        "pt-BR",
        {
          day:
            "2-digit",
          month:
            "2-digit",
          hour:
            "2-digit",
          minute:
            "2-digit",
        }
      );
    };

  const getMealImage =
    (foodName) => {
      if (
        foodName === "Feijão"
      ) {
        return require(
          "../../../assets/images/foods/feijao.png"
        );
      }

      return require(
        "../../../assets/images/foods/feijao.png"
      );
    };

  return (
    <View
      className="flex-1 bg-[#FFFCEF]"
      style={{
        paddingTop:
          insets.top,
      }}
    >
      <StatusBar
        style="dark"
      />

      <ScrollView
        className="flex-1 px-3 pt-2"
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom:
            120,
        }}
      >
        <AvatarHeader
          variant="dashboard"
          greeting="Bom dia"
          childName={
            child?.nome ||
            ""
          }
          hasNotification={
            true
          }
          onNotificationPress={() =>
            setModalVisible(
              true
            )
          }
        />

        {loading ? (
          <View className="items-center justify-center py-20">
            <ActivityIndicator
              size="large"
              color="#4D9B43"
            />

            <Text className="text-[#80775C] text-[14px] mt-3">
              Carregando histórico alimentar...
            </Text>
          </View>

        ) : error ? (
          <View className="items-center justify-center py-20 px-6">
            <Ionicons
              name="alert-circle-outline"
              size={42}
              color="#D9534F"
            />

            <Text className="text-[#554B41] text-[16px] font-bold text-center mt-3">
              Não foi possível carregar os dados.
            </Text>

            <Text className="text-[#80775C] text-[13px] text-center mt-2">
              {error}
            </Text>
          </View>

        ) : (
          <>
            <View className="mt-2">
              <SectionCard
                title="Última refeição"
                subtitle={
                  lastMeal
                    ? formatDate(
                        lastMeal.timestamp
                      )
                    : "Nenhuma refeição registrada"
                }
              >
                {lastMeal ? (
                  <View className="flex-row items-center">
                    <View className="w-[90px] h-[90px] rounded-[10px] overflow-hidden bg-[#F4F0E5]">
                      <Image
                        source={
                          getMealImage(
                            lastMeal
                              .alimento
                              ?.nome
                          )
                        }
                        style={{
                          width:
                            "100%",
                          height:
                            "100%",
                        }}
                        resizeMode="cover"
                      />
                    </View>

                    <View className="flex-1 ml-4">
                      <Text
                        numberOfLines={
                          2
                        }
                        className="text-[#554B41] text-[18px] font-bold"
                      >
                        {
                          lastMeal
                            .alimento
                            ?.nome ||
                          "Alimento"
                        }
                      </Text>

                      <View className="flex-row flex-wrap mt-3">
                        <View
                          className={`flex-row items-center rounded-full px-3 py-1 mr-2 ${
                            getReactionLabel(
                              lastMeal.reacao
                            ) ===
                            "Gostou"
                              ? "bg-[#EDF6E8]"
                              : getReactionLabel(
                                  lastMeal.reacao
                                ) ===
                                "Não gostou"
                              ? "bg-[#FCEBE8]"
                              : "bg-[#F8F0D9]"
                          }`}
                        >
                          <Ionicons
                            name={
                              getReactionLabel(
                                lastMeal.reacao
                              ) ===
                              "Gostou"
                                ? "happy-outline"
                                : getReactionLabel(
                                    lastMeal.reacao
                                  ) ===
                                  "Não gostou"
                                ? "sad-outline"
                                : "remove-circle-outline"
                            }
                            size={
                              17
                            }
                            color={
                              getReactionLabel(
                                lastMeal.reacao
                              ) ===
                              "Gostou"
                                ? "#4D9B43"
                                : getReactionLabel(
                                    lastMeal.reacao
                                  ) ===
                                  "Não gostou"
                                ? "#D9534F"
                                : "#C29424"
                            }
                          />

                          <Text
                            className={`font-bold ml-1 text-[12px] ${
                              getReactionLabel(
                                lastMeal.reacao
                              ) ===
                              "Gostou"
                                ? "text-[#4D9B43]"
                                : getReactionLabel(
                                    lastMeal.reacao
                                  ) ===
                                  "Não gostou"
                                ? "text-[#D9534F]"
                                : "text-[#C29424]"
                            }`}
                          >
                            {
                              getReactionLabel(
                                lastMeal.reacao
                              )
                            }
                          </Text>
                        </View>

                        {lastMeal
                          .alimento
                          ?.cor && (
                          <View className="flex-row items-center bg-[#F8F0D9] rounded-full px-3 py-1">
                            <Ionicons
                              name="color-palette-outline"
                              size={
                                17
                              }
                              color="#806A42"
                            />

                            <Text className="text-[#806A42] font-bold ml-1 text-[12px]">
                              {
                                lastMeal
                                  .alimento
                                  .cor
                              }
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>

                ) : (
                  <Text className="text-[#80775C] text-[14px]">
                    Nenhuma refeição encontrada.
                  </Text>
                )}
              </SectionCard>
            </View>

            <View className="mt-5">
              <SectionCard
                title="Como está indo?"
                subtitle="Resumo das últimas 5 refeições"
              >
                <View className="flex-row -mx-1">
                  {reactionData.map(
                    (
                      item
                    ) => (
                      <View
                        key={
                          item.label
                        }
                        className="flex-1 mx-1 rounded-[10px] p-3 items-center"
                        style={{
                          backgroundColor:
                            item.background,
                        }}
                      >
                        <Ionicons
                          name={
                            item.icon
                          }
                          size={
                            30
                          }
                          color={
                            item.iconColor
                          }
                        />

                        <Text
                          className="text-[24px] font-bold mt-1"
                          style={{
                            color:
                              item.iconColor,
                          }}
                        >
                          {
                            item.value
                          }
                        </Text>

                        <Text
                          numberOfLines={
                            1
                          }
                          adjustsFontSizeToFit
                          minimumFontScale={
                            0.75
                          }
                          className="text-[11px] font-bold"
                          style={{
                            color:
                              item.iconColor,
                          }}
                        >
                          {
                            item.label
                          }
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </SectionCard>
            </View>

            <View className="mt-5">
              <SectionCard
                title="Alimentos recentes"
              >
                <View>
                  <View className="flex-row justify-end mb-2">
                    <TouchableOpacity
                      activeOpacity={
                        0.7
                      }
                      onPress={() => {}}
                      className="flex-row items-center"
                    >
                      <Text className="text-[#4D9B43] text-[14px] font-bold">
                        Ver histórico
                      </Text>

                      <Ionicons
                        name="arrow-forward"
                        size={
                          17
                        }
                        color="#4D9B43"
                        style={{
                          marginLeft:
                            4,
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  {recentLogs
                    .slice(
                      0,
                      3
                    )
                    .map(
                      (
                        log,
                        index
                      ) => {
                        const reaction =
                          getReactionLabel(
                            log.reacao
                          );

                        return (
                          <TouchableOpacity
                            key={
                              log.id ||
                              `${
                                log
                                  .alimento
                                  ?.nome
                              }-${index}`
                            }
                            activeOpacity={
                              0.75
                            }
                            className={`flex-row items-center py-3 ${
                              index !==
                              Math.min(
                                recentLogs.length,
                                3
                              ) -
                                1
                                ? "border-b border-[#E9E1CF]"
                                : ""
                            }`}
                          >
                            <View className="flex-1">
                              <Text
                                numberOfLines={
                                  1
                                }
                                className="text-[#554B41] text-[15px] font-bold"
                              >
                                {
                                  log
                                    .alimento
                                    ?.nome ||
                                  "Alimento"
                                }
                              </Text>

                              <Text className="text-[#80775C] text-[12px] mt-1">
                                {
                                  formatDate(
                                    log.timestamp
                                  )
                                }
                              </Text>
                            </View>

                            <View
                              className={`w-[38px] h-[38px] rounded-[9px] items-center justify-center ${
                                reaction ===
                                "Gostou"
                                  ? "bg-[#EDF6E8]"
                                  : reaction ===
                                    "Não gostou"
                                  ? "bg-[#FCEBE8]"
                                  : "bg-[#F8F0D9]"
                              }`}
                            >
                              <Ionicons
                                name={
                                  reaction ===
                                  "Gostou"
                                    ? "happy-outline"
                                    : reaction ===
                                      "Não gostou"
                                    ? "sad-outline"
                                    : "remove-outline"
                                }
                                size={
                                  22
                                }
                                color={
                                  reaction ===
                                  "Gostou"
                                    ? "#4D9B43"
                                    : reaction ===
                                      "Não gostou"
                                    ? "#D9534F"
                                    : "#C29424"
                                }
                              />
                            </View>

                            <Ionicons
                              name="chevron-forward"
                              size={
                                18
                              }
                              color="#A3987B"
                              style={{
                                marginLeft:
                                  5,
                              }}
                            />
                          </TouchableOpacity>
                        );
                      }
                    )}
                </View>
              </SectionCard>
            </View>
          </>
        )}
      </ScrollView>

      {/* ===================================
          Modal de seleção de criança
          =================================== */}

      <Modal
        visible={
          childSelectionVisible
        }
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View className="flex-1 bg-black/40 items-center justify-center px-5">
          <View className="w-full max-w-[420px] bg-[#FFFCEF] rounded-[20px] px-5 py-6">
            <View className="items-center">
              <View className="w-[58px] h-[58px] rounded-full bg-[#E5D8B0] items-center justify-center">
                <Ionicons
                  name="people"
                  size={
                    30
                  }
                  color="#6F4E24"
                />
              </View>

              <Text className="text-[#554B41] text-[22px] font-bold text-center mt-4">
                Selecione uma criança
              </Text>

              <Text className="text-[#80775C] text-[14px] text-center mt-2">
                Quem você deseja acompanhar?
              </Text>
            </View>

            <View className="mt-5">
              {availableChildren.map(
                (
                  currentChild
                ) => {
                  const isSelecting =
                    selectingChildId ===
                    currentChild.id;

                  return (
                    <TouchableOpacity
                      key={
                        currentChild.id
                      }
                      activeOpacity={
                        0.8
                      }
                      disabled={
                        selectingChildId !==
                        null
                      }
                      onPress={() =>
                        handleSelectChild(
                          currentChild
                        )
                      }
                      className="w-full min-h-[70px] border border-[#E5DCC4] bg-white rounded-[12px] px-4 py-3 mb-3 flex-row items-center"
                    >
                      <View className="w-[46px] h-[46px] rounded-full bg-[#F2F0E8] items-center justify-center">
                        <Ionicons
                          name="person"
                          size={
                            25
                          }
                          color="#A3987B"
                        />
                      </View>

                      <View className="flex-1 ml-4">
                        <Text
                          numberOfLines={
                            1
                          }
                          className="text-[#554B41] text-[17px] font-bold"
                        >
                          {
                            currentChild.nome ||
                            "Criança"
                          }
                        </Text>
                      </View>

                      {isSelecting ? (
                        <ActivityIndicator
                          size="small"
                          color="#4D9B43"
                        />

                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={
                            22
                          }
                          color="#A3987B"
                        />
                      )}
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          </View>
        </View>
      </Modal>

      <InteractionModal
        visible={
          modalVisible
        }
        initialEmotion={
          bleReaction
        }
        onClose={() =>
          setModalVisible(
            false
          )
        }
        onSubmit={(
          experience
        ) => {
          console.log(
            experience
          );

          setModalVisible(
            false
          );
        }}
      />

      <BottomNavigation
        active="dashboard"
      />
    </View>
  );
}
