# REST API Endpoints

SendGrail exposes a REST API under the WordPress REST framework. All endpoints are prefixed with the base URL:

```
/wp-json/sendgrail/v2/
```

## Authentication

All endpoints except [public tracking endpoints](#public-tracking) require:

- **WordPress nonce** passed in the `X-WP-Nonce` header.
- The authenticated user must have the **administrator** role (or a role allowed via the `sendgrail_admin_roles` filter).

```js
fetch('/wp-json/sendgrail/v2/dashboard', {
  headers: {
    'X-WP-Nonce': window.sendGrailAdmin.nonce,
    'Content-Type': 'application/json'
  }
})
```

## Response Format

All responses follow a consistent structure:

```json
{
  "success": true,
  "message": "Optional status message",
  "data": { },
  "meta": {
    "pagination": {
      "total": 100,
      "per_page": 20,
      "current_page": 1,
      "last_page": 5
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the request succeeded |
| `message` | `string` | Optional human-readable message |
| `data` | `any` | The response payload |
| `meta` | `object` | Optional metadata including pagination |

<style>
.api-method {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.api-method.get { background-color: #49cc90; }
.api-method.post { background-color: #fca130; }
.api-method.put { background-color: #61affe; }
.api-method.delete { background-color: #f93e3e; }
</style>

---

## Public Tracking {#public-tracking}

These endpoints require no authentication. They are used by tracking pixels and click-tracking links embedded in outgoing emails.

### <span class="api-method get">GET</span> `/t/{tracking_id}`

Returns a 1x1 transparent GIF pixel. Used for open tracking.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `tracking_id` | Path | `string` | Unique tracking identifier for the email |

**Response:** `200 OK` with `Content-Type: image/gif` (1x1 transparent GIF)

---

### <span class="api-method get">GET</span> `/t/click/{tracking_id}/{link_hash}`

Redirects the recipient to the original link. Used for click tracking.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `tracking_id` | Path | `string` | Unique tracking identifier for the email |
| `link_hash` | Path | `string` | Hashed identifier for the original link |

**Response:** `302 Found` redirect to the original URL

---

## Dashboard

### <span class="api-method get">GET</span> `/dashboard`

Returns dashboard overview data including stats, trends, recent activity, and a `needs_setup` flag indicating whether the setup wizard has been completed.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "stats": {
      "total_sent": 1452,
      "total_failed": 12,
      "total_opened": 876,
      "total_clicked": 234
    },
    "trends": { },
    "recent_activity": [ ],
    "needs_setup": false
  }
}
```

---

### <span class="api-method get">GET</span> `/dashboard/chart`

Returns chart data for the dashboard graph.

| Parameter | Location | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `period` | Query | `string` | `7d` | Time period: `7d`, `30d`, or `90d` |

**Example Response:**

```json
{
  "success": true,
  "data": {
    "labels": ["Mar 21", "Mar 22", "Mar 23"],
    "sent": [42, 38, 55],
    "failed": [1, 0, 2],
    "opened": [28, 22, 40],
    "clicked": [8, 5, 12]
  }
}
```

---

## Connections

### <span class="api-method get">GET</span> `/connections`

List all SMTP connections. Includes per-connection delivery statistics.

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Gmail SMTP",
      "provider": "gmail",
      "host": "smtp.gmail.com",
      "port": 587,
      "encryption": "tls",
      "from_email": "you@gmail.com",
      "from_name": "My Site",
      "is_enabled": true,
      "is_default": true,
      "stats": {
        "total_sent": 320,
        "total_failed": 2
      }
    }
  ]
}
```

---

### <span class="api-method post">POST</span> `/connections`

Create a new SMTP connection.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Display name for the connection |
| `provider` | `string` | Yes | Provider slug (e.g., `gmail`, `sendgrid`, `ses`) |
| `host` | `string` | Yes | SMTP host address |
| `port` | `integer` | Yes | SMTP port (25, 465, 587, 2525) |
| `encryption` | `string` | Yes | Encryption type: `tls`, `ssl`, or `none` |
| `from_email` | `string` | Yes | Sender email address |
| `from_name` | `string` | No | Sender display name |
| `auth` | `boolean` | No | Whether SMTP authentication is required |
| `username` | `string` | Conditional | SMTP username (required if `auth` is true) |
| `password` | `string` | Conditional | SMTP password (required if `auth` is true) |

**Example Request:**

```json
{
  "name": "SendGrid Production",
  "provider": "sendgrid",
  "host": "smtp.sendgrid.net",
  "port": 587,
  "encryption": "tls",
  "from_email": "noreply@example.com",
  "from_name": "Example Site",
  "auth": true,
  "username": "apikey",
  "password": "SG.xxxxx"
}
```

---

### <span class="api-method get">GET</span> `/connections/{id}`

Retrieve a single connection by ID.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Connection ID |

---

### <span class="api-method put">PUT</span> `/connections/{id}`

Update an existing connection. Accepts the same body parameters as the create endpoint.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Connection ID |

---

### <span class="api-method delete">DELETE</span> `/connections/{id}`

Delete a connection. Fails if the connection is the only enabled connection or is currently set as default.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Connection ID |

---

### <span class="api-method post">POST</span> `/connections/{id}/toggle`

Toggle a connection's enabled/disabled state.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Connection ID |

---

### <span class="api-method post">POST</span> `/connections/{id}/activate`

Set a connection as the default SMTP connection.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Connection ID |

---

### <span class="api-method post">POST</span> `/connections/{id}/test`

Test SMTP connectivity for a connection. Attempts to establish a connection to the SMTP server without sending an email.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Connection ID |

**Example Response:**

```json
{
  "success": true,
  "message": "SMTP connection successful"
}
```

---

## Email Logs

### <span class="api-method get">GET</span> `/email-logs`

List email logs with filtering and pagination.

| Parameter | Location | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `status` | Query | `string` | — | Filter by status: `sent` or `failed` |
| `search` | Query | `string` | — | Search in subject, to, and from fields |
| `date_from` | Query | `string` | — | Start date (YYYY-MM-DD format, UTC) |
| `date_to` | Query | `string` | — | End date (YYYY-MM-DD format, UTC) |
| `page` | Query | `integer` | `1` | Page number |
| `per_page` | Query | `integer` | `20` | Results per page |

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 42,
      "to": "user@example.com",
      "subject": "Welcome to our site",
      "status": "sent",
      "connection_id": 1,
      "created_at": "2026-03-28T10:30:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "total": 150,
      "per_page": 20,
      "current_page": 1,
      "last_page": 8
    }
  }
}
```

