# SuperFolio - Configuração de Deploy

## GitHub Pages Setup

### 1. Configuração do Repositório

Para configurar o deploy automático no GitHub Pages:

1. **Vá para Settings do repositório**
2. **Navegue até Pages** (sidebar esquerdo)
3. **Configure Source como "GitHub Actions"**
4. **O domínio personalizado já está configurado via arquivo CNAME**

### 2. Configuração de DNS

Para o domínio `superfolio.dev.br`, configure os seguintes registros DNS:

```
CNAME Record:
Name: @ (ou deixe vazio para root domain)
Value: seu-usuario.github.io

CNAME Record:
Name: www
Value: superfolio.dev.br
```

### 3. Deploy Automático

O deploy acontece automaticamente quando:

- ✅ Push para branch `main`
- ✅ Pode ser executado manualmente via GitHub Actions

### 4. Workflow do Deploy

O arquivo `.github/workflows/deploy.yml` executa:

1. **Checkout do código**
2. **Setup Node.js 20**
3. **Instalação das dependências**
4. **Linting do código**
5. **Build do projeto**
6. **Deploy para GitHub Pages**

### 5. URLs de Acesso

- **Produção**: https://superfolio.dev.br
- **GitHub Pages**: https://seu-usuario.github.io/superfolio

### 6. Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build local
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

### 7. Estrutura de Build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vendor-[hash].js
└── CNAME
```

### 8. Verificação do Deploy

Após o primeiro deploy:

1. Verifique se o site está acessível
2. Teste a responsividade
3. Confirme que o domínio personalizado funciona
4. Verifique se HTTPS está ativo

### 9. Troubleshooting

**Problema**: Site não carrega após deploy

- Verifique se o build foi bem-sucedido
- Confirme se o CNAME está correto
- Aguarde até 10 minutos para propagação DNS

**Problema**: Domínio personalizado não funciona

- Verifique configuração DNS
- Confirme arquivo CNAME no repositório
- Verifique Settings > Pages no GitHub

**Problema**: Deploy falha

- Verifique logs do GitHub Actions
- Confirme se todas as dependências estão instaladas
- Verifique se o lint está passando
