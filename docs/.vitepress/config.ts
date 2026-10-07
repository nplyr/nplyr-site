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
    community: 'Community',
    discord: 'Discord', qqChannel: 'QQ Channel',
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
    footerMessage: 'nPlyr — 原生 macOS / iOS 视频播放器，内置嗅探浏览器与小程序运行时。',
    footerCopyright: '© 2026 nPlyr 项目。保留所有权利。',
    product: '产品', about: '关于', features: '功能',
    support: '支持', documentation: '文档', contact: '联系我们',
    company: '公司',
    community: '社区',
    discord: 'Discord', qqChannel: '腾讯频道',
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
    footerMessage: 'nPlyr — 原生 macOS / iOS 影片播放器，內建嗅探瀏覽器與小程序執行環境。',
    footerCopyright: '© 2026 nPlyr 專案。保留所有權利。',
    product: '產品', about: '關於', features: '功能',
    support: '支援', documentation: '文件', contact: '聯絡我們',
    company: '公司',
    community: '社群',
    discord: 'Discord', qqChannel: '騰訊頻道',
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
            { text: S.privacy, link: L('/guide/privacy') },
            { text: S.terms, link: L('/guide/terms') },
          ],
        },
        {
          text: S.community,
          items: [
            { text: S.discord, link: 'https://discord.com/invite/XNUhXyDn3S' },
            { text: S.qqChannel, link: 'https://pd.qq.com/s/3t9yceyuu?b=9' },
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
      { icon: 'discord', link: 'https://discord.com/invite/XNUhXyDn3S' },
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
  },
})
