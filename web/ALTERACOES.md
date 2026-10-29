# AtipicTouch Web — alterações

## Design
- Paleta aplicada em todo o projeto (tokens em `tailwind.config.js`): verde `#528F33`, creme `#FFFCEF`, grafite `#212134`, verde suave `#A3C78B`.
- Sidebar grafite com perfil do usuário, cards com cantos 16px e sombra suave, abas em "pílula", toasts, avisos inline.

## Configurações (todas funcionais, persistidas por usuário)
- **Perfil**: nome, e-mail (validado), registro, especialidade, telefone (máscara), foto, clínica. Pré-preenchido via `/api/users/me`.
- **Documentos**: upload/remoção de assinatura, hash SHA-256 e QR Code no relatório.
- **Sistema**: limiar de rejeição e amostragem mínima (usados nos alertas do Dashboard), atualização automática com intervalo, aviso de falta de registros, anonimização + exportação CSV.
- Salvar/Descartar com detecção de alterações, validação e "Restaurar padrões".

## Relatórios
- Parecer clínico salvo automaticamente por paciente + período.
- Assinatura, registro, cabeçalho/rodapé da clínica, hash e QR.
- Exportar PDF com layout de impressão (A4) e exportar CSV do período.

## Performance
- Cache de API em memória (TTL) + deduplicação: Dashboard e Relatórios não baixam mais os mesmos dados duas vezes.
- Code-splitting por rota (`asyncRoutes`) e lazy-load de gráficos e tabela.
- Ícones importados direto de `@expo/vector-icons/Feather`.
- Removidos `recharts` e `axios` (não eram usados). Adicionados `expo-linking`/`expo-constants` (faltavam para o build).
- Aquecimento do servidor (Render dorme) ao abrir o site; cache longo para assets no `vercel.json`.
- Dados calculados com `useMemo` em uma única passada.

## Segurança/UX
- "Sair" agora limpa a sessão; rotas internas redirecionam ao login sem token.
- Botão respeita `disabled`/`loading`; Enter envia o login.

Rodar: `npm install --legacy-peer-deps && npm run web` · Build: `npm run build`
