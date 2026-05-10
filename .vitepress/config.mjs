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
    logo: { light: '/logo-wordmark.svg', dark: '/logo-wordmark-dark.svg' },
    siteTitle: false,
    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Connections', link: '/guide/connections/', activeMatch: '/guide/connections/' },
      { text: 'Features', link: '/features/connections', activeMatch: '/features/' },
      { text: 'Changelog', link: '/changelog' },
      {
        text: 'Resources',
        items: [
          { text: 'WordPress.org plugin', link: 'https://wordpress.org/plugins/sendgrail/' },
          { text: 'Support forum', link: 'https://wordpress.org/support/plugin/sendgrail/' },
        ]
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is SendGrail?', link: '/guide/what-is-sendgrail' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ]
        },
        {
          text: 'Configuration',
          items: [
            { text: 'SMTP Providers (Reference)', link: '/guide/providers' },
            { text: 'Settings', link: '/guide/settings' },
            { text: 'Fallback & Reliability', link: '/guide/fallback' },
          ]
        },
        {
          text: 'Provider Setup Guides',
          items: [
            { text: 'Overview', link: '/guide/connections/' },
            {
              text: 'OAuth-based',
              collapsed: true,
              items: [
                { text: 'Google Workspace / Gmail', link: '/guide/connections/google-workspace' },
                { text: 'Outlook / Microsoft 365', link: '/guide/connections/outlook' },
                { text: 'Zoho Mail', link: '/guide/connections/zoho' },
              ]
            },
            {
              text: 'API providers',
              collapsed: true,
              items: [
                { text: 'SendGrid', link: '/guide/connections/sendgrid' },
                { text: 'Mailgun', link: '/guide/connections/mailgun' },
                { text: 'Postmark', link: '/guide/connections/postmark' },
                { text: 'Amazon SES', link: '/guide/connections/amazon-ses' },
                { text: 'Brevo', link: '/guide/connections/brevo' },
                { text: 'Mandrill', link: '/guide/connections/mandrill' },
                { text: 'SparkPost', link: '/guide/connections/sparkpost' },
                { text: 'Elastic Email', link: '/guide/connections/elastic-email' },
                { text: 'SMTP2GO', link: '/guide/connections/smtp2go' },
                { text: 'Mailjet', link: '/guide/connections/mailjet' },
                { text: 'Netcore', link: '/guide/connections/netcore' },
                { text: 'SendLayer', link: '/guide/connections/sendlayer' },
                { text: 'Resend', link: '/guide/connections/resend' },
              ]
            },
            {
              text: 'SMTP-based',
              collapsed: true,
              items: [
                { text: 'Gmail (App Password)', link: '/guide/connections/gmail' },
                { text: 'Other SMTP', link: '/guide/connections/custom-smtp' },
              ]
            },
            {
              text: 'Server-based',
              collapsed: true,
              items: [
                { text: 'PHP Mail', link: '/guide/connections/php' },
              ]
            },
          ]
        },
        {
          text: 'Alert Channels',
          items: [
            { text: 'Overview', link: '/guide/integrations/' },
            { text: 'Discord', link: '/guide/integrations/discord' },
            { text: 'Slack', link: '/guide/integrations/slack' },
            { text: 'Telegram', link: '/guide/integrations/telegram' },
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
    },
    footer: {
      copyright: 'Copyright 2026 SendGrail'
    },
    search: {
      provider: 'local'
    },
  }
})
