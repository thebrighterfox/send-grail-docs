# Slack

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/slack.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Slack failure alerts via Incoming Webhook</h2>
    <p class="conn-hero__sub">Post failure alerts into a Slack channel or DM through a custom Slack app's Incoming Webhook. One webhook = one workspace + one channel.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">Webhook</span>
    </div>
  </div>
</div>

## Prerequisites

- A Slack account.
- A Slack workspace you can install apps into (steps 3–12 cover creating one if you don't have one).
- WordPress admin access.

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Open the Slack API "Your Apps" page

Go to <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> and click **Create an App**.

![Slack API — Create an App](/screenshots/integrations/slack/Screenshot-1.png)

</div>

<div class="step" data-step="2">

### Pick "From scratch"

The Create an app modal asks how to configure scopes and settings. Click **From scratch**.

![Create an app → From scratch](/screenshots/integrations/slack/Screenshot-2.png)

::: tip Already have a Slack workspace?
Skip steps 3–12 (workspace creation) and jump to step 13 to name and create the app.
:::

</div>

<div class="step" data-step="3">

### Create a workspace (if you don't have one)

If you don't have a Slack workspace yet, click **Create a New Workspace** on the Slack home page.

![slack.com → Create a New Workspace](/screenshots/integrations/slack/Screenshot-3.png)

</div>

<div class="step" data-step="4">

### Enter your email

Type the email you'll administer the workspace with and click **Continue**.

![Enter email → Continue](/screenshots/integrations/slack/Screenshot-4.png)

</div>

<div class="step" data-step="5">

### Solve the CAPTCHA

Tick **I'm not a robot**.

![CAPTCHA → I'm not a robot](/screenshots/integrations/slack/Screenshot-5.png)

</div>

<div class="step" data-step="6">

### Verify the email code

Slack emails you a 6-character code. Type it into the boxes.

![We emailed you a code → enter code](/screenshots/integrations/slack/Screenshot-6.png)

</div>

<div class="step" data-step="7">

### Start the workspace

Accept the terms and click **Create Workspace**.

![Start a new workspace → Create Workspace](/screenshots/integrations/slack/Screenshot-7.png)

</div>

<div class="step" data-step="8">

### Name the workspace

Enter a workspace name like `SendGrail WorkSpace` and click **Next**.

![Name your Slack workspace](/screenshots/integrations/slack/Screenshot-8.png)

</div>

<div class="step" data-step="9">

### Add your name

Enter your name (`sendgrail` or your real name). Click **Next**.

![What's your name?](/screenshots/integrations/slack/Screenshot-9.png)

</div>

<div class="step" data-step="10">

### Skip teammate invites

You're alone for now — click **Skip this step**.

![Invite your teammates → Skip this step](/screenshots/integrations/slack/Screenshot-10.png)

</div>

<div class="step" data-step="11">

### Confirm skipping

Slack double-checks. Click **Don't Invite Anyone**.

![Skip without inviting? → Don't Invite Anyone](/screenshots/integrations/slack/Screenshot-11.png)

</div>

<div class="step" data-step="12">

### Continue with Free

The free plan covers everything you need for webhooks. Click **Continue with Free**.

![Workspace created → Continue with Free](/screenshots/integrations/slack/Screenshot-12.png)

</div>

<div class="step" data-step="13">

### Name the app and pick the workspace

Back at the **Create an app** modal: enter `SendGrail App` as the App Name, pick your workspace from the dropdown, and click **Create App**.

![Name app & choose workspace → Create App](/screenshots/integrations/slack/Screenshot-13.png)

</div>

<div class="step" data-step="14">

### Open Incoming Webhooks

You're now on the app's **Basic Information** page. In the left sidebar under **Features**, click **Incoming Webhooks**.

![App settings sidebar → Incoming Webhooks](/screenshots/integrations/slack/Screenshot-14.png)

</div>

<div class="step" data-step="15">

### Activate webhooks and add one

Toggle **Activate Incoming Webhooks** to **On**. Scroll to the bottom and click **Add New Webhook to Workspace**.

![Activate Incoming Webhooks → Add New Webhook](/screenshots/integrations/slack/Screenshot-15.png)

</div>

<div class="step" data-step="16">

### Pick the channel

Slack asks where the app should post. Use the **Channel for webhook** dropdown. Pick a channel (or DM yourself by selecting your own name under *Direct Messages*).

![Channel picker — pick a channel or DM yourself](/screenshots/integrations/slack/Screenshot-16.png)

</div>

<div class="step" data-step="17">

### Allow the app

Click **Allow** to grant the app permission to post into that channel.

![Allow the SendGrail App to access Slack](/screenshots/integrations/slack/Screenshot-17.png)

</div>

<div class="step" data-step="18">

### Copy the webhook URL

Slack lists your new webhook (URL starts with `https://hooks.slack.com/services/`). Click **Copy** next to it.

![Webhook URLs for Your Workspace → Copy](/screenshots/integrations/slack/Screenshot-18.png)

</div>

<div class="step" data-step="19">

### Paste it into SendGrail

WordPress admin → **SendGrail → Settings → Notifications → Slack**. Toggle **Enable Slack alerts** on, paste the URL into **Slack Webhook URL**, and click **Save**.

Click **Send Test** — a sample alert should appear in the Slack channel within a second.

</div>

</div>

## Troubleshooting

### `invalid_token` or 403

The Slack app was uninstalled from the workspace, or the webhook was revoked. Re-create the webhook in <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> → your app → **Incoming Webhooks → Add New Webhook to Workspace**.

### `channel_not_found`

The channel was archived or deleted. Re-add a webhook to a different channel and update SendGrail with the new URL.

### `no_service`

The webhook URL is malformed. The valid form is `https://hooks.slack.com/services/T.../B.../...`. Re-copy from Slack — extra trailing slashes or whitespace will fail validation.

### Alert post but with no formatting

The webhook posts JSON; the channel may be configured to strip rich content. Check the channel's preview/unfurl settings, or reauthorize the webhook on a channel that allows app messages.

## What's next

- **[Discord](/guide/integrations/discord)** — same idea on Discord.
- **[Telegram](/guide/integrations/telegram)** — bot-based alerts on Telegram.
- **[Failure Alerts overview](/features/failure-alerts)** — how email + chat alerts work together.
