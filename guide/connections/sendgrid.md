# SendGrid

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/sendgrid.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Twilio SendGrid</h2>
    <p class="conn-hero__sub">Enterprise-grade transactional email service. 100 emails/day on the free tier; paid plans start at $19.95/mo for 50k emails.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
    </div>
  </div>
</div>

## Quick Reference

<div class="conn-quickref">
  <span class="conn-quickref__label">Settings</span>
  <dl>
    <dt>Provider</dt><dd>SendGrid</dd>
    <dt>Auth</dt><dd>API Key (Mail Send permission)</dd>
    <dt>From Email</dt><dd>Must be a verified sender or domain</dd>
  </dl>
</div>

## Prerequisites

- A [SendGrid account](https://signup.sendgrid.com). Free tier (100 emails/day) is fine for testing.
- A **verified sender** — either a single email address or a domain with DKIM records.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Verify a sender

In SendGrid → **Settings → Sender Authentication**.

For a single sender (quick): **Single Sender Verification** → fill in your email address → confirm via the email SendGrid sends you.

For a domain (recommended for production): **Domain Authentication** → enter your domain → SendGrid gives you 3 CNAME records → add to your DNS → click **Verify**.

</div>

<div class="step" data-step="2">

### Create an API key

SendGrid dashboard → **Settings → API Keys → Create API Key**.

- **Name:** SendGrail
- **Permissions:** **Restricted Access** → enable only **Mail Send** (full access for that one scope). Tighter security than Full Access.

Click **Create & View**. SendGrid shows the API key **once** — copy it now.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **SendGrid**.

Fill in:
- **Connection Name:** SendGrid
- **From Email:** the sender you verified in step 1
- **From Name:** your display name
- **API Key:** paste the key from step 2

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick the SendGrid connection → send.

</div>

</div>

## Troubleshooting

### `Unauthorized` / `401`

The API key is wrong or expired. Generate a new one in SendGrid → Settings → API Keys.

### `403 The from address does not match a verified Sender Identity`

Your **From Email** isn't verified in SendGrid. Either verify that exact address (Single Sender) or verify the parent domain (Domain Authentication).

### `429 Too Many Requests`

You've hit your plan's rate limit. Free tier: 100/day, 600/hour. Upgrade or throttle.

### Emails marked as spam by Gmail

Add a verified domain (not just a single sender) so SendGrid signs outbound mail with your domain's DKIM key. This dramatically improves deliverability.

## What's next

- **[Email Routing](/features/email-routing)** — route marketing emails through SendGrid while keeping transactional on a faster provider.
- **[Failure Alerts](/features/failure-alerts)** — get pinged in Slack/Telegram if SendGrid starts rejecting.
