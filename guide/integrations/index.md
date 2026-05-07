# Alert Channels

When a `wp_mail()` send fails — bad credentials, provider outage, blocked recipient — SendGrail dispatches a *failure alert* describing what broke. Email is the default delivery channel; these pages cover the chat-based delivery channels that complement (or replace) email alerts.

::: info All enabled channels receive every alert
There's no per-rule routing for failure alerts. Whatever you toggle on (Email + Slack + Discord + Telegram) all get the same payload for every failure event. Use them as parallel notification paths, not as filters.
:::

## Chat-based channels

<ul class="conn-index">
  <li><a href="/guide/integrations/discord"><div class="conn-index__logo"><img src="/provider-icons/discord.svg" alt="" /><strong>Discord</strong></div><small>Incoming webhook into a Discord server channel.</small><span class="conn-index__pill">Webhook · Easy</span></a></li>
  <li><a href="/guide/integrations/slack"><div class="conn-index__logo"><img src="/provider-icons/slack.svg" alt="" /><strong>Slack</strong></div><small>Incoming webhook into a Slack workspace channel or DM.</small><span class="conn-index__pill">Webhook · Easy</span></a></li>
  <li><a href="/guide/integrations/telegram"><div class="conn-index__logo"><img src="/provider-icons/telegram.svg" alt="" /><strong>Telegram</strong></div><small>Custom bot + auto-detected chat ID. Supports group chats.</small><span class="conn-index__pill">Bot · Medium</span></a></li>
</ul>

## Email channel

The email channel uses WordPress's native mail function (with SendGrail hooks temporarily detached) so an outage on your SMTP provider can't suppress the alert. Configure it under **Settings → Notifications**. See [Failure Alerts](/features/failure-alerts) for the full feature breakdown and loop-prevention rules.
