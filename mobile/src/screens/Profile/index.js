import React, {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
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
import ResponsibleEditModal from "../../components/ResponsibleEditModal";

import {
  getCurrentUser,
} from "../../services/users/users";

import {
  getChildren,
} from "../../services/children/children";

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

  const [
    user,
    setUser,
  ] = useState(null);

  const [
    children,
    setChildren,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    responsibleEditVisible,
    setResponsibleEditVisible,
  ] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(
          true
        );

        setError("");

        const [
          userData,
          childrenData,
        ] =
          await Promise.all([
            getCurrentUser(),
            getChildren(),
          ]);

        setUser(
          userData
        );

        setChildren(
          Array.isArray(
            childrenData
          )
            ? childrenData
            : []
        );
      } catch (err) {
        console.error(
          "Erro ao carregar perfil:",
          err
        );

        setError(
          err?.message ||
            "Não foi possível carregar o perfil."
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    loadProfile();
  }, []);

  function formatBirthDate(
    date
  ) {
    if (!date) {
      return "Não informada";
    }

    const [
      year,
      month,
      day,
    ] =
      date.split("-");

    if (
      !year ||
      !month ||
      !day
    ) {
      return date;
    }

    return `${day}/${month}/${year}`;
  }

  function calculateAge(
    birthDate
  ) {
    if (!birthDate) {
      return "";
    }

    const [
      year,
      month,
      day,
    ] =
      birthDate
        .split("-")
        .map(Number);

    if (
      !year ||
      !month ||
      !day
    ) {
      return "";
    }

    const today =
      new Date();

    let age =
      today.getFullYear() -
      year;

    const birthdayHasPassed =
      today.getMonth() + 1 >
        month ||
      (
        today.getMonth() + 1 ===
          month &&
        today.getDate() >=
          day
      );

    if (
      !birthdayHasPassed
    ) {
      age -= 1;
    }

    return `${age} ${
      age === 1
        ? "ano"
        : "anos"
    }`;
  }

  function formatThemes(
    themes
  ) {
    if (
      !Array.isArray(
        themes
      ) ||
      themes.length === 0
    ) {
      return "Não informado";
    }

    return themes.join(
      ", "
    );
  }

  function openResponsibleEdit() {
    setResponsibleEditVisible(
      true
    );
  }

  const childrenLabel =
    `${children.length} ${
      children.length === 1
        ? "criança"
        : "crianças"
    }`;

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

        {loading ? (
          <View className="items-center justify-center py-20">
            <ActivityIndicator
              size="large"
              color="#4D9B43"
            />

            <Text className="text-[#80775C] text-[14px] mt-3">
              Carregando perfil...
            </Text>
          </View>
        ) : error ? (
          <View className="items-center justify-center py-20 px-5">
            <Ionicons
              name="alert-circle-outline"
              size={42}
              color="#D9534F"
            />

            <Text className="text-[#554B41] text-[17px] font-bold text-center mt-3">
              Não foi possível carregar o perfil.
            </Text>

            <Text className="text-[#80775C] text-[14px] text-center mt-2">
              {error}
            </Text>
          </View>
        ) : (
          <>
            <ProfileSection
              title="Informações da criança"
              expandable
              expanded={
                expanded
              }
              rightLabel={
                childrenLabel
              }
              onPress={() =>
                setExpanded(
                  !expanded
                )
              }
            >
              {children.length ===
              0 ? (
                <View className="items-center py-6">
                  <Ionicons
                    name="person-add-outline"
                    size={34}
                    color="#A3987B"
                  />

                  <Text className="text-[#80775C] text-[14px] text-center mt-2">
                    Nenhuma criança cadastrada.
                  </Text>
                </View>
              ) : (
                children.map(
                  (
                    child
                  ) => (
                    <View
                      key={
                        child.id
                      }
                      className="mt-3"
                    >
                      <View className="bg-[#C6BB9A] rounded-[10px] px-4 py-4 flex-row items-center w-full">
                        <View className="w-[64px] h-[64px] rounded-full overflow-hidden relative">
                          <Image
                            source={require(
                              "../../../assets/images/crianca_placeholder.png"
                            )}
                            className="w-full h-full"
                            resizeMode="cover"
                          />

                          <View className="absolute bottom-0 right-0 bg-[#554B41] rounded-full p-1">
                            <Ionicons
                              name="person"
                              size={
                                14
                              }
                              color="#FFFCEF"
                            />
                          </View>
                        </View>

                        <View className="flex-1 ml-4">
                          <Text
                            className="text-[#554B41] text-[20px] font-bold"
                            numberOfLines={
                              1
                            }
                          >
                            {
                              child.nome
                            }
                          </Text>

                          <Text className="text-[#6E6246] text-[14px] mt-1">
                            {
                              calculateAge(
                                child.dataNascimento
                              )
                            }
                          </Text>
                        </View>
                      </View>

                      <View className="mt-2">
                        <ProfileOption
                          icon="calendar-outline"
                          title="Nascimento"
                          value={
                            formatBirthDate(
                              child.dataNascimento
                            )
                          }
                          onPress={() => {}}
                        />

                        <ProfileOption
                          icon="heart-outline"
                          title="Temas"
                          value={
                            formatThemes(
                              child.temasPreferidos
                            )
                          }
                          onPress={() => {}}
                        />

                        <ProfileOption
                          icon="medkit-outline"
                          title="Restrições"
                          value={
                            child.restricoesMedicas ||
                            "Nenhuma informada"
                          }
                          onPress={() => {}}
                        />
                      </View>
                    </View>
                  )
                )
              )}
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
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                onPress={
                  openResponsibleEdit
                }
                className="mt-3 bg-[#C6BB9A] rounded-[10px] px-4 py-4 flex-row items-center w-full"
              >
                <View className="w-[64px] h-[64px] rounded-full overflow-hidden relative">
                  <Image
                    source={require(
                      "../../../assets/images/responsavel_placeholder.png"
                    )}
                    className="w-full h-full"
                    resizeMode="cover"
                  />

                  <View className="absolute bottom-0 right-0 bg-[#554B41] rounded-full p-1">
                    <Ionicons
                      name="person"
                      size={14}
                      color="#FFFCEF"
                    />
                  </View>
                </View>

                <Text
                  className="flex-1 ml-4 text-[#554B41] text-[20px] font-bold"
                  numberOfLines={
                    1
                  }
                >
                  {
                    user?.nome ||
                    "Responsável"
                  }
                </Text>

                <View className="w-[38px] h-[38px] rounded-full bg-[#A3987B] items-center justify-center">
                  <Ionicons
                    name="create-outline"
                    size={19}
                    color="#FFFCEF"
                  />
                </View>
              </TouchableOpacity>

              <View className="mt-2">
                <ProfileOption
                  icon="mail-outline"
                  title="E-mail"
                  value={
                    user?.email ||
                    "Não informado"
                  }
                  onPress={
                    openResponsibleEdit
                  }
                />

                <ProfileOption
                  icon="call-outline"
                  title="Telefone"
                  value={
                    user?.telefone ||
                    "Não informado"
                  }
                  onPress={
                    openResponsibleEdit
                  }
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
          </>
        )}
      </ScrollView>

      <ResponsibleEditModal
        visible={
          responsibleEditVisible
        }
        user={
          user
        }
        onClose={() =>
          setResponsibleEditVisible(
            false
          )
        }
        onSaved={(
          updatedUser
        ) => {
          setUser(
            updatedUser
          );
        }}
      />

      <BottomNavigation
        active="profile"
      />
    </View>
  );
}
