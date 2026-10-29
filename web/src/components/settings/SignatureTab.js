import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useSettings } from '../../context/SettingsContext';
import useDraft from '../../hooks/useDraft';
import { pickFile, fileToResizedDataURL } from '../../utils/image';
import { Section, SwitchRow, SaveBar, GhostButton } from './ui';

export default function SignatureTab({ notify }) {
  const { settings, save } = useSettings();
  const { draft, set, reset, dirty } = useDraft(settings.documents);
  const [saving, setSaving] = useState(false);
  const { profile } = settings;

  const enviar = async () => {
    try {
      const file = await pickFile();
      if (!file) return;
      set({ assinatura: await fileToResizedDataURL(file, { maxSize: 700 }) });
    } catch (e) {
      notify(e.message, 'error');
    }
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await save({ documents: draft });
      notify('Preferências de documentos salvas.');
    } catch {
      notify('Não foi possível salvar. Tente novamente.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-col gap-6">
      <Section
        icon="pen-tool"
        title="Assinatura e carimbo"
        description="Envie sua assinatura (PNG com fundo transparente funciona melhor). Ela é inserida automaticamente nos relatórios."
      >
        <View className="flex-col md:flex-row gap-4">
          <TouchableOpacity
            onPress={enviar}
            className="flex-1 border-2 border-dashed border-[#A3C78B] bg-[#F3F7EE] rounded-[14px] p-8 items-center justify-center hover:bg-[#EEF5E8] transition-colors min-h-[160px]"
          >
            <Feather name="upload-cloud" size={30} color="#528F33" />
            <Text className="text-[14px] font-bold text-[#528F33] mt-2">
              {draft.assinatura ? 'Trocar arquivo' : 'Clique para enviar o arquivo'}
            </Text>
            <Text className="text-[11px] text-[#6B6554] mt-1">PNG ou JPG (máx. 2MB)</Text>
          </TouchableOpacity>

          <View className="flex-1 items-center justify-center p-4 border border-[#DCE7D2] rounded-[14px] bg-white min-h-[160px]">
            <Text className="text-[10px] font-bold text-[#9A9279] uppercase mb-3 tracking-widest">Pré-visualização no documento</Text>
            {draft.assinatura ? (
              <>
                <Image source={{ uri: draft.assinatura }} resizeMode="contain" style={{ width: 200, height: 70 }} />
                <View className="border-t border-[#212134] w-48 items-center pt-1 mt-1">
                  <Text className="text-[12px] font-bold text-[#212134]">{profile.nome || 'Profissional'}</Text>
                  {profile.registro ? <Text className="text-[11px] text-[#6B6554]">{profile.registro}</Text> : null}
                </View>
                <View className="mt-3">
                  <GhostButton icon="trash-2" label="Remover assinatura" danger onPress={() => set({ assinatura: null })} />
                </View>
              </>
            ) : (
              <Text className="text-[12px] text-[#9A9279]">Nenhuma assinatura cadastrada.</Text>
            )}
          </View>
        </View>
      </Section>

      <Section icon="shield" title="Validação e autenticidade">
        <SwitchRow
          label="Incluir código de autenticação (hash)"
          description="Gera um código SHA-256 do conteúdo no rodapé do relatório para comprovar que ele não foi alterado."
          value={draft.usarHash}
          onChange={(v) => set({ usarHash: v })}
        />
        <SwitchRow
          label="Anexar QR Code de validação"
          description="Insere um QR Code com o código de autenticação, para conferência por escolas e operadoras."
          value={draft.usarQrCode}
          onChange={(v) => set({ usarQrCode: v })}
          last
        />
      </Section>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} onReset={reset} label="Salvar preferências" />
    </View>
  );
}
