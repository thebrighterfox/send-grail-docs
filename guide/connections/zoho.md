# Zoho Mail

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/zoho.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Zoho Mail (SMTP)</h2>
    <p class="conn-hero__sub">Send through your Zoho Mail / Zoho Workplace mailbox. Requires App Password if 2FA is enabled (recommended).</p>
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

### Generate an App Password (if 2FA is on)

Sign into [accounts.zoho.com](https://accounts.zoho.com) → **Security → App Passwords → Generate New Password**.

Name it "SendGrail" and click Generate. Zoho displays the password — copy it.

::: warning 2FA strongly recommended
Without 2FA, you can use your regular Zoho account password — but App Passwords are still safer (revocable independently). Enable 2FA at **Security → Multi-Factor Authentication**.
:::

</div>

<div class="step" data-step="2">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Zoho Mail**.

Fill in:
- **Connection Name:** Zoho
- **From Email:** your full Zoho email address
- **From Name:** display name
- **Username:** same Zoho email
- **Password:** the App Password from step 1 (or your regular password if 2FA is off)

Click **Save**.

</div>

<div class="step" data-step="3">

### Test

**SendGrail → Test Email** → pick Zoho → send.

</div>

</div>

## Troubleshooting

- **`535 Authentication failed`** — App Password is wrong, or 2FA is on but you used the regular password. Generate a fresh App Password.
- **`Recipient not found`** — your Zoho free plan doesn't allow SMTP to external addresses. Upgrade to **Zoho Mail Standard** ($1/user/month) or higher to send externally.
- **Hitting send limits** — Zoho enforces per-mailbox send limits (typically 200/day for free, 1000/day for paid). Check your plan.

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through Zoho.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
