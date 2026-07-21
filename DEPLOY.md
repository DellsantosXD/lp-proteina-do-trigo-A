# Deploy Automático com GitHub + Cloudflare Pages

Este projeto é uma landing page Vite/React. O deploy recomendado é Cloudflare Pages conectado ao GitHub.

## Configuração no Cloudflare Pages

1. Suba este projeto para um repositório no GitHub.
2. No Cloudflare, vá em **Workers & Pages** > **Create application** > **Pages**.
3. Escolha **Connect to Git** e selecione o repositório.
4. Use estas configurações:

- **Framework preset:** Vite
- **Build command:** `npm ci && npm run build`
- **Build output directory:** `dist`
- **Root directory:** deixe vazio se este projeto for a raiz do repositório. Use `work/lp-editor` apenas se subir a pasta-mãe inteira.
- **Production branch:** `main`

## Fluxo de atualização

Depois de conectado, toda alteração publicada no GitHub dispara deploy automático:

```bash
git add .
git commit -m "Atualiza landing page"
git push origin main
```

## Rotas internas

O arquivo `public/_redirects` mantém a página funcionando em links internos e recarregamentos diretos.
