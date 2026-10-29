import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
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
  useRouter,
} from "expo-router";

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

import {
  createFeedingLog,
} from "../../services/feedingLogs/feedingLogs";

import bluetoothService from "../../services/bluetooth/bluetoothService";

import AvatarHeader from "../../components/AvatarHeader";
import BottomNavigation from "../../components/BottomNavigation";
import SectionCard from "../../components/SectionCard";
import InteractionModal from "../../components/InteractionModal";

function getBleReaction(
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
    return {
      value:
        1,

      label:
        "Gostou",
    };
  }

  if (
    evento?.botao ===
      "rejeitou" ||
    Number(
      evento?.value
    ) === 2
  ) {
    return {
      value:
        2,

      label:
        "Não gostou",
    };
  }

  if (
    evento?.botao ===
      "neutro" ||
    Number(
      evento?.value
    ) === 3
  ) {
    return {
      value:
        3,

      label:
        "Neutro",
    };
  }

  return null;
}

export default function DashboardScreen() {
  const router =
    useRouter();

  const insets =
    useSafeAreaInsets();

  const [
    modalVisible,
    setModalVisible,
  ] = useState(false);

  const modalVisibleRef =
    useRef(false);

  const [
    interactionOrigin,
    setInteractionOrigin,
  ] = useState(
    "IOT"
  );

  const [
    feedingLogs,
    setFeedingLogs,
  ] = useState([]);

  const [
    child,
    setChild,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const [
    bleReaction,
    setBleReaction,
  ] = useState(
    "Gostou"
  );

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

  useEffect(() => {
    modalVisibleRef.current =
      modalVisible;
  }, [
    modalVisible,
  ]);

  useEffect(() => {
    const removerListener =
      bluetoothService
        .adicionarListener(
          (
            evento
          ) => {
            if (
              evento?.tipo ===
              "sensorial"
            ) {
              return;
            }

            const reaction =
              getBleReaction(
                evento
              );

            if (
              !reaction
            ) {
              return;
            }

            if (
              modalVisibleRef
                .current
            ) {
              return;
            }

            console.log(
              "REAÇÃO GERAL RECEBIDA DO ESP32:",
              reaction.label
            );

            setBleReaction(
              reaction.label
            );

            setInteractionOrigin(
              "IOT"
            );

            modalVisibleRef.current =
              true;

            setModalVisible(
              true
            );
          }
        );

    return removerListener;
  }, []);

  function handleCloseInteraction() {
    modalVisibleRef.current =
      false;

    setModalVisible(
      false
    );
  }

  function handleOpenManualInteraction() {
    setBleReaction(
      "Gostou"
    );

    setInteractionOrigin(
      "MANUAL"
    );

    modalVisibleRef.current =
      true;

    setModalVisible(
      true
    );
  }

  async function handleInteractionSubmit({
    reaction,
    food,
    feedbacks,
    mealCharacteristics,
  }) {
    if (
      !child?.id
    ) {
      throw new Error(
        "Nenhuma criança selecionada."
      );
    }

    if (
      !food?.id
    ) {
      throw new Error(
        "Selecione um alimento."
      );
    }

    console.log(
      "========== INTERAÇÃO =========="
    );

    console.log(
      "CRIANÇA:",
      child.id
    );

    console.log(
      "ALIMENTO:",
      food
    );

    console.log(
      "REAÇÃO:",
      reaction
    );

    console.log(
      "ORIGEM:",
      interactionOrigin
    );

    console.log(
      "FEEDBACKS SENSORIAIS:",
      feedbacks
    );

    const createdLog =
      await createFeedingLog({
        criancaId:
          child.id,

        alimentoId:
          food.id,

        reacao:
          reaction,

        origem:
          interactionOrigin,

        feedbacks:
          Array.isArray(
            feedbacks
          )
            ? feedbacks
            : [],

        caracteristicasAlimento:
          mealCharacteristics &&
          Object.keys(
            mealCharacteristics
          ).length > 0
            ? mealCharacteristics
            : null,
      });

    console.log(
      "REGISTRO CRIADO:",
      createdLog
    );

    const updatedLogs =
      await getFeedingLogs(
        child.id
      );

    setFeedingLogs(
      Array.isArray(
        updatedLogs
      )
        ? updatedLogs
        : []
    );

    return createdLog;
  }

  async function loadChildData(
    selectedChild
  ) {
    if (
      !selectedChild?.id
    ) {
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
      Array.isArray(
        data
      )
        ? data
        : []
    );
  }

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(
          true
        );

        setError(
          null
        );

        const children =
          await getChildren();

        const childrenList =
          Array.isArray(
            children
          )
            ? children
            : [];

        console.log(
          "CRIANÇAS DO RESPONSÁVEL:",
          childrenList
        );

        setAvailableChildren(
          childrenList
        );

        if (
          childrenList.length ===
          0
        ) {
          throw new Error(
            "Nenhuma criança cadastrada para este responsável."
          );
        }

        const storedChild =
          await getSelectedChild();

        if (
          childrenList.length ===
          1
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

        const storedChildIsValid =
          storedChild?.id &&
          childrenList.some(
            (
              currentChild
            ) =>
              currentChild.id ===
              storedChild.id
          );

        if (
          storedChildIsValid
        ) {
          const currentChild =
            childrenList.find(
              (
                item
              ) =>
                item.id ===
                storedChild.id
            );

          await loadChildData(
            currentChild
          );

          return;
        }

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
        setLoading(
          false
        );
      }
    }

    loadDashboard();
  }, []);

  async function handleSelectChild(
    selectedChild
  ) {
    if (
      !selectedChild?.id ||
      selectingChildId
    ) {
      return;
    }

    if (
      child?.id &&
      selectedChild.id ===
        child.id
    ) {
      setChildSelectionVisible(
        false
      );

      return;
    }

    try {
      setSelectingChildId(
        selectedChild.id
      );

      setError(
        null
      );

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

  const sortedLogs =
    [
      ...feedingLogs,
    ].sort(
      (
        a,
        b
      ) =>
        new Date(
          b.timestamp
        ) -
        new Date(
          a.timestamp
        )
    );

  const lastMeal =
    sortedLogs[0];

  const recentLogs =
    sortedLogs.slice(
      0,
      5
    );

  const getReactionLabel =
    (
      reaction
    ) => {
      if (
        typeof reaction ===
        "string"
      ) {
        return reaction;
      }

      switch (
        reaction
      ) {
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
      label:
        "Gostou",

      value:
        recentLogs.filter(
          (
            log
          ) =>
            getReactionLabel(
              log.reacao
            ) ===
            "Gostou"
        ).length,

      icon:
        "happy-outline",

      iconColor:
        "#4D9B43",

      background:
        "#EDF6E8",
    },

    {
      label:
        "Neutro",

      value:
        recentLogs.filter(
          (
            log
          ) =>
            getReactionLabel(
              log.reacao
            ) ===
            "Neutro"
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
          (
            log
          ) =>
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
    (
      timestamp
    ) => {
      if (
        !timestamp
      ) {
        return "";
      }

      const date =
        new Date(
          timestamp
        );

      return date
        .toLocaleString(
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
        className="flex-1 px-4 pt-2"
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
          onNotificationPress={
            handleOpenManualInteraction
          }
          onMenuPress={() =>
            setChildSelectionVisible(
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
                icon="time-outline"
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
                    <View className="w-[84px] h-[84px] rounded-[22px] bg-[#F4EEDA] items-center justify-center">
                      <View className="w-[52px] h-[52px] rounded-full bg-[#6E8F5C] items-center justify-center">
                        <Ionicons
                          name="restaurant-outline"
                          size={28}
                          color="#FFFCEF"
                        />
                      </View>
                    </View>

                    <View className="flex-1 ml-4">
                      <Text
                        numberOfLines={
                          2
                        }
                        className="text-[#554B41] text-[20px] font-bold"
                      >
                        {
                          lastMeal
                            .alimento
                            ?.nome ||
                          "Alimento"
                        }
                      </Text>

                      <View className="flex-row flex-wrap mt-2.5">
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
                            size={17}
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
                          ?.cor ? (
                          <View className="flex-row items-center bg-[#F8F0D9] rounded-full px-3 py-1">
                            <Ionicons
                              name="color-palette-outline"
                              size={17}
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
                        ) : null}
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
                icon="stats-chart-outline"
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
                        className="flex-1 mx-1 rounded-[18px] py-4 px-2 items-center"
                        style={{
                          backgroundColor:
                            item.background,
                        }}
                      >
                        <Ionicons
                          name={
                            item.icon
                          }
                          size={30}
                          color={
                            item.iconColor
                          }
                        />

                        <Text
                          className="text-[30px] font-bold mt-1"
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
                icon="nutrition-outline"
              >
                <View>
                  <View className="flex-row justify-end mb-2">
                    <TouchableOpacity
                      activeOpacity={
                        0.7
                      }
                      onPress={() =>
                        router.push(
                          "/food-history"
                        )
                      }
                      className="flex-row items-center bg-[#EAF3E3] rounded-full px-3 py-1.5"
                    >
                      <Text className="text-[#438C3B] text-[14px] font-bold">
                        Ver histórico
                      </Text>

                      <Ionicons
                        name="arrow-forward"
                        size={17}
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
                                ? "border-b border-[#F0E9D4]"
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
                              className={`w-[40px] h-[40px] rounded-[14px] items-center justify-center ${
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
                                size={22}
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
                              size={18}
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

      <Modal
        visible={
          childSelectionVisible
        }
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (
            child?.id &&
            !selectingChildId
          ) {
            setChildSelectionVisible(
              false
            );
          }
        }}
      >
        <View className="flex-1 bg-black/40 items-center justify-center px-5">
          <View className="w-full max-w-[420px] bg-[#FFFCEF] rounded-[28px] px-5 py-6">
            {child?.id ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setChildSelectionVisible(
                    false
                  )
                }
                disabled={
                  selectingChildId !==
                  null
                }
                accessibilityRole="button"
                accessibilityLabel="Fechar"
                className="absolute top-3 right-3 w-[36px] h-[36px] rounded-full bg-[#F4EEDA] items-center justify-center z-10"
              >
                <Ionicons
                  name="close"
                  size={20}
                  color="#554B41"
                />
              </TouchableOpacity>
            ) : null}

            <View className="items-center">
              <View className="w-[58px] h-[58px] rounded-full bg-[#EAF3E3] items-center justify-center">
                <Ionicons
                  name="people"
                  size={30}
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
                      className="w-full min-h-[70px] border border-[#EFE7D0] bg-white rounded-[18px] px-4 py-3 mb-3 flex-row items-center"
                    >
                      <View className="w-[46px] h-[46px] rounded-full bg-[#F2F0E8] items-center justify-center">
                        <Ionicons
                          name="person"
                          size={25}
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
                      ) : currentChild.id ===
                        child?.id ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={26}
                          color="#438C3B"
                        />
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={22}
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
        onClose={
          handleCloseInteraction
        }
        onSubmit={
          handleInteractionSubmit
        }
      />

      <BottomNavigation
        active="dashboard"
      />
    </View>
  );
}
