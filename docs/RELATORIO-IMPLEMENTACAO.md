# Relatório de implementação da CapitalCred

## Entrega

A versão local recria o site institucional em Next.js com React e TypeScript. A home reúne soluções, etapas da contratação, formulário, apresentação da empresa, perguntas frequentes e canais de atendimento. O design usa Geist local, uma paleta navy e azul e arte própria para a primeira dobra. O símbolo de dobra e o cartão são elementos da nova direção visual. A fachada abstrata usada no pôster ilustra a marca.

- **Serviços.** Páginas individuais para crédito consignado em Goiânia, servidores públicos e aposentados e pensionistas do INSS. Inclui Sobre, Contato, Política de privacidade e página 404. A validação de Crédito ao Trabalhador, portabilidade e refinanciamento ficou na lista de publicação.
- **Navegação.** Cabeçalho compacto após rolagem, menu mobile, FAQ operável pelo teclado, linha do tempo progressiva e preservação das âncoras `#topo`, `#simulacao`, `#vantagens` e `#contato`.
- **Conversão.** Solicitação de simulação com máscara brasileira, validação no navegador e no servidor, consentimento versionado, proteção antispam e deduplicação. O adaptador preserva o contrato multipart identificado no PHP e oferece um webhook autenticado como alternativa configurável. A solicitação vai para atendimento. Os valores e condições de uma proposta dependem da análise.
- **SEO.** Conteúdo pré-renderizado, títulos e descrições por página, canonical, Open Graph, Twitter Card, breadcrumbs, JSON-LD de organização e localização por área atendida, sitemap, robots.txt e redirecionamento HTTP 301 a partir de `/index.html`. A verificação do Search Console depende da propriedade da CapitalCred.
- **Privacidade e conteúdo.** O site solicita dados de contato e perfil. A coleta de métricas está desativada. O endereço exato, os horários e as avaliações aguardam confirmação. A seção de prova social fica oculta até receber relatos reais e autorizados.
- **Vídeo.** `CapitalCredBrandFilm` procura os arquivos MP4 e WebM no build, usa pôster enquanto estiverem ausentes e oferece fallback em caso de erro. A documentação explica legendas, reprodução e substituição.

## Build e dependências

O build de produção gerou as sete páginas públicas, a página de erro, o sitemap, o robots.txt, o ícone e a imagem social. A compilação incluiu a checagem TypeScript. A auditoria `npm audit --omit=dev` retornou zero vulnerabilidades no momento da verificação.

## Responsividade, acessibilidade e navegação

Foram conferidas as larguras de 360, 390, 768, 1024, 1440 e 1920 px no Chrome, sem rolagem horizontal. A navegação por teclado cobriu link de salto, menu mobile, retorno de foco ao fechar o menu, foco na seção ao navegar e abertura das perguntas. O teste também confirmou a progressão da linha do tempo durante a rolagem. O axe não encontrou violações WCAG 2.0/2.1 A ou AA nas sete páginas, na home a 390 e 1440 px e no formulário aberto nos cenários testados.

## Formulário e integrações

O teste pelo navegador cobriu preenchimento de perfil a partir da página de serviço, máscara de telefone, mensagens de erros, indisponibilidade com acesso ao WhatsApp e estados de envio e sucesso. Testes sintéticos validaram os contratos PHP e webhook, validação de consentimento, bloqueios de spam e duplicidade. Dois envios concorrentes chegaram uma única vez ao webhook local. Nenhum lead foi enviado à operação.

## Vídeo institucional

Um WebM sintético reproduziu no Chrome quando entrou na área visível no desktop e pausou ao sair. Em 390 px e com preferência de movimento reduzido, a reprodução permaneceu manual. O teste confirmou o pôster em caso de ausência e erro do arquivo. O filme final, o MP4 e a compatibilidade entre navegadores entram na homologação da mídia.

## SEO

No build local em modo indexável, as sete URLs retornaram HTTP 200 com títulos distintos, canonical e metadados sociais. O sitemap apresentou as sete URLs, o robots.txt anunciou o sitemap, a imagem social abriu como PNG e `/index.html` retornou HTTP 301. Uma rota de serviço fora do catálogo retornou HTTP 404. O build entregue usa a configuração de prévia, com `noindex`.

## Desempenho

A imagem principal é servida em AVIF e WebP em tamanhos distintos para desktop e celular. As variantes AVIF têm aproximadamente 46 KiB e 16 KiB. As páginas institucionais são estáticas. As bibliotecas do formulário e da animação de rolagem carregam quando suas seções se aproximam da área visível. O pôster institucional usa carregamento tardio.

Na home do build de produção local, o Lighthouse mobile 13.6 registrou **81 em desempenho**, **100 em acessibilidade** e **100 em boas práticas**. O SEO recebeu **100** na execução com o modo indexável, feita apenas em loopback. O build entregue mantém `noindex`.

- **LCP:** 2,91 s.
- **CLS:** 0.
- **TBT:** 519 ms.

A pontuação de desempenho ficou abaixo da meta de laboratório de 90. O LCP, o INP e o CLS no percentil 75 dependem de medição de campo após a publicação e de tráfego real.

## Pendências da CapitalCred

1. Confirmar endereço comercial, horários, razão social do controlador e abrangência das respostas do FAQ. Revisar a política de privacidade e definir operadores, prazos de retenção e descarte.
2. Configurar em homologação o PHP ou webhook autorizado. Confirmar o registro do consentimento, o recebimento pela equipe e a política de idempotência do destinatário. O código local oferece WhatsApp quando o destino do formulário está indisponível.
3. Fornecer o filme do Google Flow, eventuais legendas e materiais reais autorizados. Validar relatos antes de incluí-los.
4. Autorizar a publicação, validar a consistência do Perfil da Empresa, ativar a indexação e enviar o sitemap no Search Console.

Consulte a [auditoria inicial](./AUDITORIA-INICIAL.md) para o inventário do legado, a [configuração do formulário](./CONFIGURACAO-LEADS.md) para o contrato de entrega e o [checklist de publicação](./CHECKLIST-PUBLICACAO.md) para homologação e corte.

As referências para o conteúdo de consignado e a política incluem o [Banco Central](https://www.bcb.gov.br/meubc/faqs/p/como-funciona-o-emprestimo-consignado/), o [INSS](https://www.gov.br/inss/pt-br/direitos-e-deveres/pagamento-de-beneficios/consignacao-em-beneficios-do-inss-seus-direitos-e-medidas-de-seguranca) e a [ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares).
