# Elastic Email

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/elasticemail.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Elastic Email</h2>
    <p class="conn-hero__sub">Affordable transactional + marketing platform. 100 emails/day free, pay-as-you-go pricing.</p>
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

### Sign up + verify your sender

[Sign up at elasticemail.com](https://elasticemail.com). Verify your email; in the dashboard go to **Settings → Domains → Add domain** and add DKIM/SPF records to your DNS.

</div>

<div class="step" data-step="2">

### Generate an API key

Elastic Email → **Settings → SMTP/API → API Keys → Create API Key**. Pick scope **EmailSend** (full mail access). Copy the generated key.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Elastic Email**.

Fill in: Connection Name, From Email (your verified domain address), From Name, API Key. Save.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick Elastic Email → send.

</div>

</div>

## Troubleshooting

- **`InvalidLogin`** — API key is wrong. Generate a new one.
- **`Domain not verified`** — From Email's domain not verified in Elastic. Add DKIM/SPF records and click Verify.
- **Free tier limit hit** — 100/day. Upgrade or wait until the next day.

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through Elastic.
- **[Failure Alerts](/features/failure-alerts)** — get notified on rejections.
