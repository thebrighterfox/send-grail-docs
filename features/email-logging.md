# Email Logging

SendGrail logs every outgoing email with detailed metadata, delivery status, and optional body content. The email log provides a comprehensive audit trail for troubleshooting and monitoring.

## Logged Fields

Every email captured by SendGrail records the following information:

| Field | Description |
|-------|-------------|
| **Recipients** | All To, CC, and BCC addresses |
| **Sender** | From email and display name |
| **Subject** | Email subject line |
| **Body** | Full email body (when body storage is enabled) |
| **Headers** | All email headers |
| **Attachments** | List of attached files |
| **Status** | Delivery result: `sent` or `failed` |
| **SMTP Response** | Raw response from the mail server |
| **Error** | Error message if delivery failed |

## Filtering and Search

The email log supports several filtering options to help you find specific emails:

- **Status filter** -- Filter by `sent` or `failed` status
- **Search** -- Search across recipient email addresses and subject lines
- **Date range** -- Filter by a custom start and end date

Results are paginated at **20 emails per page**.

## Email Report View

Clicking on an individual email opens a detailed report with the following sections:

### Metadata
Displays the sender, recipients, subject, timestamp, connection used, and all headers.

### Delivery Status
Shows the final delivery status along with the raw SMTP response code and message.

### Open Tracking Card
When [open tracking](/features/open-tracking) is enabled, displays the open count and first-opened timestamp.

### Click Tracking Card
When [click tracking](/features/click-tracking) is enabled, displays the click count, first-clicked timestamp, and the list of clicked URLs.

### Event Timeline
A chronological list of all events associated with the email: sent, opened, clicked, with timestamps and metadata.

### Email Body Preview
The original email body rendered in a sandboxed iframe for safe viewing. This section only appears when body storage is enabled and the email body was captured.

## Retention Policy

Email logs can be automatically cleaned up based on a configurable retention period.

- **Range**: 0 to 365 days
- **Cleanup**: A daily WordPress cron job removes logs older than the configured retention period
- **Setting 0 days**: Disables automatic cleanup, retaining logs indefinitely

::: tip
Set a reasonable retention period to manage database size. For most sites, 30 to 90 days provides a good balance between auditability and storage.
:::

## Bulk Operations

- **Bulk Delete** -- Select multiple log entries and delete them in a single action
- **Clear All** -- Remove all email logs at once

::: warning
Deleted email logs cannot be recovered. Use bulk delete and clear all with caution.
:::

## Body Storage

By default, email body storage is **disabled** to protect user privacy and reduce database usage. When disabled, all email metadata is still logged, but the body content is omitted.

To enable body storage, toggle the **Store Email Body** setting in the plugin settings page.

::: warning Privacy Notice
Email bodies may contain sensitive information such as password reset links, personal data, or confidential content. Only enable body storage if your use case requires it and you have appropriate data handling policies in place.
:::
