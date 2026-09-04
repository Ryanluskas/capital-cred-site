# Capital Cred — Site

Landing page da **Capital Cred** — crédito consignado com foco em taxas competitivas.

## Stack
- HTML5 + CSS3 (`assets/css/style.css`)
- JavaScript (`assets/js/script.js`)
- `enviar.php` — recebe o formulário de contato/lead e encaminha por e-mail

## Como rodar
O front é estático, mas o envio do formulário depende de um servidor com PHP:

```bash
php -S localhost:8000
```

E acesse `http://localhost:8000`.

> **Nota:** configure o destinatário e as credenciais de e-mail no `enviar.php` — não versione dados sensíveis.
