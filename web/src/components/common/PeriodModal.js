import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const OPTIONS = [
  { type: 'day', label: 'Dia', icon: 'sun' },
  { type: 'week', label: 'Semana', icon: 'calendar' },
  { type: 'month', label: 'Mês', icon: 'grid' },
  { type: 'all', label: 'Todos os registros', icon: 'list' },
];

export default function PeriodModal({ visible, periodType, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-[#212134]/40 items-center justify-center p-6"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          className="bg-white border border-[#DCE7D2] rounded-[16px] w-full max-w-[420px] p-6 shadow-card"
        >
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-[18px] font-bold text-[#212134]">Selecionar período</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar">
              <Feather name="x" size={20} color="#6B6554" />
            </TouchableOpacity>
          </View>

          {OPTIONS.map(({ type, label, icon }) => {
            const active = periodType === type;
            return (
              <TouchableOpacity
                key={type}
                onPress={() => onSelect(type)}
                className={`flex-row items-center justify-between p-4 rounded-[12px] border mb-3 ${
                  active ? 'bg-[#EEF5E8] border-[#528F33]' : 'bg-white border-[#DCE7D2] hover:bg-[#F3F7EE]'
                }`}
              >
                <View className="flex-row items-center">
                  <Feather name={icon} size={18} color="#528F33" />
                  <Text className="ml-3 text-[14px] font-bold text-[#212134]">{label}</Text>
                </View>
                {active ? <Feather name="check" size={18} color="#528F33" /> : null}
              </TouchableOpacity>
            );
          })}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
