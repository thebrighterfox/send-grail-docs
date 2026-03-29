# Email Routing

Email routing allows you to send different emails through different SMTP connections based on conditional rules. This is useful when you need to separate transactional emails, marketing emails, and internal notifications across dedicated providers.

## How It Works

Routing rules are evaluated every time WordPress sends an email. SendGrail inspects the email data and checks it against your defined rules in priority order. The **first matching rule wins** -- its assigned connection is used instead of the default.

If no rules match, the email is sent through the default connection.

::: info
Routing rules are evaluated in `MailerService.configure()` after the email data (recipients, subject, headers) is fully built but before the email is handed off to the SMTP transport.
:::

## Rule Structure

Each routing rule consists of the following components:

| Component | Description |
|-----------|-------------|
| **Name** | A descriptive label for the rule |
| **Priority** | Numeric value controlling evaluation order (lower number = higher priority) |
| **Field** | The email property to evaluate |
| **Operator** | The comparison method |
| **Value** | The value to match against |
| **Connection** | The SMTP connection to use when the rule matches |

## Fields

| Field | Description | Behavior |
|-------|-------------|----------|
| `to_email` | Recipient email address | Checks **all** recipients (To, CC, BCC). Matches if **any** recipient matches the condition. |
| `from_email` | Sender email address | Checks the From address of the outgoing email. |
| `subject` | Email subject line | Checks the subject text. |
| `header` | Email header | Value format must be `Header-Name: value`. Checks both the header name and its value. |

## Operators

| Operator | Description | Case Sensitivity |
|----------|-------------|-----------------|
| `equals` | Exact match | Case-insensitive |
| `contains` | Substring match | Case-insensitive |
| `starts_with` | Prefix match | Case-insensitive |
| `ends_with` | Suffix match | Case-insensitive |
| `regex` | Regular expression match | Case-sensitive (use `(?i)` flag for insensitive) |

::: tip
All operators except `regex` are case-insensitive by default. For regex rules, prepend `(?i)` to your pattern if you need case-insensitive matching.
:::

## Priority-Based Evaluation

Rules are sorted by their priority value (ascending) and evaluated in that order. The first rule that matches the email determines which connection is used.

```
Priority 1: to_email contains @company.com    -> Internal SMTP
Priority 2: subject contains "order"          -> Postmark
Priority 3: from_email equals news@site.com   -> Brevo
Default:                                      -> Gmail
```

::: warning
If two rules have the same priority, their evaluation order among themselves is not guaranteed. Assign distinct priority values to ensure predictable behavior.
:::

## Enabling and Disabling Rules

Individual rules can be enabled or disabled without deleting them. Disabled rules are skipped during evaluation. This is useful for temporarily suspending a rule during testing or maintenance.

## Use Cases

### WooCommerce Order Emails via Postmark

Route all WooCommerce order notifications through a dedicated transactional email provider for higher deliverability:

```
Field:    subject
Operator: contains
Value:    order
Connection: Postmark
```

### Newsletters via Brevo

Route marketing emails sent from a specific address through a bulk-sending provider:

```
Field:    from_email
Operator: equals
Value:    newsletter@yoursite.com
Connection: Brevo
```

### Internal Notifications via Gmail

Route all emails to your company domain through Gmail:

```
Field:    to_email
Operator: ends_with
Value:    @yourcompany.com
Connection: Gmail
```

### Custom Header Routing

Route emails tagged with a specific header (useful for plugins that add custom headers):

```
Field:    header
Operator: contains
Value:    X-Mail-Type: transactional
Connection: Postmark
```

::: details How to verify your routing rules
Use the [Email Simulation](/features/test-simulate#email-simulation) feature to dry-run an email and see which connection and routing rule would be applied, without actually sending a message.
:::
