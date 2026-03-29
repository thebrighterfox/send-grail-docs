# Database Schema

SendGrail creates four custom database tables to store connection configurations, email logs, tracking events, and routing rules. All tables use the standard WordPress table prefix (typically `wp_`).

## Overview

| Table | Purpose |
|-------|---------|
| `wp_sendgrail_connections` | SMTP connection configurations |
| `wp_sendgrail_email_logs` | Email delivery log entries |
| `wp_sendgrail_email_events` | Tracking events (sent, opened, clicked, failed) |
| `wp_sendgrail_email_routes` | Conditional email routing rules |

::: info
Migrations run automatically on plugin activation and on version updates. The current database schema version is tracked in the WordPress options table under the key `sendgrail_db_version`.
:::

---

## `wp_sendgrail_connections`

Stores SMTP connection configurations. Each row represents a single SMTP provider connection.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `BIGINT(20) UNSIGNED` | No | Auto-increment | Primary key |
| `name` | `VARCHAR(255)` | No | — | Display name for the connection |
| `provider` | `VARCHAR(100)` | No | — | Provider slug (e.g., `gmail`, `sendgrid`, `ses`) |
| `host` | `VARCHAR(255)` | No | — | SMTP server hostname |
| `port` | `INT(5) UNSIGNED` | No | `587` | SMTP port number |
| `encryption` | `VARCHAR(10)` | No | `tls` | Encryption type: `tls`, `ssl`, or `none` |
| `from_email` | `VARCHAR(255)` | No | — | Sender email address |
| `from_name` | `VARCHAR(255)` | Yes | `NULL` | Sender display name |
| `auth` | `TINYINT(1)` | No | `1` | Whether SMTP authentication is required |
| `username` | `VARCHAR(255)` | Yes | `NULL` | SMTP authentication username |
| `password` | `TEXT` | Yes | `NULL` | Encrypted SMTP password |
| `is_enabled` | `TINYINT(1)` | No | `1` | Whether the connection is active |
| `is_default` | `TINYINT(1)` | No | `0` | Whether this is the default connection |
| `created_at` | `DATETIME` | No | `CURRENT_TIMESTAMP` | Record creation time (UTC) |
| `updated_at` | `DATETIME` | No | `CURRENT_TIMESTAMP` | Last update time (UTC) |

**Indexes:**

| Index | Columns | Type |
|-------|---------|------|
| `PRIMARY` | `id` | Primary |
| `idx_provider` | `provider` | Index |
| `idx_is_enabled` | `is_enabled` | Index |
| `idx_is_default` | `is_default` | Index |

::: warning Security Note
The `password` column is encrypted using **AES-256-CBC** with a key derived from the WordPress `AUTH_KEY` salt. Passwords are never stored in plaintext and are decrypted only at the moment of SMTP authentication.
:::

---

## `wp_sendgrail_email_logs`

Stores a log entry for every email sent through WordPress `wp_mail()` while SendGrail is active.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `BIGINT(20) UNSIGNED` | No | Auto-increment | Primary key |
| `connection_id` | `BIGINT(20) UNSIGNED` | Yes | `NULL` | FK to connections table |
| `to` | `TEXT` | No | — | Recipient email address(es) |
| `from_email` | `VARCHAR(255)` | Yes | `NULL` | Sender email used |
| `from_name` | `VARCHAR(255)` | Yes | `NULL` | Sender name used |
| `subject` | `VARCHAR(255)` | Yes | `NULL` | Email subject line |
| `body` | `LONGTEXT` | Yes | `NULL` | Full email body (if body logging is enabled) |
| `headers` | `TEXT` | Yes | `NULL` | Email headers as JSON |
| `attachments` | `TEXT` | Yes | `NULL` | Attachment file paths as JSON array |
| `status` | `VARCHAR(20)` | No | `pending` | Delivery status: `pending`, `sent`, `failed` |
| `error_message` | `TEXT` | Yes | `NULL` | Error message if delivery failed |
| `tracking_id` | `VARCHAR(64)` | Yes | `NULL` | Unique ID for open/click tracking |
| `retries` | `TINYINT(3) UNSIGNED` | No | `0` | Number of fallback retry attempts |
| `created_at` | `DATETIME` | No | `CURRENT_TIMESTAMP` | When the email was queued (UTC) |
| `updated_at` | `DATETIME` | No | `CURRENT_TIMESTAMP` | Last status update (UTC) |

**Indexes:**

