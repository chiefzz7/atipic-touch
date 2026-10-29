import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

import Footer from '../../components/ui/Footer';
import { Container, SectionTitle } from '../../components/sobre/Section';
import Slideshow from '../../components/sobre/Slideshow';
import Marquee from '../../components/sobre/Marquee';
import JustifiedGallery from '../../components/sobre/JustifiedGallery';
import Lightbox from '../../components/sobre/Lightbox';
import {
  LINKS,
  PROJETO,
  SOBRE_NOS,
  PROBLEMA,
  PASSOS,
  BENEFICIOS,
  AVISO,
  TECNOLOGIAS,
  INTEGRANTES,
  FOTO_BANNER,
  FOTOS_EQUIPE,
  ETAPAS,
} from '../../data/projeto';

const NAV = [
  { id: 'sobre', label: 'Quem somos' },
  { id: 'pitch', label: 'Pitch' },
  { id: 'projeto', label: 'O projeto' },
  { id: 'bastidores', label: 'Como foi' },
];

function openUrl(url) {
  Linking.openURL(url).catch(() => {});
}

function Chip({ icon, children }) {
  return (
    <View className="flex-row items-center bg-[#EEF5E8] border border-[#A3C78B] rounded-full px-3.5 py-2 mr-2 mb-2">
      {icon ? <Feather name={icon} size={14} color="#467A2B" style={{ marginRight: 6 }} /> : null}
      <Text className="text-[13px] font-semibold text-[#2F5A1B]">{children}</Text>
    </View>
  );
}

