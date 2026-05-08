# SendLayer

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/sendlayer.png" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">SendLayer</h2>
    <p class="conn-hero__sub">WordPress-focused SMTP service from the WPForms team. Designed for plug-and-play WP integration with no domain DNS hassle on the entry tier.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
    </div>
  </div>
</div>

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Sign up + add your domain

[sendlayer.com](https://sendlayer.com) → sign up. In the dashboard go to **Settings → Domains → Add Domain**. Add the DNS records SendLayer provides (SPF, DKIM).

</div>

<div class="step" data-step="2">

### Generate SMTP credentials

SendLayer → **Settings → API Keys** (or SMTP credentials). Generate a new key and copy the username + password.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **SendLayer**.

Fill in: Connection Name, From Email (your verified domain address), From Name, Username + Password. Save.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick SendLayer → send.

</div>

</div>

## Troubleshooting

- **`Authentication failed`** — wrong credentials. Regenerate at SendLayer → Settings.
- **From Email rejected** — domain not verified. Add DNS records and re-verify in SendLayer dashboard.
- **Plan limit reached** — check your subscription's quota in SendLayer.

## What's next

- **[Email Routing](/features/email-routing)** — route through SendLayer for transactional, others for marketing.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
