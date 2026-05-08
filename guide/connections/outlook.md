# Outlook / Microsoft 365 (OAuth)

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/outlook.png" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Outlook / Microsoft 365 via OAuth 2.0</h2>
    <p class="conn-hero__sub">Send through any Microsoft mailbox — personal Outlook.com / Hotmail / Live or business Microsoft 365 / Office 365. OAuth-only; SMTP Basic Auth is not supported.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~10 min</span>
      <span class="conn-meta-pill">OAuth 2.0</span>
    </div>
  </div>
</div>

::: warning Why OAuth-only?
Microsoft is phasing out SMTP Basic Auth for Microsoft 365, and tenant admins are increasingly disabling it by default. SendGrail uses Microsoft Graph API via OAuth — this is the only future-proof approach. SMTP isn't available even as an option for this provider.
:::

## Pick your account type

The Azure setup differs slightly depending on which kind of Microsoft account you're sending from:

| Account type | Pick this |
|---|---|
| `@outlook.com`, `@hotmail.com`, `@live.com`, `@msn.com` | **Personal account** flow (multi-tenant) |
| Custom domain on Microsoft 365 / Office 365 (e.g. `you@yourcompany.com`) | **Business account** flow (single or multi-tenant) |

Both flows use the same SendGrail connection setup at the end — only the **Supported account types** choice in Azure differs.

## Prerequisites