function PrimaryButton({ title, icon, onPress }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-row items-center justify-center h-[48px] px-6 rounded-[12px] bg-[#528F33] hover:bg-[#467A2B] transition-colors mr-3 mb-3"
    >
      {icon ? <Feather name={icon} size={18} color="#fff" style={{ marginRight: 8 }} /> : null}
      <Text className="text-white font-bold text-[15px]">{title}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({ title, icon, onPress }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-row items-center justify-center h-[48px] px-6 rounded-[12px] border border-[#528F33] bg-white hover:bg-[#EEF5E8] transition-colors mr-3 mb-3"
    >
      {icon ? <Feather name={icon} size={18} color="#467A2B" style={{ marginRight: 8 }} /> : null}
      <Text className="text-[#2F5A1B] font-bold text-[15px]">{title}</Text>
    </TouchableOpacity>
  );
}

function VideoFrame({ src, title }) {
  if (Platform.OS !== 'web') return null;
  return React.createElement('iframe', {
    src,
    title,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    allowFullScreen: true,
    style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 },
  });
}

export default function SobreScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const wide = width >= 960;

  const scrollRef = useRef(null);
  const ys = useRef({});
  const [lightbox, setLightbox] = useState(null);

  const onSectionLayout = useCallback((id) => (e) => {
    ys.current[id] = e.nativeEvent.layout.y;
  }, []);

  const goTo = useCallback((id) => {
    const y = ys.current[id];
    if (scrollRef.current && y !== undefined) scrollRef.current.scrollTo({ y: Math.max(0, y - 72), animated: true });
  }, []);

  const entrar = useCallback(() => router.push('/'), [router]);

  // Todas as fotos dos bastidores em uma lista única (usada no lightbox e na faixa).
  const bastidores = useMemo(() => ETAPAS.flatMap((e) => e.fotos), []);
  const offsets = useMemo(() => {
    let acc = 0;
    return ETAPAS.map((e) => {
      const o = acc;
      acc += e.fotos.length;
      return o;
    });
  }, []);

  const rowHeight = width >= 960 ? 230 : width >= 600 ? 190 : 150;
  const embedYoutube = `https://www.youtube-nocookie.com/embed/${LINKS.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${LINKS.youtubeId}&playsinline=1&rel=0`;

  return (
    <View className="bg-[#FFFCEF]" style={{ height: '100vh' }}>
      {/* Barra superior */}
      <View
        accessibilityRole="navigation"
        className="bg-[#FFFCEF] border-b border-[#DDD3B9] z-50"
        style={{ minHeight: 64, justifyContent: 'center' }}
      >
        <Container className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-9 h-9 bg-[#528F33] rounded-[11px] items-center justify-center">
              <Text className="text-white font-extrabold text-[14px]">AT</Text>
            </View>
            <Text className="ml-2.5 text-[18px] font-extrabold text-[#212134] tracking-tight">AtipicTouch</Text>
          </View>

          <View className="flex-row items-center">
            {wide
              ? NAV.map((n) => (
                  <TouchableOpacity key={n.id} onPress={() => goTo(n.id)} className="px-3.5 py-2">
                    <Text className="text-[14px] font-semibold text-[#212134] hover:text-[#528F33] transition-colors">
                      {n.label}
                    </Text>
                  </TouchableOpacity>
                ))
              : null}
            <TouchableOpacity
              accessibilityRole="button"
              onPress={entrar}
              className="ml-2 h-[38px] px-4 rounded-[10px] border border-[#528F33] items-center justify-center hover:bg-[#EEF5E8] transition-colors"
            >
              <Text className="text-[13px] font-bold text-[#2F5A1B]">Entrar no sistema</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </View>

      <ScrollView ref={scrollRef} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* HERO: fotos da equipe, passando devagar */}
        <View className="pt-8 pb-12 md:pt-14 md:pb-20">
          <Container>
            <View style={{ flexDirection: wide ? 'row' : 'column', alignItems: 'center', gap: wide ? 56 : 32 }}>
              <View style={{ flex: wide ? 1 : undefined, width: '100%' }}>
                <Text className="text-[12px] font-bold tracking-[2px] uppercase text-[#528F33] mb-3">
                  TCC · {PROJETO.escola}
                </Text>
                <Text
                  accessibilityRole="header"
                  aria-level={1}
                  className="text-[44px] md:text-[64px] leading-[1.02] font-extrabold text-[#212134] tracking-tight"
                >
                  {PROJETO.nome}
                </Text>
                <Text className="mt-5 text-[17px] md:text-[19px] leading-relaxed text-[#4A4538] max-w-[520px]">
                  {PROJETO.tagline}
                </Text>
                <View className="flex-row flex-wrap mt-7">
                  <PrimaryButton title="Assistir ao pitch" icon="play" onPress={() => goTo('pitch')} />
                  <SecondaryButton title="Acompanhe como foi" icon="image" onPress={() => goTo('bastidores')} />
                </View>
              </View>

              <View style={{ flex: wide ? 1 : undefined, width: '100%' }}>
                <Slideshow photos={FOTOS_EQUIPE} holdMs={1000} fadeMs={700} />
                <Text className="mt-3 text-[13px] text-[#6B6554] text-center">A equipe em ação, durante a feira</Text>
              </View>
            </View>
          </Container>
        </View>

        {/* QUEM SOMOS */}
        <View onLayout={onSectionLayout('sobre')} className="bg-[#F1E9D2] py-14 md:py-20">
          <Container>
            <View style={{ flexDirection: wide ? 'row' : 'column-reverse', alignItems: 'center', gap: wide ? 56 : 28 }}>
              <View style={{ flex: wide ? 1 : undefined, width: '100%' }}>
                <View
                  className="w-full rounded-[20px] overflow-hidden bg-white border border-[#DDD3B9]"
                  style={{ aspectRatio: 4 / 3, boxShadow: '0 10px 32px rgba(33,33,52,0.12)' }}
                >
                  <Image
                    source={FOTO_BANNER.src}
                    accessibilityLabel={FOTO_BANNER.alt}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              </View>

              <View style={{ flex: wide ? 1 : undefined, width: '100%' }}>
                <SectionTitle eyebrow="Quem somos" title="Estudantes criando tecnologia com propósito" />
                {SOBRE_NOS.map((t, i) => (
                  <Text key={i} className="text-[16px] md:text-[17px] leading-relaxed text-[#3A3629] mb-4">
                    {t}
                  </Text>
                ))}
                <View className="flex-row flex-wrap mt-2">
                  <Chip icon="book-open">3º ano do Ensino Médio</Chip>
                  <Chip icon="code">Desenvolvimento de Sistemas (AMS)</Chip>
                  <Chip icon="map-pin">{PROJETO.escola}</Chip>
                </View>
              </View>
            </View>
          </Container>
        </View>

        {/* PITCH + SLIDE */}
        <View onLayout={onSectionLayout('pitch')} className="py-14 md:py-20">
          <Container>
            <SectionTitle
              eyebrow="Apresentação"
              title="Conheça o Atipic Touch em poucos minutos"
              subtitle="Veja o pitch do projeto e acompanhe os slides que apresentamos."
            />
            <View style={{ flexDirection: wide ? 'row' : 'column', gap: 24, alignItems: 'stretch' }}>
              <View style={{ flex: wide ? 2 : undefined, width: '100%' }}>
                <View
                  className="w-full rounded-[20px] overflow-hidden bg-[#212134]"
                  style={{ aspectRatio: 16 / 9, boxShadow: '0 12px 40px rgba(33,33,52,0.2)' }}
                >
                  <VideoFrame src={embedYoutube} title="Pitch do Atipic Touch" />
                </View>
                <TouchableOpacity onPress={() => openUrl(LINKS.youtubeUrl)} className="mt-3 flex-row items-center">
                  <Feather name="external-link" size={14} color="#528F33" style={{ marginRight: 6 }} />
                  <Text className="text-[13px] font-semibold text-[#2F5A1B]">Abrir o pitch no YouTube</Text>
                </TouchableOpacity>
              </View>

              <View
                className="bg-[#F3F7EE] border border-[#A3C78B] rounded-[20px] p-6 md:p-7 justify-between"
                style={{ flex: wide ? 1 : undefined, width: '100%' }}
              >
                <View>
                  <View className="w-12 h-12 rounded-[14px] bg-[#528F33] items-center justify-center mb-4">
                    <Feather name="monitor" size={24} color="#fff" />
                  </View>
                  <Text className="text-[20px] font-extrabold text-[#212134] mb-2">Slides da apresentação</Text>
                  <Text className="text-[14px] leading-relaxed text-[#4A4538] mb-5">
                    O material que usamos na defesa do projeto, com a ideia, o funcionamento e a equipe.
                  </Text>
                </View>
                {LINKS.canvaEmbed && Platform.OS === 'web' ? (
                  <View className="w-full rounded-[12px] overflow-hidden mb-4" style={{ aspectRatio: 16 / 9 }}>
                    {React.createElement('iframe', {
                      src: LINKS.canvaEmbed,
                      title: 'Slides do Atipic Touch',
                      allowFullScreen: true,
                      loading: 'lazy',
                      style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 },
                    })}
                  </View>
                ) : null}
                <PrimaryButton title="Abrir os slides" icon="external-link" onPress={() => openUrl(LINKS.canvaUrl)} />
              </View>
            </View>
          </Container>
        </View>

        {/* O PROJETO */}
        <View onLayout={onSectionLayout('projeto')} className="bg-[#F3F7EE] py-14 md:py-20 border-y border-[#DCE8D2]">
          <Container>
            <SectionTitle
              eyebrow="O projeto"
              title="Do problema à solução"
              subtitle="Uma ferramenta de apoio para observar, registrar e compreender as experiências alimentares de cada criança."
            />

            <View style={{ flexDirection: wide ? 'row' : 'column', gap: 20, marginBottom: 40 }}>
              {PROBLEMA.map((p) => (
                <View
                  key={p.titulo}
                  className="bg-white border border-[#DCE8D2] rounded-[18px] p-6 md:p-7"
                  style={{ flex: wide ? 1 : undefined, width: '100%' }}
                >
                  <Text className="text-[18px] font-extrabold text-[#212134] mb-2">{p.titulo}</Text>
                  <Text className="text-[15px] leading-relaxed text-[#4A4538]">{p.texto}</Text>
                </View>
              ))}
            </View>

            <Text className="text-[20px] font-extrabold text-[#212134] mb-4">Como funciona</Text>
            <View style={{ flexDirection: wide ? 'row' : 'column', gap: 20, marginBottom: 44 }}>
              {PASSOS.map((s, i) => (
                <View
                  key={s.titulo}
                  className="bg-[#212134] rounded-[18px] p-6 md:p-7"
                  style={{ flex: wide ? 1 : undefined, width: '100%' }}
                >
                  <View className="flex-row items-center justify-between mb-5">
                    <View className="w-11 h-11 rounded-[12px] bg-[#528F33] items-center justify-center">
                      <Feather name={s.icone} size={22} color="#fff" />
                    </View>
                    <Text className="text-[28px] font-extrabold text-[#A3C78B]">{`0${i + 1}`}</Text>
                  </View>
                  <Text className="text-[18px] font-extrabold text-white mb-2">{s.titulo}</Text>
                  <Text className="text-[14px] leading-relaxed text-[#D9D9E3]">{s.texto}</Text>
                </View>
              ))}
            </View>

            <Text className="text-[20px] font-extrabold text-[#212134] mb-4">Como ajuda na prática</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 40 }}>
              {BENEFICIOS.map((b) => (
                <View
                  key={b.titulo}
                  className="bg-white border border-[#DCE8D2] rounded-[14px] p-5"
                  style={{ flexGrow: 1, flexBasis: wide ? 320 : 260 }}
                >
                  <View className="flex-row items-center mb-1.5">
                    <Feather name="check-circle" size={16} color="#528F33" style={{ marginRight: 8 }} />
                    <Text className="text-[15px] font-bold text-[#212134] flex-1">{b.titulo}</Text>
                  </View>
                  <Text className="text-[14px] leading-relaxed text-[#5E5E75]">{b.texto}</Text>
                </View>
              ))}
            </View>

            <Text className="text-[20px] font-extrabold text-[#212134] mb-3">Tecnologias</Text>
            <View className="flex-row flex-wrap mb-8">
              {TECNOLOGIAS.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </View>

            <View className="flex-row bg-white border border-[#E5D9A8] rounded-[14px] p-5">
              <Feather name="info" size={20} color="#8A6D1F" style={{ marginRight: 12, marginTop: 2 }} />
              <Text className="flex-1 text-[14px] leading-relaxed text-[#4A4538]">{AVISO}</Text>
            </View>
          </Container>
        </View>

        {/* INTEGRANTES (aparece quando INTEGRANTES for preenchido em src/data/projeto.js) */}
        {INTEGRANTES.length > 0 ? (
          <View className="py-14 md:py-20">
            <Container>
              <SectionTitle eyebrow="Equipe" title="Quem faz o Atipic Touch" />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
                {INTEGRANTES.map((m) => (
                  <View
                    key={m.nome}
                    className="bg-white border border-[#DDD3B9] rounded-[16px] p-5 items-center"
                    style={{ flexGrow: 1, flexBasis: 220 }}
                  >
                    <View className="w-16 h-16 rounded-full bg-[#EEF5E8] items-center justify-center mb-3">
                      <Text className="text-[20px] font-extrabold text-[#528F33]">
                        {m.nome
                          .split(' ')
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join('')
                          .toUpperCase()}
                      </Text>
                    </View>
                    <Text className="text-[16px] font-bold text-[#212134] text-center">{m.nome}</Text>
                    {m.funcao ? <Text className="text-[13px] text-[#6B6554] text-center mt-1">{m.funcao}</Text> : null}
                  </View>
                ))}
              </View>
            </Container>
          </View>
        ) : null}

        {/* ACOMPANHE COMO FOI */}
        <View onLayout={onSectionLayout('bastidores')} className="bg-[#212134] pt-14 md:pt-20 pb-14 md:pb-20">
          <Container>
            <View className="mb-8 md:mb-10">
              <Text className="text-[12px] font-bold tracking-[2px] uppercase text-[#A3C78B] mb-2">Bastidores</Text>
              <Text
                accessibilityRole="header"
                aria-level={2}
                className="text-[28px] md:text-[36px] leading-tight font-extrabold text-white tracking-tight"
              >
                Acompanhe como foi
              </Text>
              <Text className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-[#C9C9D6] max-w-[640px]">
                Da modelagem 3D aos primeiros protótipos, até a integração com o sistema. Toque em uma foto para ampliar.
              </Text>
            </View>
          </Container>

          <Marquee photos={bastidores} height={width >= 600 ? 190 : 140} onOpen={setLightbox} />

          <Container className="mt-12">
            {ETAPAS.map((etapa, i) => (
              <View key={etapa.titulo} style={{ marginBottom: i === ETAPAS.length - 1 ? 0 : 40 }}>
                <View className="flex-row items-center mb-4">
                  <View className="w-8 h-8 rounded-full bg-[#528F33] items-center justify-center mr-3">
                    <Text className="text-white font-extrabold text-[14px]">{i + 1}</Text>
                  </View>
                  <Text className="text-[20px] font-extrabold text-white">{etapa.titulo}</Text>
                </View>
                <JustifiedGallery photos={etapa.fotos} offset={offsets[i]} rowHeight={rowHeight} onOpen={setLightbox} />
              </View>
            ))}
          </Container>
        </View>

        {/* FECHAMENTO */}
        <View className="py-14 md:py-20 items-center">
          <Container className="items-center">
            <Text className="text-[26px] md:text-[32px] font-extrabold text-[#212134] tracking-tight text-center mb-3">
              Quer ver o sistema funcionando?
            </Text>
            <Text className="text-[15px] md:text-[16px] text-[#6B6554] text-center max-w-[520px] mb-6 leading-relaxed">
              Acesse o painel do especialista e veja como os registros do dispositivo viram informação para o cuidador.
            </Text>
            <PrimaryButton title="Entrar no sistema" icon="log-in" onPress={entrar} />
          </Container>
        </View>

        <Footer />
      </ScrollView>

      <Lightbox photos={bastidores} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
    </View>
  );
}
