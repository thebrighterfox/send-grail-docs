# SparkPost

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/sparkpost.jpg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">SparkPost (MessageBird)</h2>
    <p class="conn-hero__sub">High-volume transactional email infrastructure. 500 emails/month free; pay-as-you-go after that.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
    </div>
  </div>
</div>

## Prerequisites

- A [SparkPost account](https://www.sparkpost.com/). Free tier: 500/month.
- A verified sending domain.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Verify your domain

SparkPost → **Configuration → Sending Domains → Add Domain**. Enter your domain.

Add the **SPF**, **DKIM**, and (optional) **DMARC** records SparkPost displays at your DNS provider. Click **Test** to verify.

</div>

<div class="step" data-step="2">

### Generate an API key

SparkPost → **Configuration → API Keys → New API Key**.

- **Name:** SendGrail
- **API Permissions:** **Send via SMTP** (the only scope you need for SMTP/API sends)

Click **Create API Key**. Copy the key.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **SparkPost**.

Fill in:
- **Connection Name:** SparkPost
- **From Email:** your verified domain address
- **From Name:** display name
- **API Key:** paste from step 2

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick SparkPost → send.

</div>

</div>

## Troubleshooting

### `Permission denied`

API key lacks **Send via SMTP** permission. Edit the key in SparkPost dashboard or generate a new one with the right scope.

### `From address rejected`

The **From Email** domain isn't verified in SparkPost. Verify it in step 1 above.

### `Invalid_credentials`

Wrong API key. Regenerate in SparkPost → Configuration → API Keys.

## What's next

- **[Email Routing](/features/email-routing)** — route high-volume transactional through SparkPost.
- **[Failure Alerts](/features/failure-alerts)** — get notified on SparkPost rejections.
