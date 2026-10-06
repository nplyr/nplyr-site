# Contributing

We welcome contributions to improve nPlyr! Whether you're fixing a bug, adding a feature,
translating, writing rules, or improving documentation, your help is appreciated.

## Ways to Contribute

### Bug Reports
- Check existing [issues](https://github.com/nPlyr/nPlyr-site/issues) first.
- Include your OS version, nPlyr version, and steps to reproduce.
- Attach a sample link or a rule name (no personal media or credentials, please).

### Feature Requests
- Describe the feature and the use case.
- Explain why it would benefit nPlyr users.
- Check if it fits the local-first, privacy-respecting philosophy.

### Translations
- nPlyr's UI supports 25 languages via i18n JSON files.
- Contribute translations for missing or incomplete languages.
- See `nPlyr/Resources/i18n/` for existing translations.

### Mini-Programs & Rules
- nPlyr runs hikerView-compatible mini-programs. Share new sources or fix existing ones in
  the community.
- Before publishing, check the [Compatibility](/guide/miniapp-compatibility) page so your
  rule doesn't rely on unsupported Java/Rhino behavior.

### Code Contributions
- The app is written in **Swift 6 + SwiftUI**.
- Fork the repository and submit a pull request.
- Follow the existing architecture (shared `Core/**` and `Features/**`, platform glue in
  `+macOS` / `+iOS` files).

## Getting Started

### Prerequisites
- Node.js 18 or later (for the documentation site)
- pnpm package manager (for the documentation site)
- Xcode 16+ (for app development)
- macOS 14 Sonoma+ (to build/run the macOS app)

### Development Setup (Documentation Site)

1. **Fork the repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/nplyr/nPlyr-site.git
   cd nPlyr-site
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Start the development server**:
   ```bash
   pnpm docs:dev
   ```
5. **Open** `http://localhost:5173` in your browser.

### Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes to the documentation files in `docs/`.
3. Test your changes by building the site:
   ```bash
   pnpm docs:build
   ```
4. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

### Submitting Changes

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Create a Pull Request** on GitHub.
3. **Wait for review** and address any feedback.

## Guidelines

### Writing Style
- Use clear, concise language.
- Write in active voice when possible.
- Be inclusive and welcoming.
- Use consistent formatting.
- Include screenshots when helpful.

### File Structure
- Documentation pages go in `docs/`.
- Guides go in `docs/guide/`.
- Use lowercase filenames with hyphens: `my-new-guide.md`.

### Links
- Use relative links for internal documentation.
- Link to external resources when helpful.
- Ensure all links work.

### Images and Assets
- Place images in `docs/public/` or subdirectories.
- Use descriptive filenames.
- Optimize images for web (under 500KB preferred).

## Code of Conduct

This project follows a code of conduct. By participating, you agree to:
- Be respectful and inclusive.
- Focus on constructive feedback.
- Accept responsibility for mistakes.

## Questions?

If you have questions about contributing, check existing
[issues](https://github.com/nPlyr/nPlyr-site/issues) or create a new one. Thank you for helping
improve nPlyr!
