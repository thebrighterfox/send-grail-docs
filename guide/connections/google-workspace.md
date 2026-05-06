# Google Workspace (OAuth)

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/gmail.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Google Workspace via OAuth 2.0</h2>
    <p class="conn-hero__sub">Send through your Google Workspace mailbox using a Google Cloud OAuth client. No SMTP password, no App Password, automatic token refresh.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~10 min</span>
      <span class="conn-meta-pill">OAuth 2.0</span>
      <span class="conn-meta-pill">2,000 emails/day</span>
    </div>
  </div>
</div>

## Why OAuth (not App Password)?

Workspace organizations often disable App Passwords through admin policy. OAuth is also more secure: tokens are scoped to a specific Google Cloud project, can be revoked anytime, and rotate automatically without user intervention.

The trade-off: setup is longer (creating a Google Cloud project + OAuth client). But you do it **once per organization** — additional Workspace mailboxes just authorize against the same client.

## Prerequisites

- A **Google Workspace** account (custom domain Gmail). Personal `@gmail.com` accounts work too — see [Gmail OAuth](/guide/connections/gmail-oauth) for that flow.
- Permission to create OAuth clients in Google Cloud Console (your own account is enough).
- WordPress admin access.
- About 10 minutes of focused setup time.

## Setup overview

1. Create a Google Cloud project (or reuse an existing one).
2. Enable the **Gmail API** on that project.
3. Configure the OAuth consent screen.
4. Create OAuth client credentials.
5. Authorize SendGrail and capture the auth token.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Open Google Cloud Console

