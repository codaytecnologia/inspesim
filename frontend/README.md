# INSPESIM — Fiscalização e Inspeção Municipal

Sistema municipal de fiscalização e inspeção da comercialização de produtos de
origem animal (SIM — Serviço de Inspeção Municipal).

> **Estágio atual:** apenas a **tela de login**. Mesma estrutura do frontend do
> AulaSim (Next.js 14 App Router + Tailwind + shadcn/ui), com a identidade do INSPESIM.

## Paleta (cores da logo)

| Cor | Hex | Uso |
|-----|-----|-----|
| Verde | `#11A352` | cor principal, ícones, destaques |
| Verde escuro | `#0C7F3F` | estados de foco/hover |
| Verde claro | `#6DC894` / `#EAF5EF` | fundos e ilustração |
| Amarelo | `#FABA15` | destaques e selo de inspeção |
| Grafite | `#17241D` | textos e botão principal |

## Como rodar

```bash
cd frontend
npm install
npm run dev     # http://localhost:3001/login
```

A porta é **3001** para não conflitar com o AulaSim (3000).

## Estrutura

```
frontend/
└── src/
    ├── app/           layout, globals.css e a rota /login
    ├── components/
    │   ├── login/     ilustração da tela de login (SVG)
    │   └── ui/        componentes shadcn/ui (button, input, label)
    └── lib/           utilitário `cn`
```

## Próximos passos

1. Backend de autenticação (o botão Entrar ainda não autentica).
2. Cadastros: estabelecimentos, produtos, responsáveis técnicos.
3. Fiscalizações, laudos e emissão do selo SIM.
