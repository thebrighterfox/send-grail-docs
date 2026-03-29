<template>
  <div class="sg-home">
    <!-- Hero -->
    <section class="sg-hero">
      <div class="sg-hero__glow"></div>
      <div class="sg-hero__content">
        <div class="sg-hero__badge">
          <span class="sg-hero__badge-dot"></span>
          WordPress SMTP Plugin
        </div>
        <h1 class="sg-hero__title">
          <span class="sg-hero__title-line">Stop Losing Emails.</span>
          <span class="sg-hero__title-gradient">Start Delivering.</span>
        </h1>
        <p class="sg-hero__tagline">
          SendGrail routes your WordPress emails through reliable SMTP providers with smart routing, real-time tracking, and automatic fallback — so every message reaches the inbox.
        </p>
        <div class="sg-hero__actions">
          <a href="/guide/getting-started" class="sg-btn sg-btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            Get Started
          </a>
          <a href="/features/connections" class="sg-btn sg-btn--ghost">
            Explore Features
          </a>
        </div>
        <div class="sg-hero__stats">
          <div class="sg-hero__stat">
            <strong>13+</strong>
            <span>SMTP Providers</span>
          </div>
          <div class="sg-hero__stat-divider"></div>
          <div class="sg-hero__stat">
            <strong>100%</strong>
            <span>Free & Open Source</span>
          </div>
          <div class="sg-hero__stat-divider"></div>
          <div class="sg-hero__stat">
            <strong>PHP 8.0+</strong>
            <span>Modern Stack</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="sg-features">
      <div class="sg-features__header">
        <span class="sg-features__label">Features</span>
        <h2 class="sg-features__title">Everything you need for reliable email delivery</h2>
        <p class="sg-features__subtitle">From SMTP configuration to advanced analytics, SendGrail handles it all.</p>
      </div>
      <div class="sg-features__grid">
        <a v-for="feature in features" :key="feature.title" :href="feature.link" class="sg-feature-card">
          <div class="sg-feature-card__icon" :style="{ background: feature.color }">
            <span v-html="feature.icon"></span>
          </div>
          <h3 class="sg-feature-card__title">{{ feature.title }}</h3>
          <p class="sg-feature-card__desc">{{ feature.desc }}</p>
          <span class="sg-feature-card__arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </a>
      </div>
    </section>

    <!-- Providers -->
    <section class="sg-providers">
      <div class="sg-providers__header">
        <span class="sg-features__label">Providers</span>
        <h2 class="sg-features__title">Works with your favorite SMTP service</h2>
      </div>
      <div class="sg-providers__marquee">
        <div class="sg-providers__track">
          <span v-for="(p, i) in [...providers, ...providers]" :key="i" class="sg-providers__item">{{ p }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sg-cta">
      <div class="sg-cta__glow"></div>
      <h2 class="sg-cta__title">Ready to fix your WordPress emails?</h2>
      <p class="sg-cta__desc">Install SendGrail and send your first test email in under 2 minutes.</p>
      <div class="sg-hero__actions">
        <a href="/guide/getting-started" class="sg-btn sg-btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          Get Started Now
        </a>
        <a href="/api/endpoints" class="sg-btn sg-btn--ghost">
          API Reference
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    title: 'SMTP Connections',
    desc: '13+ provider presets with one-click setup. Multiple connections, encrypted credentials, and automatic health checks.',
    color: 'rgba(99, 102, 241, 0.1)',
    link: '/features/connections',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    title: 'Email Logging',
    desc: 'Searchable log of every email with status, SMTP response, headers, and optional body storage.',
    color: 'rgba(34, 197, 94, 0.1)',
    link: '/features/email-logging',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>',
    title: 'Smart Routing',
    desc: 'Route emails through different connections based on recipient, sender, subject, or headers.',
    color: 'rgba(168, 85, 247, 0.1)',
    link: '/features/email-routing',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    title: 'Open & Click Tracking',
    desc: 'Track opens via invisible pixel and clicks via link rewriting. Full event timeline per email.',
    color: 'rgba(236, 72, 153, 0.1)',
    link: '/features/open-tracking',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>',
    title: 'Dashboard & Reports',
    desc: 'Real-time stats, 7/30/90-day charts, delivery heatmap, and per-connection performance breakdown.',
    color: 'rgba(245, 158, 11, 0.1)',
    link: '/features/dashboard-reports',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    title: 'Test & Simulate',
    desc: 'Send real test emails or dry-run simulations to verify routing and connection resolution.',
    color: 'rgba(6, 182, 212, 0.1)',
    link: '/features/test-simulate',
  },
]

const providers = [
  'Gmail', 'Outlook', 'SendGrid', 'Mailgun', 'Amazon SES', 'Postmark',
  'Mandrill', 'Brevo', 'Elastic Email', 'SMTP2GO', 'Mailtrap', 'Zoho', 'Yahoo',
]
</script>
