import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export const Section = ({ icon, title, description, children }) => (
  <View className="bg-white p-6 rounded-[16px] border border-[#DCE7D2] shadow-card">
    <View className="flex-row items-center mb-1">
      {icon ? (
        <View className="w-8 h-8 rounded-[10px] bg-[#EEF5E8] items-center justify-center mr-3">
          <Feather name={icon} size={16} color="#528F33" />
        </View>
      ) : null}
      <Text className="text-[16px] font-bold text-[#212134]">{title}</Text>
    </View>
    {description ? <Text className="text-[13px] text-[#6B6554] mb-4 ml-11">{description}</Text> : <View className="mb-3" />}
    {children}
  </View>
);

export const Field = ({ label, hint, error, suffix, style, ...inputProps }) => (
  <View className="flex-1" style={style}>
    <Text className="text-[11px] font-bold text-[#212134] mb-2 uppercase tracking-wide">{label}</Text>
    <View
      className={`flex-row items-center bg-[#FFFCEF] border rounded-[12px] h-[46px] px-4 transition-colors ${
        error ? 'border-[#D9534F]' : 'border-[#DCE7D2] focus-within:border-[#528F33]'
      }`}
    >
      <TextInput
        placeholderTextColor="#9A9279"
        accessibilityLabel={label}
        className="flex-1 text-[14px] text-[#212134] outline-none"
        style={{ minWidth: 0 }}
        {...inputProps}
      />
      {suffix ? <Text className="text-[#6B6554] font-bold text-[13px] ml-2">{suffix}</Text> : null}
    </View>
    {error ? (
      <Text className="text-[11px] text-[#D9534F] mt-1 font-medium">{error}</Text>
    ) : hint ? (
      <Text className="text-[11px] text-[#6B6554] mt-1">{hint}</Text>
    ) : null}
  </View>
);

export const Row = ({ children }) => <View className="flex-col md:flex-row gap-4 mb-4">{children}</View>;

export const SwitchRow = ({ label, description, value, onChange, last }) => (
  <View className={`flex-row items-center justify-between py-4 ${last ? '' : 'border-b border-[#DCE7D2]'}`}>
    <View className="flex-1 pr-4">
      <Text className="text-[14px] font-bold text-[#212134]">{label}</Text>
      <Text className="text-[12px] text-[#6B6554] leading-tight mt-1">{description}</Text>
    </View>
    <TouchableOpacity
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      activeOpacity={0.8}
      onPress={() => onChange(!value)}
      className={`w-12 h-7 rounded-full px-1 justify-center transition-colors ${value ? 'bg-[#528F33]' : 'bg-[#C9D4BF]'}`}
    >
      <View
        className={`w-5 h-5 rounded-full bg-white shadow-card transition-transform ${
          value ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </TouchableOpacity>
  </View>
);

export const Segmented = ({ options, value, onChange }) => (
  <View className="flex-row bg-[#F3F7EE] rounded-[12px] p-1 self-start">
    {options.map((o) => {
      const active = o.value === value;
      return (
        <TouchableOpacity
          key={o.value}
          onPress={() => onChange(o.value)}
          className={`px-4 py-2 rounded-[10px] ${active ? 'bg-white shadow-card' : ''}`}
        >
          <Text className={`text-[12px] font-bold ${active ? 'text-[#528F33]' : 'text-[#6B6554]'}`}>{o.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export const SaveBar = ({ dirty, saving, onSave, onReset, label = 'Salvar alterações' }) => (
  <View className="flex-row items-center justify-end gap-3 mt-2">
    {dirty ? (
      <Text className="text-[12px] text-[#6B6554] mr-auto">Você tem alterações não salvas.</Text>
    ) : (
      <Text className="text-[12px] text-[#6B6554] mr-auto">Tudo salvo.</Text>
    )}
    <TouchableOpacity
      disabled={!dirty || saving}
      onPress={onReset}
      className={`px-5 py-3 rounded-[12px] border border-[#DCE7D2] bg-white ${!dirty ? 'opacity-40' : 'hover:bg-[#F3F7EE]'}`}
    >
      <Text className="text-[14px] font-bold text-[#212134]">Descartar</Text>
    </TouchableOpacity>
    <TouchableOpacity
      disabled={!dirty || saving}
      onPress={onSave}
      className={`flex-row items-center px-7 py-3 rounded-[12px] bg-[#528F33] transition-colors ${
        !dirty || saving ? 'opacity-50' : 'hover:bg-[#467A2B]'
      }`}
    >
      {saving ? <ActivityIndicator size="small" color="#fff" /> : <Feather name="save" size={16} color="#FFFFFF" />}
      <Text className="text-white font-bold text-[14px] ml-2">{label}</Text>
    </TouchableOpacity>
  </View>
);

export const GhostButton = ({ icon, label, onPress, danger, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={`flex-row items-center px-4 py-2.5 rounded-[12px] border ${
      danger ? 'border-[#E7B8B2] bg-[#FCEBE8]' : 'border-[#A3C78B] bg-white hover:bg-[#EEF5E8]'
    } ${disabled ? 'opacity-50' : ''}`}
  >
    <Feather name={icon} size={14} color={danger ? '#D9534F' : '#528F33'} />
    <Text className={`ml-2 text-[13px] font-bold ${danger ? 'text-[#9B5547]' : 'text-[#528F33]'}`}>{label}</Text>
  </TouchableOpacity>
);
