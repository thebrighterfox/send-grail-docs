# SMTP2GO

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/smtp2go.jpg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">SMTP2GO</h2>
    <p class="conn-hero__sub">Reliable global SMTP relay with multi-region failover. 1,000 emails/month free; uses port 2525 to avoid ISP blocking.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">SMTP</span>
    </div>
  </div>
</div>

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Sign up + verify your domain

[smtp2go.com](https://smtp2go.com) → sign up. SMTP2GO → **Settings → Sender Domains → Add Domain**. Add the DNS records (DKIM, SPF, return-path) shown.

</div>

<div class="step" data-step="2">

### Create SMTP credentials

SMTP2GO → **Settings → SMTP Users → Add SMTP User**. Pick a username and password (or let SMTP2GO generate one). Note both.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **SMTP2GO**.

Fill in: Connection Name, From Email (your verified domain), From Name, Username + Password from step 2. Save.

::: tip Port 2525
SMTP2GO uses port 2525 by default to bypass ISP blocking of standard SMTP ports. SendGrail pre-fills this.
:::

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick SMTP2GO → send.

</div>

</div>

## Troubleshooting

- **`535 Authentication failed`** — wrong SMTP user/pass. Re-check at SMTP2GO → Settings → SMTP Users.
- **`Sender not allowed`** — From Email's domain isn't verified. Add DNS records and click Verify in SMTP2GO dashboard.
- **Connection timeout on port 2525** — your host blocks outbound port 2525. Try port 587 (also supported) or contact host support.

## What's next

- **[Email Routing](/features/email-routing)** — route through SMTP2GO for specific email types.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
