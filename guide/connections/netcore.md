# Netcore Email

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/netcore.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Netcore Email</h2>
    <p class="conn-hero__sub">Customer engagement platform's email API. Strong analytics + AI-driven send-time optimization.</p>
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

### Sign up + verify your domain

[Sign up at netcorecloud.com](https://netcorecloud.com). In the Email API dashboard, go to **Settings → Sending Domains → Add Domain** and add the DKIM/SPF records.

</div>

<div class="step" data-step="2">

### Get SMTP credentials

Netcore Email dashboard → **Email API → Settings → SMTP** (or API → API Keys).

Copy your SMTP username + password.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Netcore Email**.

Fill in: Connection Name, From Email, From Name, Username + Password from step 2. Save.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick Netcore → send.

</div>

</div>

## Troubleshooting

- **`Authentication failed`** — wrong SMTP credentials. Re-fetch from Netcore dashboard.
- **`Domain not verified`** — From Email's domain isn't verified. Add DNS records and click Verify.
- **Hitting daily limits** — check your plan's quota in Netcore dashboard.

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through Netcore.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
