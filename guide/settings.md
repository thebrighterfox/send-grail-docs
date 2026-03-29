# Settings

The SendGrail settings page is organized into four tabs: General, Email Logging, Notifications, and Advanced.

Navigate to **SendGrail > Settings** in your WordPress admin panel to access these options.

## General

Core settings that control how SendGrail handles outgoing email.

| Setting              | Type       | Default   | Description                                                                 |
|----------------------|------------|-----------|-----------------------------------------------------------------------------|
| Default Connection   | Select     | None      | The SMTP connection used for all outgoing emails. All `wp_mail()` calls route through this connection. |
| Fallback Connection  | Select     | None      | A backup SMTP connection used when the default connection fails.            |
| WordPress Default Mail | Toggle  | Disabled  | If enabled, SendGrail falls back to PHP `mail()` when both the default and fallback SMTP connections fail. |

::: tip
You must have at least one saved connection before you can select a default. See [Getting Started](/guide/getting-started) to create your first connection.
:::

## Email Logging

Controls what email data is stored and what tracking features are active.

| Setting              | Type       | Default   | Description                                                                 |
|----------------------|------------|-----------|-----------------------------------------------------------------------------|
| Enable Email Logging | Toggle     | Enabled   | When enabled, SendGrail logs metadata for every email sent (recipients, subject, status, timestamps). |
| Store Email Body     | Toggle     | Disabled  | When enabled, the full HTML/text body of each email is saved to the log. Increases database usage. |
| Retention Days       | Number     | `30`      | Number of days to keep email logs. Logs older than this are automatically deleted. Set to `0` for unlimited retention. |
| Open Tracking        | Toggle     | Disabled  | Injects an invisible tracking pixel into HTML emails to detect when recipients open them. |
| Click Tracking       | Toggle     | Disabled  | Rewrites links in HTML emails to pass through a tracking endpoint, recording when recipients click them. |

::: warning
Enabling **Store Email Body** may significantly increase your database size, especially on high-volume sites. Consider setting a reasonable retention period.
:::

::: info
Open and click tracking only work with HTML emails. Plain-text emails cannot be tracked because there is no mechanism to embed tracking pixels or rewrite links.
:::

## Notifications

Configure alerts and scheduled reports.

| Setting              | Type       | Default   | Description                                                                 |
|----------------------|------------|-----------|-----------------------------------------------------------------------------|
| Failure Alerts       | Toggle     | Disabled  | Send an email notification to the site admin when an email fails to deliver through all configured connections. |
| Weekly Summary       | Toggle     | Disabled  | Send a weekly email report with delivery statistics, failure counts, and engagement metrics. |
| Summary Day          | Select     | Monday    | The day of the week to send the weekly summary report.                      |
| Summary Email        | Email      | Admin email | The email address that receives the weekly summary. Defaults to the WordPress admin email. |

::: tip
Failure alert notifications are sent through the fallback connection (if configured) or WordPress default mail to avoid a loop where the notification itself fails through the same broken connection.
:::

## Advanced

Settings for debugging and connection tuning.

| Setting              | Type       | Default   | Description                                                                 |
|----------------------|------------|-----------|-----------------------------------------------------------------------------|
| Connection Timeout   | Number     | `30`      | Maximum time in seconds to wait for an SMTP connection to be established before timing out. |
| Debug Mode           | Toggle     | Disabled  | When enabled, detailed SMTP transaction logs are written to the WordPress debug log (`wp-content/debug.log`). Useful for troubleshooting connection issues. |

::: warning
**Debug Mode** logs sensitive information including SMTP commands and server responses. Do not leave it enabled in production. Make sure `WP_DEBUG` and `WP_DEBUG_LOG` are enabled in your `wp-config.php` for debug output to appear.
:::

```php
// Enable WordPress debug logging in wp-config.php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
```
