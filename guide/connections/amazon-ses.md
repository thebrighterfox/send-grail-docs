# Amazon SES

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/amazonses.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Amazon Simple Email Service (SES)</h2>
    <p class="conn-hero__sub">AWS's transactional email service. Cheapest at scale ($0.10 per 1,000 emails) but requires AWS account, region selection, and IAM-based credential setup.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~15 min</span>
      <span class="conn-meta-pill">SMTP / API</span>
      <span class="conn-meta-pill">Region-specific</span>
    </div>
  </div>
</div>

## Prerequisites

- An **AWS account**. Free tier works for testing.
- A domain you can edit DNS records for (DKIM verification requires this).
- WordPress admin access.

## Setup overview

1. Pick an AWS region.
2. Verify your sending domain in SES.
3. Create SMTP credentials (a special IAM user).
4. Request production access (to send to non-verified addresses).
5. Add the connection in SendGrail.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Choose your AWS region

Open [AWS SES console](https://console.aws.amazon.com/ses/). The top-right region selector controls everything.

![AWS SES console — region selector](/screenshots/connections/ses/Screenshot-1.png)

Pick a region geographically close to your WordPress server for lowest latency. Common picks:
- `us-east-1` (N. Virginia) — cheapest, default for many setups
- `eu-west-1` (Ireland) — for EU sites with GDPR concerns
- `ap-south-1` (Mumbai) — for South Asia

The region you pick determines the SMTP host: `email-smtp.{region}.amazonaws.com`.

</div>

<div class="step" data-step="2">

### Verify your sending domain

In SES → **Configuration → Identities → Create identity**.

![Create identity in SES](/screenshots/connections/ses/Screenshot-2.png)

Choose **Domain** as the identity type. Enter your domain (e.g. `yourcompany.com`).

![Domain identity setup](/screenshots/connections/ses/Screenshot-3.png)

Enable **DKIM signing** with **Easy DKIM** (default). SES generates DKIM keys and shows DNS records to add.

![DKIM CNAME records](/screenshots/connections/ses/Screenshot-4.png)

Click **Create identity**, then go to your DNS provider (Cloudflare, Route 53, GoDaddy, etc.) and add the **3 CNAME records** SES showed you.

![DNS records to add](/screenshots/connections/ses/Screenshot-5.png)

Wait for DNS propagation (usually 5–30 minutes). SES will show **Verified** when ready.

![Verified domain status](/screenshots/connections/ses/Screenshot-6.png)

</div>

<div class="step" data-step="3">

### Verify a single email address (alternative for testing)

If you don't have a domain handy, you can verify a single email address as a sender:

In SES → **Identities → Create identity → Email address**. Enter your email, click Create.

![Email address verification](/screenshots/connections/ses/Screenshot-7.png)

SES sends a confirmation email — click the link in it to verify.

![Verification email](/screenshots/connections/ses/Screenshot-8.png)

::: warning Sandbox vs production
A new SES account starts in **sandbox mode**. You can only send to *verified* email addresses (yours) until AWS approves your production-access request. Step 5 covers that.
:::

</div>

<div class="step" data-step="4">

### Create SMTP credentials

In SES → **Configuration → SMTP settings → Create SMTP credentials**.

![SMTP settings page](/screenshots/connections/ses/Screenshot-9.png)

AWS opens an IAM dialog to create a service user with the correct permissions. Pick a name (or accept the default `ses-smtp-user-...`) and click **Create**.

![IAM user creation for SMTP](/screenshots/connections/ses/Screenshot-10.png)

AWS displays the **SMTP username** and **SMTP password** **once**. Click **Download .csv** to save them — you can't view the password again.

![SMTP credentials downloaded](/screenshots/connections/ses/Screenshot-11.png)

::: info SES SMTP credentials are not your AWS access keys
The SMTP user/password are derived but distinct from IAM access keys. Only use the values shown on this screen — your `AKIA*` access key won't work for SMTP.
:::

</div>

<div class="step" data-step="5">

### Request production access

By default, SES is in **sandbox mode** (200 emails/day, only to verified addresses). To send to anyone:

In SES → **Account dashboard → Request production access**.

![Production access request](/screenshots/connections/ses/Screenshot-12.png)

Fill out the use-case form. AWS typically approves within **24 hours** if your description is clear:
- **Mail type:** Transactional (or Marketing if applicable)
- **Website URL:** your WordPress site
- **Use case:** brief description of what you'll send
- **Compliance:** confirm you'll only send to opted-in recipients

![Use case description](/screenshots/connections/ses/Screenshot-13.png)

</div>

<div class="step" data-step="6">

### Add the connection in SendGrail

WordPress admin → **SendGrail → Connections → Add Connection** → pick **Amazon SES**.

![SendGrail Amazon SES selection](/screenshots/connections/ses/Screenshot-14.png)

Fill in:
- **Connection Name:** Amazon SES
- **Region:** matches the AWS region you picked in step 1 (e.g. `us-east-1`). The host auto-fills.
- **From Email:** your verified domain or address
- **From Name:** display name
- **Username:** SMTP username from the CSV in step 4
- **Password:** SMTP password from the CSV in step 4

![Connection form filled in](/screenshots/connections/ses/Screenshot-15.png)

Click **Save**.

</div>

<div class="step" data-step="7">

### Test it

**SendGrail → Test Email** → pick the SES connection → send a test message to a verified address (or any address once production access is approved).

</div>

</div>

## Troubleshooting

### `MessageRejected: Email address is not verified`

You're still in SES sandbox mode and trying to send to an unverified recipient. Either verify the recipient address (Identities → Create identity → Email), OR request production access (step 5).

### `554 Authentication failed` or `535 incorrect username/password`

The SMTP credentials in your connection don't match. SMTP credentials are not IAM access keys — they're a separate value pair generated through the SES "Create SMTP credentials" workflow. Re-generate them in step 4.

### `Could not connect to host: email-smtp.us-east-1.amazonaws.com`

The region in your connection doesn't match your SES setup. If you verified your domain in `us-west-2` but the connection points to `us-east-1`, AWS will refuse the SMTP login. Edit the connection → set the correct **Region** → save.

### Production access denied

AWS denies vague or marketing-heavy use cases. Re-submit with:
- Clear description of *what* emails you'll send (e.g. "WooCommerce order confirmations and password resets")
- Confirm you have opt-in confirmation for marketing emails
- Mention your bounce/complaint handling process

### Bounces / complaints

SES tracks bounce + complaint rates. If they exceed 5% (bounce) or 0.1% (complaint), AWS will pause your account. Configure SNS topics for bounce notifications and clean your list regularly.

## Cost reference

- **First 62,000 emails/month** from EC2: free.
- After that: **$0.10 per 1,000 emails**.
- **Inbound:** $0.10 per 1,000 emails received.
- **Attachments:** $0.12 per GB transferred.

For most WordPress sites, SES is effectively free.

## What's next

- **[Email Routing](/features/email-routing)** — route specific email types (e.g. transactional vs marketing) through different SES configurations.
- **[Failure Alerts](/features/failure-alerts)** — get notified if SES bounces start spiking.
- **[Test & Simulate](/features/test-simulate)** — preview which emails go through SES without actually sending.
