import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AvatarHeader from "../../components/AvatarHeader";
import BottomNavigation from "../../components/BottomNavigation";
import SectionCard from "../../components/SectionCard";
import InteractionModal from "../../components/InteractionModal";

export default function DashboardScreen() {
  const [modalVisible, setModalVisible] = useState(false);
//dados no momento mockados, mas isolados como arrays futuramente serão buscados da API
  const lastMeal = {
    name: "Feijão",
    date: "Hoje, 09:41",
    reaction: "Gostou",
    aspect: "Cor",
    image: require("../../../assets/images/foods/feijao.png"),
  };

  const recentFoods = [
    {
      name: "Feijão",
      date: "Hoje, 09:41",
      reaction: "Gostou",
    },
    {
      name: "Brócolis",
      date: "Ontem, 18:30",
      reaction: "Neutro",
    },
    {
      name: "Banana",
      date: "28 de jun., 16:20",
      reaction: "Gostou",
    },
  ];

  const reactionData = [
    {
      label: "Gostou",
      value: 3,
      icon: "happy-outline",
      iconColor: "#4D9B43",
      background: "#EDF6E8",
    },
    {
      label: "Neutro",
      value: 1,
      icon: "remove-circle-outline",
      iconColor: "#C29424",
      background: "#F8F0D9",
    },
    {
      label: "Não gostou",
      value: 1,
      icon: "sad-outline",
      iconColor: "#D9534F",
      background: "#FCEBE8",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <ScrollView
        className="flex-1 px-3 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <AvatarHeader
          variant="dashboard"
          greeting="Bom dia"
          childName="João"
          hasNotification={true}
          onNotificationPress={() => setModalVisible(true)}
        />

        <View className="mt-5">

          <SectionCard
            title="Última refeição"
            subtitle={lastMeal.date}
          >

            <View className="flex-row items-center">

              <View className="w-[90px] h-[90px] rounded-[10px] overflow-hidden bg-[#F4F0E5]">

                <Image
                  source={lastMeal.image}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="cover"
                />

              </View>

              <View className="flex-1 ml-4">

                <Text
                  numberOfLines={2}
                  className="text-[#554B41] text-[18px] font-bold"
                >
                  {lastMeal.name}
                </Text>

                <View className="flex-row flex-wrap mt-3">

                  <View className="flex-row items-center bg-[#EDF6E8] rounded-full px-3 py-1 mr-2">

                    <Ionicons
                      name="happy-outline"
                      size={17}
                      color="#4D9B43"
                    />

                    <Text className="text-[#4D9B43] font-bold ml-1 text-[12px]">
                      {lastMeal.reaction}
                    </Text>

                  </View>

                  <View className="flex-row items-center bg-[#F8F0D9] rounded-full px-3 py-1">

                    <Ionicons
                      name="color-palette-outline"
                      size={17}
                      color="#806A42"
                    />

                    <Text className="text-[#806A42] font-bold ml-1 text-[12px]">
                      {lastMeal.aspect}
                    </Text>

                  </View>

                </View>

              </View>

            </View>

          </SectionCard>

        </View>

        <View className="mt-5">

          <SectionCard
            title="Como está indo?"
            subtitle="Resumo das últimas 5 refeições"
          >

            <View className="flex-row -mx-1">

              {reactionData.map((item) => (

                <View
                  key={item.label}
                  className="flex-1 mx-1 rounded-[10px] p-3 items-center"
                  style={{
                    backgroundColor: item.background,
                  }}
                >

                  <Ionicons
                    name={item.icon}
                    size={30}
                    color={item.iconColor}
                  />

                  <Text
                    className="text-[24px] font-bold mt-1"
                    style={{
                      color: item.iconColor,
                    }}
                  >
                    {item.value}
                  </Text>

                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                    className="text-[11px] font-bold"
                    style={{
                      color: item.iconColor,
                    }}
                  >
                    {item.label}
                  </Text>

                </View>

              ))}

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
                  activeOpacity={0.7}
                  onPress={() => {}}
                  className="flex-row items-center"
                >

                  <Text className="text-[#4D9B43] text-[14px] font-bold">
                    Ver histórico
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={17}
                    color="#4D9B43"
                    style={{
                      marginLeft: 4,
                    }}
                  />

                </TouchableOpacity>

              </View>

              {recentFoods.map((food, index) => (

                <TouchableOpacity
                  key={`${food.name}-${index}`}
                  activeOpacity={0.75}
                  className={`flex-row items-center py-3 ${
                    index !== recentFoods.length - 1
                      ? "border-b border-[#E9E1CF]"
                      : ""
                  }`}
                >

                  <View className="flex-1">

                    <Text
                      numberOfLines={1}
                      className="text-[#554B41] text-[15px] font-bold"
                    >
                      {food.name}
                    </Text>

                    <Text className="text-[#80775C] text-[12px] mt-1">
                      {food.date}
                    </Text>

                  </View>

                  <View
                    className={`w-[38px] h-[38px] rounded-[9px] items-center justify-center ${
                      food.reaction === "Gostou"
                        ? "bg-[#EDF6E8]"
                        : "bg-[#F8F0D9]"
                    }`}
                  >

                    <Ionicons
                      name={
                        food.reaction === "Gostou"
                          ? "happy-outline"
                          : "remove-outline"
                      }
                      size={22}
                      color={
                        food.reaction === "Gostou"
                          ? "#4D9B43"
                          : "#C29424"
                      }
                    />

                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#A3987B"
                    style={{
                      marginLeft: 5,
                    }}
                  />

                </TouchableOpacity>

              ))}

            </View>

          </SectionCard>

        </View>

      </ScrollView>
<InteractionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(experience) => {
          console.log(experience);
          setModalVisible(false);
        }}
      />
      <BottomNavigation
        active="dashboard"
      />

    </SafeAreaView>
  );
}