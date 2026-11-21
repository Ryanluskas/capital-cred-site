# Checklist de publicação da CapitalCred

A publicação depende de autorização expressa. Este checklist serve para validação em homologação e para o corte do domínio quando aprovado.

## Dados comerciais e privacidade

- [ ] Conferir o comprovante atualizado do CNPJ `53.093.082/0001-22` e validar nome oficial, nome comercial e identidade do controlador de dados. [Receita Federal](https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_S.aspx)
- [ ] Confirmar com a operação o endereço aberto a clientes, se houver, a função de cada endereço divergente, os horários e a área de atendimento. Usar Goiânia–GO até a confirmação e adotar os mesmos dados sempre que referirem ao mesmo local.
- [ ] Confirmar funcionamento, equipe responsável e titularidade do WhatsApp, telefone e e-mail comercial. Validar respostas do FAQ sobre custo da simulação, perfis elegíveis, documentação, etapas de análise e atendimento em outras cidades.
- [ ] Revisar a política de privacidade com a área responsável. Confirmar controlador, canal de atendimento ao titular, bases legais, operadores, compartilhamentos, retenção e descarte. Conferir que o texto acompanha o fluxo efetivo dos dados pelo fornecedor legado ou pelo canal escolhido. [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) · [Direitos dos titulares pela ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares)
- [ ] Confirmar consignado para servidores públicos e para aposentados e pensionistas antes do corte. Registrar convênios, perfis, critérios e escopo comercial. Confirmar Crédito ao Trabalhador, portabilidade e refinanciamento antes de publicar oferta ou páginas próprias.
- [ ] Fornecer material institucional e fotos reais autorizadas, quando disponíveis. Guardar autorização e fonte para cada depoimento antes de ativar a prova social.

## Hospedagem e leads

- [ ] Preparar ambiente Next.js com execução no servidor. Fazer backup do código e da configuração da hospedagem atual e registrar o procedimento de retorno antes de alterar o domínio.
- [ ] Configurar `LEADS_LEGACY_URL` para o PHP existente. Se a operação aprovar um webhook substituto, configurar `LEADS_WEBHOOK_URL` e `LEADS_WEBHOOK_TOKEN` conforme a documentação do projeto. Garantir que o destino em HTTPS continue alcançável após o corte. Se `www` passar a servir pelo Next.js, manter o PHP em origem separada ou configurar o roteamento correspondente na infraestrutura. Confirmar o caminho de volta do DNS e a validade do certificado TLS.
- [ ] Confirmar numa instância autorizada o contrato multipart e o retorno JSON do PHP. Testar valor informado e eventual envio sem valor conforme o contrato ativo, consentimento, máscara, indisponibilidade do destino, erros transitórios e duplicidade. Confirmar entrega, visibilidade do lead sintético e persistência do consentimento no sistema de destino pela equipe comercial.
- [ ] Validar limites de envio no ambiente de hospedagem, o tratamento de requisições repetidas no destino e a proteção dos logs. Garantir que o Next.js receba no cabeçalho `Host` o domínio público do formulário. Configurar `LEADS_TRUSTED_IP_HEADER` somente se a camada de entrada sobrescrever esse cabeçalho. O controle em memória se aplica a cada instância Next.js. Conferir que dados do formulário e segredos ficam fora de logs de aplicação e scripts do navegador.
- [ ] Verificar a experiência de contato por WhatsApp quando o formulário estiver sem destino ou retornar erro. Os dados digitados só devem ser encaminhados por este canal quando o visitante optar pelo contato correspondente.
- [ ] Adicionar os arquivos do filme e revisar imagens e textos alternativos quando o material estiver disponível. Testar reprodução, controles, redução de movimento, estabilidade de layout e imagem substituta caso o arquivo falhe.

## SEO, indexação e lançamento

- [ ] Rodar o build de produção e conferir a home, as páginas comerciais, sobre, contato e privacidade. Testar navegação, FAQ, formulário por teclado e leitura das mensagens de erro.
- [ ] Verificar renderização nas larguras de 360, 390, 768, 1024, 1440 e 1920 px. Executar Lighthouse mobile na hospedagem de homologação e repetir no domínio definitivo. Acompanhar LCP, INP e CLS de campo quando houver tráfego suficiente. [Core Web Vitals](https://web.dev/articles/vitals)
- [ ] Definir `SITE_URL` para a origem pública canônica e usar `SITE_INDEXABLE=true` apenas no build autorizado para produção. Verificar canonical, metadados sociais, JSON-LD, `robots.txt`, XML em `sitemap.xml` e HTTP `301` de `/index.html`. Testar os links que terminam em `#topo`, `#simulacao`, `#vantagens` e `#contato`. Consolidar o host escolhido e remover bloqueios de homologação apenas na produção autorizada. [Guia de sitemap do Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Guia de redirecionamentos do Google](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [ ] Validar propriedade de domínio no Google Search Console por DNS ou propriedade de prefixo de URL pela metatag `GOOGLE_SITE_VERIFICATION`. Enviar o sitemap e inspecionar as URLs principais após a publicação. [Verificação de propriedade](https://support.google.com/webmasters/answer/9008080?hl=pt-BR) · [Relatório de sitemaps](https://support.google.com/webmasters/answer/7451001?hl=pt-BR)
- [ ] Confirmar que analytics continua desativado na entrega. Para uma ativação futura, validar a necessidade e o fluxo de consentimento antes de iniciar a coleta.

## Perfil da Empresa no Google

- [ ] Confirmar que a operação atende aos critérios de elegibilidade e identificar o perfil que representa a mesma empresa.
- [ ] Validar o nome usado publicamente, sem acrescentar palavras-chave de busca ao nome do perfil.
- [ ] Validar endereço de atendimento presencial e área de cobertura conforme o modelo de atendimento. Confirmar o pino no mapa se o endereço for exibido.
- [ ] Conferir telefone, site canônico, horários regulares e especiais e categoria principal. Escolher a categoria compatível com a atividade comercial efetiva.
- [ ] Conferir serviços oferecidos e usar fotos reais, atuais e autorizadas. Comparar os dados do perfil, do rodapé e do conteúdo estruturado do site.
- [ ] Solicitar autorização da empresa antes de qualquer alteração. [Diretrizes do Perfil da Empresa no Google](https://support.google.com/business/answer/3038177?hl=pt-BR)
