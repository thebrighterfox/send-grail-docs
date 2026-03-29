# Changelog

All notable changes to SendGrail are documented on this page.

## v1.0.0 <Badge type="tip" text="Initial Release" />

*Released: 2026-03-28*

### Features

- **SMTP Connections** -- Create and manage multiple SMTP connections with support for 13 pre-configured providers (Gmail, Outlook, Yahoo, SendGrid, Mailgun, Amazon SES, Postmark, Mandrill, Elastic Email, SMTP2GO, Mailtrap, Zoho Mail, Brevo) plus custom SMTP.
- **Default and Fallback Connections** -- Set a primary connection for all outgoing email with an optional fallback connection for automatic failover.
- **Email Logging** -- Log all outgoing emails with full metadata including recipients, subject, status, and timestamps. Optional full body storage.
- **Open Tracking** -- Track email opens via an invisible tracking pixel injected into HTML emails.
- **Click Tracking** -- Track link clicks by routing through a tracking endpoint before redirecting to the original URL.
- **Smart Routing** -- Route emails through different SMTP connections based on sender address, recipient, or domain rules.
- **Setup Wizard** -- Guided four-step wizard for first-time configuration with automatic provider detection and credential validation.
- **Test Email** -- Send test emails directly from the connection management interface to verify credentials and delivery.
- **Connection Validation** -- Validate SMTP credentials at save time with clear error reporting.
- **Failure Notifications** -- Receive email alerts when delivery fails through all configured connections.
- **Weekly Summary Reports** -- Scheduled email reports with delivery statistics, failure counts, and engagement metrics.
- **Dashboard** -- Overview of recent email activity, delivery success rates, and connection status at a glance.
- **Log Retention** -- Automatic cleanup of email logs older than the configured retention period.
- **WordPress Default Mail Fallback** -- Optional last-resort fallback to PHP `mail()` when all SMTP connections fail.
- **Debug Mode** -- Detailed SMTP transaction logging to `wp-content/debug.log` for troubleshooting.
- **Dark and Light Themes** -- Admin interface supports both dark and light themes with automatic detection.
- **UTC Date Standardization** -- All dates stored and displayed in UTC for consistency across time zones.
