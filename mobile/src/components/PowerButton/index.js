import React, {
  useEffect,
  useRef,
} from "react";

import {
  Animated,
  Easing,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function PowerButton({
  onPress,
  connected = false,
  disabled = false,
}) {
  const pulse =
    useRef(
      new Animated.Value(0)
    ).current;

  // Pulso suave, apenas visual, quando conectado
  useEffect(() => {
    if (!connected || disabled) {
      pulse.setValue(0);
      return undefined;
    }

    const loop =
      Animated.loop(
        Animated.timing(
          pulse,
          {
            toValue: 1,
            duration: 2200,
            easing:
              Easing.out(
                Easing.ease
              ),
            useNativeDriver: true,
          }
        )
      );

    loop.start();

    return () => loop.stop();
  }, [connected, disabled, pulse]);

  const buttonColor =
    connected
      ? "#5FA64D"
      : "#E9786D";

  const haloColor =
    connected
      ? "#DCEBD2"
      : "#F6DAD5";

  const ringColor =
    connected
      ? "#BDDAAE"
      : "#F0B8B0";

  const pulseScale =
    pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.25],
    });

  const pulseOpacity =
    pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.45, 0],
    });

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={
        connected
          ? "Desconectar dispositivo"
          : "Conectar dispositivo"
      }
      className="items-center justify-center"
      style={{
        opacity:
          disabled
            ? 0.75
            : 1,
      }}
    >
      <View className="w-[220px] h-[220px] items-center justify-center">
        <Animated.View
          pointerEvents="none"
          className="absolute w-[200px] h-[200px] rounded-full"
          style={{
            backgroundColor:
              ringColor,
            opacity:
              pulseOpacity,
            transform: [
              {
                scale:
                  pulseScale,
              },
            ],
          }}
        />

        <View
          className="w-[200px] h-[200px] rounded-full items-center justify-center"
          style={{
            backgroundColor:
              haloColor,
          }}
        >
          <View
            className="w-[168px] h-[168px] rounded-full items-center justify-center"
            style={{
              backgroundColor:
                buttonColor,
              shadowColor:
                buttonColor,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 14,
              elevation: 6,
            }}
          >
            <Ionicons
              name="power"
              size={78}
              color="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
