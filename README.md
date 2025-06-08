# SuperFolio

A SaaS platform that allows developers to create personalized portfolios through predefined templates. Users fill in basic information and the system generates a customized static website.

## Technology Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Minification**: Terser
- **Styling**: CSS (planned: Tailwind CSS or Styled Components)
- **Linting**: ESLint with React/TypeScript configurations
- **Deployment**: GitHub Pages with GitHub Actions
- **Domain**: superfolio.dev.br

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/superfolio.git

# Navigate to project directory
cd superfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Project Structure

```
superfolio/
├── src/
│   ├── components/          # Reusable components
│   ├── templates/           # Portfolio templates
│   ├── pages/               # Application pages
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript definitions
│   ├── services/            # API services
│   └── assets/              # Static resources
├── public/                  # Public files
└── dist/                    # Production build
```

## Deployment

The project is automatically deployed to GitHub Pages when pushing to the `main` branch. The live site is available at [superfolio.dev.br](https://superfolio.dev.br).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
