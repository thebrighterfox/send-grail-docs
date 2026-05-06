# Other SMTP

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/custom-smtp.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Other SMTP (Custom)</h2>
    <p class="conn-hero__sub">Connect to any SMTP server not in the preset list — your hosting provider's mail server, a self-hosted Postfix, an internal relay, etc.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~3 min</span>
      <span class="conn-meta-pill">SMTP</span>
    </div>
  </div>
</div>

## When to use Other SMTP

- Your **web host** provides an SMTP server (e.g. cPanel mail).
- You run your **own mail server** (Postfix / Exim / Postal / etc).
- You use a provider not in the preset list.

For any preset-supported provider (Gmail, SendGrid, Mailgun…), use the dedicated guide instead — those have validated host/port/encryption combinations.

## Common port + encryption combinations

| Port | Encryption | When to use |
|---|---|---|
| **25** | None | Unencrypted relay. Often blocked by ISPs and hosts. Don't use unless internal. |
| **465** | SSL | Implicit TLS. Legacy but still common. Some servers prefer this. |
| **587** | TLS | STARTTLS. **Recommended.** Modern standard. |
| **2525** | TLS | Same as 587, alternative for ISP-blocked port 587. |

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Get SMTP credentials from your provider

You need: **host**, **port**, **encryption**, **username**, **password**.

Common sources:
- Your hosting control panel (cPanel → Email Accounts → Configure email client → SMTP settings).
- Your provider's documentation page.
- Your sysadmin / IT team for self-hosted servers.

</div>

<div class="step" data-step="2">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Other SMTP** (at the bottom of the provider grid).

Fill in:
- **Connection Name:** descriptive (e.g. "cPanel Mail" or "Internal Postfix")
- **From Email:** an address your SMTP server allows you to send as
- **From Name:** display name
- **Host:** SMTP server hostname
- **Port:** typically 587 (TLS) or 465 (SSL)
- **Encryption:** TLS / SSL / None
- **Username:** SMTP username (usually full email address)
- **Password:** SMTP password
- **Authentication:** ON (almost always required)
- **Auto TLS:** ON (auto-upgrade to TLS when server advertises support)
- **Return-Path:** ON (set bounce-back address to your From Email)

Click **Save**.

</div>

<div class="step" data-step="3">

### Test

**SendGrail → Test Email** → pick the new connection → send to yourself.

If it fails, check the email log row for the SMTP error and consult Troubleshooting below.

</div>

</div>

## Troubleshooting

### `Could not connect to host`

Server hostname is wrong, or your WordPress server's outbound port is blocked. Try a different port (587, 465, 2525) — some hosts block specific ones. Verify the hostname with `ping` or `telnet your.smtp.host 587`.

### `535 Authentication failed`

Username or password is wrong. For most servers, the username is the **full email address**, not just the part before `@`. Double-check.

### `554 Relay access denied`

The SMTP server doesn't trust the sending IP. Either:
- Your WP server's IP isn't in the SMTP server's allowed-relay list — ask the SMTP admin to whitelist it.
- The From Email's domain isn't permitted by this SMTP relay — try a different sender address.

### TLS / SSL errors

- Try the **Auto TLS** toggle off.
- Verify you picked the right encryption for the port (587=TLS, 465=SSL, almost never None).
- Some SMTP servers have outdated TLS versions; ask the admin for current cipher info.

### Slow sending / timeouts

- Increase **Connection Timeout** in **Settings → Advanced → Connection Timeout** (default 30s, max 120s).
- Some hosts (especially shared) throttle outbound SMTP.

## What's next

- **[Settings → Fallback](/guide/fallback)** — set this as the fallback for your primary connection so it activates only when the primary fails.
- **[Failure Alerts](/features/failure-alerts)** — get pinged in Slack/Telegram on SMTP errors.
