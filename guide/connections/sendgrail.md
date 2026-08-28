# SendGrail

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/sendgrail.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">SendGrail</h2>
    <p class="conn-hero__sub">SendGrail's own delivery service, available through the SendGrail Provider add-on.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~5 min</span>
      <span class="conn-meta-pill">API</span>
      <span class="conn-meta-pill">Add-on required</span>
    </div>
  </div>
</div>

::: tip Requires the SendGrail Provider add-on
This provider is not part of the SendGrail plugin itself. Install the **SendGrail Provider** add-on
alongside it, then SendGrail appears at the top of the connection picker. With the add-on inactive
the provider is simply absent — nothing else changes.
:::

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Install the add-on

Upload the **SendGrail Provider** plugin to `/wp-content/plugins/` and activate it. It needs the
SendGrail plugin active first; if SendGrail is missing or too old the add-on stays inert and shows a
notice instead of half-working.

</div>

<div class="step" data-step="2">

### Verify your sending domain

In your SendGrail dashboard, add your domain and publish the DKIM and SPF records it gives you at
your DNS provider. SendGrail only delivers from a verified domain.

</div>

<div class="step" data-step="3">

### Create an API key

In the dashboard go to **API Keys** and create one with sending access. It starts with `sg_` and is
shown once — copy it then.

</div>

<div class="step" data-step="4">

### Add the connection

**SendGrail → Connections → Add Connection** → pick **SendGrail**.

Fill in:
- **Connection Name:** SendGrail
- **From Email:** an address on your verified domain
- **From Name:** display name
- **API Key:** the `sg_...` key from step 3

Click **Save**.

</div>

<div class="step" data-step="5">

### Test

**SendGrail → Test Email** → pick the connection → send.

</div>

</div>

## Keeping the key out of the database

Set the key store to **wp-config.php constants** on the connection form and define it instead:

```php
define('SENDGRAIL_PROVIDER_API_KEY', 'sg_your_key_here');
```

The connection then reads the constant at send time and stores nothing.

## Troubleshooting

- **SendGrail is missing from the provider list** — the add-on is inactive, or the SendGrail plugin
  predates provider add-on support. Check **Plugins** for a notice from SendGrail Provider.
- **Domain not verified** — finish DNS verification in the dashboard; propagation can take up to an hour.
- **Existing connections stopped sending after deactivating the add-on** — expected. The connections
  are kept, but with no handler registered those emails fall back to WordPress's own mailer.
  Reactivate the add-on to resume.

## What's next

- **[Email Routing](/features/email-routing)** — route specific emails through SendGrail.
- **[Failure Alerts](/features/failure-alerts)** — get pinged on rejections.
- **[Registering a Custom Provider](/guide/developers/custom-providers)** — how the add-on plugs in.
