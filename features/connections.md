# SMTP Connections

SendGrail manages email delivery through SMTP connections. You can configure multiple connections for different providers and switch between them as needed.

## Creating a Connection

To create a new connection, navigate to **Connections** and click **Add Connection**.

### Provider Selection

Start by selecting your email provider from the preset list. Provider presets automatically fill and lock provider-specific fields such as host, port, and encryption method, reducing configuration errors.

If your provider is not listed, select **Other / Custom SMTP** to manually configure all fields.

### Connection Fields

| Field | Description |
|-------|-------------|
| **Host** | SMTP server hostname (e.g., `smtp.gmail.com`) |
| **Port** | SMTP port (typically 587 for TLS, 465 for SSL, 25 for none) |
| **Encryption** | `TLS`, `SSL`, or `None` |
| **Authentication** | Whether the server requires authentication |
| **Username** | SMTP username (often the email address) |
| **Password** | SMTP password or app-specific password |
| **From Email** | The sender email address |
| **From Name** | The sender display name |

::: tip
When using Gmail, you must generate an **App Password** from your Google Account security settings. Your regular Gmail password will not work with SMTP.
:::

## Editing a Connection

When editing an existing connection, the password field displays dots to indicate a stored value. If you leave the password field unchanged, the existing password is preserved. Only enter a new value if you intend to change it.

## Enabling and Disabling Connections

Each connection can be individually enabled or disabled. A disabled connection will not be used for sending emails, even if referenced by a routing rule.

::: warning
The default connection cannot be disabled. To disable it, you must first set a different connection as the default.
:::

## Setting the Default Connection

One connection must always be designated as the **default**. The default connection is used for all outgoing emails unless a routing rule directs the email to a different connection.

When you set a connection as the default, any previously designated default connection is automatically deactivated from that role.

## Testing Connections

SendGrail provides a raw SMTP socket test to verify that a connection can communicate with the mail server. The test performs the following steps:

1. Opens a socket connection to the SMTP host and port
2. Sends the `EHLO` command to identify the client
3. Initiates `TLS` encryption if configured
4. Performs `AUTH` with the provided credentials

This test validates the connection at the transport level without sending an actual email. Use the [Test Email](/features/test-simulate) feature to send a real message.

## Connection Health Table

The connections list displays health information for each configured connection:

| Column | Description |
|--------|-------------|
| **Status** | Current connection state (active, inactive, error) |
| **Last Tested** | Timestamp of the most recent connection test |

## Per-Connection Statistics

Each connection tracks its own delivery metrics:

| Metric | Description |
|--------|-------------|
| **Sent Today** | Number of emails successfully sent in the current day |
| **Total Sent** | Lifetime count of emails sent through this connection |
| **Fail Rate** | Percentage of failed deliveries relative to total attempts |

These statistics help you monitor the reliability of each provider and identify connections that may need attention.

## Password Encryption

All SMTP passwords are encrypted at rest using **AES-256-CBC** encryption.

By default, SendGrail uses the WordPress `AUTH_KEY` constant as the encryption key. For enhanced security, you can define a dedicated encryption key by adding the following to your `wp-config.php`:

```php
define('SENDGRAIL_ENCRYPTION_KEY', 'your-secure-random-string-here');
```

::: danger
If you change or lose the encryption key, all stored SMTP passwords become unreadable. You will need to re-enter the password for every connection.
:::

::: tip
The `SENDGRAIL_ENCRYPTION_KEY` takes precedence over `AUTH_KEY` when defined. Use a strong, random string of at least 32 characters.
:::
