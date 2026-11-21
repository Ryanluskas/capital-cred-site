# Auditoria inicial da CapitalCred

Verificação de referência em 21 de novembro de 2026. O diretório disponibilizado estava vazio e sem metadados Git. O inventário abaixo usa exclusivamente a superfície pública do site para identificar o comportamento que a migração precisa preservar. A hospedagem e o código PHP ficaram fora do escopo da inspeção.

## Tecnologia e funcionalidades

- Página única em HTML, CSS e JavaScript próprios, servida pelo LiteSpeed na Hostinger. A página carrega a fonte Poppins pelo Google Fonts, `assets/css/style.css`, `assets/js/script.js` e `assets/logo.jpeg`. O endpoint de leads informa PHP 8.3.37 em seu cabeçalho HTTP.
- O cabeçalho alterna o menu mobile por classe CSS e fecha o menu ao selecionar um link. A página reúne apresentação, perfis de crédito, formulário, vantagens, fluxo de atendimento, depoimentos e contato.
- A navegação existente usa `#topo`, `#simulacao`, `#vantagens` e `#contato`. As âncoras devem continuar funcionais na página inicial, inclusive em links externos já divulgados.
- Ações de contato em uso são WhatsApp `+55 62 99680-8853`, ligação para o mesmo número e `contato@capitalcredgyn.com`. O link publicado de WhatsApp já inclui uma mensagem genérica de simulação.
- Há três relatos com estrelas e nomes abreviados. A página não fornece mecanismos de verificação ou evidência de autorização. A futura publicação de relatos depende de autorização da CapitalCred e de uma fonte verificável.

[Site atual](https://www.capitalcredgyn.com/) · [JavaScript atual](https://www.capitalcredgyn.com/assets/js/script.js)

## Integração do formulário

O formulário envia `POST /enviar.php` com `Accept: application/json` e corpo multipart. Os campos públicos são `nome`, `telefone`, `perfil`, `valor` e `website`, sendo o último um honeypot que deve permanecer vazio. O seletor legado usa `Servidor Público`, `Aposentado/Pensionista`, `Trabalhador CLT` e `Outro`. O valor é obrigatório nesse formulário. O JavaScript aplica uma máscara de telefone, desabilita o botão durante o envio e anuncia o desfecho na página. Em erro, indica o WhatsApp. O consentimento aparece em uma descrição sob o formulário, sem caixa de seleção.

O navegador legado aceita código HTTP bem-sucedido desde que o JSON recebido, quando presente, não declare `ok: false`. A consulta pública somente leitura ao endpoint retornou `405` com JSON e `ok: false`. Nenhum lead foi enviado. O destinatário, a entrega efetiva e os requisitos internos do PHP dependem de confirmação da operação. [JavaScript atual](https://www.capitalcredgyn.com/assets/js/script.js)

A migração deve preservar o contrato por um proxy Next.js no servidor, habilitado por `LEADS_LEGACY_URL`. A URL configurada precisa alcançar a instância PHP depois da mudança de hospedagem. O formulário deve informar indisponibilidade quando o destino estiver ausente e manter o WhatsApp acessível. O primeiro teste de entrega real deve ocorrer em homologação, com dados sintéticos autorizados e confirmação de recebimento pelo responsável.

## Dados empresariais e produtos

- O site da empresa informa Goiânia–GO, CNPJ `53.093.082/0001-22`, WhatsApp `(62) 99680-8853` e e-mail `contato@capitalcredgyn.com`. Use o telefone e o e-mail como canais comerciais do site atual. Solicite o comprovante cadastral atualizado e confirme a titularidade dos canais antes da mudança de produção. [Site atual](https://www.capitalcredgyn.com/) · [Serviço oficial de consulta do CNPJ](https://www.gov.br/pt-br/servicos/consultar-cadastro-nacional-de-pessoas-juridicas)
- O endereço do site fica na Rua 17, nº 425, Setor Aeroporto. Espelhos cadastrais de terceiros para o mesmo CNPJ indicam Rua 6, nº 192, Setor Central e registram outro e-mail. O endereço cadastral e o local de atendimento podem ter funções distintas. Até a confirmação do endereço de atendimento e dos horários, use somente a cidade e o estado na página e nos dados estruturados. [Site atual](https://www.capitalcredgyn.com/) · [Espelho cadastral consultado](https://casadosdados.com.br/solucao/cnpj/ths-credito-e-solucoes-finaceiras-ltda-53093082000122) · [Emissão do comprovante na Receita Federal](https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_S.aspx)
- A oferta principal apresenta consignado para servidores públicos e para aposentados e pensionistas do INSS. Essas duas linhas sustentam as páginas individuais, além da página geral de consignado em Goiânia. As regras por convênio, documentação e elegibilidade devem ser validadas pela operação antes da publicação. [Site atual](https://www.capitalcredgyn.com/) · [Banco Central sobre o consignado](https://www.bcb.gov.br/meubc/faqs/s/emprestimos-consignados)
- Crédito ao Trabalhador aparece entre as opções do site e no seletor de perfil. Confirme com a operação a oferta efetiva, as condições e o fluxo do produto antes de incorporá-lo à navegação e ao catálogo. Refinanciamento e portabilidade não foram encontrados na oferta pública consultada. A publicação de páginas para esses serviços depende da confirmação comercial. [Site atual](https://www.capitalcredgyn.com/)
- O conteúdo anterior inclui alegações de taxa, rapidez e aprovação que não vieram acompanhadas de comprovação. A nova comunicação deve explicar que as condições variam conforme análise e critérios aplicáveis. O formulário solicita uma simulação ao atendimento e dispensa cálculo ou oferta artificial. [Site atual](https://www.capitalcredgyn.com/) · [Banco Central sobre o consignado](https://www.bcb.gov.br/meubc/faqs/s/emprestimos-consignados)

## SEO e inventário de URLs

- `/` e `/index.html` responderam `200`. Os hosts com e sem `www` serviram a página inicial. A migração conserva `/`, redireciona `/index.html` permanentemente para `/` com HTTP `301` e adota `https://www.capitalcredgyn.com` como referência canônica. A consolidação do host sem `www` deve ser configurada na infraestrutura de produção. [Guia de redirecionamentos do Google](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- `/robots.txt`, `/sitemap.xml`, `/contato`, `/sobre`, `/politica-de-privacidade` e as cinco URLs de crédito previstas no briefing responderam `404`. As páginas editoriais aprovadas entram como novas URLs. `/enviar.php` continua sendo um endpoint operacional e deve manter seu contrato no ambiente legado ou equivalente durante o corte.
- O HTML público tinha título, descrição, H1 e favicon. A inspeção do HTML e do JavaScript carregado não encontrou canonical, metadados sociais, dados estruturados ou scripts de analytics. O novo site prevê sitemap, robots, metadados individuais, breadcrumbs, JSON-LD que reflita dados verificáveis e verificação de Search Console por configuração. O relatório inicial não inclui dados de indexação, tráfego ou Core Web Vitals de campo.
