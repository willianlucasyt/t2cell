# T2 Cell Imports — Site institucional

Site de página única (landing page), responsivo e rápido, para a **T2 Cell Imports** — loja de celulares, importados, acessórios e assistência técnica em **Rio Largo/AL**.

Construído em **HTML + CSS + JavaScript puro** (sem frameworks, sem build), focado em performance, SEO e acessibilidade.

---

## 🗂️ Estrutura do projeto

```
t2cell/
├── index.html          # Página única com todas as seções
├── css/
│   └── styles.css      # Estilos (tema tech premium, mobile-first)
├── js/
│   └── main.js         # Interações: menu, scroll reveal, contadores, status de horário
├── assets/
│   │   ├── logo.png       # Logo oficial (fundo transparente)
│   ├── logo-square.png # Versão quadrada (apple-touch-icon / redes)
│   └── og-image.svg    # Imagem de compartilhamento (Open Graph)
└── README.md
```

### Seções da página
Header fixo · Hero · Sobre · Serviços/Produtos · Galeria · Avaliações · Horário · Localização (mapa) · Contato/CTA · Footer · Botão flutuante de WhatsApp.

---

## 👀 Como visualizar localmente

Como é HTML estático, basta abrir o `index.html` no navegador. Para o mapa e as fontes carregarem perfeitamente, use um servidor local:

```bash
# Opção 1 — Python
python3 -m http.server 8000
# abra http://localhost:8000

# Opção 2 — Node (npx)
npx serve .

# Opção 3 — VS Code
# extensão "Live Server" → botão "Go Live"
```

---

## 🚀 Deploy

### Vercel
1. Suba este repositório no GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. Framework Preset: **Other** (não precisa de build). Output: raiz do projeto.
4. **Deploy**. Pronto.

### Netlify
1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Selecione o repositório. Build command: *(vazio)* · Publish directory: `.` (raiz).
3. **Deploy site**.

> Dica: também é possível arrastar a pasta do projeto direto na janela do Netlify Drop (netlify.com/drop) para um deploy instantâneo.

---

## ✅ Recursos técnicos implementados

- **Responsivo** (mobile-first) para celular, tablet e desktop.
- **Micro-interações**: hover nos cards/botões, scroll reveal, contador animado, pulso no botão de WhatsApp.
- **Performance**: CSS/JS enxutos e sem dependências; `iframe` do mapa com `loading="lazy"`; ícones em SVG inline.
- **SEO**: `<title>`, meta description, **Open Graph**, Twitter Card e **JSON-LD `LocalBusiness` (ElectronicsStore)** com dados reais (nome, endereço, telefone, geo, nota).
- **Acessibilidade**: skip link, navegação por teclado, foco visível, `aria-*`, contraste adequado, respeito a `prefers-reduced-motion`.
- **Botão flutuante de WhatsApp** visível em todas as seções.

---

## ✏️ Dados que precisam de confirmação do cliente

Estes pontos estão marcados no código com `[A CONFIRMAR]` e devem ser atualizados com as informações oficiais:

| Item | Onde ajustar | Observação |
|------|--------------|------------|
| **Horário de funcionamento** | `index.html` (tabela `.hours-table`) e objeto `HOURS` em `js/main.js` | Preencha os horários reais. Ao definir `HOURS`, o status "Aberto agora / Fechado" passa a funcionar sozinho. |
| **Depoimentos reais** | `index.html` (seção `#depoimentos`) | Cole avaliações verdadeiras de clientes do Google. **Não** inventar. A nota 4,9 e as 78 avaliações são reais. |
| **Número exato do endereço** | `index.html` (seção `#localizacao` e JSON-LD) | Fontes divergem entre "nº 09 / Tabuleiro do Pinto" e "Rua da Delegacia, 14". Confirmar o endereço oficial. |
| **Fotos reais da loja** | `index.html` (seção `#galeria`, blocos `.tile`) | Substituir os blocos de marca por fotos reais da fachada, produtos e atendimento. |
| **Preços / catálogo** | `index.html` (seção `#servicos`) | Descrições genéricas; inserir produtos e preços oficiais se desejar. |
| **Domínio no SEO** | `index.html` (`canonical`, `og:url`) | Troque `t2cellimports.com.br` pelo domínio final do site. |

---

## 📇 Dados reais usados (fonte: Google Maps e perfis públicos da loja)

- **Nome:** T2 Cell Imports
- **Segmento:** Loja de celulares / importados / acessórios + assistência técnica
- **Endereço:** Conj. Cruzeiro do Sul A1, nº 09 — Tabuleiro do Pinto, Rio Largo/AL, CEP 57100-000 (em frente à antiga delegacia)
- **Coordenadas:** -9.5343182, -35.8074484
- **WhatsApp/Telefone:** (82) 99395-9533
- **E-mail:** t2cellassistencia@gmail.com
- **Nota Google:** 4,9 ★ (78 avaliações)
- **Instagram:** [@t2cell_imports](https://www.instagram.com/t2cell_imports)
- **Facebook:** [T2 cell imports](https://www.facebook.com/p/T2-cell-imports-100078461546081/)
- **Threads:** [@t2cell_imports](https://www.threads.com/@t2cell_imports)
- **Loja online:** [t2cellimports.mercadorio.com.br](https://t2cellimports.mercadorio.com.br/)
