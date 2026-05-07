# Failure Alerts

SendGrail notifies you the moment an email fails to send. Alerts can land in your inbox **and / or** on your team chat (Slack, Discord, or Telegram), so delivery problems get noticed before users do.

## How It Works

When SendGrail's primary connection (and any configured fallback) rejects an email, the failed event is dispatched to every alert channel you've enabled. Each alert includes:

| Field | Description |
|-------|-------------|
| **Error Message** | The raw error returned by the SMTP server, API, or transport layer. |
| **Recipient** | The intended recipient of the failed email. |
| **Subject** | The subject line of the failed email. |
| **Timestamp** | When the failure occurred (UTC). |
| **Site** | The WordPress site name (helpful when you run multiple installs). |

## Email Notifications (Default)

Email is the default alert channel — it works out of the box.

| Setting | Default | Description |
|---------|---------|-------------|
| `notify_on_failure` | `true` | Enable or disable email failure notifications. |
| `notification_email` | Site admin email | The address that receives failure alerts. |

Configure both in **SendGrail → Settings → Notifications**.

::: tip Use a different mail provider for the alert address
Point `notification_email` at an inbox hosted on a **different provider** than your SMTP connections. If your SMTP provider goes down, alerts sent through it would also fail. Gmail/Outlook/iCloud personal addresses work well.
:::

## Chat-based Alert Channels

For team-visible failure alerts in addition to (or instead of) email, configure one or more of:

<ul class="conn-index">
  <li><a href="/guide/integrations/discord"><div class="conn-index__logo"><img src="/provider-icons/discord.svg" alt="" /><strong>Discord</strong></div><small>Incoming webhook into a Discord server channel.</small><span class="conn-index__pill">Webhook · Easy</span></a></li>
  <li><a href="/guide/integrations/slack"><div class="conn-index__logo"><img src="/provider-icons/slack.svg" alt="" /><strong>Slack</strong></div><small>Incoming webhook into a Slack workspace channel.</small><span class="conn-index__pill">Webhook · Easy</span></a></li>
  <li><a href="/guide/integrations/telegram"><div class="conn-index__logo"><img src="/provider-icons/telegram.svg" alt="" /><strong>Telegram</strong></div><small>Custom bot + auto-detected chat ID. Supports group chats.</small><span class="conn-index__pill">Bot · Medium</span></a></li>
</ul>

::: info All enabled channels receive every alert
There's no per-rule routing for chat alerts — whatever you toggle on all gets the same alert payload. Use them as parallel notification paths, not as filters. Email Routing (which decides *which provider sends an outbound email*) is unrelated to alert dispatching.
:::

## Loop Prevention

Failure alerts are designed to never trigger themselves:

- **Notification failures are not reported.** If the alert email *itself* fails to send, no further alert is generated. This prevents an infinite chain of failure alerts.
- **WordPress default mail transport.** Email failure alerts are sent using WordPress's native mail function with SendGrail hooks **temporarily removed**. The alert won't route through the same SMTP connection that's currently failing, won't be logged, and won't be tracked.
- **Chat alerts are direct HTTP calls.** Slack, Discord, and Telegram alerts go straight to the platform's API — they don't touch `wp_mail()` at all and aren't affected by SMTP outages.

::: warning Email-only setups depend on the server's mail
Because email alerts bypass SendGrail entirely, they rely on whatever transport WordPress uses natively (typically PHP `mail()` or a host-configured fallback). If that's unreliable on your server, configure at least one chat channel as a backup.
:::

## Best Practices

- **Pick at least one chat channel.** Email alerts can be slow or land in spam. A Slack/Discord/Telegram ping reaches you in seconds.
- **Use a different provider for the alert email.** If your SMTP connections are all hosted at the same provider, route the alert email through a different one (Gmail, iCloud).
- **Send a test after configuring.** Every channel has a **Send Test** button. Confirm the path works *before* you need it.
- **Review repeated failures.** Repeated alerts for the same connection usually indicate expired credentials, blocked accounts, or a provider outage — handle the root cause rather than silencing the alert.

## What's next

- **[Discord setup](/guide/integrations/discord)** — webhook-based alerts on Discord.
- **[Slack setup](/guide/integrations/slack)** — webhook-based alerts on Slack.
- **[Telegram setup](/guide/integrations/telegram)** — bot-based alerts on Telegram.
- **[Settings reference](/guide/settings)** — every notification setting and what it does.
