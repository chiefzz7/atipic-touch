import React from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function FoodActionModal({
  visible,
  foodName,
  onEdit,
  onDelete,
  onClose,
}) {
  return (
    <Modal
      visible={
        visible
      }
      transparent
      animationType="fade"
      onRequestClose={
        onClose
      }
    >
      <View className="flex-1 bg-black/40 items-center justify-center px-6">
        <View className="w-full max-w-[340px] bg-[#FFFCEF] rounded-[10px] p-5">
          <Text
            numberOfLines={
              2
            }
            className="text-[22px] font-bold text-[#554B41] text-center"
          >
            {foodName}
          </Text>

          <Text className="text-[#80775C] text-[14px] text-center mt-2 mb-5">
            O que deseja fazer?
          </Text>

          <TouchableOpacity
            activeOpacity={
              0.8
            }
            onPress={
              onEdit
            }
            className="min-h-[56px] flex-row items-center bg-[#C6BB9A] rounded-[10px] px-4 mb-3"
          >
            <Ionicons
              name="create-outline"
              size={22}
              color="#554B41"
            />

            <Text className="ml-3 text-[16px] font-bold text-[#554B41]">
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={
              0.8
            }
            onPress={
              onDelete
            }
            className="min-h-[56px] flex-row items-center bg-[#E8C9C9] rounded-[10px] px-4 mb-5"
          >
            <Ionicons
              name="trash-outline"
              size={22}
              color="#9A2F2F"
            />

            <Text className="ml-3 text-[16px] font-bold text-[#9A2F2F]">
              Excluir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={
              0.8
            }
            onPress={
              onClose
            }
            className="h-[44px] items-center justify-center"
          >
            <Text className="text-center text-[#80775C] text-[15px] font-medium">
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
