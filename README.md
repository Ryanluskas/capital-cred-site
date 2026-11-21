# CapitalCred

Site institucional em Next.js App Router, React e TypeScript. A versão local vem com indexação desativada e os envios do formulário dependem de um destino configurado.

## Executar localmente

Use Node.js 22 ou superior.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Abra [a prévia local](http://localhost:3000). Para testar a versão otimizada, use `npm run build` e `npm start`. Execute `npm run typecheck` para verificar os tipos.

## Configuração

- **Leads** — Configure o receptor PHP existente ou um webhook autenticado. A página oferece o WhatsApp quando a entrega está indisponível. [Configuração de leads](./docs/CONFIGURACAO-LEADS.md)
- **Busca** — `SITE_URL` define o domínio canônico. `SITE_INDEXABLE=true` ativa a indexação e anuncia o sitemap no robots.txt. `GOOGLE_SITE_VERIFICATION` aceita o token de verificação por meta tag. Configure essas variáveis antes do build final. [Checklist de publicação](./docs/CHECKLIST-PUBLICACAO.md)
- **Conteúdo** — Os contatos, URLs, metadados comuns e dados estruturados ficam em `lib/site.ts`. As páginas de serviços usam `app/[service]/page.tsx`. Em `app/page.tsx`, adicione entradas ao componente `Testimonials` somente após confirmar a autorização e a origem de cada relato. Com a lista vazia, a seção fica oculta.
- **Privacidade** — A versão da política também identifica o consentimento nas solicitações. Atualize `privacyVersion` em `lib/site.ts` quando o texto pertinente ao consentimento mudar. A instalação atual não inclui scripts de analytics.
- **Design** — A paleta, tipografia Geist local, botões, grades e espaçamento estão em `app/globals.css`. Os componentes de formulário e de páginas internas usam módulos CSS. A arte da primeira dobra e o pôster de arquitetura são ilustrações de marca.

## Substituir o vídeo institucional

1. Exporte o filme do Google Flow. Otimize em WebM e MP4 H.264 e confirme a reprodução em Safari e Chrome. Adicione `public/videos/capitalcred-brand-film.webm` e `public/videos/capitalcred-brand-film.mp4`. O componente também aceita um único formato.
2. Substitua `public/images/capitalcred-video-poster.webp` pela imagem de abertura otimizada, preferencialmente 16:9. Hoje, o pôster também aparece enquanto não houver arquivo de vídeo.
3. Se houver fala ou informação sonora, adicione as legendas revisadas em `public/videos/capitalcred-brand-film.pt-BR.vtt`. Valide uma alternativa textual para informações visuais essenciais.
4. Mantenha os dois controles opcionais desativados se o filme tiver narração ou exigir interação para começar. `BRAND_FILM_AUTOPLAY=true` inicia o vídeo mudo apenas quando ele está em área visível no desktop e as preferências do usuário permitem. `BRAND_FILM_LOOP=true` ativa a repetição.
5. Refaça o build para que `CapitalCredBrandFilm` detecte os arquivos. Verifique o pôster, o carregamento sob demanda, o controle manual, o movimento reduzido e o comportamento quando a mídia estiver indisponível.

## Documentação da entrega

- [Auditoria inicial](./docs/AUDITORIA-INICIAL.md)
- [Configuração de leads](./docs/CONFIGURACAO-LEADS.md)
- [Checklist de publicação](./docs/CHECKLIST-PUBLICACAO.md)
- [Relatório de implementação](./docs/RELATORIO-IMPLEMENTACAO.md)

## Publicação no repositório vinculado à Vercel

O arquivo `vercel.json` seleciona o Next.js para o build do projeto. Os arquivos `index.html`, `assets/` e `enviar.php` na raiz são do site legado e foram preservados para a hospedagem anterior. A aplicação Next.js usa as rotas de `app/` e os arquivos estáticos de `public/`.

Na Vercel, mantenha `SITE_INDEXABLE=false` durante a homologação e configure o destino de leads nas variáveis do projeto quando aprovado. O PHP legado precisa continuar acessível em um servidor com PHP.
