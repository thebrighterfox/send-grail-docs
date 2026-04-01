<template>
  <div class="sg-home">
    <!-- Hero: Split layout with text left, code preview right -->
    <section class="sg-hero">
      <div class="sg-hero__glow"></div>
      <div class="sg-hero__grid">
        <div class="sg-hero__left">
          <div class="sg-hero__badge">
            <span class="sg-hero__badge-dot"></span>
            Open Source WordPress Plugin
          </div>
          <h1 class="sg-hero__title">
            <span class="sg-hero__title-line">Stop Losing Emails.</span>
            <span class="sg-hero__title-gradient">Start Delivering.</span>
          </h1>
          <p class="sg-hero__tagline">
            SendGrail routes your WordPress emails through reliable SMTP providers with smart routing, real-time tracking, and automatic fallback.
          </p>
          <div class="sg-hero__actions">
            <a href="/guide/getting-started" class="sg-btn sg-btn--primary">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="/guide/what-is-sendgrail" class="sg-btn sg-btn--ghost">
              Why SendGrail?
            </a>
          </div>
          <!-- Trust signals -->
          <div class="sg-hero__trust">
            <div class="sg-hero__trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              WordPress 6.0+
            </div>
            <div class="sg-hero__trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              PHP 8.0+
            </div>
            <div class="sg-hero__trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              GPL-3.0 License
            </div>
          </div>
        </div>
        <div class="sg-hero__right">
          <div class="sg-code-window">
            <div class="sg-code-window__bar">
              <span class="sg-code-window__dot sg-code-window__dot--red"></span>
              <span class="sg-code-window__dot sg-code-window__dot--yellow"></span>
              <span class="sg-code-window__dot sg-code-window__dot--green"></span>
              <span class="sg-code-window__title">Quick Install</span>
            </div>
            <div class="sg-code-window__body">
              <div class="sg-code-line">
                <span class="sg-code-comment"># Install via WordPress CLI</span>
              </div>
              <div class="sg-code-line">
                <span class="sg-code-prompt">$</span> wp plugin install sendgrail --activate
              </div>
              <div class="sg-code-line sg-code-line--blank"></div>
              <div class="sg-code-line">
                <span class="sg-code-comment"># Or upload via WordPress Admin</span>
              </div>
              <div class="sg-code-line">
                <span class="sg-code-comment"># Plugins &rarr; Add New &rarr; Upload</span>
              </div>
              <div class="sg-code-line sg-code-line--blank"></div>
              <div class="sg-code-line">
                <span class="sg-code-success">&#10003;</span> Setup wizard starts automatically
              </div>
              <div class="sg-code-line">
                <span class="sg-code-success">&#10003;</span> Pick provider &rarr; Enter credentials &rarr; Test
              </div>
              <div class="sg-code-line">
                <span class="sg-code-success">&#10003;</span> Emails now deliver via SMTP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="sg-stats">
      <div class="sg-stats__grid">
        <div class="sg-stats__item" v-for="stat in stats" :key="stat.label">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="sg-features">
      <div class="sg-features__header">
        <span class="sg-features__label">Features</span>
        <h2 class="sg-features__title">Everything you need for reliable email delivery</h2>
        <p class="sg-features__subtitle">From SMTP configuration to engagement analytics — one plugin, zero complexity.</p>
      </div>
      <div class="sg-features__grid">
        <a v-for="feature in features" :key="feature.title" :href="feature.link" class="sg-feature-card">
          <div class="sg-feature-card__icon" :style="{ background: feature.color }">
            <span v-html="feature.icon"></span>
          </div>
          <h3 class="sg-feature-card__title">{{ feature.title }}</h3>
          <p class="sg-feature-card__desc">{{ feature.desc }}</p>
          <span class="sg-feature-card__link">
            Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </a>
      </div>
    </section>

    <!-- How it works -->
    <section class="sg-how">
      <div class="sg-features__header">
        <span class="sg-features__label">How It Works</span>
        <h2 class="sg-features__title">Up and running in 3 steps</h2>
      </div>
      <div class="sg-how__grid">
        <div class="sg-how__step" v-for="(step, i) in steps" :key="i">
          <div class="sg-how__number">{{ i + 1 }}</div>
          <h3 class="sg-how__step-title">{{ step.title }}</h3>
          <p class="sg-how__step-desc">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Providers -->
    <section class="sg-providers">
      <div class="sg-features__header">
        <span class="sg-features__label">Integrations</span>
        <h2 class="sg-features__title">Works with your favorite SMTP service</h2>
        <p class="sg-features__subtitle">Pre-configured settings for 17 providers. Or bring your own SMTP server.</p>
      </div>
      <div class="sg-providers__grid">
        <div v-for="p in providerList" :key="p.name" class="sg-providers__card">
          <strong>{{ p.name }}</strong>
          <span>{{ p.detail }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sg-cta">
      <div class="sg-cta__glow"></div>
      <div class="sg-cta__inner">
        <h2 class="sg-cta__title">Ready to fix your WordPress emails?</h2>
        <p class="sg-cta__desc">Install SendGrail, connect your SMTP provider, and send a test email — all in under 2 minutes.</p>
        <div class="sg-hero__actions">
          <a href="/guide/getting-started" class="sg-btn sg-btn--primary">
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a href="/features/connections" class="sg-btn sg-btn--ghost">
            Explore Features
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { value: '17+', label: 'SMTP Providers' },
  { value: 'Smart', label: 'Email Routing' },
  { value: 'AES-256', label: 'Credential Encryption' },
  { value: '100%', label: 'Free & Open Source' },
]

