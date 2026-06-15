import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-[#fffdf4]"
      style={{ flex: 1, backgroundColor: "#fffdf4" }}
    >
      <View
        className="flex-1 items-center overflow-hidden"
        style={{
          flex: 1,
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#fffdf4",
        }}
      >
        <View
          className="relative w-full max-w-[390px] items-center overflow-hidden"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 390,
            height: 620,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <View
            className="absolute rounded-full bg-[#e4d7aa]"
            style={{
              position: "absolute",
              top: -55,
              width: 520,
              height: 520,
              borderRadius: 260,
              backgroundColor: "#e4d7aa",
            }}
          />

          <View
            className="z-10 items-center"
            style={{
              zIndex: 10,
              alignItems: "center",
              marginTop: 105,
            }}
          >
            <View
              className="items-center justify-center overflow-hidden rounded-full bg-[#f8f1d9]"
              style={{
                width: 250,
                height: 250,
                borderRadius: 125,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor: "#f8f1d9",
              }}
            >
              <Image
                source={require("../../assets/brocolis_welcome_screen.png")}
                resizeMode="contain"
                style={{
                  width: 250,
                  height: 250,
                }}
              />
            </View>

            <Pressable
              className="mt-12 rounded-md bg-[#cfc094]"
              style={{
                marginTop: 48,
                width: 225,
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 4,
                backgroundColor: "#cfc094",
              }}
              onPress={() => {}}
            >
              <Text
                className="text-center text-2xl text-white"
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  color: "#ffffff",
                }}
              >
                Criar minha conta
              </Text>
            </Pressable>

            <Pressable
              className="mt-3"
              style={{ marginTop: 12 }}
              onPress={() => {}}
            >
              <Text
                className="text-center text-base text-black"
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#000000",
                }}
              >
                Ja tem conta? ENTRAR.
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}