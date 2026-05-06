# Gmail (OAuth)

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/gmail.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Personal Gmail via OAuth 2.0</h2>
    <p class="conn-hero__sub">Send through your personal <code>@gmail.com</code> account using a Google Cloud OAuth client. No App Password, no SMTP credentials, automatic token rotation.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~10 min</span>
      <span class="conn-meta-pill">OAuth 2.0</span>
      <span class="conn-meta-pill">500 emails/day</span>
    </div>
  </div>
</div>

::: tip Workspace? Use the dedicated guide
For custom-domain Gmail (Workspace), follow the [Google Workspace](/guide/connections/google-workspace) guide. The flow is similar but with one key difference (Internal vs External consent screen).
:::

The OAuth setup is **almost identical to Google Workspace** — same Google Cloud project, same OAuth client, just a different "Supported account types" choice on the consent screen.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Create or pick a Google Cloud project

Open [console.cloud.google.com](https://console.cloud.google.com) signed in with your Gmail account. Create a new project (top-bar dropdown → New Project) or select an existing one.

</div>

<div class="step" data-step="2">

### Enable the Gmail API

Left nav → **APIs & Services → Library** → search "Gmail API" → click → **Enable**.

</div>

<div class="step" data-step="3">

### Configure the OAuth consent screen

Left nav → **APIs & Services → OAuth consent screen**.

Pick **External** (required for personal Gmail accounts — Internal is Workspace-only).

Fill in:
- App name (e.g. *SendGrail SMTP*)
- User support email
- Developer contact email

Save and continue through the steps. **Important:** under **Test users**, add your own Gmail address. Apps in Testing mode only let listed Test Users authorize.

</div>

<div class="step" data-step="4">

### Create OAuth credentials

Left nav → **APIs & Services → Credentials → + Create Credentials → OAuth client ID**.

- **Application type:** Desktop app
- **Name:** SendGrail Desktop Client

Click Create. Google shows the **Client ID** and **Client secret** — copy both.

</div>

<div class="step" data-step="5">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Gmail** → switch to **OAuth 2.0**.

Fill in: Connection Name, From Email (your Gmail address), From Name, OAuth Client ID, OAuth Client Secret. Save.

</div>

<div class="step" data-step="6">

### Authenticate

Click **Authenticate**. A new tab opens; pick your Gmail account and grant the "Send email" permission. Google shows a 1-time auth code — copy it, paste back into SendGrail's input, click **Complete Authentication**.

The connection flips to **Connected** in green.

</div>

<div class="step" data-step="7">

### Test

**SendGrail → Test Email** → pick this connection → send to yourself. Should arrive within seconds.

</div>

</div>

## Token expiry caveat (Testing mode)

Personal Gmail OAuth clients in **Testing** mode have refresh tokens that expire after **7 days**. After expiry you'll need to re-authorize. Two options:

- **Stay in Testing:** re-auth once a week. Simple but tedious.
- **Submit for Verification:** Google verifies your OAuth client (takes 4-6 weeks for review) → tokens never expire. Required if you want a stable long-term integration on a personal account.

For most personal use, the [App Password](/guide/connections/gmail) flow is simpler — no Cloud project, no token rotation. Use OAuth only if 2FA App Passwords are blocked for you.

## Troubleshooting

Same issues as [Google Workspace OAuth](/guide/connections/google-workspace#troubleshooting) — see that guide's troubleshooting section for `403 org_internal`, redirect URI mismatch, refresh token failures, and unverified app warnings.

## What's next

- **[Email Routing](/features/email-routing)** — send only personal correspondence through Gmail; route customer emails through a dedicated provider.
- **[Test & Simulate](/features/test-simulate)** — verify the connection works.
