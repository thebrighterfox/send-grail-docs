# Outlook / Hotmail (OAuth)

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/outlook.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Outlook / Hotmail via OAuth 2.0</h2>
    <p class="conn-hero__sub">Send through your personal Outlook.com / Hotmail.com / Live.com mailbox using a multi-tenant Azure app.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~10 min</span>
      <span class="conn-meta-pill">OAuth 2.0</span>
    </div>
  </div>
</div>

::: tip Outlook vs Microsoft 365
- **Outlook (this guide):** personal accounts on `outlook.com` / `hotmail.com` / `live.com` / `msn.com`.
- **[Microsoft 365](/guide/connections/microsoft-365):** business / Workspace mailboxes on a custom domain.

Both use Azure AD app registrations, but the consumer flow has slightly different account-type settings.
:::

## Prerequisites

- A personal **Outlook.com / Hotmail / Live** mailbox.
- A free Microsoft account with access to [Azure portal](https://portal.azure.com) (any Microsoft account works for app registrations — no paid Azure subscription needed).
- WordPress admin access.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Register an Azure AD app

Sign into [portal.azure.com](https://portal.azure.com) with the same Microsoft account, or any Microsoft account.

Search for **App registrations** → **+ New registration**.

![Azure portal — App registrations](/screenshots/connections/outlook/Screenshot-1.png)

Fill in:
- **Name:** SendGrail Outlook
- **Supported account types:** *Accounts in any organizational directory and personal Microsoft accounts (e.g. Skype, Xbox)* — this enables both personal Outlook and Workspace logins.
- **Redirect URI:** select **Web** and paste the redirect URI shown in your SendGrail connection form.

Click **Register**.

</div>

<div class="step" data-step="2">

### Copy the Application (client) ID

On the app's overview page, copy the **Application (client) ID**. Save it for later — you'll paste it into SendGrail.

![Application client ID](/screenshots/connections/outlook/Screenshot-2.png)

</div>

<div class="step" data-step="3">

### Generate a client secret

Left nav → **Certificates & secrets → + New client secret**. Pick an expiry (24 months recommended) and click **Add**.

![Create client secret](/screenshots/connections/outlook/Screenshot-3.png)

Copy the **Value** column immediately. You can't view it again after leaving the page.

![Secret value displayed once](/screenshots/connections/outlook/Screenshot-4.png)

</div>

<div class="step" data-step="4">

### Configure API permissions

Left nav → **API permissions → + Add a permission → Microsoft Graph → Delegated permissions**.

Search **Mail.Send** → check it → **Add permissions**.

![Mail.Send permission added](/screenshots/connections/outlook/Screenshot-5.png)

For personal Microsoft accounts, no admin consent step is needed — the user themselves grants consent during sign-in.

</div>

<div class="step" data-step="5">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection**. Pick **Outlook / Microsoft 365**, switch to **OAuth 2.0**.

Fill in:
- **Connection Name:** Outlook
- **From Email:** your full Outlook.com address
- **From Name:** display name
- **OAuth Client ID:** Application (client) ID from step 2
- **OAuth Client Secret:** the secret value from step 3

![SendGrail connection form for Outlook OAuth](/screenshots/connections/outlook/Screenshot-6.png)

Click **Save**.

</div>

<div class="step" data-step="6">

### Authenticate

Click the **Authenticate** button. A Microsoft sign-in tab opens.

![Click Authenticate](/screenshots/connections/outlook/Screenshot-7.png)

Sign in with the Outlook.com account you want to send from. Grant the **Send mail** permission.

Microsoft redirects back to SendGrail. The connection now displays **Connected** in green and shows the linked email.

![Connection shows Connected status](/screenshots/connections/outlook/Screenshot-8.png)

</div>

<div class="step" data-step="7">

### Test it

**SendGrail → Test Email** → select your Outlook connection → send. The email lands in your inbox within seconds.

</div>

</div>

## Troubleshooting

### `AADSTS50020: User account is from an external identity provider`

The Azure app's **Supported account types** is set to single-tenant or organizational-only. Edit the registration → **Authentication → Supported account types** → switch to *Accounts in any organizational directory and personal Microsoft accounts*.

### `AADSTS900561: redirect_uri does not match`

The exact redirect URI from your SendGrail connection form must be added to Azure → App → **Authentication → Redirect URIs**. Common cause: trailing slash mismatch. Copy and paste it exactly.

### Sign-in succeeds but tokens fail to refresh

Outlook personal accounts occasionally invalidate refresh tokens after long periods of inactivity, or after the user changes their Microsoft account password. Re-authorize the connection in SendGrail by clicking **Re-authenticate**.

### `Forbidden: TenantThrottling`

Microsoft is throttling the connection due to volume from your IP / app registration. Personal Outlook has a **300 emails/day limit** for outbound. For higher volume, use a dedicated provider like [SendGrid](/guide/connections/sendgrid).

## What's next

- **[Test & Simulate](/features/test-simulate)** — verify the connection works.
- **[Email Routing](/features/email-routing)** — direct only certain emails to Outlook (e.g. personal correspondence) while customer-facing emails go to a dedicated provider.
