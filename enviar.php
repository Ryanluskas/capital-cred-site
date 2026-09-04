<?php
// enviar.php — recebe os dados do formulário de simulação e envia por e-mail.
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$DESTINATARIO = 'contato@capitalcredgyn.com';

function responder(bool $ok, string $mensagem, int $status = 200): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'error' => $ok ? null : $mensagem], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método não permitido.', 405);
}

// Honeypot anti-spam: se preenchido, finge sucesso e não envia nada.
if (!empty($_POST['website'])) {
    responder(true, '');
}

// Sanitização básica (remove quebras de linha para evitar header injection)
function limpar(string $valor): string {
    $valor = trim($valor);
    return preg_replace('/[\r\n]+/', ' ', $valor);
}

$nome     = isset($_POST['nome']) ? limpar((string) $_POST['nome']) : '';
$telefone = isset($_POST['telefone']) ? limpar((string) $_POST['telefone']) : '';
$perfil   = isset($_POST['perfil']) ? limpar((string) $_POST['perfil']) : '';
$valor    = isset($_POST['valor']) ? limpar((string) $_POST['valor']) : '';

if ($nome === '' || $telefone === '' || $perfil === '' || $valor === '') {
    responder(false, 'Preencha todos os campos obrigatórios.', 422);
}

if (mb_strlen($nome) > 150 || mb_strlen($telefone) > 30 || mb_strlen($perfil) > 60 || mb_strlen($valor) > 60) {
    responder(false, 'Dados inválidos.', 422);
}

$nomeSeguro     = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
$telefoneSeguro = htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8');
$perfilSeguro   = htmlspecialchars($perfil, ENT_QUOTES, 'UTF-8');
$valorSeguro    = htmlspecialchars($valor, ENT_QUOTES, 'UTF-8');
$dataHora       = date('d/m/Y H:i');

$assunto = "Nova simulação - Capital Cred ($nomeSeguro)";

$corpo = "
<html>
<body style=\"font-family:Arial,sans-serif;background:#f4f6fb;padding:24px;\">
  <table style=\"max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e9f2;\">
    <tr>
      <td style=\"background:#0a1630;padding:20px 28px;\">
        <span style=\"color:#ffffff;font-size:18px;font-weight:bold;\">Capital Cred</span>
        <div style=\"color:#16a668;font-size:13px;\">Nova simulação recebida pelo site</div>
      </td>
    </tr>
    <tr>
      <td style=\"padding:28px;\">
        <table style=\"width:100%;font-size:14px;color:#0a1630;\">
          <tr><td style=\"padding:8px 0;color:#667;\">Nome</td><td style=\"padding:8px 0;font-weight:bold;\">$nomeSeguro</td></tr>
          <tr><td style=\"padding:8px 0;color:#667;\">Telefone</td><td style=\"padding:8px 0;font-weight:bold;\">$telefoneSeguro</td></tr>
          <tr><td style=\"padding:8px 0;color:#667;\">Perfil</td><td style=\"padding:8px 0;font-weight:bold;\">$perfilSeguro</td></tr>
          <tr><td style=\"padding:8px 0;color:#667;\">Valor desejado</td><td style=\"padding:8px 0;font-weight:bold;\">$valorSeguro</td></tr>
          <tr><td style=\"padding:8px 0;color:#667;\">Recebido em</td><td style=\"padding:8px 0;\">$dataHora</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
";

$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = "From: Site Capital Cred <no-reply@capitalcredgyn.com>";
$headers[] = "Reply-To: no-reply@capitalcredgyn.com";

$enviado = mail($DESTINATARIO, $assunto, $corpo, implode("\r\n", $headers));

if (!$enviado) {
    responder(false, 'Não foi possível enviar o e-mail no momento.', 500);
}

responder(true, '');
