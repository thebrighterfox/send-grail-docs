# Mailjet

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/mailjet.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Mailjet</h2>
    <p class="conn-hero__sub">Sinch's email platform with API key + secret pair authentication. 6,000 emails/month free with 200/day limit.</p>
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

[Sign up at mailjet.com](https://www.mailjet.com). Verify your email; in the dashboard go to **Account Settings → Sender domains & addresses → Add a sender** to verify a single email or a full domain.

</div>

<div class="step" data-step="2">

### Get your API Key + Secret Key

Mailjet → **Account Settings → API Key Management (REST API)**. You'll see two values: **API Key** and **Secret Key**.

Copy both. The API Key is your username; the Secret Key is your password.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Mailjet**.

Fill in:
- **Connection Name:** Mailjet
- **From Email:** your verified sender
- **From Name:** display name
- **Username:** API Key from step 2
- **Password:** Secret Key from step 2

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick Mailjet → send.

</div>

</div>

## Troubleshooting

- **`Invalid_credentials`** — wrong API Key / Secret Key combination. Double-check both values from Mailjet's dashboard.
- **`Sender Address Rejected`** — From Email not verified in Mailjet. Add it under Sender domains & addresses.
- **`429 Too Many Requests`** — hit Mailjet's rate limit. Free plan: 200 emails/day, 6,000/month. Upgrade or throttle.

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through Mailjet.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
