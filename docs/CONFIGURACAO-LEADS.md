# Configuração das solicitações de simulação

Preencha `.env.local` a partir de `.env.example` para desenvolvimento e configure as mesmas variáveis diretamente no ambiente do servidor para publicação. O destino e o token ficam no servidor. Use valores compatíveis na compilação e na execução para que o formulário reflita a obrigatoriedade do valor no modo legado.

## Backend PHP existente

Configure `LEADS_LEGACY_URL` com o endereço HTTPS autorizado do `enviar.php` e deixe as variáveis de webhook vazias. Enquanto o domínio público apontar para a hospedagem antiga, o endpoint divulgado pela versão atual é `https://www.capitalcredgyn.com/enviar.php`. Antes da troca de DNS, reserve um endereço HTTPS para o PHP ou encaminhe `/enviar.php` à hospedagem antiga no proxy. Valide que esse endereço continua ativo após a troca e que o endpoint responde diretamente ao POST.

O servidor encaminha `nome`, `telefone` no formato brasileiro, `perfil`, `valor` no formato monetário brasileiro e `website` vazio como `multipart/form-data`. O valor é obrigatório neste modo para manter o contrato do formulário anterior. O adaptador também envia `consentimento_contato`, `consentimento_versao` e `consentimento_em`. O PHP deve preservar esses campos junto à solicitação e retornar `{"ok":true}` apenas depois de registrar ou entregar os dados. A validação do comportamento interno e a entrega no destinatário exigem acesso da CapitalCred ao PHP.

## Webhook autenticado

Configure `LEADS_WEBHOOK_URL` com um receptor HTTPS e `LEADS_WEBHOOK_TOKEN` com um token de acesso de escopo restrito. Deixe `LEADS_LEGACY_URL` vazio. O receptor recebe `Authorization: Bearer <token>`, o cabeçalho `Idempotency-Key` e um corpo JSON neste formato, com dados fictícios para referência.

```json
{
  "schemaVersion": 1,
  "requestId": "69bf5058-45f1-49e6-afba-f031fe8cbc34",
  "name": "Pessoa de Teste",
  "whatsapp": "+5562999999999",
  "profile": "servidor",
  "requestedAmountCents": null,
  "consent": {
    "contact": true,
    "policyVersion": "1.0",
    "acceptedAt": "2026-11-21T12:00:00.000Z"
  }
}
```

O receptor deve autenticar a requisição, registrar ou encaminhar o lead e o consentimento, manter `requestId` como chave única e responder com status `2xx` e `{"ok":true}`. Se receber o mesmo ID novamente, retorne a confirmação anterior sem recriar o lead. Um erro, redirecionamento, confirmação ausente ou espera superior a oito segundos mantém disponível a opção de tentar novamente ou falar pelo WhatsApp. Para garantir armazenamento e tratamento adequados, atribua responsáveis pelos leads no destino e aplique os prazos de retenção e as regras de acesso aprovados pela empresa.

## Controles no site

- O aplicativo verifica a origem de solicitações de navegador, limita o tamanho do corpo, valida os campos e o consentimento novamente no servidor e usa um campo antispam oculto.
- A limitação global e a deduplicação funcionam em memória por processo. Para o limite por origem, configure `LEADS_TRUSTED_IP_HEADER` apenas com um cabeçalho que o proxy sobrescreva para conter um único endereço IP. O código usa HMAC com chave temporária para guardar apenas identificadores derivados no processo. Aplique também limitação no ingresso em ambientes com múltiplas réplicas.
- Cliques repetidos com os mesmos dados reutilizam um ID. Envios concorrentes e repetições recentes com o mesmo conteúdo compartilham o resultado da primeira tentativa. Reinícios e réplicas independentes exigem idempotência no destinatário. Se o PHP legado aceitar um lead e perder a conexão antes de responder, cabe ao destino reconhecer o `Idempotency-Key` em uma nova tentativa.
- O aplicativo encaminha as solicitações ao destino configurado. O plano de retenção e exclusão deve abranger o receptor, serviços intermediários e seus backups. Mantenha o corpo do formulário fora dos logs e proteja o acesso aos dados.
- O link de alternativa abre uma mensagem genérica no WhatsApp sem incluir nenhum campo do formulário. A simulação depende da análise da operação comercial.

## Validação interna

Use um receptor de teste para armazenar apenas solicitações sintéticas. Para validar em loopback, inicie o app e o receptor no mesmo computador, acesse o app por `http://127.0.0.1`, configure o destino como `http://127.0.0.1:<porta>/<caminho>` e defina `LEADS_ALLOW_LOOPBACK=true`. No receptor, devolva `{"ok":true}` apenas quando o corpo esperado e, no modo webhook, o token estiverem corretos. Desative `LEADS_ALLOW_LOOPBACK` nas demais instalações.

Antes de publicar, verifique nome, máscara de telefone, seleção de perfil, consentimento, valor obrigatório no modo PHP, valor opcional no modo webhook, envio válido, proteção contra cliques repetidos, resposta do destino e mensagem de falha com link do WhatsApp. A equipe autorizada deve confirmar a entrega e o registro do consentimento no sistema escolhido.
