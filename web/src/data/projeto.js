// Conteúdo da página "Sobre" (apresentação do projeto na feira).
// Edite aqui textos, links, integrantes e legendas — a tela lê tudo deste arquivo.

export const LINKS = {
  // Pitch no YouTube (ID do vídeo)
  youtubeId: 's26I2nLjGKU',
  youtubeUrl: 'https://youtu.be/s26I2nLjGKU',
  // Slide no Canva. Se quiser exibir o slide embutido na página, use o link
  // "Compartilhar > Mais > Incorporar" do Canva em `canvaEmbed`.
  canvaUrl: 'https://canva.link/zslemjx22lookue',
  canvaEmbed: '',
};

export const PROJETO = {
  nome: 'Atipic Touch',
  tagline: 'Tecnologia assistiva para o dia a dia de quem cuida de crianças não verbais com seletividade alimentar.',
  escola: 'Etec de Registro',
  curso: 'Ensino Médio Integrado ao Técnico em Desenvolvimento de Sistemas (AMS)',
};

export const SOBRE_NOS = [
  'Somos estudantes do 3º ano do Ensino Médio Integrado ao Técnico em Desenvolvimento de Sistemas (AMS) da Etec de Registro.',
  'O Atipic Touch nasceu da sensibilidade de uma de nossas integrantes ao assistir a um vídeo sobre a rotina da mãe de uma criança atípica. Dali veio a vontade de transformar o que sentimos em uma solução real, e seguimos em frente.',
];

export const PROBLEMA = [
  {
    titulo: 'O desafio',
    texto:
      'A seletividade alimentar envolve resistência a alimentos, texturas, cores e consistências. Quando a criança não fala, entender o que ela aceita, recusa ou sente fica ainda mais difícil para quem cuida.',
  },
  {
    titulo: 'A nossa resposta',
    texto:
      'Um dispositivo lúdico, parecido com um pequeno piano, conectado a um sistema digital. A criança interage, e o cuidador passa a ter registros organizados para enxergar padrões ao longo do tempo.',
  },
];

export const PASSOS = [
  { icone: 'music', titulo: 'A criança interage', texto: 'Um dispositivo em formato de piano, colorido e acessível, torna a experiência alimentar mais lúdica.' },
  { icone: 'database', titulo: 'O sistema registra', texto: 'Cada reação é enviada à API e salva no banco de dados, sem anotações soltas na rotina.' },
  { icone: 'bar-chart-2', titulo: 'O cuidador acompanha', texto: 'Painéis, indicadores e relatórios mostram preferências e evolução, e podem ser levados a profissionais.' },
];

export const BENEFICIOS = [
  { titulo: 'Acompanhamento individualizado', texto: 'Observa as preferências e respostas de cada criança.' },
  { titulo: 'Informação organizada', texto: 'Reúne os registros em um só ambiente digital.' },
  { titulo: 'Apoio à decisão', texto: 'Ajuda cuidadores e profissionais a planejar estratégias.' },
  { titulo: 'Estímulo à interação', texto: 'Uma proposta lúdica que favorece o envolvimento.' },
  { titulo: 'Comunicação não verbal', texto: 'Valoriza reações e comportamentos como forma de expressão.' },
  { titulo: 'Evolução ao longo do tempo', texto: 'Compara registros e mostra mudanças.' },
];

export const AVISO =
  'O Atipic Touch não substitui nutricionistas, terapeutas ocupacionais, fonoaudiólogos, pediatras ou outros profissionais habilitados. Ele complementa o trabalho de quem cuida, oferecendo apoio tecnológico ao acompanhamento.';

export const TECNOLOGIAS = [
  'Aplicação web',
  'Aplicativo mobile',
  'Arduino UNO',
  'ESP32',
  'Python',
  'FastAPI',
  'Banco de dados',
  'Modelagem 3D',
];

// Integrantes: preencha para exibir a seção "Quem faz o Atipic Touch".
// Exemplo: { nome: 'Fulana de Tal', funcao: 'Back-end e banco de dados' }
export const INTEGRANTES = [];

// ---------------------------------------------------------------------------
// Fotos
// ---------------------------------------------------------------------------

export const FOTO_BANNER = { src: require('../../assets/equipe/banner.jpg'), w: 1280, h: 960, alt: 'Banner do Atipic Touch com o mascote brócolis' };

