import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSettings, DEFAULT_SETTINGS } from '../../context/SettingsContext';
import useDraft from '../../hooks/useDraft';
import { getLogs, KEYS } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { downloadText } from '../../utils/image';
import { logsToCsv } from '../../utils/format';
import { Section, Field, Row, SwitchRow, Segmented, SaveBar, GhostButton } from './ui';

const toInt = (v) => (v === '' ? '' : Number(String(v).replace(/\D/g, '')));

export default function SystemTab({ notify }) {
  const { settings, save } = useSettings();
  const { draft, set, reset, dirty } = useDraft(settings.system);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [touched, setTouched] = useState(false);

  const errors = {
    limiarRejeicao:
      draft.limiarRejeicao < 1 || draft.limiarRejeicao > 100 || draft.limiarRejeicao === '' ? 'Informe um valor de 1 a 100.' : '',
    amostraMinima:
      draft.amostraMinima < 1 || draft.amostraMinima > 100 || draft.amostraMinima === '' ? 'Informe um valor de 1 a 100.' : '',
    diasOffline: draft.diasOffline < 1 || draft.diasOffline > 90 || draft.diasOffline === '' ? 'Informe de 1 a 90 dias.' : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const onSave = async () => {
    setTouched(true);
    if (hasErrors) return notify('Corrija os campos destacados.', 'error');
    setSaving(true);
    try {
      await save({ system: draft });
      notify('Parâmetros atualizados. Já estão valendo no Dashboard.');
    } catch {
      notify('Não foi possível salvar. Tente novamente.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const exportar = async () => {
    setExporting(true);
    try {
      const childRaw = await AsyncStorage.getItem(KEYS.child);
      if (!childRaw) throw new Error('Selecione um paciente antes de exportar.');
      const child = JSON.parse(childRaw);
      const logs = await getLogs(child.id, { force: true });
      const nome = draft.anonimizar ? 'paciente' : (child.nome || 'paciente').toLowerCase().replace(/\s+/g, '-');
      downloadText(`atipictouch-${nome}-${new Date().toISOString().slice(0, 10)}.csv`, logsToCsv(logs, child, { anonimizar: draft.anonimizar }));
      notify(`${logs.length} registros exportados.`);
    } catch (e) {
      notify(e.message || 'Falha ao exportar.', 'error');
    } finally {
      setExporting(false);
    }
  };

  return (
    <View className="flex-col gap-6">
      <Section
        icon="activity"
        title="Parâmetros de análise sensorial"
        description="Definem quando o Dashboard emite alertas de rejeição por textura."
      >
        <Row>
          <Field
            label="Limiar de rejeição crítica"
            suffix="%"
            keyboardType="numeric"
            value={String(draft.limiarRejeicao)}
            onChangeText={(v) => set({ limiarRejeicao: toInt(v) })}
            error={touched ? errors.limiarRejeicao : ''}
            hint="A partir deste valor o sistema gera um alerta vermelho."
          />
          <Field
            label="Amostragem mínima"
            suffix="refeições"
            keyboardType="numeric"
            value={String(draft.amostraMinima)}
            onChangeText={(v) => set({ amostraMinima: toInt(v) })}
            error={touched ? errors.amostraMinima : ''}
            hint="Nº mínimo de registros da textura para o dado ser considerado."
          />
        </Row>
      </Section>

      <Section icon="refresh-cw" title="Sincronização e dispositivos" description="Controle a atualização dos dados vindos do aplicativo e do dispositivo IoT.">
        <SwitchRow
          label="Atualização automática dos dados"
          description="Busca novos registros em segundo plano enquanto o painel estiver aberto."
          value={draft.autoSync}
          onChange={(v) => set({ autoSync: v })}
        />
        {draft.autoSync ? (
          <View className="py-4 border-b border-[#DCE7D2]">
            <Text className="text-[12px] font-bold text-[#212134] mb-2">Intervalo</Text>
            <Segmented
              value={draft.intervaloSync}
              onChange={(v) => set({ intervaloSync: v })}
              options={[
                { value: 30, label: '30 s' },
                { value: 60, label: '1 min' },
                { value: 300, label: '5 min' },
              ]}
            />
          </View>
        ) : null}
        <SwitchRow
          label="Avisar quando não houver registros recentes"
          description="Exibe um alerta no Dashboard se o paciente ficar sem novos registros pelo período abaixo (app ou dispositivo sem sincronizar)."
          value={draft.alertaOffline}
          onChange={(v) => set({ alertaOffline: v })}
          last={!draft.alertaOffline}
        />
        {draft.alertaOffline ? (
          <View className="pt-4 max-w-[260px]">
            <Field
              label="Dias sem registros"
              suffix="dias"
              keyboardType="numeric"
              value={String(draft.diasOffline)}
              onChangeText={(v) => set({ diasOffline: toInt(v) })}
              error={touched ? errors.diasOffline : ''}
            />
          </View>
        ) : null}
      </Section>

      <Section icon="lock" title="Segurança e dados (LGPD)">
        <SwitchRow
          label="Anonimizar dados ao exportar"
          description="Omite o nome do paciente nos arquivos CSV exportados (ideal para pesquisas acadêmicas)."
          value={draft.anonimizar}
          onChange={(v) => set({ anonimizar: v })}
          last
        />
        <View className="mt-4 pt-4 border-t border-[#DCE7D2] flex-row items-center justify-between flex-wrap gap-3">
          <Text className="text-[12px] text-[#6B6554] flex-1 min-w-[220px]">
            Exporta os registros alimentares do paciente selecionado em CSV.
          </Text>
          <GhostButton icon="download" label={exporting ? 'Exportando...' : 'Exportar registros (CSV)'} onPress={exportar} disabled={exporting} />
        </View>
      </Section>

      <View className="flex-row justify-start">
        <GhostButton
          icon="rotate-ccw"
          label="Restaurar padrões"
          onPress={() => {
            set(DEFAULT_SETTINGS.system);
            notify('Padrões restaurados. Clique em Salvar para aplicar.');
          }}
        />
      </View>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} onReset={() => { reset(); setTouched(false); }} label="Atualizar parâmetros" />
    </View>
  );
}
