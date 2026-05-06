# Mailtrap

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/mailtrap.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Mailtrap</h2>
    <p class="conn-hero__sub">Two environments in one service: <strong>Live SMTP</strong> for production, <strong>Sandbox SMTP</strong> for development testing without sending to real inboxes.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">SMTP</span>
      <span class="conn-meta-pill">Live + Sandbox</span>
    </div>
  </div>
</div>

::: tip Sandbox vs Live
- **Sandbox** (`sandbox.smtp.mailtrap.io`): catches all emails in a virtual inbox — never delivers to real recipients. Perfect for staging/dev environments.
- **Live** (`live.smtp.mailtrap.io`): real production sending.

You can run two separate SendGrail connections (one per environment) and use [Email Routing](/features/email-routing) to pick which one based on the WordPress environment.
:::

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Sign up + pick your environment

[mailtrap.io](https://mailtrap.io) → sign up. Pick **Email Testing** for sandbox-only, or **Email Sending** for production.

For production sending, go to **Email Sending → Sending Domains → Add Domain** and verify DNS records.

</div>

<div class="step" data-step="2">

### Get SMTP credentials

**For Sandbox:** **Email Testing → Inboxes → My Inbox → Show Credentials**. Copy host (`sandbox.smtp.mailtrap.io`), port (587), username, password.

**For Live:** **Email Sending → SMTP/API Settings → Show Credentials**. Copy host (`live.smtp.mailtrap.io`), port (587), username, password.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Mailtrap**.

Fill in: Connection Name (e.g. "Mailtrap Sandbox" or "Mailtrap Live"), From Email, From Name, Username + Password.

The default Host (live) auto-fills — for Sandbox, switch to **Other SMTP** and manually enter `sandbox.smtp.mailtrap.io`.

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick the Mailtrap connection → send.

If you used **Sandbox**, the email lands in the Mailtrap virtual inbox (not the real recipient). Check Mailtrap dashboard → Inboxes to see it.

</div>

</div>

## Troubleshooting

- **Sandbox emails not appearing in real inbox** — by design. Sandbox catches all emails. View them in Mailtrap → Email Testing → Inboxes.
- **`535 Authentication failed`** — wrong credentials. Sandbox + Live have separate credentials; double-check you're using the right pair.
- **Live: From Email rejected** — domain not verified. Add DNS records in Email Sending → Sending Domains.

## What's next

- **[Email Routing](/features/email-routing)** — route emails to Sandbox in dev sites and Live in production.
- **[Test & Simulate](/features/test-simulate)** — preview without sending.
