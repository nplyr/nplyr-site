import { defineConfig } from 'vitepress'

// ── Per-locale UI strings (nav / sidebar / footer) ────────────────
// Guide/Legal body .md files remain English placeholders for now;
// only the chrome labels are localized here.
const STR = {
  en: {
    home: 'Home', marketplace: 'Mini-Programs', browserModule: 'Browser', guide: 'Guide', faq: 'FAQ',
    github: 'GitHub',
    guideGroup: 'Guide',
    intro: 'Introduction', install: 'Installation', player: 'Player', browser: 'Browser & Sniffer',
    downloads: 'Downloads & Library', settings: 'Settings',
    permissions: 'Permissions', troubleshooting: 'Troubleshooting',
    mpGroup: 'Mini-Programs', mpOverview: 'Overview', mpCompat: 'Compatibility', mpSources: 'Sources',
    legalGroup: 'Legal',
    privacy: 'Privacy Policy', privacyChoices: 'Privacy Choices', terms: 'Terms of Service',
    footerMessage: 'nPlyr — a native macOS / iOS video player with a built-in sniffer and a mini-program runtime.',
    footerCopyright: 'Copyright © 2026 nPlyr Project. All rights reserved.',
    product: 'Product', about: 'About', features: 'Features',
    support: 'Support', documentation: 'Documentation', contact: 'Contact',
    company: 'Company',
  },
  'zh-CN': {
    home: '首页', marketplace: '小程序', browserModule: '浏览器', guide: '指南', faq: '常见问题',
    github: 'GitHub',
    guideGroup: '指南',
    intro: '简介', install: '安装', player: '播放器', browser: '浏览器与嗅探',
    downloads: '下载与媒体库', settings: '设置',
    permissions: '权限', troubleshooting: '故障排除',
    mpGroup: '小程序', mpOverview: '概览', mpCompat: '兼容性', mpSources: '来源',
    legalGroup: '法律',
    privacy: '隐私政策', privacyChoices: '隐私选项', terms: '服务条款',
    footerMessage: 'nPlyr — 原生 macOS / iOS 视频播放器，内置嗅探浏览器与海阔视界（hikerView）兼容的小程序运行时。',
    footerCopyright: '© 2026 nPlyr 项目。保留所有权利。',
    product: '产品', about: '关于', features: '功能',
    support: '支持', documentation: '文档', contact: '联系我们',
    company: '公司',
  },
  'zh-TW': {
    home: '首頁', marketplace: '小程序', browserModule: '瀏覽器', guide: '指南', faq: '常見問題',
    github: 'GitHub',
    guideGroup: '指南',
    intro: '簡介', install: '安裝', player: '播放器', browser: '瀏覽器與嗅探',
    downloads: '下載與媒體庫', settings: '設定',
    permissions: '權限', troubleshooting: '故障排除',
    mpGroup: '小程序', mpOverview: '概覽', mpCompat: '相容性', mpSources: '來源',
    legalGroup: '法律',
    privacy: '隱私政策', privacyChoices: '隱私選項', terms: '服務條款',
    footerMessage: 'nPlyr — 原生 macOS / iOS 影片播放器，內建嗅探瀏覽器與海阔视界（hikerView）相容的小程序執行環境。',
    footerCopyright: '© 2026 nPlyr 專案。保留所有權利。',
    product: '產品', about: '關於', features: '功能',
    support: '支援', documentation: '文件', contact: '聯絡我們',
    company: '公司',
  },
  ja: {
    home: 'ホーム', marketplace: 'ミニプログラム', browserModule: 'ブラウザ', guide: 'ガイド', faq: 'よくある質問',
    github: 'GitHub',
    guideGroup: 'ガイド',
    intro: 'はじめに', install: 'インストール', player: 'プレーヤー', browser: 'ブラウザとスニッフィング',
    downloads: 'ダウンロードとライブラリ', settings: '設定',
    permissions: '権限', troubleshooting: 'トラブルシューティング',
    mpGroup: 'ミニプログラム', mpOverview: '概要', mpCompat: '互換性', mpSources: 'ソース',
    legalGroup: '法務',
    privacy: 'プライバシーポリシー', privacyChoices: 'プライバシーの選択', terms: '利用規約',
    footerMessage: 'nPlyr — ネイティブな macOS / iOS 動画プレーヤー。スニッファー搭載ブラウザと hikerView 互換ミニプログラム実行環境を内蔵。',
    footerCopyright: '© 2026 nPlyr プロジェクト. All rights reserved.',
    product: '製品', about: '概要', features: '機能',
    support: 'サポート', documentation: 'ドキュメント', contact: 'お問い合わせ',
    company: '企業',
  },
  de: {
    home: 'Start', marketplace: 'Mini-Programme', browserModule: 'Browser', guide: 'Anleitung', faq: 'FAQ',
    github: 'GitHub',
    guideGroup: 'Anleitung',
    intro: 'Einführung', install: 'Installation', player: 'Player', browser: 'Browser & Sniffer',
    downloads: 'Downloads & Mediathek', settings: 'Einstellungen',
    permissions: 'Berechtigungen', troubleshooting: 'Fehlerbehebung',
    mpGroup: 'Mini-Programme', mpOverview: 'Überblick', mpCompat: 'Kompatibilität', mpSources: 'Quellen',
    legalGroup: 'Rechtliches',
    privacy: 'Datenschutz', privacyChoices: 'Datenschutz-Einstellungen', terms: 'Nutzungsbedingungen',
    footerMessage: 'nPlyr — ein nativer macOS-/iOS-Videoplayer mit integriertem Sniffer und einer hikerView-kompatiblen Mini-Programm-Laufzeit.',
    footerCopyright: '© 2026 nPlyr-Projekt. Alle Rechte vorbehalten.',
    product: 'Produkt', about: 'Über', features: 'Funktionen',
    support: 'Support', documentation: 'Dokumentation', contact: 'Kontakt',
    company: 'Unternehmen',
  },
  es: {
    home: 'Inicio', marketplace: 'Mini-programas', browserModule: 'Navegador', guide: 'Guía', faq: 'Preguntas frecuentes',
    github: 'GitHub',
    guideGroup: 'Guía',
    intro: 'Introducción', install: 'Instalación', player: 'Reproductor', browser: 'Navegador y Sniffer',
    downloads: 'Descargas y biblioteca', settings: 'Ajustes',
    permissions: 'Permisos', troubleshooting: 'Solución de problemas',
    mpGroup: 'Mini-programas', mpOverview: 'Visión general', mpCompat: 'Compatibilidad', mpSources: 'Fuentes',
    legalGroup: 'Legal',
    privacy: 'Política de privacidad', privacyChoices: 'Opciones de privacidad', terms: 'Términos del servicio',
    footerMessage: 'nPlyr — un reproductor de vídeo nativo para macOS/iOS con navegador de rastreo integrado y un entorno de mini-programas compatible con hikerView.',
    footerCopyright: '© 2026 Proyecto nPlyr. Todos los derechos reservados.',
    product: 'Producto', about: 'Acerca de', features: 'Funciones',
    support: 'Soporte', documentation: 'Documentación', contact: 'Contacto',
    company: 'Empresa',
  },
  fr: {
    home: 'Accueil', marketplace: 'Mini-programmes', browserModule: 'Navigateur', guide: 'Guide', faq: 'FAQ',
    github: 'GitHub',
    guideGroup: 'Guide',
    intro: 'Introduction', install: 'Installation', player: 'Lecteur', browser: 'Navigateur et Sniffer',
    downloads: 'Téléchargements et bibliothèque', settings: 'Paramètres',
    permissions: 'Autorisations', troubleshooting: 'Dépannage',
    mpGroup: 'Mini-programmes', mpOverview: 'Aperçu', mpCompat: 'Compatibilité', mpSources: 'Sources',
    legalGroup: 'Légal',
    privacy: 'Politique de confidentialité', privacyChoices: 'Choix de confidentialité', terms: 'Conditions d’utilisation',
    footerMessage: 'nPlyr — un lecteur vidéo native macOS/iOS avec navigateur de capture intégré et un environnement de mini-programmes compatible hikerView.',
    footerCopyright: '© 2026 Projet nPlyr. Tous droits réservés.',
    product: 'Produit', about: 'À propos', features: 'Fonctionnalités',
    support: 'Assistance', documentation: 'Documentation', contact: 'Contact',
    company: 'Société',
  },
}

