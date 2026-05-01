# 🧠 AtipicTouch

##  Para acompanhar as atualizações mais recentes, mude para a branch `develop`

Bem-vindo ao repositório oficial da Atipic Touch, sistema para auxiliar Mães de Crianças Não Verbais com Seletividade Alimentar. Este é um projeto de Engenharia de Sistemas Híbridos (IoT + Nuvem) dividido em quatro grandes pilares.

## 📂 Arquitetura do Monorepo

* **`/hardware`**: Firmware em C/C++ do dispositivo embarcado (Fase 1: Arduino + Bluetooth | Fase 2: ESP32 + MQTT). E arquivos de impressão 3D.
* **`/backend`**: API Python central. Usa FastAPI para requisições REST assíncronas e SQLModel como ORM para o banco de dados PostgreSQL.
* **`/mobile`**: Aplicativo Gateway Offline-First construído em React Native (Expo) e NativeWind (Tailwind). Coleta dados via Bluetooth e sincroniza com a nuvem (arquitetura tolerante a falhas).
* **`/web`**: Dashboard analítico para os terapeutas. Construído em React Native Web (Expo) para viabilizar o reaproveitamento de código (*Code Sharing*), com NativeWind e Recharts para visualização de dados em tempo real.

---

## 🛠️ Tecnologias Utilizadas

| Camada   | Tecnologia        | Versão      |
|----------|------------------|--------------|
| Backend  | Python           | 3.12.x (LTS)|
| Backend  | FastAPI          | 0.110.x      |
| Backend  | SQLModel         | 0.0.16+      |
| Mobile   | React Native     | 0.74.x       |
| Mobile   | React            | 18.x         |
| Mobile   | Expo             | SDK 51       |
| Mobile   | NativeWind       | 4.x          |
| Mobile   | TanStack Query   | 5.x          |
| Web      | React Native Web | 0.19.x       |
| Web      | Expo             | SDK 51       |
| Web      | NativeWind       | 4.x          |
| Web      | Recharts         | 2.x          |