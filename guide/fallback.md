# Fallback & Reliability

If the primary connection fails, SendGrail can retry the email through one backup connection that you choose.

## How Fallback Works

When SendGrail attempts to send an email, it follows this sequence:

```
1. Default Connection
   |
   |-- Success -> Email delivered, log result
   |-- Failure -> log failure --v
   |
2. Fallback Connection (if configured)
   |
   |-- Success -> Email delivered, log result
   |-- Failure -> log failure --v
   |
3. Send failure notification (if enabled)
```

Each attempt is logged separately. If the fallback is disabled or not set, the email fails after the first attempt.

Test emails never use the fallback. A test checks one specific connection, so a fallback success would hide the real error.

## Configuring the Fallback Connection

1. Navigate to **SendGrail > Settings > General**.
2. Select a connection from the **Fallback Connection** dropdown.
3. Click **Save Settings**.

Choose **None** to turn fallback off.

::: tip
For maximum reliability, use a different SMTP provider for your fallback connection. If your primary provider (e.g., SendGrid) has an outage, a fallback on a different provider (e.g., Gmail) is far more likely to succeed than two connections on the same service.
:::

## Using PHP mail() as the Fallback

SendGrail no longer falls back to WordPress's default mailer on its own. If you want PHP's `mail()` function as your backup, create a **PHP** connection and select it as the fallback. Its attempts then appear in the email log like any other connection.

::: warning
PHP `mail()` depends on your server having a working mail program (sendmail or postfix). Many hosts restrict or disable it, and its messages often land in spam.
:::

## Failure Notifications

When an email fails to deliver through all available methods, SendGrail can notify the site administrator. Enable this under **Settings > Notifications > Failure Alerts**.

### Preventing Notification Loops

A natural concern is: what happens if the notification email itself fails? SendGrail handles this with specific safeguards:

- The notification email is sent with WordPress's built-in mailer and skips SendGrail entirely, so it cannot re-enter the connection that just failed.
- No notification email is sent when the failed email was addressed to the notification address itself.
- A failed notification never triggers another notification.
- Slack, Discord and Telegram alerts are sent separately, so they still arrive when email cannot be delivered.

## Logging Fallback Events

Each attempt is recorded in the email log. Each log entry includes:

- Which connection was attempted.
- Whether it succeeded or failed.
- The error message (if applicable).
- Which connection delivered the email, if either one did.

This gives you full visibility into delivery attempts, making it straightforward to diagnose intermittent provider issues.

## Best Practices

- **Use two different providers.** A fallback on the same provider as your primary does not protect against provider-level outages.
- **Test your fallback.** Temporarily set an invalid password on your primary connection and send a test email. Verify that the fallback picks up delivery.
- **Monitor failure notifications.** If you start receiving frequent failure alerts, investigate the primary connection rather than relying on the fallback long-term.