// ── Build a themeConfig for a given locale ────────────────────────
// All *internal* links are prefixed with the locale segment so the
// default VitePress nav / sidebar / footer resolve to the localized
// page in every language. External (http/https/mailto) links are left
// untouched.
function tc(S: typeof STR.en, lang: string) {
  const base = !lang || lang === 'en' ? '' : `/${lang}`
  const L = (p: string) =>
    /^https?:\/\//.test(p) || p.startsWith('mailto:') || p.startsWith(base)
      ? p
      : `${base}${p}`
  return {
    nav: [
      { text: S.home, link: L('/') },
      { text: S.guide, link: L('/guide/introduction') },
      { text: S.marketplace, link: L('/guide/miniapps') },
      { text: S.browserModule, link: L('/guide/browser') },
      { text: S.faq, link: L('/guide/faq') },
      { text: S.github, link: 'https://github.com/nPlyr' },
    ],
    sidebar: [
      {
        text: S.mpGroup,
        items: [
          { text: S.mpOverview, link: L('/guide/miniapps') },
          { text: S.mpCompat, link: L('/guide/miniapp-compatibility') },
          { text: S.mpSources, link: L('/guide/miniapp-sources') },
        ],
      },
      {
        text: S.guideGroup,
        items: [
          { text: S.intro, link: L('/guide/introduction') },
          { text: S.install, link: L('/guide/installation') },
          { text: S.player, link: L('/guide/player') },
          { text: S.browser, link: L('/guide/browser') },
          { text: S.downloads, link: L('/guide/downloads') },
          { text: S.settings, link: L('/guide/settings') },
          { text: S.permissions, link: L('/guide/permissions') },
          { text: S.troubleshooting, link: L('/guide/troubleshooting') },
          { text: S.faq, link: L('/guide/faq') },
        ],
      },
      {
        text: S.legalGroup,
        items: [
          { text: S.privacy, link: L('/guide/privacy') },
          { text: S.privacyChoices, link: L('/guide/privacy-choices') },
          { text: S.terms, link: L('/guide/terms') },
        ],
      },
    ],
    footer: {
      message: S.footerMessage,
      copyright: S.footerCopyright,
      items: [
        {
          text: S.product,
          items: [
            { text: S.about, link: L('/guide/introduction') },
            { text: S.features, link: L('/#features') },
            { text: S.marketplace, link: L('/guide/miniapps') },
            { text: S.browserModule, link: L('/guide/browser') },
            { text: S.install, link: L('/guide/installation') },
          ],
        },
        {
          text: S.support,
          items: [
            { text: S.documentation, link: L('/guide/introduction') },
            { text: S.faq, link: L('/guide/faq') },
            { text: S.troubleshooting, link: L('/guide/troubleshooting') },
            { text: S.contact, link: 'mailto:player@w3cub.com' },
          ],
        },
        {
          text: S.company,
          items: [
            { text: S.about, link: L('/guide/introduction') },
            { text: S.privacy, link: L('/guide/privacy') },
            { text: S.terms, link: L('/guide/terms') },
            { text: S.github, link: 'https://github.com/nPlyr' },
          ],
        },
      ],
    },
  }
}

