# Brevo (formerly Sendinblue)

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/brevo.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Brevo</h2>
    <p class="conn-hero__sub">Email + SMS marketing platform with a generous free tier (300 emails/day forever). Formerly known as Sendinblue.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
    </div>
  </div>
</div>

## Prerequisites

- A [Brevo account](https://www.brevo.com/). Free tier gives 300 emails/day.
- A verified sender email.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Verify a sender

Brevo → **Senders & IP → Senders → Add a sender**. Enter the email address you'll send from. Brevo emails it a verification link — click it.

For production, set up **Domain Authentication** under the same menu — gives proper DKIM signing for your domain.

</div>

<div class="step" data-step="2">

### Get your API key

Brevo → **SMTP & API → API Keys → Create a new API key**. Name it "SendGrail" and click Generate.

Copy the key. Brevo shows it once.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Brevo**.

Fill in:
- **Connection Name:** Brevo
- **From Email:** your verified sender
- **From Name:** display name
- **API Key:** paste from step 2

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick Brevo → send.

</div>

</div>

## Troubleshooting

### `Sender not authorized to send`

The **From Email** isn't verified. Verify the address (or domain) in Brevo → Senders & IP.

### `Invalid API key`

Double-check that you generated a v3 API key (not the legacy SMTP key). Paste again from Brevo's dashboard.

### Hitting the 300/day free limit

Free plans are capped at 300 emails per 24-hour period. Upgrade or use a different connection for high-volume.

## What's next

- **[Email Routing](/features/email-routing)** — route marketing emails through Brevo while transactional goes through a faster provider.
- **[Test & Simulate](/features/test-simulate)** — verify connection.
