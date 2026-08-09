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
          paddingBottom: 120,
        }}
      >

        {/* ---------- HEADER ---------- */}

        <View className="px-4 pt-6">

          <View className="absolute right-0 top-0">

            <Image
              source={require("../../../assets/images/profile_brocolis.png")}
              style={{
                width: 150,
                height: 120,
              }}
              resizeMode="contain"
            />

          </View>

          <Text className="text-[#554B41] text-[46px] font-bold">
            Perfil
          </Text>

          <Text className="text-[#80775C] text-[18px] leading-6 w-[58%]">
            Gerencie as informações da criança e do responsável.
          </Text>

        </View>

        {/* ---------- CRIANÇA ---------- */}

        <ProfileSection
          title="Informações da criança"
          expandable
          expanded={expanded}
          rightLabel="1 crianças"
          onPress={() => setExpanded(!expanded)}
        >

          <TouchableOpacity
            activeOpacity={0.85}
            className="mx-3 mt-3 bg-[#B9AE8D] rounded-[7px] px-4 py-4 flex-row items-center"
          >

            <View className="w-[70px] h-[70px] rounded-full overflow-hidden">

              <Image
                source={require("../../../assets/images/crianca_placeholder.png")}
                className="w-full h-full"
              />

              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-[#6E6246] rounded-full p-1"
              >

                <Ionicons
                  name="camera"
                  size={12}
                  color="white"
                />

              </TouchableOpacity>

            </View>

            <View className="flex-1 ml-4">

              <Text className="text-white text-[22px] font-bold">
                Fulana
              </Text>

              <Text className="text-[#FFFCEF] text-[14px] mt-1">
                3 anos • Feminino
              </Text>

            </View>

            <Ionicons
              name={
                expanded
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={28}
              color="#5E543E"
            />

          </TouchableOpacity>

          <ProfileOption
            icon="create-outline"
            title="Observações"
            onPress={() => {}}
          />

        </ProfileSection>

        {/* ---------- ADICIONAR ---------- */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/child-register")}
          className="mx-4 mt-5 border border-dashed border-[#6E6246] rounded-[7px] h-[86px] flex-row items-center px-5"
        >

          <View className="w-[48px] h-[48px] rounded-full border-2 border-[#554B41] items-center justify-center">

            <Ionicons
              name="add"
              size={30}
              color="#554B41"
            />

          </View>

          <Text className="ml-4 text-[#554B41] text-[22px]">
            Adicionar nova criança
          </Text>

        </TouchableOpacity>

        <ProfileSection
          title="Informações do responsável"
        >

          <View className="mx-3 my-3 bg-[#B9AE8D] rounded-[7px] px-4 py-5 flex-row items-center">

            <View className="w-[78px] h-[78px] rounded-full overflow-hidden">

              <Image
                source={require("../../../assets/images/responsavel_placeholder.png")}
                className="w-full h-full"
              />

              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-[#6E6246] rounded-full p-1"
              >

                <Ionicons
                  name="camera"
                  size={12}
                  color="white"
                />

              </TouchableOpacity>

            </View>

            <Text className="ml-5 text-white text-[24px] font-bold">
              Maria
            </Text>

          </View>

        </ProfileSection>

        <View className="mx-4 mt-4">

          <ProfileOption
            icon="mail-outline"
            title="Gmail"
            value="maria123@gmail.com"
            onPress={() => {}}
          />

          <ProfileOption
            icon="lock-closed-outline"
            title="Senha"
            value="********"
            onPress={() => {}}
          />

          <ProfileOption
            icon="notifications-outline"
            title="Notificações"
            type="switch"
            value={notifications}
            onValueChange={setNotifications}
          />

        </View>

      </ScrollView>

      <BottomNavigation active="profile" />

    </SafeAreaView>
  );
}