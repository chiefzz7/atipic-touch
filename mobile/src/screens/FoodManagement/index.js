import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
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

import AvatarHeader from "../../components/AvatarHeader";
import BottomNavigation from "../../components/BottomNavigation";
import SectionCard from "../../components/SectionCard";
import FoodSearch from "../../components/FoodSearch";
import FoodItem from "../../components/FoodItem";
import FoodActionModal from "../../components/FoodActionModal";

import {
  getFoods,
  deleteFood,
} from "../../services/foods/foods";

export default function EditFoodScreen() {
  const router =
    useRouter();

  const insets =
    useSafeAreaInsets();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    foods,
    setFoods,
  ] = useState([]);

  const [
    selectedFood,
    setSelectedFood,
  ] = useState(null);

  const [
    modalVisible,
    setModalVisible,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  async function loadFoods() {
    try {
      setLoading(
        true
      );

      setError("");

      const data =
        await getFoods();

      setFoods(
        data
      );
    } catch (err) {
      console.error(
        "Erro ao carregar alimentos:",
        err
      );

      setError(
        "Não foi possível carregar os alimentos."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  useEffect(() => {
    loadFoods();
  }, []);

  const filteredFoods =
    useMemo(() => {
      return foods.filter(
        (food) =>
          food.nome
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      foods,
      search,
    ]);

  async function handleDelete() {
    if (!selectedFood) {
      return;
    }

    try {
      await deleteFood(
        selectedFood.id
      );

      setFoods(
        (prev) =>
          prev.filter(
            (food) =>
              food.id !==
              selectedFood.id
          )
      );

      setModalVisible(
        false
      );

      setSelectedFood(
        null
      );
    } catch (err) {
      console.error(
        "Erro ao excluir alimento:",
        err
      );
    }
  }

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
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingBottom:
            120,
        }}
      >
        <AvatarHeader />

        <View className="mt-2">
          <SectionCard
            title="Alimentos"
            subtitle="Gerencie os alimentos cadastrados."
          >
            <FoodSearch
              value={
                search
              }
              onChangeText={
                setSearch
              }
              onAddPress={() =>
                router.push({
                  pathname:
                    "/food-register",
                  params: {
                    mode:
                      "create",
                  },
                })
              }
            />

            {loading ? (
              <View className="items-center justify-center py-14">
                <ActivityIndicator
                  size="large"
                  color="#4D9B43"
                />

                <Text className="text-[#80775C] text-[14px] mt-3">
                  Carregando alimentos...
                </Text>
              </View>
            ) : error ? (
              <View className="items-center justify-center py-14 px-4">
                <Text className="text-[#554B41] text-[15px] font-medium text-center">
                  {error}
                </Text>
              </View>
            ) : (
              <View>
                {filteredFoods.map(
                  (
                    item
                  ) => (
                    <FoodItem
                      key={
                        item.id
                      }
                      title={
                        item.nome
                      }
                      onPress={() => {
                        setSelectedFood(
                          item
                        );

                        setModalVisible(
                          true
                        );
                      }}
                    />
                  )
                )}
              </View>
            )}
          </SectionCard>
        </View>
      </ScrollView>

      <FoodActionModal
        visible={
          modalVisible
        }
        foodName={
          selectedFood?.nome
        }
        onEdit={() => {
          if (
            !selectedFood
          ) {
            return;
          }

          setModalVisible(
            false
          );

          router.push({
            pathname:
              "/food-register",
            params: {
              mode:
                "edit",
              food:
                JSON.stringify(
                  selectedFood
                ),
            },
          });
        }}
        onDelete={
          handleDelete
        }
        onClose={() => {
          setModalVisible(
            false
          );

          setSelectedFood(
            null
          );
        }}
      />

      <BottomNavigation
        active="management-food"
      />
    </View>
  );
}
