# Fallback & Reliability

SendGrail implements a cascading fallback system to maximize email delivery reliability. If the primary SMTP connection fails, SendGrail automatically tries alternative methods before giving up.

## How the Fallback Cascade Works

When SendGrail attempts to send an email, it follows this sequence:

```
1. Primary SMTP Connection (Default Connection)
   |
   |-- Success -> Email delivered, log result
   |-- Failure --v
   |
2. Fallback SMTP Connection (if configured)
   |
   |-- Success -> Email delivered, log result
   |-- Failure --v
   |
3. WordPress Default Mail (if enabled in settings)
   |
   |-- Success -> Email delivered, log result
   |-- Failure --v
   |
4. Log failure, send admin notification (if enabled)
```

At each stage, if sending succeeds, the process stops and the result is logged. If it fails, the next method in the cascade is attempted.

## Configuring the Fallback Connection

1. Navigate to **SendGrail > Settings > General**.
2. Select a connection from the **Fallback Connection** dropdown.
3. Optionally enable **WordPress Default Mail** as a last resort.
4. Click **Save Settings**.

::: tip
For maximum reliability, use a different SMTP provider for your fallback connection. If your primary provider (e.g., SendGrid) has an outage, a fallback on a different provider (e.g., Gmail) is far more likely to succeed than two connections on the same service.
:::

## WordPress Default Mail

When the **WordPress Default Mail** toggle is enabled in General settings, SendGrail will attempt to send the email using PHP's native `mail()` function as a last resort after both SMTP connections have failed.

This is not recommended as a primary strategy since `mail()` has all the deliverability problems that SendGrail exists to solve. However, it can serve as an emergency fallback for critical emails like password resets.

::: warning
WordPress default mail relies on your server's PHP `mail()` configuration. On many shared hosting environments, this function is restricted or disabled entirely. Do not rely on it as your only fallback.
:::

## Failure Notifications

When an email fails to deliver through all available methods, SendGrail can notify the site administrator. Enable this under **Settings > Notifications > Failure Alerts**.

### Preventing Notification Loops

A natural concern is: what happens if the notification email itself fails? SendGrail handles this with specific safeguards:

- Failure notification emails are sent through the **fallback connection** if one is configured, not the primary connection that just failed.
- If no fallback connection is available, the notification is sent via **WordPress default mail** (`mail()`), bypassing the SMTP pipeline entirely.
- If the notification email itself fails, the failure is logged but no additional notification is generated. This breaks the potential infinite loop.

## Logging Fallback Events

Every step of the fallback cascade is recorded in the email log. Each log entry includes:

- Which connection was attempted.
- Whether it succeeded or failed.
- The error message (if applicable).
- Which method ultimately delivered the email (or that all methods failed).

This gives you full visibility into delivery attempts, making it straightforward to diagnose intermittent provider issues.

## Best Practices

- **Use two different providers.** A fallback on the same provider as your primary does not protect against provider-level outages.
- **Test your fallback.** Temporarily set an invalid password on your primary connection and send a test email. Verify that the fallback picks up delivery.
- **Monitor failure notifications.** If you start receiving frequent failure alerts, investigate the primary connection rather than relying on the fallback long-term.
- **Keep WordPress default mail as a last resort.** Enable it for critical emails, but do not depend on it for reliable delivery.
