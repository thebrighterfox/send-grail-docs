# Yahoo Mail

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/yahoo.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">Yahoo Mail (SMTP)</h2>
    <p class="conn-hero__sub">Send through your Yahoo Mail account using a generated App Password. Standard account passwords are blocked for SMTP by Yahoo.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">SMTP</span>
    </div>
  </div>
</div>

::: warning App Password is mandatory
Yahoo blocks all SMTP authentication using the regular account password. You **must** generate an App Password — there's no opt-out.
:::

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Generate an App Password

Sign into [Yahoo Mail](https://mail.yahoo.com) → click your name top-right → **Account Info → Account Security**.

Find **Generate app password** (or **Manage app passwords**). Yahoo may require you to verify your identity first via SMS or recovery email.

Click **Generate**, give it a name like "SendGrail WordPress", and click **Generate**. Yahoo shows a 16-character password — copy it.

</div>

<div class="step" data-step="2">

### Add the connection in SendGrail

**SendGrail → Connections → Add Connection** → pick **Yahoo Mail**.

Fill in:
- **Connection Name:** Yahoo
- **From Email:** your full Yahoo address
- **From Name:** display name
- **Username:** same Yahoo address
- **Password:** the 16-character App Password from step 1 (no spaces)

Click **Save**.

</div>

<div class="step" data-step="3">

### Test

**SendGrail → Test Email** → pick Yahoo → send.

</div>

</div>

## Troubleshooting

- **`535 Authentication failed`** — App Password wrong or contains spaces. Yahoo shows it in groups of 4 (`abcd efgh ijkl mnop`); paste without the spaces.
- **`Generate app password` not visible** — Yahoo only shows it if 2-Step Verification is enabled. Turn it on at Account Security first.
- **Bounces / spam folder placement** — Yahoo-as-sender on a non-Yahoo recipient often gets flagged. For business sends, use a dedicated provider with proper SPF/DKIM on your own domain.

## What's next

- **[Email Routing](/features/email-routing)** — route only personal correspondence through Yahoo.
- **[Test & Simulate](/features/test-simulate)** — verify connection.