const features = [
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    title: 'SMTP Connections',
    desc: '17+ provider presets with one-click setup. Multiple connections with encrypted credentials, health monitoring, and automatic fallback.',
    color: 'rgba(99, 102, 241, 0.1)',
    link: '/features/connections',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    title: 'Email Logging',
    desc: 'Searchable log of every email with delivery status, SMTP response, headers, and optional body storage for debugging.',
    color: 'rgba(34, 197, 94, 0.1)',
    link: '/features/email-logging',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>',
    title: 'Smart Routing',
    desc: 'Route emails through different SMTP connections based on recipient, sender, subject, or custom headers with priority rules.',
    color: 'rgba(168, 85, 247, 0.1)',
    link: '/features/email-routing',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    title: 'Open & Click Tracking',
    desc: 'Track opens via invisible pixel and clicks via link rewriting. Full event timeline with IP and user agent per email.',
    color: 'rgba(236, 72, 153, 0.1)',
    link: '/features/open-tracking',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>',
    title: 'Dashboard & Reports',
    desc: 'Real-time delivery stats with trend comparison, volume charts, send activity heatmap, and per-connection performance.',
    color: 'rgba(245, 158, 11, 0.1)',
    link: '/features/dashboard-reports',
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    title: 'Test & Simulate',
    desc: 'Send real test emails or dry-run simulations to verify routing rules and connection resolution before going live.',
    color: 'rgba(6, 182, 212, 0.1)',
    link: '/features/test-simulate',
  },
]

const steps = [
  { title: 'Install & Activate', desc: 'Upload the plugin via WordPress admin or install with WP-CLI. The setup wizard launches automatically.' },
  { title: 'Connect Your Provider', desc: 'Pick from 17 presets (Gmail, SendGrid, SES...) or enter custom SMTP credentials. Passwords are AES-256 encrypted.' },
  { title: 'Send & Monitor', desc: 'Every outgoing email is routed through your SMTP provider, logged, and tracked. Get weekly reports delivered to your inbox.' },
]

const providerList = [
  { name: 'Gmail', detail: 'Google Workspace' },
  { name: 'SendGrid', detail: 'Twilio' },
  { name: 'Amazon SES', detail: 'AWS' },
  { name: 'Mailgun', detail: 'Sinch' },
  { name: 'Postmark', detail: 'ActiveCampaign' },
  { name: 'Outlook', detail: 'Microsoft 365' },
  { name: 'Brevo', detail: 'Sendinblue' },
  { name: 'Mandrill', detail: 'Mailchimp' },
  { name: 'Elastic Email', detail: 'Transactional' },
  { name: 'SMTP2GO', detail: 'Transactional' },
  { name: 'Mailtrap', detail: 'Testing & Live' },
  { name: 'Zoho Mail', detail: 'Zoho Suite' },
  { name: 'Yahoo', detail: 'Yahoo Mail' },
  { name: 'Netcore', detail: 'Email Intelligence' },
  { name: 'SparkPost', detail: 'MessageBird' },
  { name: 'SendLayer', detail: 'WordPress SMTP' },
  { name: 'Mailjet', detail: 'Sinch' },
  { name: 'Custom SMTP', detail: 'Any server' },
]
</script>
