import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import AvatarHeader from "../../components/AvatarHeader";
import BottomNavigation from "../../components/BottomNavigation";
import SectionCard from "../../components/SectionCard";
import DateBadge from "../../components/DateBadge";
import ExperienceCard from "../../components/ExperienceCard";

export default function DashboardScreen() {
  const today = "Hoje, 30 de Junho";

  const experiences = [
    {
      title: "Cor",
      question: "Quais cores você percebeu?",
      icon: "color-palette",
      selected: "Amei",
      options: [
        "Amei",
        "Neutro",
        "Não gostei",
      ],
    },
    {
      title: "Sabor",
      question: "Qual sabor você sentiu?",
      icon: "restaurant",
      selected: "Doce",
      options: [
        "Doce",
        "Salgado",
        "Azedo",
        "Amargo",
        "Neutro",
      ],
    },
    {
      title: "Textura",
      question: "Como foi a textura?",
      icon: "hand-left",
      selected: "Macio",
      options: [
        "Macio",
        "Áspero",
        "Liso",
        "Pegajoso",
        "Neutro",
      ],
    },
    {
      title: "Cheiro",
      question: "Como foi o cheiro?",
      icon: "flower",
      selected: "Agradável",
      options: [
        "Agradável",
        "Neutro",
        "Desagradável",
      ],
    },
    {
      title: "Temperatura",
      question: "Como estava a temperatura?",
      icon: "thermometer",
      selected: "Quente",
      options: [
        "Quente",
        "Agradável",
        "Neutro",
        "Frio",
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <ScrollView
        className="flex-1 px-3 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >

        <AvatarHeader
          variant="dashboard"
          greeting="Bom dia"
          childName="João"
        />

        <SectionCard
          title="Resumo do dia"
          subtitle="Acompanhe as atividades de hoje."
        >

          <DateBadge
            date={today}
          />

          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.title}
              title={experience.title}
              question={experience.question}
              icon={experience.icon}
              selected={experience.selected}
              options={experience.options}
            />
          ))}

        </SectionCard>

      </ScrollView>

      <BottomNavigation
        active="dashboard"
      />

    </SafeAreaView>
  );
}