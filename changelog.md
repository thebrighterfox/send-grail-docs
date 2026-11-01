# Changelog

All notable changes to SendGrail are documented on this page.

## v1.0.7

*Released: 2026-11-02*

### Changed

- Updated the plugin framework to the latest version.
- [Click tracking](/features/click-tracking) now works on its own. With open tracking off and click tracking on, links are now tracked; before, they were not.
- The [test email](/features/test-simulate#test-email) is shorter and shows the SendGrail logo in Gmail and Outlook.
- The [weekly summary](/features/weekly-summaries) email uses the same design as the test email.

### Fixed

- Click tracking breaking links that already carry tracking, such as UTM tags and CRM or provider click tracking.
- Links with merge tags, such as unsubscribe links, being rewritten.
- Tracked links expiring after 30 days. Links in emails sent before this version keep working.
- Admin data loading on front-end pages. It now loads only on the SendGrail admin page.
- Admin header logo alignment.

## v1.0.6

*Released: 2026-09-17*

### Added

- Filters for registering a [custom provider](/guide/developers/custom-providers) from a companion plugin.
- **Copy HTML** on the email report preview, which copies the email's HTML with open tracking and tracked links removed.

### Changed

- Removed the **WordPress Default Mail** fallback option. To fall back to PHP `mail()`, create a PHP connection and select it as the [fallback connection](/guide/fallback).
- Credentials are masked more thoroughly in email logs.

### Fixed

- Emails addressed as `Name <email>` failing with "The to field is required" or "PHP mail() returned false". Plugins such as FluentCRM and FluentAffiliate send in this format.
- A message with no valid recipient now fails with a clear error that names the rejected address.
- Test email ignoring the selected connection.
- Previewing an email counting as an open or click.
- The connection form ignoring providers added by a companion plugin.
- Connection saving accepting unknown provider identifiers.

## v1.0.5

*Released: 2026-08-02*

### Added

- **Resend** action with a resend counter on [email log](/features/email-logging#resending-an-email) rows.

### Fixed

- Unreadable SMTP responses and headers in the [email log](/features/email-logging#delivery-status).

## v1.0.4

*Released: 2026-06-30*

### Fixed

- Image loading issue.

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
