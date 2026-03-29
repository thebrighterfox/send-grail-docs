import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SendGrail',
  description: 'Fix WordPress email delivery with reliable SMTP connections',
  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
  ],
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'SendGrail',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Features', link: '/features/connections' },
      { text: 'API', link: '/api/endpoints' },
      {
        text: 'v1.0.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'WordPress.org', link: 'https://wordpress.org/plugins/sendgrail/' },
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is SendGrail?', link: '/guide/what-is-sendgrail' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Setup Wizard', link: '/guide/setup-wizard' },
            { text: 'Migration', link: '/guide/migration' },
          ]
        },
        {
          text: 'Configuration',
          items: [
            { text: 'SMTP Providers', link: '/guide/providers' },
            { text: 'Settings', link: '/guide/settings' },
            { text: 'Fallback & Reliability', link: '/guide/fallback' },
          ]
        },
      ],
      '/features/': [
        {
          text: 'Core Features',
          items: [
            { text: 'Connections', link: '/features/connections' },
            { text: 'Email Logging', link: '/features/email-logging' },
            { text: 'Email Routing', link: '/features/email-routing' },
            { text: 'Test & Simulate', link: '/features/test-simulate' },
          ]
        },
        {
          text: 'Tracking & Reports',
          items: [
            { text: 'Open Tracking', link: '/features/open-tracking' },
            { text: 'Click Tracking', link: '/features/click-tracking' },
            { text: 'Dashboard & Reports', link: '/features/dashboard-reports' },
          ]
        },
        {
          text: 'Notifications',
          items: [
            { text: 'Failure Alerts', link: '/features/failure-alerts' },
            { text: 'Weekly Summaries', link: '/features/weekly-summaries' },
          ]
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Endpoints', link: '/api/endpoints' },
            { text: 'Hooks & Filters', link: '/api/hooks' },
            { text: 'Database Schema', link: '/api/database' },
          ]
        },
      ],
    },
    footer: {
      message: 'Released under the GPL-3.0 License.',
      copyright: 'Copyright 2026 wpperformly'
    },
    search: {
      provider: 'local'
    },
  }
})
