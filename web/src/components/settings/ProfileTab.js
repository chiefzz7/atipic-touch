import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

export default function ProfileTab() {
  return (
    <View className="flex-col gap-8">
      <View className="flex-row items-center">
        <View className="relative">
          <View className="w-24 h-24 rounded-full bg-[#EDF6E8] border border-[#A3C78C] items-center justify-center overflow-hidden">
            <Feather
              name="user"
              size={40}
              color="#4D9B43"
            />
          </View>

          <TouchableOpacity className="absolute bottom-0 right-0 bg-[#4D9B43] w-8 h-8 rounded-full items-center justify-center border-2 border-[#FFFCEF]">
            <Feather
              name="camera"
              size={14}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <View className="ml-5">
          <Text className="text-[20px] font-extrabold text-[#554B41]">
            Dra. Camila Nogueira
          </Text>

          <Text className="text-[14px] text-[#80775C]">
            Nutricionista Materno-Infantil
          </Text>

          <TouchableOpacity className="mt-2">
            <Text className="text-[13px] font-bold text-[#4D9B43]">
              Alterar foto de perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-[#E5DCC4] p-6 rounded-[10px] border border-[#C6BB9A]">
        <Text className="text-[15px] font-bold text-[#554B41] mb-4 border-b border-[#C6BB9A] pb-2">
          Dados Profissionais
        </Text>

        <View className="flex-col md:flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              Nome Completo
            </Text>

            <TextInput
              defaultValue="Camila Nogueira"
              className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 text-[#554B41] outline-none focus:border-[#83BF6E] transition-colors"
            />
          </View>

          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              E-mail Profissional
            </Text>

            <TextInput
              defaultValue="contato@clinicacamila.com.br"
              keyboardType="email-address"
              className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 text-[#554B41] outline-none focus:border-[#83BF6E] transition-colors"
            />
          </View>
        </View>

        <View className="flex-col md:flex-row gap-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              Registro (CRN / CRP / CREFITO)
            </Text>

            <TextInput
              defaultValue="CRN-3 45892"
              className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 text-[#554B41] outline-none focus:border-[#83BF6E] transition-colors"
            />
          </View>

          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              Telefone / WhatsApp
            </Text>

            <TextInput
              defaultValue="(11) 98765-4321"
              keyboardType="phone-pad"
              className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 text-[#554B41] outline-none focus:border-[#83BF6E] transition-colors"
            />
          </View>
        </View>
      </View>

      <View className="bg-[#E5DCC4] p-6 rounded-[10px] border border-[#C6BB9A]">
        <Text className="text-[15px] font-bold text-[#554B41] mb-4 border-b border-[#C6BB9A] pb-2">
          Informações da Clínica (Rodapé dos Laudos)
        </Text>

        <View className="flex-col gap-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              Nome da Clínica ou Consultório
            </Text>

            <TextInput
              defaultValue="Clínica Crescer - Desenvolvimento Infantil"
              className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 text-[#554B41] outline-none focus:border-[#83BF6E] transition-colors"
            />
          </View>

          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              Endereço Completo
            </Text>

            <TextInput
              defaultValue="Av. Paulista, 1000 - Conj. 45 - São Paulo, SP"
              className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 text-[#554B41] outline-none focus:border-[#83BF6E] transition-colors"
            />
          </View>
        </View>
      </View>

      <View className="flex-row justify-end mt-4">
        <TouchableOpacity className="bg-[#83BF6E] px-8 py-3.5 rounded-[10px] hover:bg-[#4D9B43] transition-colors flex-row items-center">
          <Feather
            name="save"
            size={16}
            color="#FFFFFF"
          />

          <Text className="text-white font-bold text-[15px] ml-2">
            Salvar Alterações
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
