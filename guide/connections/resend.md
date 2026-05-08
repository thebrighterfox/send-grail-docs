# Resend

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/resend.png" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Resend</h2>
    <p class="conn-hero__sub">Developer-focused transactional email API with a clean dashboard and React Email integration. 3,000 emails/month free.</p>
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

[resend.com](https://resend.com) → sign up. In the dashboard go to **Domains → Add Domain**. Resend gives you DKIM + SPF records to add at your DNS provider.

Click **Verify DNS Records** when added. Wait 5-15 min for propagation.

</div>

<div class="step" data-step="2">

### Generate an API key

Resend → **API Keys → Create API Key**.

- **Name:** SendGrail
- **Permission:** **Sending access** (most restricted scope, all that's needed)

Click Create. Resend shows the key (starts with `re_`) — copy it once.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Resend**.

Fill in:
- **Connection Name:** Resend
- **From Email:** an address on your verified domain
- **From Name:** display name
- **API Key:** paste the `re_...` key from step 2

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick Resend → send.

</div>

</div>

## Troubleshooting

- **`401 Invalid API key`** — key is wrong, was revoked, or you copied the visible portion (only first/last chars shown after creation). Re-generate.
- **`403 Domain not found or not verified`** — verify the domain at Resend → Domains. DNS propagation can take up to an hour.
- **Free tier limit** — 3,000 emails/month, 100/day. Upgrade or use a different connection for high-volume.

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through Resend.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
