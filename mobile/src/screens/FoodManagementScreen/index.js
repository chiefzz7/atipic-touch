import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { useRouter } from "expo-router";

import AvatarHeader from "../../components/AvatarHeader";
import BottomNavigation from "../../components/BottomNavigation";
import SectionCard from "../../components/SectionCard";
import FoodSearch from "../../components/FoodSearch";
import FoodItem from "../../components/FoodItem";
import FoodActionModal from "../../components/FoodActionModal";

export default function EditFoodScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [foods, setFoods] = useState([
    {
      id: "1",
      name: "Feijão",
      icon: "nutrition",
    },
    {
      id: "2",
      name: "Brócolis",
      icon: "leaf",
    },
    {
      id: "3",
      name: "Arroz",
      icon: "restaurant",
    }
  ]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      food.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [foods, search]);

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 190,
          }}
        >
          {filteredFoods.map((item) => (
            <FoodItem
              key={item.id}
              title={item.name}
              icon={item.icon}
              onPress={() => {
                setSelectedFood(item);
                setModalVisible(true);
              }}
            />
          ))}
        </ScrollView>

      </SectionCard>
      <FoodActionModal
        visible={modalVisible}
        foodName={selectedFood?.name}
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
        onDelete={() => {
          setFoods((prev) =>
            prev.filter((food) => food.id !== selectedFood.id)
          );

          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
      <BottomNavigation active="management-food" />

    </SafeAreaView>
  );
}