| Index | Columns | Type |
|-------|---------|------|
| `PRIMARY` | `id` | Primary |
| `idx_connection_id` | `connection_id` | Index |
| `idx_status` | `status` | Index |
| `idx_tracking_id` | `tracking_id` | Unique |
| `idx_created_at` | `created_at` | Index |
| `idx_status_created` | `status`, `created_at` | Composite |

---

## `wp_sendgrail_email_events`

Records granular tracking events associated with email log entries. Each email can have multiple events over its lifecycle.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `BIGINT(20) UNSIGNED` | No | Auto-increment | Primary key |
| `email_log_id` | `BIGINT(20) UNSIGNED` | No | — | FK to email_logs table |
| `type` | `VARCHAR(20)` | No | — | Event type: `sent`, `opened`, `clicked`, `failed` |
| `metadata` | `TEXT` | Yes | `NULL` | Additional event data as JSON |
| `ip_address` | `VARCHAR(45)` | Yes | `NULL` | IP address of the event trigger |
| `user_agent` | `TEXT` | Yes | `NULL` | User agent string (for open/click events) |
| `created_at` | `DATETIME` | No | `CURRENT_TIMESTAMP` | When the event occurred (UTC) |

**Indexes:**

| Index | Columns | Type |
|-------|---------|------|
| `PRIMARY` | `id` | Primary |
| `idx_email_log_id` | `email_log_id` | Index |
| `idx_type` | `type` | Index |
| `idx_created_at` | `created_at` | Index |
| `idx_log_type` | `email_log_id`, `type` | Composite |

**Event Types:**

| Type | Description | Metadata |
|------|-------------|----------|
| `sent` | Email was successfully handed off to the SMTP server | — |
| `opened` | Recipient loaded the tracking pixel | `{"count": 3}` for repeated opens |
| `clicked` | Recipient clicked a tracked link | `{"url": "https://..."}` original link URL |
| `failed` | Delivery failed | `{"error": "Connection timed out"}` |

---

## `wp_sendgrail_email_routes`

Stores conditional routing rules that determine which SMTP connection handles an email based on matching criteria.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `BIGINT(20) UNSIGNED` | No | Auto-increment | Primary key |
| `name` | `VARCHAR(255)` | No | — | Display name for the rule |
| `field` | `VARCHAR(50)` | No | — | Field to match against |
| `operator` | `VARCHAR(20)` | No | — | Comparison operator |
| `value` | `VARCHAR(255)` | No | — | Value to compare against |
| `connection_id` | `BIGINT(20) UNSIGNED` | No | — | FK to connections table |
| `priority` | `INT(11)` | No | `0` | Sort order (lower number = higher priority) |
| `is_enabled` | `TINYINT(1)` | No | `1` | Whether the rule is active |
| `created_at` | `DATETIME` | No | `CURRENT_TIMESTAMP` | Record creation time (UTC) |
| `updated_at` | `DATETIME` | No | `CURRENT_TIMESTAMP` | Last update time (UTC) |

**Indexes:**

| Index | Columns | Type |
|-------|---------|------|
| `PRIMARY` | `id` | Primary |
| `idx_connection_id` | `connection_id` | Index |
| `idx_priority` | `priority` | Index |
| `idx_is_enabled` | `is_enabled` | Index |
| `idx_enabled_priority` | `is_enabled`, `priority` | Composite |

**Supported Fields:**

| Field Slug | Description |
|------------|-------------|
| `from_email` | Full sender email address |
| `from_domain` | Domain part of the sender email |
| `to_email` | Full recipient email address |
| `to_domain` | Domain part of the recipient email |
| `subject` | Email subject line |

**Supported Operators:**

| Operator | Description |
|----------|-------------|
| `equals` | Exact match (case-insensitive) |
| `contains` | Substring match |
| `starts_with` | Value starts with the specified string |
| `ends_with` | Value ends with the specified string |
| `regex` | Regular expression match |

---

## Entity Relationships

```
wp_sendgrail_connections
  ├── wp_sendgrail_email_logs (connection_id → id)
  └── wp_sendgrail_email_routes (connection_id → id)

wp_sendgrail_email_logs
  └── wp_sendgrail_email_events (email_log_id → id)
```

::: tip
Foreign key constraints are not enforced at the database level (for compatibility with all MySQL/MariaDB versions). Referential integrity is maintained at the application layer. Deleting a connection will not cascade-delete its logs or routes.
:::

## Version Tracking

The database schema version is stored as a WordPress option:

```php
get_option('sendgrail_db_version'); // e.g., "1.0.0"
```

Migrations are executed automatically when SendGrail detects that the stored version is lower than the plugin's current version. This check runs on every admin page load via the `plugins_loaded` hook.
