import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ProfileTab() {
  return (
    <View className="flex-col gap-8">
      <View className="flex-row items-center">
        <View className="relative">
          <View className="w-24 h-24 rounded-full bg-[#EAF3E2] border border-[#A3C78B] items-center justify-center overflow-hidden">
            <Feather name="user" size={40} color="#528F33" />
          </View>
          <TouchableOpacity className="absolute bottom-0 right-0 bg-[#528F33] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm">
            <Feather name="camera" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="ml-5">
          <Text className="text-[20px] font-extrabold text-[#212134]">Dra. Camila Nogueira</Text>
          <Text className="text-[14px] text-[#6B7280]">Nutricionista Materno-Infantil</Text>
          <TouchableOpacity className="mt-2">
            <Text className="text-[13px] font-bold text-[#528F33]">Alterar foto de perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <Text className="text-[15px] font-bold text-[#212134] mb-4 border-b border-gray-100 pb-2">Dados Profissionais</Text>
        
        <View className="flex-col md:flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Nome Completo</Text>
            <TextInput 
              defaultValue="Camila Nogueira"
              className="bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 text-[#212134] outline-none focus:border-[#A3C78B] transition-colors"
            />
          </View>
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">E-mail Profissional</Text>
            <TextInput 
              defaultValue="contato@clinicacamila.com.br"
              keyboardType="email-address"
              className="bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 text-[#212134] outline-none focus:border-[#A3C78B] transition-colors"
            />
          </View>
        </View>

        <View className="flex-col md:flex-row gap-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Registro (CRN / CRP / CREFITO)</Text>
            <TextInput 
              defaultValue="CRN-3 45892"
              className="bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 text-[#212134] outline-none focus:border-[#A3C78B] transition-colors"
            />
          </View>
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Telefone / WhatsApp</Text>
            <TextInput 
              defaultValue="(11) 98765-4321"
              keyboardType="phone-pad"
              className="bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 text-[#212134] outline-none focus:border-[#A3C78B] transition-colors"
            />
          </View>
        </View>
      </View>

      <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <Text className="text-[15px] font-bold text-[#212134] mb-4 border-b border-gray-100 pb-2">Informações da Clínica (Rodapé dos Laudos)</Text>
        
        <View className="flex-col gap-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Nome da Clínica ou Consultório</Text>
            <TextInput 
              defaultValue="Clínica Crescer - Desenvolvimento Infantil"
              className="bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 text-[#212134] outline-none focus:border-[#A3C78B] transition-colors"
            />
          </View>
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Endereço Completo</Text>
            <TextInput 
              defaultValue="Av. Paulista, 1000 - Conj. 45 - São Paulo, SP"
              className="bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 text-[#212134] outline-none focus:border-[#A3C78B] transition-colors"
            />
          </View>
        </View>
      </View>

      <View className="flex-row justify-end mt-4">
        <TouchableOpacity className="bg-[#528F33] px-8 py-3.5 rounded-xl shadow-sm hover:bg-[#457a2a] transition-colors flex-row items-center">
          <Feather name="save" size={16} color="#fff" />
          <Text className="text-white font-bold text-[15px] ml-2">Salvar Alterações</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
