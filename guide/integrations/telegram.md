# Telegram

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/telegram.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Telegram failure alerts via bot</h2>
    <p class="conn-hero__sub">Send failure alerts as Telegram messages from a custom bot. SendGrail's "Connect chat" feature auto-detects the chat ID after you tap Start in the bot — no manual API fishing.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--medium">Medium</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">Bot Token</span>
    </div>
  </div>
</div>

## Prerequisites

- A Telegram account.
- WordPress admin access.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Find @BotFather

Open Telegram (web or desktop / mobile app). In the search bar, type **@botfather** and click the verified BotFather result.

![Telegram search → @BotFather](/screenshots/integrations/telegram/Screenshot-1.png)

</div>

<div class="step" data-step="2">

### Click START

If this is your first time talking to BotFather, click **START** at the top.

![BotFather chat → START](/screenshots/integrations/telegram/Screenshot-2.png)

</div>

<div class="step" data-step="3">

### Send /newbot

Type `/newbot` (or pick it from the suggested commands) and send.

![Send /newbot to BotFather](/screenshots/integrations/telegram/Screenshot-3.png)

</div>

<div class="step" data-step="4">

### Give the bot a display name

BotFather asks for a name. Send `SendGrail Notification` (or anything human-readable).

![Bot display name → SendGrail Notification](/screenshots/integrations/telegram/Screenshot-4.png)

</div>

<div class="step" data-step="5">

### Choose a username (must end with `_bot`)

BotFather asks for a username. It **must end in `_bot`**. Send something like `sendgrail_notification_bot`. If it's taken, BotFather asks you to try another.

![Bot username → must end with _bot](/screenshots/integrations/telegram/Screenshot-5.png)

</div>

<div class="step" data-step="6">

### Copy the bot token

BotFather replies with a *"Done! Congratulations on your new bot."* message containing the **HTTP API token** (a long string like `8626225806:AAH...`). Copy this token — keep it secret, anyone with it can send messages as your bot.

![Bot token from BotFather](/screenshots/integrations/telegram/Screenshot-6.png)

</div>

<div class="step" data-step="7">

### Paste the token into SendGrail and click Connect chat

WordPress admin → **SendGrail → Settings → Notifications → Telegram**. Toggle **Enable Telegram alerts** on, paste the token into **Bot Token**, and click **Connect chat**.

![SendGrail Telegram section — Connect chat](/screenshots/integrations/telegram/Screenshot-7.png)

::: info What "Connect chat" does
SendGrail opens a Telegram link to your bot in a new tab and starts polling for the next chat that sends `/start`. When you tap Start, it captures that chat's ID and writes it back into the Chat ID field for you. The window is open for **5 minutes** before SendGrail stops polling.
:::

</div>

<div class="step" data-step="8">

### Watch the Waiting state

The Chat ID field shows *Tap Start in @your_bot_name on Telegram* with a **Waiting** indicator. Don't close this tab — leave it open while you trigger Start in Telegram.

![Chat ID field → Waiting](/screenshots/integrations/telegram/Screenshot-8.png)

</div>

<div class="step" data-step="9">

### Open Telegram from the prompt

Your browser asks how to open the Telegram link. Click **Open Telegram** to launch the desktop / mobile app, or skip this and use **Open in Web** (next step).

![Browser prompt → Open Telegram](/screenshots/integrations/telegram/Screenshot-10.png)

</div>

<div class="step" data-step="10">

### (Optional) Open in Web

If you don't have the desktop app installed, click **OPEN IN WEB** on the bot's profile card.

![Bot profile card → OPEN IN WEB](/screenshots/integrations/telegram/Screenshot-11.png)

</div>

<div class="step" data-step="11">

### Tap Start in the bot chat

In the bot chat, tap **Start** (or send `/start`). The bot replies *"Connected to {your site name} — failure alerts from your WordPress site will arrive here."*

![Bot replies — Connected to your site](/screenshots/integrations/telegram/Screenshot-12.png)

</div>

<div class="step" data-step="12">

### Switch back to SendGrail and Save

The Chat ID field auto-fills with the captured ID. Click **Save** to persist both the bot token and chat ID.

![Bot token + Chat ID auto-filled → Save](/screenshots/integrations/telegram/Screenshot-13.png)

</div>

<div class="step" data-step="13">

### Send a test alert

Click **Send Test** beside the Chat ID field. Telegram should receive a *SendGrail test alert* message within a second or two.

![Test alert in Telegram chat](/screenshots/integrations/telegram/Screenshot-14.png)

</div>

</div>

## Group chats

You can route alerts into a group chat instead of a 1:1 with the bot:

1. Add your bot to the group (group → menu → Add Members → search the bot's username).
2. Promote it to a member with **Send Messages** permission. Telegram blocks bot privacy mode by default; without messages permission the bot can't post.
3. In the group, send `/start@your_bot_name` (the `@your_bot_name` suffix is required in groups).
4. Re-run **Connect chat** in SendGrail — the Chat ID will be captured as a negative number (e.g. `-1001234567890`), which is correct for group chats.

## Troubleshooting

### `chat not found`

The bot was blocked or the chat was deleted. In Telegram, search for your bot, unblock it if needed, and run **Connect chat** again — that re-runs the auto-detect and rewrites the Chat ID.

### Connect chat times out (Waiting → expires)

You didn't tap Start within the 5-minute polling window. Refresh the SendGrail Settings page and click **Connect chat** again — it restarts the poll.

### `Forbidden: bot was kicked from the group`

Someone removed the bot from the group. Re-add it and re-run **Connect chat** to re-capture the chat ID.

### Bot is in the group but doesn't send anything

Telegram's **bot privacy mode** is on by default. For most failure-alert use cases that's fine (the bot only *sends*; it doesn't need to read messages). But if your bot was added with restricted permissions, give it **Send Messages** permission via group → manage members → bot → permissions.

### Test arrives, real failures don't

Confirm `notify_on_failure` is on (Settings → Notifications). Also check that the failed send actually surfaced as a *failure* in SendGrail — emails marked *queued* or *retrying* don't fire alerts; only terminal failures do.

## What's next

- **[Discord](/guide/integrations/discord)** — webhook-based alerts on Discord.
- **[Slack](/guide/integrations/slack)** — webhook-based alerts on Slack.
- **[Failure Alerts overview](/features/failure-alerts)** — how email + chat alerts work together.
