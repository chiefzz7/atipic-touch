# 📚 Guia Básico de Git e GitHub

Este guia foi criado para auxiliar iniciantes com Git & GitHub

## 1. Conceitos Fundamentais
- **Git:** É a ferramenta que roda no seu computador (Linux, Windows ou macOS). Ele rastreia as mudanças nos arquivos ao longo do tempo.
- **GitHub:** É a "nuvem" onde você guarda seus repositórios Git para trabalhar em equipe, ter backup e mostrar seu portfólio. Permite colaboracoes e versionamento de código.
- **Repositório (Repo):** A pasta/diretório do seu projeto que está sendo monitorada pelo Git.

---

## 2. Configuração Inicial (Primeiro Uso)

Antes de começar, diga ao Git quem você é. Isso ficará registrado em cada alteração (commit) que você fizer. Abra o terminal e digite:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

## 3. O Fluxo de Trabalho Básico (Local)


### 3.1.1 - Se você já tem uma pasta com seu projeto e quer começar a versioná-lo:

```bash
cd caminho/para/seu/projeto
git init
```

**Isso cria um repositório Git local vazio na pasta atual.**

---

**3.1.2 - Se o projeto já existe no GitHub e você quer baixá-lo:**

```bash
git clone https://github.com/usuario/nome-do-projeto.git
cd nome-do-projeto
```

---

### 3.2 - O Ciclo: Modificar, Adicionar e Salvar


**3.2.1 - Verificar o estado dos arquivos:**

```bash
git status
```

**Dica: Use este comando o tempo todo para saber o que está acontecendo.**

---

**3.2.2 - Adicionar arquivos à "Área de Preparação" (Staging):**

**Adicionar um arquivo específico:**

```bash
git add main.java
```

**Adicionar todos os arquivos modificados:**

```bash
git add .
```

---

**3.2.3 - Salvar as alterações (Commit):**

**Como commitar (boas práticas):**

```bash
Formato recomendado (curto + explicativo):

[Tipo] Curta descrição do que foi feito

Tipos comuns:

feat → Nova funcionalidade (feature)
fix → Correção de bug
docs → Alteração em documentação
style → Formatação, identação, sem mudança de lógica
refactor → Refatoração de código
test → Adição ou alteração de testes
chore → Tarefas de manutenção, sem impacto no código

```

**Exemplos:**
```bash
git commit -m "feat: adiciona tela de login"
git commit -m "fix: corrige bug no cálculo de pontos"
git commit -m "docs: atualiza README com instruções de setup"
git commit -m "style: formata código e ajusta indentação"
git commit -m "refactor: reorganiza funções de autenticação"
git commit -m "test: adiciona teste para função de pagamento"
git commit -m "chore: atualiza dependências do projeto"
```

**Regra de ouro: Escreva mensagens curtas, mas que expliquem o motivo da mudança.**

**Ver o histórico de commits:**

```bash
git log
```

---

## 4. Trabalhando com o GitHub (Remoto)

### 4.1 - Conectando seu projeto local ao GitHub

**Se você usou git init, precisa conectar sua pasta local a um repositório vazio criado no GitHub:**

```bash
git remote add origin https://github.com/usuario/nome-do-projeto.git
git branch -M main
```

---

### 4.2 - Enviando e Recebendo Código 

**4.2.1 - Enviar (upload) suas alterações para o GitHub:**

```bash
git push -u origin main
```

**O -u origin main só é necessário na primeira vez. Depois, basta usar git push.**

---

**4.2.2 - Receber as alterações feitas pela equipe:**

```bash
git pull origin main
```

**Antes de começar a codificar, sempre baixe as atualizações dos seus colegas para evitar conflitos!**

*O [git pull] é a mescla dos comandos [git fetch] + [git merge], o fetch baixa as referencias e o que falta nos códigos para ficar igual ao repositório remoto(no GitHub); Já o pull é como se ele clonasse de novo o repositório, faz o fetch + o merge*

---


## 5. Branches (Ramificações)

**Para trabalhar em equipe, nunca trabalhamos todos diretamente na branch main. Criamos branches para desenvolver novas funcionalidades de forma isolada.**

### 5.1 - Criando e navegando em Branches

**5.1.1 - Criar uma nova branch e já mudar para ela:**

```bash
git checkout -b feature/web-dashboard
```

**Ou usando o switch (implementado nas novas versões do Git - apartir de 2020)**

```bash
git switch -c feature/web-dashboard
```

---

**5.1.2 - Alterar para uma nova branch já existente**

**Listar todas as branches:**

```bash
git branch
```

**Para alterar sua branch atual:**

```bash
git checkout feature/web-dashboard
```

**Ou**

```bash
git switch feature/web-dashboard
```
---

### 5.2 - Juntando o trabalho (Merge)

**5.2.1 - Quando você terminar a funcionalidade na sua branch, ela precisa ser unida à main.**

**Ir para a branch que vai receber o código:**

```bash
git checkout main
```

**Puxe as atualizações mais recentes (sempre!):**

```bash
git pull origin main
```

**Faça o merge da sua branch com a main(ou a branch que vc entrou):**

```bash
git merge feature/web-dashboard
```

**Faca o merge apenas em códigos testados, corretos e analisados para evitar conflitos(boas práticas)**

---

## 6. Lidando com Conflitos ⚠️

**Conflitos acontecem quando duas pessoas alteram a mesma linha do mesmo arquivo. O Git não sabe qual versão manter e pausa o processo de merge ou pull para você decidir.**

**O terminal avisará que houve um conflito.**
**Abra o arquivo no seu editor de código.**
**Você verá marcações geradas pelo Git, parecidas com isso:**

```bash
const portaSerial = 9600;
const portaSerial = 115200;
```

**Mesma linha alterada**

**Delete as marcações (<<<<<<<, =======, >>>>>>>) e deixe apenas o código final que deve permanecer.**

**Salve o arquivo.**

**Avise o Git que o conflito foi resolvido:**

```bash
git add arquivo-em-conflito.js
git commit -m "fix: resolve conflito na configuração da porta serial"
```

## 7. Boas Práticas (Checklist do Desenvolvedor)
### Use o .gitignore: Crie um arquivo .gitignore na raiz do projeto e coloque nele pastas pesadas ou arquivos com senhas sensíveis que nunca devem ir para o GitHub (ex: node_modules/, arquivos .env, pastas de compilação como bin/ ou obj/ em projetos C#).

### Commits Pequenos e Frequentes: Faça commits a cada pequena etapa lógica concluída, não só no final.

### Comunique-se com a Equipe: Avise em qual branch você está trabalhando para evitar conflitos com outros desenvolvedores.

---
