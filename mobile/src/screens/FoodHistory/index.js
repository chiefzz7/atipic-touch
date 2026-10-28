import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SectionList,
  ActivityIndicator,
  RefreshControl,
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
  useRouter,
} from "expo-router";

import BottomNavigation from "../../components/BottomNavigation";

import {
  getChildren,
} from "../../services/children/children";

import {
  getSelectedChild,
} from "../../services/children/selectedChild";

import {
  getFeedingLogs,
} from "../../services/dashboard/dashboard";

const FILTERS = [
  "Todos",
  "Gostou",
  "Neutro",
  "Não gostou",
];

const REACTION_STYLE = {
  Gostou: {
    icon: "happy-outline",
    color: "#4D9B43",
    background: "#EDF6E8",
  },
  Neutro: {
    icon: "remove-circle-outline",
    color: "#C29424",
    background: "#F8F0D9",
  },
  "Não gostou": {
    icon: "sad-outline",
    color: "#D9534F",
    background: "#FCEBE8",
  },
};

// Mesma regra usada no Dashboard
function getReactionLabel(reaction) {
  if (typeof reaction === "string") {
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
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatTime(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function getDayKey(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "sem-data";
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function getDayTitle(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Sem data";
  }

  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatted = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

  if (getDayKey(date) === getDayKey(today)) {
    return `Hoje · ${formatted}`;
  }

  if (getDayKey(date) === getDayKey(yesterday)) {
    return `Ontem · ${formatted}`;
  }

  return formatted;
}

function getOriginInfo(origin) {
  const value = String(origin || "").toUpperCase();

  if (value === "IOT") {
    return {
      icon: "hardware-chip-outline",
      label: "Dispositivo",
    };
  }

  if (value === "MANUAL") {
    return {
      icon: "create-outline",
      label: "Manual",
    };
  }

  return null;
}

export default function FoodHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [child, setChild] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Todos");

  const loadHistory = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const children = await getChildren();

      const childrenList = Array.isArray(children)
        ? children
        : [];

      if (childrenList.length === 0) {
        throw new Error(
          "Nenhuma criança cadastrada para este responsável."
        );
      }

      const storedChild = await getSelectedChild();

      const currentChild =
        (storedChild?.id &&
          childrenList.find(
            (item) => item.id === storedChild.id
          )) ||
        (childrenList.length === 1 ? childrenList[0] : null);

      if (!currentChild) {
        throw new Error(
          "Selecione uma criança na tela inicial para ver o histórico."
        );
      }

      setChild(currentChild);

      const data = await getFeedingLogs(currentChild.id);

      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar histórico alimentar:", err);

      setError(
        err?.message ||
          "Não foi possível carregar o histórico alimentar."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/dashboard");
  }

  const sortedLogs = useMemo(
    () =>
      [...logs].sort(
        (a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
      ),
    [logs]
  );

  const counts = useMemo(() => {
    const result = {
      Todos: sortedLogs.length,
      Gostou: 0,
      Neutro: 0,
      "Não gostou": 0,
    };

    sortedLogs.forEach((log) => {
      const label = getReactionLabel(log.reacao);

      if (result[label] !== undefined) {
        result[label] += 1;
      }
    });

    return result;
  }, [sortedLogs]);

  const sections = useMemo(() => {
    const visibleLogs =
      filter === "Todos"
        ? sortedLogs
        : sortedLogs.filter(
            (log) => getReactionLabel(log.reacao) === filter
          );

    const groups = [];
    const indexByKey = {};

    visibleLogs.forEach((log) => {
      const key = getDayKey(log.timestamp);

      if (indexByKey[key] === undefined) {
        indexByKey[key] = groups.length;

        groups.push({
          key,
          title: getDayTitle(log.timestamp),
          data: [],
        });
      }

      groups[indexByKey[key]].data.push(log);
    });

    return groups;
  }, [sortedLogs, filter]);

  function renderFilters() {
    return (
      <View className="mb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingRight: 8,
          }}
        >
          {FILTERS.map((item) => {
            const active = filter === item;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setFilter(item)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`flex-row items-center rounded-full px-4 py-2 mr-2 border ${
                  active
                    ? "bg-[#438C3B] border-[#438C3B]"
                    : "bg-white border-[#E7DFC6]"
                }`}
              >
                <Text
                  className={`text-[14px] font-bold ${
                    active
                      ? "text-white"
                      : "text-[#554B41]"
                  }`}
                >
                  {item}
                </Text>

                <View
                  className={`ml-2 rounded-full px-2 min-w-[22px] items-center ${
                    active
                      ? "bg-white/25"
                      : "bg-[#F4EEDA]"
                  }`}
                >
                  <Text
                    className={`text-[12px] font-bold ${
                      active
                        ? "text-white"
                        : "text-[#80775C]"
                    }`}
                  >
                    {counts[item]}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  function renderItem({ item }) {
    const reaction = getReactionLabel(item.reacao);

    const visual =
      REACTION_STYLE[reaction] || REACTION_STYLE.Neutro;

    const origin = getOriginInfo(item.origem);

    const time = formatTime(item.timestamp);

    return (
      <View className="flex-row items-center bg-white border border-[#EFE7D0] shadow-sm rounded-[20px] px-4 py-3 mb-2">
        <View
          className="w-[46px] h-[46px] rounded-[16px] items-center justify-center"
          style={{
            backgroundColor: visual.background,
          }}
        >
          <Ionicons
            name={visual.icon}
            size={26}
            color={visual.color}
          />
        </View>

        <View className="flex-1 ml-3">
          <Text
            numberOfLines={1}
            className="text-[#554B41] text-[16px] font-bold"
          >
            {item.alimento?.nome || "Alimento"}
          </Text>

          <View className="flex-row flex-wrap items-center mt-1">
            {time ? (
              <Text className="text-[#80775C] text-[12px] mr-3">
                {time}
              </Text>
            ) : null}

            {origin ? (
              <View className="flex-row items-center mr-3">
                <Ionicons
                  name={origin.icon}
                  size={13}
                  color="#80775C"
                />

                <Text className="text-[#80775C] text-[12px] ml-1">
                  {origin.label}
                </Text>
              </View>
            ) : null}

            {item.alimento?.cor ? (
              <View className="flex-row items-center">
                <Ionicons
                  name="color-palette-outline"
                  size={13}
                  color="#806A42"
                />

                <Text className="text-[#806A42] text-[12px] ml-1">
                  {item.alimento.cor}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View
          className="rounded-full px-3 py-1 ml-2"
          style={{
            backgroundColor: visual.background,
          }}
        >
          <Text
            className="text-[12px] font-bold"
            style={{
              color: visual.color,
            }}
          >
            {reaction}
          </Text>
        </View>
      </View>
    );
  }

  function renderSectionHeader({ section }) {
    return (
      <Text className="text-[#80775C] text-[13px] font-bold mt-4 mb-2 ml-1">
        {section.title}
      </Text>
    );
  }

  function renderEmpty() {
    const hasLogs = sortedLogs.length > 0;

    return (
      <View className="items-center justify-center py-16 px-6">
        <View className="w-[72px] h-[72px] rounded-full bg-[#EAF3E3] items-center justify-center">
          <Ionicons
            name="nutrition-outline"
            size={34}
            color="#438C3B"
          />
        </View>

        <Text className="text-[#554B41] text-[17px] font-bold text-center mt-4">
          {hasLogs
            ? "Nenhum registro neste filtro"
            : "Nenhuma refeição registrada"}
        </Text>

        <Text className="text-[#80775C] text-[14px] text-center mt-2">
          {hasLogs
            ? "Escolha outra opção acima para ver mais registros."
            : "Quando uma refeição for registrada, ela aparecerá aqui."}
        </Text>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-[#FFFCEF]"
      style={{
        paddingTop: insets.top,
      }}
    >
      <StatusBar style="dark" />

      <View className="px-4 pt-3 pb-3 flex-row items-center">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          className="w-[44px] h-[44px] rounded-full bg-white border border-[#EFE7D0] items-center justify-center"
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#554B41"
          />
        </TouchableOpacity>

        <View className="flex-1 ml-3">
          <Text className="text-[#554B41] text-[22px] font-bold">
            Histórico alimentar
          </Text>

          {child?.nome ? (
            <Text
              numberOfLines={1}
              className="text-[#80775C] text-[13px] mt-0.5"
            >
              {child.nome}
            </Text>
          ) : null}
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="large"
            color="#438C3B"
          />

          <Text className="text-[#80775C] text-[14px] mt-3">
            Carregando histórico alimentar...
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-8">
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

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => loadHistory()}
            className="mt-5 bg-[#438C3B] rounded-[18px] px-6 py-3"
          >
            <Text className="text-white text-[15px] font-bold">
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) =>
            String(item.id || `${item.timestamp}-${index}`)
          }
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ListHeaderComponent={renderFilters}
          ListEmptyComponent={renderEmpty}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadHistory(true)}
              colors={["#438C3B"]}
              tintColor="#438C3B"
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 120,
          }}
        />
      )}

      <BottomNavigation active="dashboard" />
    </View>
  );
}
