import React, {
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
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
import ProfileSection from "../../components/ProfileSection";
import ProfileOption from "../../components/ProfileOption";

export default function ProfileScreen() {
  const router =
    useRouter();

  const insets =
    useSafeAreaInsets();

  const [
    expanded,
    setExpanded,
  ] = useState(true);

  const [
    notifications,
    setNotifications,
  ] = useState(true);

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
        <View className="relative min-h-[120px] mt-4 mb-2 rounded-[10px] bg-[#E5DCC4] px-4 py-4 overflow-hidden">
          <Text className="text-[#554B41] text-[32px] font-bold">
            Perfil
          </Text>

          <Text className="text-[#80775C] text-[15px] leading-5 mt-1 w-[60%]">
            Gerencie as informações da criança e do responsável.
          </Text>

          <Image
            source={require(
              "../../../assets/images/profile_brocolis.png"
            )}
            resizeMode="contain"
            style={{
              position:
                "absolute",
              width:
                125,
              height:
                105,
              right:
                -4,
              bottom:
                0,
            }}
          />
        </View>

        <ProfileSection
          title="Informações da criança"
          expandable
          expanded={
            expanded
          }
          rightLabel="1 criança"
          onPress={() =>
            setExpanded(
              !expanded
            )
          }
        >
          <TouchableOpacity
            activeOpacity={
              0.85
            }
            className="mt-3 bg-[#C6BB9A] rounded-[10px] px-4 py-4 flex-row items-center w-full"
          >
            <View className="w-[64px] h-[64px] rounded-full overflow-hidden relative">
              <Image
                source={require(
                  "../../../assets/images/crianca_placeholder.png"
                )}
                className="w-full h-full"
                resizeMode="cover"
              />

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                className="absolute bottom-0 right-0 bg-[#554B41] rounded-full p-1"
              >
                <Ionicons
                  name="camera"
                  size={16}
                  color="#FFFCEF"
                />
              </TouchableOpacity>
            </View>

            <View className="flex-1 ml-4">
              <Text
                className="text-[#554B41] text-[20px] font-bold"
                numberOfLines={
                  1
                }
              >
                João
              </Text>

              <Text className="text-[#6E6246] text-[14px] mt-1">
                3 anos • Masculino
              </Text>
            </View>

            <Ionicons
              name={
                expanded
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={24}
              color="#554B41"
            />
          </TouchableOpacity>

          <View className="mt-2">
            <ProfileOption
              icon="create-outline"
              title="Observações"
              onPress={() => {}}
            />
          </View>
        </ProfileSection>

        <TouchableOpacity
          activeOpacity={
            0.85
          }
          onPress={() =>
            router.push(
              "/child-register"
            )
          }
          className="mt-4 border border-dashed border-[#A3987B] rounded-[10px] h-[72px] flex-row items-center px-4"
        >
          <View className="w-[42px] h-[42px] rounded-full border border-[#554B41] items-center justify-center">
            <Ionicons
              name="add"
              size={26}
              color="#554B41"
            />
          </View>

          <Text className="flex-1 ml-3 text-[#554B41] text-[17px] font-medium">
            Adicionar nova criança
          </Text>
        </TouchableOpacity>

        <ProfileSection
          title="Informações do responsável"
        >
          <View className="mt-3 bg-[#C6BB9A] rounded-[10px] px-4 py-4 flex-row items-center w-full">
            <View className="w-[64px] h-[64px] rounded-full overflow-hidden relative">
              <Image
                source={require(
                  "../../../assets/images/responsavel_placeholder.png"
                )}
                className="w-full h-full"
                resizeMode="cover"
              />

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                className="absolute bottom-0 right-0 bg-[#554B41] rounded-full p-1"
              >
                <Ionicons
                  name="camera"
                  size={16}
                  color="#FFFCEF"
                />
              </TouchableOpacity>
            </View>

            <Text
              className="flex-1 ml-4 text-[#554B41] text-[20px] font-bold"
              numberOfLines={
                1
              }
            >
              Maria
            </Text>
          </View>

          <View className="mt-2">
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
              value={
                notifications
              }
              onValueChange={
                setNotifications
              }
            />
          </View>
        </ProfileSection>
      </ScrollView>

      <BottomNavigation
        active="profile"
      />
    </View>
  );
}
