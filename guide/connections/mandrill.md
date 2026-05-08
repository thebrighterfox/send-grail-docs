# Mandrill (Mailchimp Transactional)

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/mandrill.png" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Mailchimp Transactional (Mandrill)</h2>
    <p class="conn-hero__sub">Mailchimp's paid transactional email add-on. Requires an active Mailchimp account with the Transactional add-on enabled.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
      <span class="conn-meta-pill">Paid only</span>
    </div>
  </div>
</div>

::: warning Mandrill is paid-only
Unlike most providers in this list, Mandrill has no free tier. You need a paid Mailchimp Standard / Premium plan plus the Transactional Email add-on (~$20/month minimum).
:::

## Prerequisites

- An active Mailchimp account with the **Transactional Email (Mandrill)** add-on enabled.
- A verified domain in Mandrill.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Enable Transactional in Mailchimp

Sign into Mailchimp → click your account icon → **Transactional**. If it says "Get started", you'll need to add it as a paid add-on first.

</div>

<div class="step" data-step="2">

### Verify your sending domain

Mandrill dashboard → **Settings → Domains → Sending Domains → Add Domain**. Enter your domain.

Mandrill shows DNS records (DKIM, SPF, custom return-path). Add them at your DNS provider, then click **Test DNS Settings** to verify.

</div>

<div class="step" data-step="3">

### Generate an API key

Mandrill → **Settings → API Keys → + Add API Key**. Name it "SendGrail" and create.

Copy the API key.

</div>

<div class="step" data-step="4">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Mandrill**.

Fill in:
- **Connection Name:** Mandrill
- **From Email:** an address on your verified domain
- **From Name:** display name
- **API Key:** paste from step 3

Click **Save**.

</div>

<div class="step" data-step="5">

### Test

**SendGrail → Test Email** → pick Mandrill → send.

</div>

</div>

## Troubleshooting

### `Invalid_Key`

API key is wrong or revoked. Generate a new one in Mandrill → Settings → API Keys.

### `Unsigned`

Sending from a domain Mandrill hasn't signed. Make sure your domain shows **Verified** + **DKIM Valid** in Settings → Sending Domains.

### `Reject reason: spam`

Mandrill's reputation system flagged the email. Check your sender reputation in **Reports → Reputation**. May indicate compromised credentials or low-quality recipient lists.

## What's next

- **[Email Routing](/features/email-routing)** — route specific email types through Mandrill while others go to free providers.
- **[Failure Alerts](/features/failure-alerts)** — get pinged if Mandrill bounces.
