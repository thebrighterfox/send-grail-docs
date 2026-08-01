# Changelog

All notable changes to SendGrail are documented on this page.

## Unreleased

### Added

- **Resend** action on each row of the [email log](/features/email-logging#resending-an-email), with a counter showing how many times an email has been sent again.

### Fixed

- SMTP responses and headers in the [email log](/features/email-logging#delivery-status) rendering as an unreadable wall of text. JSON responses are now pretty-printed, oversized values are shortened, and the block is collapsible with **Raw** and **Copy** controls.

## v1.0.3

*Released: 2026-05-27*

### Added

- Compatibility with WordPress 7.0 admin reskin.

### Fixed

- Inputs, selects and textareas inheriting WordPress core form styles.
- Checkboxes, number inputs and date pickers rendering at the wrong size.

## v1.0.1

*Released: 2026-05-14*

### Added

- Authenticate step after saving an OAuth connection.
- Per-provider "Setup guide" link on connection forms.

### Fixed

- Setup wizard leaking values between providers.
- OAuth-only providers missing Client ID / Secret fields.
- Disconnect hiding the Authentication section on OAuth-only providers.

## v1.0.0 <Badge type="tip" text="Initial Release" />

*Released: 2026-05-08*

### Features

- **SMTP / API Connections** -- Create and manage multiple connections with support for 16 pre-configured providers (Gmail, Outlook / Microsoft 365, SendGrid, Mailgun, Amazon SES, Postmark, Mandrill, Elastic Email, SMTP2GO, Zoho Mail, Brevo, Netcore, SparkPost, SendLayer, Mailjet, Resend) plus custom SMTP and PHP mail.
- **Default and Fallback Connections** -- Set a primary connection for all outgoing email with an optional fallback connection for automatic failover.
- **Email Logging** -- Log all outgoing emails with full metadata including recipients, subject, status, and timestamps. Optional full body storage.
- **Open Tracking** -- Track email opens via an invisible tracking pixel injected into HTML emails.
- **Click Tracking** -- Track link clicks by routing through a tracking endpoint before redirecting to the original URL.
- **Smart Routing** -- Route emails through different SMTP connections based on sender address, recipient, or domain rules.
- **Setup Wizard** -- Guided four-step wizard for first-time configuration with automatic provider detection and credential validation.
- **Test Email** -- Send a real test email from a dedicated page to verify credentials and end-to-end delivery.
- **Failure Notifications** -- Receive email alerts when delivery fails through all configured connections.
- **Weekly Summary Reports** -- Scheduled email reports with delivery statistics, failure counts, and engagement metrics.
- **Dashboard** -- Overview of recent email activity, delivery success rates, and connection status at a glance.
- **Log Retention** -- Automatic cleanup of email logs older than the configured retention period.
- **WordPress Default Mail Fallback** -- Optional last-resort fallback to PHP `mail()` when all SMTP connections fail.
- **Debug Mode** -- Detailed SMTP transaction logging to `wp-content/debug.log` for troubleshooting.
- **Dark and Light Themes** -- Admin interface supports both dark and light themes with automatic detection.
- **UTC Date Standardization** -- All dates stored and displayed in UTC for consistency across time zones.