// ── Per-locale markdown renderer strings (containers + code copy) ─
const MD = {
  'zh-CN': {
    container: {
      tipLabel: '提示', warningLabel: '警告', dangerLabel: '危险', infoLabel: '信息', detailsLabel: '详情',
    },
    codeCopyButton: { tooltipText: '复制代码', copiedText: '已复制' },
  },
  'zh-TW': {
    container: {
      tipLabel: '提示', warningLabel: '警告', dangerLabel: '危險', infoLabel: '資訊', detailsLabel: '詳情',
    },
    codeCopyButton: { tooltipText: '複製程式碼', copiedText: '已複製' },
  },
  ja: {
    container: {
      tipLabel: 'ヒント', warningLabel: '警告', dangerLabel: '危険', infoLabel: '情報', detailsLabel: '詳細',
    },
    codeCopyButton: { tooltipText: 'コードをコピー', copiedText: 'コピーしました' },
  },
  de: {
    container: {
      tipLabel: 'Tipp', warningLabel: 'Warnung', dangerLabel: 'Gefahr', infoLabel: 'Info', detailsLabel: 'Details',
    },
    codeCopyButton: { tooltipText: 'Code kopieren', copiedText: 'Kopiert' },
  },
  es: {
    container: {
      tipLabel: 'Consejo', warningLabel: 'Advertencia', dangerLabel: 'Peligro', infoLabel: 'Info', detailsLabel: 'Detalles',
    },
    codeCopyButton: { tooltipText: 'Copiar código', copiedText: 'Copiado' },
  },
  fr: {
    container: {
      tipLabel: 'Astuce', warningLabel: 'Avertissement', dangerLabel: 'Danger', infoLabel: 'Info', detailsLabel: 'Détails',
    },
    codeCopyButton: { tooltipText: 'Copier le code', copiedText: 'Copié' },
  },
}

