# PHP Mail

<div class="conn-hero">
  <div class="conn-hero__icon"><img src="/provider-icons/php.svg" alt="" /></div>
  <div class="conn-hero__body">
    <h2 class="conn-hero__title" style="margin: 0;">PHP <code>mail()</code></h2>
    <p class="conn-hero__sub">Server's built-in mail program (sendmail / postfix). No SMTP credentials. Lower deliverability — only choose this if your server is configured for outbound mail.</p>
    <div class="conn-hero__meta">
      <span class="conn-meta-pill conn-meta-pill--easy">Easy</span>
      <span class="conn-meta-pill">~1 min</span>
      <span class="conn-meta-pill">Server-side</span>
      <span class="conn-meta-pill">Low deliverability</span>
    </div>
  </div>
</div>

::: warning When PHP Mail makes sense (rarely)
The PHP option is the original "default" WordPress mailer that this plugin exists to replace. Use it only if:
- Your host has a properly-configured local MTA (sendmail / postfix) with reputable IP and DKIM signing.
- You need a connection that works with **zero** credentials (e.g. dev environments).
- You're using SendGrail just for tracking + logging without changing the send path.

For real production sends to external domains, **use a dedicated SMTP/API provider instead**. PHP `mail()` typically lands in spam.
:::

## What it does

When you save a "PHP" connection and an email is routed through it, SendGrail hands the message to WordPress's stock `wp_mail()` with our `pre_wp_mail` filter detached. WordPress's PHPMailer is configured with no SMTP host, so it falls through to PHP's built-in `mail()` function, which talks to the OS-level mail program (sendmail / postfix / qmail / Exim).

## Step-by-step

<div class="steps-container">

<div class="step" data-step="1">

### Add the connection

**SendGrail → Connections → Add Connection** → pick **PHP** (between Mailtrap and Other SMTP in the provider grid).

</div>

<div class="step" data-step="2">

### Fill in the form

Only three fields are visible (no host, port, credentials — there are none):
- **Connection Name:** PHP Mail
- **From Email:** the address sendmail will use as `From:` header
- **From Name:** display name

Click **Save**.

</div>

<div class="step" data-step="3">

### Test

**SendGrail → Test Email** → pick PHP → send to your inbox.

If it lands → your server's local mail works.
If it doesn't (after 5 min) → your server has no working MTA. Use a different provider.

</div>

</div>

## Troubleshooting

### Test email succeeds in plugin but never arrives

`wp_mail()` returns `true` if the OS accepts the message — but the OS may then drop it silently (no MX records, blacklisted IP, sendmail not configured). Check the server's mail queue (`mailq` on Unix-like systems) or local mail log (`/var/log/mail.log`). If the message disappears immediately with no error, the local mail program isn't configured to actually deliver.

### Lands in recipient's spam folder

Almost guaranteed without proper setup. PHP `mail()` doesn't sign messages with DKIM, doesn't use SPF, and the sending IP is usually shared with thousands of WordPress installs. **Switch to a dedicated provider** — every other connection type in SendGrail will deliver better than this.

### `mail() has been disabled for security reasons`

Your host disabled PHP's `mail()` function. Common on managed hosts (GoDaddy, some shared hosts). Use any SMTP/API provider instead — they all bypass `mail()`.

## What's next

- **[Other SMTP](/guide/connections/custom-smtp)** — slightly better than PHP `mail()`. Use your host's SMTP server with auth.
- **[Pick a real provider](/guide/connections/)** — for any production WordPress site, use SendGrid / Mailgun / Postmark / SES instead.