- A **Microsoft account** with mailbox access (personal Outlook, or Microsoft 365 mailbox).
- Access to [Azure portal](https://portal.azure.com) — any Microsoft account works for app registrations (no paid Azure subscription required).
- For Microsoft 365 business accounts, you may need **tenant admin** rights to grant Mail.Send permission, depending on your tenant policy.
- WordPress admin access.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Open App registrations

Sign into [portal.azure.com](https://portal.azure.com). In the top search bar type **app registrations** and click the **App registrations** result under **Services**.

![Azure portal search — App registrations](/screenshots/connections/outlook/Screenshot-1.png)

</div>

<div class="step" data-step="2">

### Start a new registration

On the App registrations page, click **+ New registration** in the top toolbar.

![App registrations page — New registration](/screenshots/connections/outlook/Screenshot-2.png)

</div>

<div class="step" data-step="3">

### Fill in the registration form

Fill in:
- **Name:** `SendGrail SMTP` (or anything descriptive).
- **Supported account types** — pick based on your account type:
  - **Personal Outlook.com / Hotmail:** *Accounts in any organizational directory and personal Microsoft accounts*.
  - **Microsoft 365 business:** *Accounts in this organizational directory only* (single tenant), or the multi-tenant option if you'll authorize multiple tenants.
- **Redirect URI** — select **Web** as the platform and paste the redirect URI shown in your SendGrail connection form (something like `https://yoursite.com/wp-admin/...`).

Click **Register**.

![Register an application form filled in](/screenshots/connections/outlook/Screenshot-3.png)

</div>

<div class="step" data-step="4">

### Copy the Application (client) ID

The new app's **Overview** page opens. Copy the **Application (client) ID** — you'll paste this into SendGrail later.

The right-hand panel also shows **Client credentials → Add a certificate or secret**. Click that link to continue.

![App overview — Application (client) ID and Add a certificate or secret](/screenshots/connections/outlook/Screenshot-4.png)

</div>

<div class="step" data-step="5">

### Start a new client secret

You're now on **Certificates & secrets**. Stay on the **Client secrets** tab and click **+ New client secret**.

![Certificates & secrets — New client secret](/screenshots/connections/outlook/Screenshot-5.png)

</div>

<div class="step" data-step="6">

### Configure the secret and Add

In the side panel:
- **Description:** `SendGrail SMTP Secret` (or any label).
- **Expires:** pick a duration. 24 months is a good default; longer if you don't want to manage rotation.

Click **Add**.

![Add a client secret panel](/screenshots/connections/outlook/Screenshot-6.png)

</div>

<div class="step" data-step="7">

### Copy the secret Value immediately

Azure now lists the secret with its **Value** visible **only on this page**. Copy the Value (not the Secret ID) — once you navigate away, Azure replaces it with `••••••` and you'd have to generate a new secret.

![Secret value displayed once — copy it now](/screenshots/connections/outlook/Screenshot-7.png)

</div>

<div class="step" data-step="8">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Outlook / Microsoft 365**.

Fill in:
- **Connection Name:** `Outlook` (or `Microsoft 365`).
- **From Email:** the mailbox you want to send from.
- **From Name:** display name.
- **OAuth Client ID:** Application (client) ID from step 4.
- **OAuth Client Secret:** the secret Value from step 7.

Click **Save**.

</div>

<div class="step" data-step="9">

### Authenticate

Click the **Authenticate** button on the saved connection. A Microsoft sign-in tab opens. Sign in with the mailbox account, then approve the requested permissions (**Send mail**, **Read your profile**, **Maintain access**).

![Microsoft consent screen — Send mail permission](/screenshots/connections/outlook/Screenshot-8.png)

Click **Accept**. Microsoft redirects back to SendGrail and the connection flips to **Connected**.

::: tip Microsoft 365 business: admin consent
On business tenants that restrict user consent, the user can't accept the permissions on their own. In that case go to Azure → your app → **API permissions → + Add a permission → Microsoft Graph → Delegated permissions → Mail.Send**, then click **Grant admin consent for [your-org]**. Personal Outlook accounts don't need this.
:::

</div>

<div class="step" data-step="10">

### Test it

**SendGrail → Test Email** → select the new connection → send. The email lands in your inbox within seconds.

</div>

</div>

## Troubleshooting

### `AADSTS50020: User account is from an external identity provider`

Personal Outlook accounts trying to authenticate against an app registered as **single-tenant**. Edit the registration → **Authentication → Supported account types** → switch to *Accounts in any organizational directory and personal Microsoft accounts*.

### `AADSTS50011: redirect_uri does not match`

The redirect URI in your Azure app registration doesn't match SendGrail's. Open your connection in SendGrail → copy the exact redirect URI from the OAuth callout → paste it into Azure → **Authentication → Redirect URIs**. Watch for trailing slash mismatches.

### `AADSTS65001: User has not consented`

The Mail.Send permission requires admin consent in some Microsoft 365 tenant configurations. In Azure → API permissions → click **Grant admin consent for [your-org]**.

### `SmtpClientAuthentication is disabled for the tenant`

Microsoft has disabled SMTP AUTH at the tenant level. This is the new default for new tenants and increasingly for existing ones. **The OAuth flow described here is unaffected** — it goes through Microsoft Graph API, not SMTP. So this error shouldn't apply to SendGrail's Outlook connection.

### Sign-in succeeds but tokens fail to refresh

Personal Outlook accounts occasionally invalidate refresh tokens after long inactivity or password changes. Re-authorize via the **Re-authenticate** button in SendGrail.

### `Forbidden: TenantThrottling` or daily-limit hit

Personal Outlook caps outbound mail at **300/day**. Microsoft 365 limits depend on your subscription (typically 10k/day per mailbox on Business plans). For higher volume, use a dedicated provider like [SendGrid](/guide/connections/sendgrid) or [Amazon SES](/guide/connections/amazon-ses).

### Mail sends but recipient sees "via outlook.com"

Microsoft Graph's standard envelope adds a `via` notice when the message wasn't sent through the user's normal mail client. Most modern inbox clients hide this; only Gmail's "Show original" reveals it. For a fully-branded sender, use a verified custom domain in Microsoft 365 + DKIM signing.

## What's next

- **[Test & Simulate](/features/test-simulate)** — verify the connection works.
- **[Email Routing](/features/email-routing)** — route specific email types through Outlook (e.g. internal team notifications) while customer-facing emails go through a dedicated provider.
- **[Failure Alerts](/features/failure-alerts)** — get notified in Slack/Telegram if Microsoft tokens stop working.