// Equipe em ação: passam devagar no início da página.
export const FOTOS_EQUIPE = [
  { src: require('../../assets/equipe/equipe-01.jpg'), w: 1280, h: 960, alt: 'Integrante montando o dispositivo diante do banner do projeto' },
  { src: require('../../assets/equipe/equipe-02.jpg'), w: 1280, h: 960, alt: 'Equipe testando o dispositivo e o sistema na feira' },
  { src: require('../../assets/equipe/equipe-03.jpg'), w: 1280, h: 960, alt: 'Equipe montando e testando o dispositivo, com visitantes ao fundo' },
  { src: require('../../assets/equipe/equipe-04.jpg'), w: 1280, h: 960, alt: 'Integrantes programando e ajustando o piano' },
  { src: require('../../assets/equipe/equipe-05.jpg'), w: 1280, h: 960, alt: 'Integrantes trabalhando lado a lado' },
  { src: require('../../assets/equipe/equipe-06.jpg'), w: 1280, h: 960, alt: 'Integrante ajustando o dispositivo' },
  { src: require('../../assets/equipe/equipe-07.jpg'), w: 1280, h: 960, alt: 'Integrante com o dispositivo e o notebook' },
  { src: require('../../assets/equipe/equipe-08.jpg'), w: 960, h: 1280, alt: 'Integrante testando o dispositivo' },
  { src: require('../../assets/equipe/equipe-09.jpg'), w: 1280, h: 960, alt: 'Montagem do dispositivo e da eletrônica' },
  { src: require('../../assets/equipe/equipe-10.jpg'), w: 1280, h: 960, alt: 'Programação durante a montagem' },
  { src: require('../../assets/equipe/equipe-11.jpg'), w: 1600, h: 1200, alt: 'Mesa do projeto com o piano, notebook e materiais de montagem' },
  { src: require('../../assets/equipe/equipe-12.jpg'), w: 1600, h: 1200, alt: 'Integrante ao lado do dispositivo sobre a mesa do estande' },
  { src: require('../../assets/equipe/equipe-13.jpg'), w: 1600, h: 1200, alt: 'Estande do Atipic Touch com banner, monitor e dispositivo' },
  { src: require('../../assets/equipe/equipe-14.jpg'), w: 1200, h: 1600, alt: 'Integrante montando o dispositivo no estande' },
];

// Acompanhe como foi: bastidores do desenvolvimento (final da página).
export const ETAPAS = [
  {
    titulo: 'Ideia e modelagem 3D',
    fotos: [
      { src: require('../../assets/equipe/dev-modelo3d-teclas.jpg'), w: 1051, h: 570, alt: 'Modelo 3D do piano com cinco teclas coloridas e três botões', legenda: 'Modelo 3D do piano: cinco teclas e três botões' },
      { src: require('../../assets/equipe/dev-modelo3d-estrutura.jpg'), w: 1180, h: 540, alt: 'Estrutura 3D do piano', legenda: 'Estrutura do dispositivo' },
    ],
  },
  {
    titulo: 'Eletrônica e protótipos',
    fotos: [
      { src: require('../../assets/equipe/dev-protoboard-botoes-1.jpg'), w: 1200, h: 1600, alt: 'Protoboard com Arduino e botões', legenda: 'Arduino e botões na protoboard' },
      { src: require('../../assets/equipe/dev-protoboard-botoes-2.jpg'), w: 1200, h: 1600, alt: 'Protoboard com fios e cinco botões', legenda: 'Cinco botões, as teclas do piano' },
      { src: require('../../assets/equipe/dev-protoboard-botoes-3.jpg'), w: 1200, h: 1600, alt: 'Protoboard vista de frente', legenda: 'Ligações vistas de frente' },
      { src: require('../../assets/equipe/dev-protoboard-vertical.jpg'), w: 1200, h: 1600, alt: 'Protoboard vista de cima', legenda: 'Montagem vista de cima' },
      { src: require('../../assets/equipe/dev-esp32.jpg'), w: 1600, h: 900, alt: 'Protótipo com ESP32 e botões', legenda: 'Testes com ESP32' },
      { src: require('../../assets/equipe/dev-prototipo-papelao.jpg'), w: 899, h: 1599, alt: 'Primeiro protótipo em papelão com protoboard e Arduino UNO', legenda: 'Primeiro protótipo em papelão' },
    ],
  },
  {
    titulo: 'Software e integração',
    fotos: [
      { src: require('../../assets/equipe/dev-codigo-serial-1.jpg'), w: 1600, h: 720, alt: 'Código Python lendo a porta serial do Arduino', legenda: 'Lendo as teclas pela porta serial' },
      { src: require('../../assets/equipe/dev-codigo-serial-2.jpg'), w: 1600, h: 720, alt: 'Notebook com código e Arduino conectado', legenda: 'Arduino conversando com o código' },
      { src: require('../../assets/equipe/dev-integracao-api.jpg'), w: 1600, h: 720, alt: 'Terminal mostrando logs salvos no banco de dados', legenda: 'Cada reação vira um log no banco de dados' },
      { src: require('../../assets/equipe/dev-swagger.jpg'), w: 1599, h: 899, alt: 'Documentação Swagger da API do Atipic Touch', legenda: 'Documentação da API (Swagger)' },
    ],
  },
  {
    titulo: 'Identidade',
    fotos: [
      { src: require('../../assets/equipe/dev-mascote.jpg'), w: 900, h: 1600, alt: 'Personagens do mascote brócolis em um editor 3D', legenda: 'O mascote ganhando vida' },
    ],
  },
];
