import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

const CustomSwitch = ({
  label,
  description,
  isEnabled,
  onToggle,
}) => (
  <View className="flex-row items-center justify-between py-3 border-b border-[#DDD3B9] last:border-0">
    <View className="flex-1 pr-4">
      <Text className="text-[14px] font-bold text-[#554B41]">
        {label}
      </Text>

      <Text className="text-[12px] text-[#80775C] leading-tight mt-1">
        {description}
      </Text>
    </View>

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      className={`w-12 h-6 rounded-full px-1 justify-center transition-colors ${
        isEnabled
          ? 'bg-[#83BF6E]'
          : 'bg-[#C6BB9A]'
      }`}
    >
      <View
        className={`w-4 h-4 rounded-full bg-white transition-transform ${
          isEnabled
            ? 'translate-x-6'
            : 'translate-x-0'
        }`}
      />
    </TouchableOpacity>
  </View>
);

export default function SignatureTab() {
  const [
    useHash,
    setUseHash,
  ] = useState(true);

  const [
    useQrCode,
    setUseQrCode,
  ] = useState(false);

  const [
    hasSignature,
    setHasSignature,
  ] = useState(true);

  return (
    <View className="flex-col gap-8">
      <View className="bg-[#E5DCC4] p-6 rounded-[10px] border border-[#C6BB9A]">
        <Text className="text-[15px] font-bold text-[#554B41] mb-1">
          Assinatura e Carimbo
        </Text>

        <Text className="text-[12px] text-[#80775C] mb-4">
          Faça o upload da sua assinatura com fundo transparente (PNG) para ser injetada automaticamente nos laudos PDF.
        </Text>

        <View className="flex-col md:flex-row gap-6 items-center">
          <TouchableOpacity className="flex-1 w-full border-2 border-dashed border-[#A3C78C] bg-[#F7F0DC] rounded-[10px] p-8 items-center justify-center hover:bg-[#EDF6E8] transition-colors">
            <Feather
              name="upload-cloud"
              size={32}
              color="#4D9B43"
              className="mb-2"
            />

            <Text className="text-[14px] font-bold text-[#4D9B43]">
              Clique para buscar o arquivo
            </Text>

            <Text className="text-[11px] text-[#80775C] mt-1">
              PNG ou JPG (Máx. 2MB)
            </Text>
          </TouchableOpacity>

          <View className="flex-1 w-full items-center justify-center p-4 border border-[#DDD3B9] rounded-[10px] bg-[#FFFCEF] h-full min-h-[140px]">
            {hasSignature ? (
              <View className="items-center">
                <Text className="text-[10px] font-bold text-[#A3987B] uppercase mb-2 tracking-widest">
                  Preview no Documento
                </Text>

                <View className="border-b border-[#554B41] w-40 items-center pb-2">
                  <Text
                    className="text-2xl"
                    style={{
                      fontFamily:
                        'cursive',
                      color:
                        '#554B41',
                    }}
                  >
                    C. Nogueira
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    setHasSignature(
                      false
                    )
                  }
                  className="mt-4 flex-row items-center"
                >
                  <Feather
                    name="trash-2"
                    size={12}
                    color="#D9534F"
                  />

                  <Text className="text-[11px] font-bold text-[#D9534F] ml-1">
                    Remover assinatura
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text className="text-[12px] text-[#A3987B]">
                Nenhuma assinatura cadastrada.
              </Text>
            )}
          </View>
        </View>
      </View>

      <View className="bg-[#E5DCC4] p-6 rounded-[10px] border border-[#C6BB9A]">
        <View className="flex-row items-center mb-4 border-b border-[#C6BB9A] pb-2">
          <Feather
            name="shield"
            size={18}
            color="#554B41"
          />

          <Text className="text-[15px] font-bold text-[#554B41] ml-2">
            Validação e Autenticidade
          </Text>
        </View>

        <View className="flex-col">
          <CustomSwitch
            label="Incluir Hash de Autenticação"
            description="Gera um código alfanumérico único no rodapé do documento para comprovar que o laudo não foi adulterado."
            isEnabled={useHash}
            onToggle={() =>
              setUseHash(
                !useHash
              )
            }
          />

          <CustomSwitch
            label="Anexar QR Code de Validação"
            description="Insere um QR Code que permite às operadoras de saúde ou escolas validarem a emissão do laudo no portal."
            isEnabled={useQrCode}
            onToggle={() =>
              setUseQrCode(
                !useQrCode
              )
            }
          />
        </View>
      </View>

      <View className="flex-row justify-end mt-2">
        <TouchableOpacity className="bg-[#83BF6E] px-8 py-3.5 rounded-[10px] hover:bg-[#4D9B43] transition-colors flex-row items-center">
          <Feather
            name="check"
            size={16}
            color="#FFFFFF"
          />

          <Text className="text-white font-bold text-[15px] ml-2">
            Salvar Preferências
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
