# Failure Alerts

SendGrail can notify you immediately when an email fails to send, allowing you to respond to delivery issues before they affect your users.

## How It Works

When an email delivery attempt fails, SendGrail sends a notification email to the configured alert recipient with details about the failure.

### Notification Contents

Each failure alert includes:

| Field | Description |
|-------|-------------|
| **Error Message** | The specific error returned by the SMTP server or transport layer |
| **Recipient** | The intended recipient of the failed email |
| **Subject** | The subject line of the failed email |
| **Timestamp** | When the failure occurred |

## Configuration

Failure alerts are managed through the following settings:

| Setting | Default | Description |
|---------|---------|-------------|
| `notify_on_failure` | `true` | Enable or disable failure notifications |
| `notification_email` | Site admin email | The email address that receives failure alerts |

::: tip
Consider using a shared team inbox or an external monitoring address for failure alerts. This ensures delivery issues are noticed even if the primary admin is unavailable.
:::

## Loop Prevention

Failure alerts are designed with safeguards to prevent notification loops:

- **Notification failures are not reported** -- If the failure alert email itself fails to send, no further notification is generated. This prevents an infinite chain of failure alerts.

- **WordPress default mail transport** -- Failure alerts are sent using the WordPress default mail function with SendGrail hooks **temporarily removed**. This avoids routing the notification through the same SMTP connection that may be experiencing problems, and prevents the notification from being logged, tracked, or processed by SendGrail.

::: warning
Because failure alerts bypass SendGrail entirely, they rely on whatever mail transport WordPress uses natively (typically PHP `mail()` or a configured fallback). Ensure your server's default mail function is operational if you depend on failure alerts.
:::

## Best Practices

- Keep failure alerts **enabled** (the default) unless you have an alternative monitoring solution in place.
- Set the `notification_email` to an address hosted on a **different provider** than your SMTP connections. If your SMTP provider goes down, alerts sent through the same provider would also fail.
- Review failure alerts promptly. Repeated failures for the same connection often indicate expired credentials, blocked accounts, or provider outages.
