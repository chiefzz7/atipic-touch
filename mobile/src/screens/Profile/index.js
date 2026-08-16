import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import BottomNavigation from "../../components/BottomNavigation";
import ProfileSection from "../../components/ProfileSection";
import ProfileOption from "../../components/ProfileOption";

export default function ProfileScreen() {
  const router = useRouter();

  const [expanded, setExpanded] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}
      >

        <View className="px-4 pt-6 pb-3">

  <View
    style={{
      height: 130,
      width: "100%",
      position: "relative",
      overflow: "hidden",
    }}
  >

    <Text className="text-[#554B41] text-[46px] font-bold">
      Perfil
    </Text>

    <Text className="text-[#80775C] text-[18px] leading-6 w-[58%]">
      Gerencie as informações da criança e do responsável.
    </Text>

    <Image
      source={require("../../../assets/images/profile_brocolis.png")}
      resizeMode="contain"
      style={{
        position: "absolute",
        width: 150,
        height: 120,
        right: -10,
        top: 0,
      }}
    />

  </View>

</View>

        <View className="mt-1">

          <ProfileSection
            title="Informações da criança"
            expandable
            expanded={expanded}
            rightLabel="1 criança"
            onPress={() => setExpanded(!expanded)}
          >

            <TouchableOpacity
              activeOpacity={0.85}
              className="mt-3 bg-[#B9AE8D] rounded-[7px] px-4 py-4 flex-row items-center w-full"
            >

              <View className="w-[70px] h-[70px] rounded-full overflow-hidden">

                <Image
                  source={require("../../../assets/images/crianca_placeholder.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                <TouchableOpacity
                  className="bottom-0 right-0 bg-[#6E6246] rounded-full p-1 absolute"
                > 
                  <Ionicons
                    name="camera"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>

              </View>

              <View className="flex-1 ml-4">

                <Text
                  className="text-white text-[22px] font-bold"
                  numberOfLines={1}
                >
                  João
                </Text>

                <Text className="text-[#FFFCEF] text-[14px] mt-1">
                  3 anos • Masculino
                </Text>

              </View>

              <Ionicons
                name={expanded ? "chevron-up" : "chevron-down"}
                size={28}
                color="#5E543E"
              />

            </TouchableOpacity>

            <View className="mt-2">
              <ProfileOption
                icon="create-outline"
                title="Observações"
                onPress={() => { }}
              />
            </View>

          </ProfileSection>

        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/child-register")}
          className="mx-4 mt-5 border border-dashed border-[#6E6246] rounded-[7px] h-[86px] flex-row items-center px-4"
        >

          <View className="w-[48px] h-[48px] rounded-full border-2 border-[#554B41] items-center justify-center">

            <Ionicons
              name="add"
              size={30}
              color="#554B41"
            />

          </View>

          <Text className="flex-1 ml-3 text-[#554B41] text-[20px]">
            Adicionar nova criança
          </Text>

        </TouchableOpacity>

        <View className="mt-5">

          <ProfileSection
            title="Informações do responsável"
          >

            <View className="mt-3 bg-[#B9AE8D] rounded-[7px] px-4 py-4 flex-row items-center w-full">

              <View className="w-[78px] h-[78px] rounded-full overflow-hidden">

                <Image
                  source={require("../../../assets/images/responsavel_placeholder.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                <TouchableOpacity
                  className="absolute bottom-0 right-0 bg-[#6E6246] rounded-full p-1"
                >
                  <Ionicons
                    name="camera"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>

              </View>

              <Text
                className="flex-1 ml-5 text-white text-[24px] font-bold"
                numberOfLines={1}
              >
                Maria
              </Text>

            </View>

          </ProfileSection>

        </View>

        <View className="mx-4 mt-2">

          <ProfileOption
            icon="mail-outline"
            title="Gmail"
            value="maria123@gmail.com"
            onPress={() => { }}
          />

          <View className="mt-0">
            <ProfileOption
              icon="lock-closed-outline"
              title="Senha"
              value="********"
              onPress={() => { }}
            />
          </View>

          <View className="mt-0">
            <ProfileOption
              icon="notifications-outline"
              title="Notificações"
              type="switch"
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>

        </View>

      </ScrollView>

      <BottomNavigation active="profile" />

    </SafeAreaView>
  );
}