export default defineConfig({
  base: '/',
  title: 'nPlyr',
  titleTemplate: 'nPlyr — :title',
  description: 'nPlyr — a native macOS / iOS video player with a built-in media sniffer and a hikerView-compatible mini-program runtime. Play m3u8/mp4/flv/ts, capture streams from any site, and run community mini-programs.',
  lastUpdated: true,
  head: [
    // Favicons
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],

    // Theme and viewport
    ['meta', { name: 'theme-color', content: '#00b3ff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],

    // SEO
    ['meta', { name: 'keywords', content: 'video player, macos, ios, ipados, m3u8, mp4, flv, ts, hls, sniffer, hikerView, mini-program, media library, download, airplay, pip' }],
    ['meta', { name: 'author', content: 'nPlyr Project' }],

    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'nPlyr' }],
    ['meta', { property: 'og:url', content: 'https://player.w3cub.com/' }],
    ['meta', { property: 'og:title', content: 'nPlyr — Native Video Player with a Sniffer & Mini-Program Runtime' }],
    ['meta', { property: 'og:description', content: 'Play any stream on macOS and iOS, capture media from the web with the built-in sniffer, and run hikerView-compatible mini-programs. Built on AVFoundation.' }],
    ['meta', { property: 'og:image', content: 'https://player.w3cub.com/preview.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'nPlyr Preview' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: 'https://player.w3cub.com/' }],
    ['meta', { name: 'twitter:title', content: 'nPlyr — Native Video Player with a Sniffer & Mini-Program Runtime' }],
    ['meta', { name: 'twitter:description', content: 'Play any stream on macOS and iOS, capture media from the web with the built-in sniffer, and run hikerView-compatible mini-programs. Built on AVFoundation.' }],
    ['meta', { name: 'twitter:image', content: 'https://player.w3cub.com/preview.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'nPlyr Preview' }],
  ],
  themeConfig: {
    siteTitle: 'nPlyr',
    logo: '/logo.png',
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nPlyr/' },
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: tc(STR.en, 'en'),
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',
      themeConfig: tc(STR['zh-CN'], 'zh-CN'),
      markdown: MD['zh-CN'],
    },
    'zh-TW': {
      label: '繁體中文',
      lang: 'zh-TW',
      link: '/zh-TW/',
      themeConfig: tc(STR['zh-TW'], 'zh-TW'),
      markdown: MD['zh-TW'],
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/',
      themeConfig: tc(STR.ja, 'ja'),
      markdown: MD.ja,
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/',
      themeConfig: tc(STR.de, 'de'),
      markdown: MD.de,
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      themeConfig: tc(STR.es, 'es'),
      markdown: MD.es,
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/',
      themeConfig: tc(STR.fr, 'fr'),
      markdown: MD.fr,
    },
  },
})
