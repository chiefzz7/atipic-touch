import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, ActivityIndicator, Text, View} from "react-native";

import { useRouter } from "expo-router";

import AvatarHeader from "../../components/AvatarHeader";
import BottomNavigation from "../../components/BottomNavigation";
import SectionCard from "../../components/SectionCard";
import FoodSearch from "../../components/FoodSearch";
import FoodItem from "../../components/FoodItem";
import FoodActionModal from "../../components/FoodActionModal";

import {  getFoods,deleteFood} from "../../services/foods/foods";

export default function EditFoodScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFoods() {
    try {
      setLoading(true);
      setError("");

      const data = await getFoods();

      setFoods(data);
    } catch (err) {
      console.error("Erro ao carregar alimentos:", err);

      setError("Não foi possível carregar os alimentos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFoods();
  }, []);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      food.nome
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [foods, search]);

  async function handleDelete() {
    if (!selectedFood) return;

    try {
      await deleteFood(selectedFood.id);

      setFoods((prev) =>
        prev.filter((food) => food.id !== selectedFood.id)
      );

      setModalVisible(false);
      setSelectedFood(null);
    } catch (err) {
      console.error("Erro ao excluir alimento:", err);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <AvatarHeader
        variant="dashboard"
        greeting="Bom dia"
        childName="João"
        hasNotification={false}
        onNotificationPress={() => { }}
      />

      <SectionCard
        title="Alimentos"
        subtitle="Gerencie os alimentos cadastrados."
      >

        <FoodSearch
          value={search}
          onChangeText={setSearch}
          onAddPress={() =>
            router.push({
              pathname: "/edit-food-form",
              params: {
                variant: "create",
              },
            })
          }
        />

        <View className="flex-1">

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" />
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-center text-[#554B41]">
                {error}
              </Text>
            </View>
          ) : (
            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 105,
              }}
            >
              {filteredFoods.map((item) => (
                <FoodItem
                  key={item.id}
                  title={item.nome}
                  onPress={() => {
                    setSelectedFood(item);
                    setModalVisible(true);
                  }}
                />
              ))}
            </ScrollView>
          )}

        </View>

      </SectionCard>

      <FoodActionModal
        visible={modalVisible}
        foodName={selectedFood?.nome}
        onEdit={() => {
          if (!selectedFood) return;

          setModalVisible(false);

          router.push({
            pathname: "/edit-food-form",
            params: {
              variant: "edit",
              id: selectedFood.id,
            },
          });
        }}
        onDelete={handleDelete}
        onClose={() => {
          setModalVisible(false);
          setSelectedFood(null);
        }}
      />

      <BottomNavigation active="management-food" />

    </SafeAreaView>
  );
}