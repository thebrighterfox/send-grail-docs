# Mailgun

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/mailgun.jpg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Mailgun</h2>
    <p class="conn-hero__sub">Sinch's email API with detailed analytics, webhooks, and a generous free trial. Region-aware (US or EU).</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
      <span class="conn-meta-pill">US / EU regions</span>
    </div>
  </div>
</div>

## Prerequisites

- A [Mailgun account](https://signup.mailgun.com). New accounts get 5,000 free emails for 30 days.
- A domain you can edit DNS records for (Mailgun's free sandbox domain only sends to verified addresses).

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Add and verify your domain

Mailgun dashboard → **Sending → Domains → Add New Domain**.

Pick a region (**US** or **EU** — they're separate, fully isolated infrastructures) and enter your domain.

Mailgun gives you a list of DNS records to add: **TXT (SPF)**, **TXT (DKIM)**, optionally **CNAME (tracking)** and **MX** records.

Add them at your DNS provider (Cloudflare / Route 53 / GoDaddy / etc) and click **Verify DNS Settings** in Mailgun. Wait 5-30 min for propagation.

</div>

<div class="step" data-step="2">

### Get your API key

Mailgun → **Send → Sending → Domain settings → API security**.

Copy your **Private API Key**. It's also at **Settings → API Keys** in the top-right user menu.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Mailgun**.

Fill in:
- **Connection Name:** Mailgun
- **Domain:** your verified domain (e.g. `mg.yoursite.com`)
- **Region:** US or EU — must match where you registered the domain
- **From Email:** an address on the verified domain
- **From Name:** display name
- **API Key:** paste the private API key

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick the Mailgun connection → send.

</div>

</div>

## Troubleshooting

### `Domain not found: yourdomain.com`

The domain isn't verified in the region you selected. Double-check the region (US vs EU) — they share the same dashboard but are separate APIs. A domain verified in EU won't work via the US endpoint.

### `Forbidden`

API key is wrong or your account is suspended. Regenerate the key in Mailgun → API Keys.

### Emails hit the sandbox limit

Mailgun sandbox domains (the default `sandbox*.mailgun.org`) only send to verified recipient addresses. Add a real domain in step 1 to send to anyone.

### Free trial expired

After 30 days, the free trial ends and unsigned accounts are limited to verified recipients. Add a payment method to keep sending freely.

## What's next

- **[Email Routing](/features/email-routing)** — route different email types through Mailgun's analytics-rich pipeline.
- **[Open / Click Tracking](/features/open-tracking)** — Mailgun has its own tracking; SendGrail's tracking is independent and works on top.
