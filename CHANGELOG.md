# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-14

### Added
- Initial release of PetReminder official website
- Complete VitePress setup with TypeScript configuration
- Comprehensive user guides:
  - Introduction to PetReminder
  - Installation instructions for macOS
  - Usage guide with keyboard shortcuts
  - Premium Pets & IAP guide
  - macOS Permissions guide
  - Pet Customization guide
  - Troubleshooting section
  - Frequently Asked Questions
- Privacy Policy, Privacy Choices, and Terms of Service
- Automatic deployment to GitHub Pages
- IAP pet file distribution via `pets/` directory
- Local search functionality
- Social links and footer
- Mac App Store download links

### Technical Details
- Built with VitePress 1.6.4
- Uses pnpm for package management
- Responsive design with modern UI
- SEO optimized with proper meta descriptions

---

## Contributing to the Changelog

When making changes to the documentation:

- Add entries to the "Unreleased" section above
- Use the following types: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`
- Keep descriptions clear and concise
- Reference issue numbers when applicable

## Release Process

1. Update version in `package.json`
2. Move items from "Unreleased" to a new version section
3. Commit with message "Release vX.X.X"
4. Push to trigger deployment