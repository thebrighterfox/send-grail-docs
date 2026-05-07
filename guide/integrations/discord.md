# Discord

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/discord.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Discord failure alerts via webhook</h2>
    <p class="conn-hero__sub">Post failure alerts into a Discord channel using an Incoming Webhook. SendGrail formats them as red-sidebar embeds with the recipient, subject, error, and timestamp.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~3 min</span>
      <span class="conn-meta-pill">Webhook</span>
    </div>
  </div>
</div>

## Prerequisites

- A Discord account.
- A Discord server you own, or one where you have **Manage Webhooks** permission.
- WordPress admin access.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Open Discord and click "Add a Server"

In your Discord client (web or desktop), look at the left sidebar of servers and hover the **+** icon below your existing servers. The tooltip says *Add a Server*.

![Discord sidebar — Add a Server](/screenshots/integrations/discord/Screenshot-1.png)

::: tip Already have a server?
You can post to any existing server you have **Manage Webhooks** permission on — skip steps 2–5 and jump to step 6 with that server selected.
:::

</div>

<div class="step" data-step="2">

### Pick "Create My Own"

Discord asks how you want to start. Click **Create My Own** at the top.

![Create Your Server → Create My Own](/screenshots/integrations/discord/Screenshot-2.png)

</div>

<div class="step" data-step="3">

### Choose "For me and my friends"

The next prompt is about server scale. Pick **For me and my friends** (or *skip this question* — Discord uses it only for default channel templates).

![Tell Us More About Your Server → For me and my friends](/screenshots/integrations/discord/Screenshot-3.png)

</div>

<div class="step" data-step="4">

### Name the server

Enter a server name like `Sendgrail Test Server`. Click **Create**.

![Customise Your Server — name + Create](/screenshots/integrations/discord/Screenshot-4.png)

</div>

<div class="step" data-step="5">

### Open the server

The new server appears in your sidebar (`STS` icon for *Sendgrail Test Server*). Hovering shows the full name.

![New server in sidebar](/screenshots/integrations/discord/Screenshot-5.png)

</div>

<div class="step" data-step="6">

### Open Server Settings

Click the server name at the top of the channel list to open the server menu. Pick **Server Settings** (gear icon).

![Server menu → Server Settings](/screenshots/integrations/discord/Screenshot-6.png)

</div>

<div class="step" data-step="7">

### Open Integrations

In the Server Settings sidebar, scroll down to **APPS → Integrations**.

![Server Settings sidebar → Integrations](/screenshots/integrations/discord/Screenshot-7.png)

</div>

<div class="step" data-step="8">

### Click Create Webhook

The Integrations page shows **Webhooks** at the top. Click **Create Webhook**.

![Integrations → Create Webhook](/screenshots/integrations/discord/Screenshot-8.png)

</div>

<div class="step" data-step="9">

### Add a New Webhook

You're now on the Webhooks list (still empty). Click **New Webhook**.

![Webhooks → New Webhook](/screenshots/integrations/discord/Screenshot-9.png)

</div>

<div class="step" data-step="10">

### Open the new webhook

Discord auto-creates a webhook with a random name (e.g. *Captain Hook*) posting to `#general`. Click the chevron on its right to expand details.

![New webhook auto-created — click the chevron](/screenshots/integrations/discord/Screenshot-10.png)

</div>

<div class="step" data-step="11">

### Copy the Webhook URL

Optionally rename it (e.g. `SendGrail Alerts`) and pick a different channel. Click **Copy Webhook URL** — keep this URL safe; anyone with it can post to your channel.

![Copy Webhook URL](/screenshots/integrations/discord/Screenshot-11.png)

</div>

<div class="step" data-step="12">

### Paste it into SendGrail

WordPress admin → **SendGrail → Settings → Notifications → Discord**. Toggle **Enable Discord alerts** on, paste the webhook URL into **Discord Webhook URL**, and click **Save**.

Click **Send Test** to fire a sample alert into your Discord channel.

</div>

</div>

## Troubleshooting

### `Invalid Webhook Token` or 404

The webhook was deleted from Discord's Integrations page, or the URL was truncated when copied. Re-copy the URL from Discord (Server Settings → Integrations → Webhooks) and re-save in SendGrail.

### Alert posts but with no embeds

Your channel has the *Suppress Embeds* permission set for the webhook. Open the channel's permission settings and grant **Embed Links** to the webhook.

### `Unknown Channel` / 10003

The channel the webhook was attached to was deleted. Re-create the webhook against an existing channel and update SendGrail with the new URL.

### Rate limited

Discord webhooks accept ~30 messages per minute per webhook. If your site is bouncing emails fast, you'll see HTTP 429 responses. Either fix the underlying delivery problem or move that channel to email/Telegram alerts which have higher limits.

## What's next

- **[Slack](/guide/integrations/slack)** — same idea on Slack.
- **[Telegram](/guide/integrations/telegram)** — bot-based alerts on Telegram.
- **[Failure Alerts overview](/features/failure-alerts)** — how email + chat alerts work together.
