import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CustomSwitch = ({ label, description, isEnabled, onToggle }) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <View className="flex-1 pr-4">
      <Text className="text-[14px] font-bold text-[#212134]">{label}</Text>
      <Text className="text-[12px] text-[#6B7280] leading-tight mt-1">{description}</Text>
    </View>
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onToggle}
      className={`w-12 h-6 rounded-full px-1 justify-center transition-colors ${isEnabled ? 'bg-[#528F33]' : 'bg-gray-300'}`}
    >
      <View className={`w-4 h-4 rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </TouchableOpacity>
  </View>
);

export default function SystemTab() {
  const [autoSync, setAutoSync] = useState(true);
  const [offlineAlert, setOfflineAlert] = useState(true);
  const [lgpdConsent, setLgpdConsent] = useState(true);

  return (
    <View className="flex-col gap-8">
      <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <View className="flex-row items-center mb-4 border-b border-gray-100 pb-2">
          <Feather name="activity" size={18} color="#212134" />
          <Text className="text-[15px] font-bold text-[#212134] ml-2">Parâmetros de Análise Sensorial</Text>
        </View>
        <Text className="text-[12px] text-[#6B7280] mb-4">
          Defina as porcentagens que acionarão os gatilhos críticos e alertas na tela inicial do Dashboard.
        </Text>
        
        <View className="flex-col md:flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Limiar de Rejeição Crítica (%)</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 focus-within:border-[#D9534F] transition-colors">
              <TextInput 
                defaultValue="80"
                keyboardType="numeric"
                className="flex-1 text-[#212134] outline-none font-bold"
              />
              <Text className="text-gray-400 font-bold">%</Text>
            </View>
            <Text className="text-[10px] text-gray-500 mt-1">Acima deste valor, o sistema gera um alerta vermelho.</Text>
          </View>

          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Amostragem Mínima (Sessões)</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl h-[48px] px-4 focus-within:border-[#A3C78B] transition-colors">
              <TextInput 
                defaultValue="5"
                keyboardType="numeric"
                className="flex-1 text-[#212134] outline-none font-bold"
              />
              <Text className="text-gray-400 font-bold">Refeições</Text>
            </View>
            <Text className="text-[10px] text-gray-500 mt-1">Nº mínimo de interações para considerar o dado válido.</Text>
          </View>
        </View>
      </View>

      <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <View className="flex-row items-center mb-4 border-b border-gray-100 pb-2">
          <Feather name="wifi-off" size={18} color="#212134" />
          <Text className="text-[15px] font-bold text-[#212134] ml-2">Resiliência e Gateway IoT</Text>
        </View>
        
        <View className="flex-col">
          <CustomSwitch 
            label="Sincronização Automática em Background" 
            description="Permite que o aplicativo dos pais (Gateway) envie os dados armazenados offline assim que detectar conexão Wi-Fi ou 4G/5G."
            isEnabled={autoSync}
            onToggle={() => setAutoSync(!autoSync)}
          />
          <CustomSwitch 
            label="Notificar Dispositivos Offline" 
            description="Exibe um alerta visual no Dashboard caso a placa Arduino Uno / App do cuidador não sincronize dados há mais de 7 dias."
            isEnabled={offlineAlert}
            onToggle={() => setOfflineAlert(!offlineAlert)}
          />
        </View>
      </View>

      <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <View className="flex-row items-center mb-4 border-b border-gray-100 pb-2">
          <Feather name="lock" size={18} color="#212134" />
          <Text className="text-[15px] font-bold text-[#212134] ml-2">Segurança e Dados (LGPD)</Text>
        </View>
        
        <View className="flex-col">
          <CustomSwitch 
            label="Anonimizar Dados Sensíveis para Exportação" 
            description="Oculta o nome da criança e do cuidador ao exportar bases de dados em massa (CSV) para pesquisas acadêmicas."
            isEnabled={lgpdConsent}
            onToggle={() => setLgpdConsent(!lgpdConsent)}
          />
        </View>
        <View className="mt-4 pt-4 border-t border-gray-100">
           <TouchableOpacity className="flex-row items-center justify-center bg-gray-100 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
              <Feather name="download" size={14} color="#4B5563" />
              <Text className="ml-2 text-[13px] font-bold text-[#4B5563]">Fazer Backup do Banco de Dados</Text>
           </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-end mt-2 mb-10">
        <TouchableOpacity className="bg-[#528F33] px-8 py-3.5 rounded-xl shadow-sm hover:bg-[#457a2a] transition-colors flex-row items-center">
          <Feather name="save" size={16} color="#fff" />
          <Text className="text-white font-bold text-[15px] ml-2">Atualizar Parâmetros</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
