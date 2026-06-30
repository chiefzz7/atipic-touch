import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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

export default function SignatureTab() {
  const [useHash, setUseHash] = useState(true);
  const [useQrCode, setUseQrCode] = useState(false);
  const [hasSignature, setHasSignature] = useState(true); // Simulando que a nutricionista já fez o upload

  return (
    <View className="flex-col gap-8">
      <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <Text className="text-[15px] font-bold text-[#212134] mb-1">Assinatura e Carimbo</Text>
        <Text className="text-[12px] text-[#6B7280] mb-4">Faça o upload da sua assinatura com fundo transparente (PNG) para ser injetada automaticamente nos laudos PDF.</Text>
        
        <View className="flex-col md:flex-row gap-6 items-center">
          <TouchableOpacity className="flex-1 w-full border-2 border-dashed border-[#A3C78B] bg-[#F2F7ED] rounded-xl p-8 items-center justify-center hover:bg-[#EAF3E2] transition-colors">
            <Feather name="upload-cloud" size={32} color="#528F33" className="mb-2" />
            <Text className="text-[14px] font-bold text-[#528F33]">Clique para buscar o arquivo</Text>
            <Text className="text-[11px] text-[#6B7280] mt-1">PNG ou JPG (Máx. 2MB)</Text>
          </TouchableOpacity>

          <View className="flex-1 w-full items-center justify-center p-4 border border-gray-200 rounded-xl bg-gray-50 h-full min-h-[140px]">
            {hasSignature ? (
              <View className="items-center">
                <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Preview no Documento</Text>
                <View className="border-b border-black w-40 items-center pb-2">
                  <Text className="text-2xl" style={{ fontFamily: 'cursive', color: '#000080' }}>C. Nogueira</Text>
                </View>
                <TouchableOpacity onPress={() => setHasSignature(false)} className="mt-4 flex-row items-center">
                  <Feather name="trash-2" size={12} color="#D9534F" />
                  <Text className="text-[11px] font-bold text-[#D9534F] ml-1">Remover assinatura</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text className="text-[12px] text-gray-400">Nenhuma assinatura cadastrada.</Text>
            )}
          </View>

        </View>
      </View>

      <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <View className="flex-row items-center mb-4 border-b border-gray-100 pb-2">
          <Feather name="shield" size={18} color="#212134" />
          <Text className="text-[15px] font-bold text-[#212134] ml-2">Validação e Autenticidade</Text>
        </View>
        
        <View className="flex-col">
          <CustomSwitch 
            label="Incluir Hash de Autenticação" 
            description="Gera um código alfanumérico único no rodapé do documento para comprovar que o laudo não foi adulterado."
            isEnabled={useHash}
            onToggle={() => setUseHash(!useHash)}
          />
          <CustomSwitch 
            label="Anexar QR Code de Validação" 
            description="Insere um QR Code que permite às operadoras de saúde ou escolas validarem a emissão do laudo no portal."
            isEnabled={useQrCode}
            onToggle={() => setUseQrCode(!useQrCode)}
          />
        </View>
      </View>

      <View className="flex-row justify-end mt-2">
        <TouchableOpacity className="bg-[#528F33] px-8 py-3.5 rounded-xl shadow-sm hover:bg-[#457a2a] transition-colors flex-row items-center">
          <Feather name="check" size={16} color="#fff" />
          <Text className="text-white font-bold text-[15px] ml-2">Salvar Preferências</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
