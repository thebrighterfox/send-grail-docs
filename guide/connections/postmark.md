# Postmark

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/postmark.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Postmark</h2>
    <p class="conn-hero__sub">ActiveCampaign's transactional email service. Known for raw speed and excellent inbox placement. Per-Server API tokens.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
    </div>
  </div>
</div>

## Prerequisites

- A [Postmark account](https://account.postmarkapp.com/sign_up). Free trial includes 100 emails on a sandbox server.
- A verified Sender Signature (single email or full domain).

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Verify your sender

Postmark dashboard → **Sender Signatures** → **Add Sender Signature**. Enter a single email (verify via clicking the link in the email Postmark sends), or set up **Domain DKIM/Return-Path**.

For production, use Domain DKIM — recipients see the email as truly coming from your domain.

</div>

<div class="step" data-step="2">

### Get the Server API Token

Postmark → pick a Server (or create one — separate Servers can have separate quotas/tokens) → **API Tokens** tab.

Copy the **Server Token**. Postmark uses the same token for both username and password fields.

</div>

<div class="step" data-step="3">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Postmark**.

Fill in:
- **Connection Name:** Postmark
- **From Email:** your verified sender
- **From Name:** display name
- **API Key:** the Server Token from step 2

Click **Save**.

</div>

<div class="step" data-step="4">

### Test

**SendGrail → Test Email** → pick the Postmark connection → send.

</div>

</div>

## Troubleshooting

### `422 Sender signature not found`

Your **From Email** isn't verified in Postmark. Add it as a Sender Signature, OR verify the parent domain.

### `401 Unauthorized`

Wrong Server Token. Double-check that you copied the **Server Token**, not the **Account Token** (which Postmark also shows).

### Emails go through but aren't seen by recipient

Postmark separates **Transactional** and **Broadcast** streams. New servers default to **Transactional** — make sure your Server's stream type matches what you're sending. Marketing emails sent through a Transactional stream may be flagged.

## What's next

- **[Failure Alerts](/features/failure-alerts)** — get pinged when Postmark rejects.
- **[Email Routing](/features/email-routing)** — route only transactional emails through Postmark while marketing goes elsewhere.
