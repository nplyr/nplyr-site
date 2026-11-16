# nPlyr Website

This repository hosts the official website for **nPlyr** — a native video player for macOS and iOS built on AVFoundation, with a built-in media sniffer and a mini-program runtime. The site uses the custom domain `player.w3cub.com`.

## Documentation

This site is built with [VitePress](https://vitepress.dev/) and contains the guides, FAQs, privacy and terms pages for nPlyr.

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

This site can be deployed to GitHub Pages; the workflow includes a step to add a `CNAME` for the custom domain `player.w3cub.com`.

### Manual Deployment

To deploy manually:

1. Build the site: `pnpm docs:build`
2. The built files will be in `docs/.vitepress/dist`
3. Deploy to your hosting platform or push to `gh-pages`

## Contributing

We welcome contributions to improve the documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Documentation may be redistributed according to the repository LICENSE.
