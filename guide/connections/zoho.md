# Zoho Mail

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/zoho.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Zoho Mail via OAuth + API</h2>
    <p class="conn-hero__sub">Send through your Zoho Mail / Zoho Workplace mailbox using Zoho's official Mail API. No SMTP password — OAuth tokens rotate automatically.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~10 min</span>
      <span class="conn-meta-pill">OAuth 2.0</span>
      <span class="conn-meta-pill">API</span>
    </div>
  </div>
</div>

::: info Why API and not SMTP?
SendGrail's Zoho integration uses Zoho's [Mail Send API](https://www.zoho.com/mail/help/api/post-send-an-email.html) over OAuth, not SMTP with an App Password. This means tokens rotate on their own, no plaintext credentials are stored, and you don't need to keep an SMTP password in your WordPress database.
:::

## Prerequisites

- A Zoho Mail / Zoho Workplace account (free or paid).
- WordPress admin access.
- Know your **Zoho region** — the one matching your account's data centre. Zoho hosts mailboxes per-region and the OAuth flow must use the matching region's URLs.

::: tip Find your region
Sign into your Zoho Mail webapp and look at the URL. `mail.zoho.com` → region **com**, `mail.zoho.eu` → **eu**, `mail.zoho.in` → **in**, etc. Use that region throughout the setup — register the OAuth client on `api-console.zoho.<region>` and pick the matching region inside SendGrail.
:::

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Open the Zoho API Console (region-specific)

Open the API console for your region:

| Region   | API Console URL                     |
|----------|-------------------------------------|
| com (US) | <https://api-console.zoho.com>      |
| eu       | <https://api-console.zoho.eu>       |
| in       | <https://api-console.zoho.in>       |
| com.au   | <https://api-console.zoho.com.au>   |
| com.cn   | <https://api-console.zoho.com.cn>   |
| jp       | <https://api-console.zoho.jp>       |
| ca       | <https://api-console.zohocloud.ca>  |

Sign in with the same Zoho account that owns the mailbox you want to send from.

</div>

<div class="step" data-step="2">

### Create a Server-based Application

Click **Add Client → Server-based Applications**.

Fill in:
- **Client Name:** `SendGrail` (or anything descriptive).
- **Homepage URL:** your WordPress site URL (e.g. `https://example.com`).
- **Authorized Redirect URIs:** copy this from SendGrail's Add Connection screen (it appears after you pick Zoho as the provider). It will look like `https://example.com/wp-admin/admin.php?page=sendgrail&sg_oauth=callback`.

Click **Create**.

::: warning Redirect URI must match exactly
Zoho rejects the OAuth flow with `Invalid redirect URI` if there's any mismatch — including a trailing slash or `http` vs `https`. Copy-paste it verbatim from SendGrail.
:::

</div>

<div class="step" data-step="3">

### Copy the Client ID and Client Secret

After creation, Zoho shows the **Client ID** and **Client Secret** on the client's detail page. Keep this tab open — you'll paste both into SendGrail in the next step.

</div>

<div class="step" data-step="4">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Zoho Mail**.

Fill in:
- **Connection Name:** `Zoho` (or any descriptive label).
- **From Email:** your full Zoho email address (the one matching the mailbox).
- **From Name:** display name shown to recipients.
- **Region:** pick the region matching your account (com, eu, in, etc.).
- **OAuth Client ID:** from step 3.
- **OAuth Client Secret:** from step 3.

Click **Save**. The connection saves in a *Pending* state until you authenticate.

</div>

<div class="step" data-step="5">

### Authenticate

Click **Authenticate with Zoho**. A new tab opens on Zoho's consent screen — review the requested scopes (`ZohoMail.messages.CREATE`, `ZohoMail.accounts.READ`) and approve.

Zoho displays a one-time auth code. Copy it, paste back into SendGrail's input, click **Complete Authentication**.

The connection flips to **Connected** in green.

</div>

<div class="step" data-step="6">

### Test

**SendGrail → Test Email** → pick this connection → send to yourself. Should arrive within seconds.

</div>

</div>

## Scopes used

SendGrail requests only the minimum scopes needed to send mail:

| Scope                         | Why                                                     |
|-------------------------------|---------------------------------------------------------|
| `ZohoMail.messages.CREATE`    | Send email on your behalf via the Mail Send API.        |
| `ZohoMail.accounts.READ`      | Read the account's `accountId` (required by the API).   |

SendGrail does **not** request `messages.READ` — it cannot read your inbox or any existing mail.

## Troubleshooting

### `Invalid redirect URI`

The Authorized Redirect URI in your Zoho client doesn't match what SendGrail sent. Open the client in `api-console.zoho.<region>`, click Settings, and paste the redirect URI exactly as SendGrail shows it. No trailing slash, exact protocol.

### `Invalid client` after authenticating

Wrong region. Your Zoho mailbox lives in (say) the EU data centre, but the OAuth client was created on `api-console.zoho.com` (US). Re-create the client on the matching region's API console and update SendGrail's Region setting.

### `INVALID_OAUTHTOKEN` when sending

The refresh token was revoked — usually because the client was deleted in the API console, the user revoked it from `accounts.zoho.<region>/u/h#sessions/userauthtoken`, or the access scope was changed. Click **Re-authenticate** on the connection.

### `Recipient not allowed` / send failed

Free Zoho Mail plans don't allow sending to external addresses via the API. Upgrade to **Zoho Mail Standard** (or Workplace Standard) to enable external delivery.

### Hitting send limits

Zoho enforces per-mailbox API limits (typically a few hundred messages per day on free plans, higher on paid). If you hit them, the API returns `Limit exceeded`. Switch to a dedicated transactional provider for high-volume sends.

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through Zoho.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
- **[Test & Simulate](/features/test-simulate)** — verify the connection works.
