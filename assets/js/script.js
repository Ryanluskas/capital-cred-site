document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  header.classList.toggle('nav-open');
});
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => header.classList.remove('nav-open'));
});

// Máscara simples de telefone (99) 99999-9999
const telefone = document.getElementById('telefone');
telefone.addEventListener('input', () => {
  let v = telefone.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6) {
    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  } else if (v.length > 2) {
    v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  } else if (v.length > 0) {
    v = v.replace(/(\d{0,2})/, '($1');
  }
  telefone.value = v.trim();
});

// Envio do formulário via fetch (sem sair da página)
const form = document.getElementById('simForm');
const msg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // honeypot: se preenchido, é bot -> ignora silenciosamente
  if (form.website.value) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  msg.hidden = true;
  msg.className = 'sim-form__msg';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    const data = await res.json().catch(() => ({ ok: res.ok }));

    if (res.ok && data.ok !== false) {
      msg.textContent = 'Recebemos seus dados! Em breve um especialista entra em contato.';
      msg.classList.add('success');
      form.reset();
    } else {
      throw new Error(data.error || 'Falha no envio');
    }
  } catch (err) {
    msg.textContent = 'Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.';
    msg.classList.add('error');
  } finally {
    msg.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Simular agora';
  }
});
