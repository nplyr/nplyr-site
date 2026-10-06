# nPlyr Website

This repository hosts the official website for **nPlyr** — a macOS clipboard manager with AI actions. The site uses the custom domain `player.w3cub.com`.



## Documentation

This site is built with [VitePress](https://vitepress.dev/) and contains guides, FAQs, and the **Action Marketplace** (`/marketplace`) for nPlyr.

### Getting Help

- **Submit Issues**: Report bugs or request features at the project repository
- **Documentation**: Browse the full documentation at https://player.w3cub.com

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
pnpm install
```

### Development

```bash
pnpm docs:dev
```

This will start a local development server at `http://localhost:5173`.

### Build

```bash
pnpm docs:build
```

### Preview

```bash
pnpm docs:preview
```

## Deployment

This site can be deployed to GitHub Pages; the workflow includes a step to add a `CNAME` for the custom domain `nuezip.w3cub.com`.

### Manual Deployment

To deploy manually:

1. Build the site: `pnpm docs:build`
2. The built files will be in `docs/.vitepress/dist`
3. Copy any IAP pet files into the dist `pets/` directory
4. Deploy to your hosting platform or push to `gh-pages`

## IAP Pet Files

The `pets/` directory stores downloadable `.catpet` files for in-app purchase pets. These files are copied into the build during deployment so users can download purchased pets.

## Contributing

We welcome contributions to improve the documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Documentation may be redistributed according to the repository LICENSE.