---

### <span class="api-method get">GET</span> `/email-logs/stats`

Retrieve aggregate email log statistics.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "total": 1452,
    "sent": 1440,
    "failed": 12,
    "opened": 876,
    "clicked": 234
  }
}
```

---

### <span class="api-method get">GET</span> `/email-logs/{id}`

Retrieve a single email log entry.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Email log ID |

---

### <span class="api-method get">GET</span> `/email-logs/{id}/report`

Retrieve a single email log entry along with its associated tracking events (opens, clicks, failures).

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Email log ID |

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": 42,
    "to": "user@example.com",
    "subject": "Welcome to our site",
    "status": "sent",
    "events": [
      {
        "type": "sent",
        "created_at": "2026-03-28T10:30:00Z"
      },
      {
        "type": "opened",
        "created_at": "2026-03-28T10:45:22Z"
      }
    ]
  }
}
```

---

### <span class="api-method delete">DELETE</span> `/email-logs/{id}`

Delete a single email log entry and its associated events.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Email log ID |

---

### <span class="api-method post">POST</span> `/email-logs/bulk-delete`

Delete multiple email log entries at once.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ids` | `array` | Yes | Array of email log IDs to delete |

**Example Request:**

```json
{
  "ids": [1, 2, 3, 15, 42]
}
```

---

### <span class="api-method post">POST</span> `/email-logs/clear`

Delete all email logs and associated events. Use with caution.

::: warning
This action is irreversible. All email logs and their tracking events will be permanently deleted.
:::

---

## Reports

### <span class="api-method get">GET</span> `/reports`

Retrieve overview statistics for the reports dashboard.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "total_sent": 1452,
    "total_failed": 12,
    "delivery_rate": 99.17,
    "open_rate": 60.33,
    "click_rate": 16.12
  }
}
```

---

### <span class="api-method get">GET</span> `/reports/heatmap`

Returns a 7x24 grid representing email activity by day of week and hour of day.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "grid": [
      [0, 2, 5, 12, 8, 3, 0],
      [0, 1, 3, 10, 7, 2, 0]
    ],
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "hours": [0, 1, 2, 3, 4, 5]
  }
}
```

---

### <span class="api-method get">GET</span> `/reports/providers`

Returns per-connection delivery statistics.

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "connection_id": 1,
      "name": "Gmail SMTP",
      "provider": "gmail",
      "total_sent": 320,
      "total_failed": 2,
      "delivery_rate": 99.38
    }
  ]
}
```

---

## Settings

### <span class="api-method get">GET</span> `/settings`

