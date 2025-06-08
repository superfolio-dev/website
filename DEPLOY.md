# SuperFolio - Deployment

## Current Setup

✅ **Deployment is already configured and working**

- **Automatic deployment**: Every push to `main` branch triggers a build and deployment
- **GitHub Pages**: Configured with GitHub Actions workflow
- **Custom domain**: `superfolio.dev.br` with DNS properly configured
- **HTTPS**: Enabled automatically

## How it Works

The deployment happens automatically when you push to the `main` branch:

1. **GitHub Actions** triggers the deployment workflow
2. **Build process** runs (`npm run build`)
3. **Static files** are deployed to GitHub Pages
4. **Site is live** at https://superfolio.dev.br

## Available Commands

```bash
# Local development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vendor-[hash].js
└── CNAME
```

## Monitoring

- **Deployment status**: Check GitHub Actions tab in the repository
- **Live site**: https://superfolio.dev.br
- **Build logs**: Available in GitHub Actions workflow runs
