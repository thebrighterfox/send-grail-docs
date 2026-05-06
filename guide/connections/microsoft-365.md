# Microsoft 365 (OAuth)

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/outlook.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Microsoft 365 via OAuth 2.0</h2>
    <p class="conn-hero__sub">Send through Office 365 / Microsoft 365 mailboxes using an Azure AD app registration. Recommended over SMTP since Microsoft is phasing out Basic Auth for SMTP entirely.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~10 min</span>
      <span class="conn-meta-pill">OAuth 2.0</span>
    </div>
  </div>
</div>

::: warning Microsoft is deprecating SMTP Basic Auth
As of late 2024, Microsoft has been disabling Basic Authentication for SMTP across Microsoft 365. **OAuth is the only future-proof method.** If you set up SMTP Basic Auth today, expect it to break within 6-12 months.
:::

## Prerequisites

- A **Microsoft 365 / Office 365** mailbox with permission to send.
- Access to your organization's **Azure Active Directory** (any Microsoft 365 admin can register apps; if you don't have admin rights, ask your IT team).
- WordPress admin access.

## Setup overview

1. Register an app in Azure Active Directory.
2. Add an OAuth redirect URI.
3. Generate a client secret.
4. Configure permissions for SMTP / Mail.Send.
5. Authorize SendGrail and capture the token.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Register an Azure AD application

Sign into [portal.azure.com](https://portal.azure.com) with an account that has Azure AD admin rights.

Search for **App registrations** in the top search bar, then click **+ New registration**.

![Azure portal — new app registration](/screenshots/connections/m-365/01.png)

Fill in:
- **Name:** SendGrail SMTP
- **Supported account types:** *Accounts in this organizational directory only* (single tenant). Pick *multi-tenant* only if you'll use this app from multiple Azure tenants.
- **Redirect URI:** select **Web** as the platform and enter the redirect URI shown in your SendGrail connection form (or use `https://your-site.com/wp-json/sendgrail/v2/oauth/callback`).

Click **Register**.

</div>

<div class="step" data-step="2">

### Generate a client secret

On the new app's overview page, copy the **Application (client) ID** — you'll need it shortly.

Left nav → **Certificates & secrets → + New client secret**. Set an expiry (24 months is reasonable) and click **Add**.

![Generate client secret](/screenshots/connections/m-365/02.png)

Microsoft displays the secret **value** once. **Copy it immediately** — you cannot view it again later.

</div>

<div class="step" data-step="3">

### Configure API permissions

Left nav → **API permissions → + Add a permission → Microsoft Graph → Delegated permissions**.

Search for and select **Mail.Send**. Click **Add permissions**.

If your tenant requires admin consent, click **Grant admin consent for [your-org]** at the top of the permissions list.

![Mail.Send permission granted](/screenshots/connections/m-365/03.png)

</div>

<div class="step" data-step="4">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection**. Pick **Outlook / Microsoft 365**, then switch the auth method to **OAuth 2.0**.

Fill in:
- **Connection Name:** Microsoft 365
- **From Email:** the mailbox you want to send from
- **From Name:** display name
- **OAuth Client ID:** Application (client) ID from step 1
- **OAuth Client Secret:** the secret value from step 2

Click **Save**.

</div>

<div class="step" data-step="5">

### Authorize and capture the token

Click the **Authenticate** button on the saved connection. A new tab opens to Microsoft's login page.

Sign in with the Microsoft 365 account you want to send from. Grant the **Send mail as you** permission.

After consent, Microsoft redirects back to SendGrail and the connection flips to **Connected** in green.

</div>

<div class="step" data-step="6">

### Test it

**SendGrail → Test Email** → pick the new connection → send a test message to yourself. Should arrive within seconds.

</div>

</div>

## Troubleshooting

### `AADSTS50011: redirect_uri does not match`

The redirect URI in your Azure app registration doesn't match the one SendGrail is using. Open your connection in SendGrail, copy the exact redirect URI shown in the OAuth callout, and update Azure → App registration → **Authentication → Redirect URIs**.

### `AADSTS65001: User has not consented`

The Mail.Send permission requires admin consent in some tenant configurations. In Azure → App registration → API permissions → click **Grant admin consent for [your-org]**.

### `SmtpClientAuthentication is disabled for the tenant`

Microsoft has disabled SMTP AUTH at the tenant level. This is increasingly the default. Use the OAuth method described here — it goes through Microsoft Graph API, which is unaffected by the SMTP AUTH disablement.

### Mail sends but recipients see "via outlook.com"

This is Microsoft's standard envelope behavior for Graph-API sends. Recipients don't usually see this in their inbox client — only in "Show original / Source". If you want a fully-branded sender, set up a verified custom domain in Microsoft 365.

## What's next

- **[Email Routing](/features/email-routing)** — route only certain emails through Microsoft 365 (e.g. internal team notifications) while customer emails go through SendGrid or similar.
- **[Failure Alerts](/features/failure-alerts)** — get pinged in Slack/Telegram if Microsoft tokens stop working.