Sign into [console.cloud.google.com](https://console.cloud.google.com) with your Workspace account.

If you don't already have a project, click the project dropdown in the top bar and select **New Project**. Name it anything sensible like *"SendGrail SMTP"* and click **Create**.

![Google Cloud Console — new project](/screenshots/connections/g-workspace/01.png)

Make sure the new project is selected in the top bar before continuing.

</div>

<div class="step" data-step="2">

### Enable the Gmail API

In the left nav, go to **APIs & Services → Library**. Search for **Gmail API** and click it.

![Searching for Gmail API in the Library](/screenshots/connections/g-workspace/02.png)

Click **Enable**. Wait a few seconds for activation.

![Enabling the Gmail API](/screenshots/connections/g-workspace/03.png)

</div>

<div class="step" data-step="3">

### Configure the OAuth consent screen

Left nav → **APIs & Services → OAuth consent screen**. Pick **Internal** if your Workspace organization should be the only allowed users, or **External** for personal Gmail accounts.

![OAuth consent screen — user type selection](/screenshots/connections/g-workspace/04.png)

Fill in the App information:
- **App name:** SendGrail SMTP (or your site name)
- **User support email:** your Workspace email
- **Developer contact:** same

![OAuth consent screen — app details](/screenshots/connections/g-workspace/05.png)

Click **Save and Continue**. You can skip the Scopes step (we'll request scopes at runtime). Click **Save and Continue** again until you reach the Summary, then click **Back to Dashboard**.

</div>

<div class="step" data-step="4">

### Create OAuth client credentials

Left nav → **APIs & Services → Credentials → + Create Credentials → OAuth client ID**.

![Create OAuth credentials](/screenshots/connections/g-workspace/06.png)

Choose **Application type: Desktop app**. Yes, even though SendGrail is a website — Desktop is correct here because we exchange the auth code via copy/paste rather than redirect.

Name it **SendGrail Desktop Client** (or anything) and click **Create**.

![OAuth client type selection — Desktop app](/screenshots/connections/g-workspace/07.png)

Google shows you the **Client ID** and **Client secret**. Copy both — you'll paste them into SendGrail next.

![Client ID and secret displayed](/screenshots/connections/g-workspace/08.png)

</div>

<div class="step" data-step="5">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection**. Pick **Gmail**, then switch the auth method to **OAuth 2.0**.

![SendGrail Add Connection — Gmail OAuth selected](/screenshots/connections/g-workspace/09.png)

Fill in:
- **Connection Name:** Workspace Gmail
- **From Email:** your Workspace email address
- **From Name:** your display name
- **OAuth Client ID:** paste from step 4
- **OAuth Client Secret:** paste from step 4

![Connection form with OAuth credentials](/screenshots/connections/g-workspace/10.png)

Click **Save**.

</div>

<div class="step" data-step="6">

### Authorize the connection

Right after saving, SendGrail shows an **Authenticate** button. Click it. A new tab opens to Google's OAuth consent screen.

![Click Authenticate to start OAuth flow](/screenshots/connections/g-workspace/11.png)

Pick the Workspace account you want to send from.

![Google account picker](/screenshots/connections/g-workspace/12.png)

If your app is in **Testing** mode (default for new OAuth clients), Google shows a "This app is unverified" warning. Click **Continue** — this is expected for self-hosted apps.

![Unverified app warning — click Continue](/screenshots/connections/g-workspace/13.png)

Grant the permissions (send email on your behalf).

![Permission grant screen](/screenshots/connections/g-workspace/14.png)

Google then displays an **authorization code**. Copy it.

![Authorization code displayed](/screenshots/connections/g-workspace/15.png)

</div>

<div class="step" data-step="7">

### Paste the code back into SendGrail

Switch back to the SendGrail tab. Paste the authorization code into the input and click **Complete Authentication**.

![Paste auth code in SendGrail](/screenshots/connections/g-workspace/16.png)

SendGrail exchanges the code for a refresh token (which it stores encrypted) and an access token. The connection now shows **Connected** in green.

![Connection authorized successfully](/screenshots/connections/g-workspace/17.png)

</div>

<div class="step" data-step="8">

### Send a test email

In **SendGrail → Test Email**, pick this connection and send yourself a message.

![Test email through Workspace OAuth](/screenshots/connections/g-workspace/18.png)

You should see it arrive within seconds. The email log entry will show the full Gmail API response with the assigned `Message-Id`.

![Test email arrived in inbox](/screenshots/connections/g-workspace/19.png)

</div>

<div class="step" data-step="9">

### Activate as default

**SendGrail → Settings → General → Default Connection** → pick your Workspace OAuth entry → Save.

![Set as default connection](/screenshots/connections/g-workspace/20.png)

WordPress emails (admin notifications, password resets, plugin emails, WooCommerce orders, contact forms) all flow through Workspace from now on.

</div>

</div>

## Token rotation

OAuth refresh tokens don't expire (in normal use). Access tokens auto-rotate every 60 minutes — SendGrail handles this transparently. You won't need to re-authorize unless:

- You revoke the OAuth client in Google Cloud Console.
- The Workspace user removes app access at [myaccount.google.com/permissions](https://myaccount.google.com/permissions).
- Your Workspace admin disables third-party app access organization-wide.
- You change the OAuth Client ID or Secret on the connection.

## Troubleshooting

### `Error 403: org_internal`

The OAuth client is set to **Internal** but you're authorizing with an account outside the Workspace org. Switch the consent screen to **External** in Google Cloud Console, or authorize with an in-org account.

### `Access blocked: Authorization Error`

The OAuth client is in production-publish mode but hasn't passed Google's verification. For self-hosted apps that only your team uses, keep the consent screen status as **Testing** and add your Workspace users as Test Users in the OAuth consent screen settings.

### Token refresh fails after a few weeks

If you're in **Testing** mode, Google rotates refresh tokens every 7 days. Either:
- Add a Brand to the consent screen and submit for verification (production mode → tokens never expire), or
- Move to **Internal** for Workspace-only access (no expiry, no verification needed).

### `failedPrecondition: User has not enabled access`

Your Workspace admin has restricted third-party app access. Ask them to enable Gmail API access for your account, or whitelist your OAuth client at admin.google.com → Security → API Controls.

### Emails send but show as "via" some other domain

Gmail's "Show original" header trace will display *via Sendgrail SMTP Project* or similar — this is expected and matches the Cloud project name. Recipients usually don't see this. If it's noticeable, rename your Cloud project to your brand name.

## Multiple Workspace mailboxes

You can authorize **multiple Workspace accounts** against the same OAuth client. Each becomes a separate connection in SendGrail with its own refresh token. Useful if you want different mailboxes for support / sales / marketing emails routed via [Email Routing rules](/features/email-routing).

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through this Workspace connection while others go elsewhere.
- **[Failure Alerts](/features/failure-alerts)** — get notified in Slack/Telegram if OAuth tokens stop working.
- **[Test & Simulate](/features/test-simulate)** — preview which connection an email would use without sending.
