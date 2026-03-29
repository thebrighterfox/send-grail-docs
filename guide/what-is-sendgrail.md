# What is SendGrail?

SendGrail is a WordPress plugin that fixes email delivery by routing all outgoing mail through authenticated SMTP providers instead of the unreliable default PHP `mail()` function.

## The Problem with WordPress Email

Out of the box, WordPress sends email using PHP's built-in `mail()` function. This approach has serious problems:

- **Emails land in spam.** Messages sent via `mail()` lack proper authentication (SPF, DKIM, DMARC), so mail servers treat them as suspicious.
- **Emails silently fail.** Shared hosting environments often restrict or disable `mail()` entirely. WordPress gives no indication when this happens.
- **No delivery visibility.** There is no logging, no tracking, and no way to know if an email was actually delivered.
- **No retry or fallback.** If sending fails, the email is lost with no recovery mechanism.

This means password resets, WooCommerce order confirmations, contact form submissions, and other critical emails may never reach their recipients.

## How SendGrail Fixes It

SendGrail hooks into WordPress's `wp_mail()` function and routes all outgoing email through a properly configured SMTP connection. This ensures emails are authenticated, encrypted, and delivered reliably.

## Key Benefits

### 13+ SMTP Providers

Connect to Gmail, Outlook, SendGrid, Mailgun, Amazon SES, Postmark, Mandrill, Elastic Email, SMTP2GO, Mailtrap, Zoho Mail, Brevo, or any custom SMTP server. Each provider has a pre-configured template so you only need to enter your credentials.

### Email Logging

Every email your site sends is logged with full details: recipients, subject, headers, status, and optionally the full message body. Search, filter, and review your email history at any time.

### Open and Click Tracking

Know when recipients open your emails and which links they click. Tracking data is collected automatically and displayed on the dashboard.

### Smart Routing

Route emails through different SMTP connections based on the sender address, recipient address, or domain. For example, send transactional emails through SendGrid and marketing emails through Mailgun.

### One-Click Migration

Switching from another SMTP plugin? SendGrail auto-detects settings from WP Mail SMTP, Post SMTP, FluentSMTP, and Easy WP SMTP, then imports them in one click. Your original settings are preserved.

### Weekly Reports

Receive a scheduled email summary with delivery statistics, failure counts, and engagement metrics. Configure which day and email address receives the report.

### Fallback Reliability

Configure a backup SMTP connection. If your primary provider fails, SendGrail automatically tries the fallback connection before resorting to WordPress default mail.

## Requirements

| Requirement     | Minimum Version |
|-----------------|-----------------|
| PHP             | 8.0+            |
| WordPress       | 6.0+            |
| PHP Extensions  | OpenSSL, cURL   |

SendGrail works with any hosting environment that supports outbound SMTP connections on standard ports (25, 465, 587, 2525).