Retrieve all plugin settings.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "log_emails": true,
    "log_email_body": false,
    "log_retention_days": 30,
    "open_tracking": true,
    "click_tracking": true,
    "weekly_summary": true,
    "summary_recipients": "admin@example.com",
    "fallback_enabled": true
  }
}
```

---

### <span class="api-method put">PUT</span> `/settings`

Update all plugin settings. Send the full settings object.

**Example Request:**

```json
{
  "log_emails": true,
  "log_email_body": true,
  "log_retention_days": 60,
  "open_tracking": true,
  "click_tracking": true,
  "weekly_summary": false,
  "summary_recipients": "admin@example.com",
  "fallback_enabled": true
}
```

---

## Test & Simulation

### <span class="api-method post">POST</span> `/test-email`

Send a real test email through a specified connection or the default connection.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient email address |
| `subject` | `string` | No | Custom subject line |
| `message` | `string` | No | Custom email body |
| `connection_id` | `integer` | No | Connection to use (defaults to active connection) |

**Example Request:**

```json
{
  "to": "test@example.com",
  "subject": "SendGrail Test Email",
  "connection_id": 1
}
```

---

### <span class="api-method post">POST</span> `/simulate-email`

Simulate sending an email without actually delivering it. Useful for testing routing rules and connection selection.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient email address |
| `subject` | `string` | No | Custom subject line |
| `connection_id` | `integer` | No | Connection to simulate with |

---

## Setup

### <span class="api-method get">GET</span> `/setup/status`

Check the current setup wizard status.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "completed": false,
    "current_step": "configure"
  }
}
```

---

### <span class="api-method post">POST</span> `/setup/complete`

Mark the setup wizard as completed.

---

### <span class="api-method post">POST</span> `/setup/skip`

Skip the setup wizard. The wizard will not appear again, but `needs_setup` will remain `true` until a connection is configured.

---

## Migration

### <span class="api-method get">GET</span> `/migration/detect`

Detect installed SMTP plugins whose settings can be imported.

**Example Response:**

```json
{
  "success": true,
  "data": {
    "detected": [
      {
        "plugin": "wp-mail-smtp",
        "name": "WP Mail SMTP",
        "active": true
      }
    ]
  }
}
```

---

### <span class="api-method post">POST</span> `/migration/import`

Import settings from a detected SMTP plugin.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plugin` | `string` | Yes | Plugin slug to import from |

Supported values for `plugin`:

| Slug | Plugin |
|------|--------|
| `wp-mail-smtp` | WP Mail SMTP |
| `post-smtp` | Post SMTP |
| `fluent-smtp` | FluentSMTP |
| `easy-wp-smtp` | Easy WP SMTP |

**Example Request:**

```json
{
  "plugin": "wp-mail-smtp"
}
```

---

## Email Routes

### <span class="api-method get">GET</span> `/email-routes`

List all email routing rules, ordered by priority.

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Transactional to SendGrid",
      "field": "from_email",
      "operator": "equals",
      "value": "noreply@example.com",
      "connection_id": 2,
      "priority": 1,
      "is_enabled": true
    }
  ]
}
```

---

### <span class="api-method post">POST</span> `/email-routes`

Create a new email routing rule.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Display name for the rule |
| `field` | `string` | Yes | Field to match: `from_email`, `to_email`, `subject`, `from_domain`, `to_domain` |
| `operator` | `string` | Yes | Comparison operator: `equals`, `contains`, `starts_with`, `ends_with`, `regex` |
| `value` | `string` | Yes | Value to match against |
| `connection_id` | `integer` | Yes | Connection to route matching emails through |
| `priority` | `integer` | No | Sort order (lower = higher priority, auto-assigned if omitted) |

**Example Request:**

```json
{
  "name": "Marketing emails via Mailgun",
  "field": "from_email",
  "operator": "contains",
  "value": "marketing@",
  "connection_id": 3,
  "priority": 10
}
```

---

### <span class="api-method put">PUT</span> `/email-routes/{id}`

Update an existing routing rule. Accepts the same body parameters as the create endpoint.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Route ID |

---

### <span class="api-method delete">DELETE</span> `/email-routes/{id}`

Delete a routing rule.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Route ID |

---

### <span class="api-method post">POST</span> `/email-routes/{id}/toggle`

Toggle a routing rule's enabled/disabled state.

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | Path | `integer` | Route ID |

---

### <span class="api-method post">POST</span> `/email-routes/reorder`

Reorder routing rules by updating their priorities in bulk.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Array of objects with `id` and `priority` |

**Example Request:**

```json
{
  "items": [
    { "id": 3, "priority": 1 },
    { "id": 1, "priority": 2 },
    { "id": 5, "priority": 3 }
  ]
}
```

---

## Providers

### <span class="api-method get">GET</span> `/providers`

List all available SMTP provider presets. These presets contain pre-filled host, port, and encryption values for common providers.

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "slug": "gmail",
      "name": "Gmail / Google Workspace",
      "host": "smtp.gmail.com",
      "port": 587,
      "encryption": "tls",
      "auth": true
    },
    {
      "slug": "sendgrid",
      "name": "SendGrid",
      "host": "smtp.sendgrid.net",
      "port": 587,
      "encryption": "tls",
      "auth": true
    }
  ]
}
```
