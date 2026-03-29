# Weekly Summaries

SendGrail can send a scheduled weekly email report summarizing your site's email delivery performance. This provides a regular check-in without requiring you to log into the WordPress dashboard.

## Configuration

Weekly summaries are managed through the following settings:

| Setting | Default | Description |
|---------|---------|-------------|
| `enable_weekly_summary` | Disabled | Toggle weekly summary emails on or off |
| `weekly_summary_day` | Monday | Day of the week to send the report (Monday through Sunday) |
| `weekly_summary_email` | Site admin email | The recipient address for the summary |

The summary is sent at **9:00 AM UTC** on the configured day via the `sendgrail_weekly_summary` WordPress cron event.

::: tip
The cron schedule depends on WordPress cron being triggered by site traffic. On low-traffic sites, the summary may be delayed. Consider using a system-level cron job to trigger `wp-cron.php` on schedule for consistent delivery timing.
:::

## Email Contents

The weekly summary email includes the following sections:

### Stats Grid

A top-level overview of the week's performance:

| Metric | Description |
|--------|-------------|
| **Sent** | Total emails successfully delivered |
| **Failed** | Total delivery failures |
| **Success Rate** | Percentage of successful deliveries |
| **Open Rate** | Percentage of delivered emails that were opened |

Each metric includes a **trend indicator** comparing the current week to the previous week, so you can quickly spot improvements or regressions.

### Per-Connection Breakdown

A table listing each SMTP connection with its individual performance for the week:

- Connection name
- Provider
- Emails sent
- Emails failed
- Delivery rate

This helps identify whether a specific connection is underperforming relative to others.

### Recent Failures

A list of notable delivery failures from the past week, including the recipient, subject, error message, and timestamp. This section surfaces issues that may need attention without requiring you to open the full email log.

## Delivery Method

::: info
Weekly summaries are sent using the WordPress default mail function with SendGrail hooks **temporarily removed**. This prevents the summary from being routed through your SMTP connections, logged, or processed by open/click tracking.
:::

This approach avoids:
- **Recursion** -- The summary itself being logged and counted in next week's summary
- **Tracking artifacts** -- Open and click tracking pixels being injected into the report email
- **Routing interference** -- The summary being routed through a connection that may be experiencing issues

## Footer

Each weekly summary email includes a footer note explaining how to disable the reports. Recipients can turn off summaries directly from the SendGrail settings page without needing to locate the setting independently.
