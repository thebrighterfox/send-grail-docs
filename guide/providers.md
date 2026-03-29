# SMTP Providers

SendGrail includes pre-configured templates for 13 popular SMTP providers plus a custom SMTP option. When you select a provider, the host, port, and encryption fields are automatically filled in. You only need to supply your credentials.

## Provider Reference

### Gmail

| Setting     | Value                  |
|-------------|------------------------|
| Host        | `smtp.gmail.com`       |
| Port        | `587`                  |
| Encryption  | TLS                    |
| Username    | Your full Gmail address |
| Password    | App Password            |

::: warning
Gmail requires an **App Password** if two-factor authentication is enabled (which it should be). Generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Your regular Google password will not work.
:::

Gmail has a sending limit of 500 emails per day for personal accounts and 2,000 per day for Google Workspace accounts.

---

### Outlook / Microsoft 365

| Setting     | Value                       |
|-------------|-----------------------------|
| Host        | `smtp.office365.com`        |
| Port        | `587`                       |
| Encryption  | TLS                         |
| Username    | Your full Outlook email     |
| Password    | Your account password       |

For Microsoft 365 business accounts, ensure SMTP AUTH is enabled for the mailbox in the Microsoft 365 admin center under **Active users > Mail > Manage email apps**.

---

### Yahoo Mail

| Setting     | Value                  |
|-------------|------------------------|
| Host        | `smtp.mail.yahoo.com`  |
| Port        | `587`                  |
| Encryption  | TLS                    |
| Username    | Your full Yahoo email  |
| Password    | App Password           |

::: warning
Yahoo requires an **App Password**. Generate one from **Account Info > Account Security > Generate app password**. Standard account passwords are rejected for SMTP.
:::

---

### SendGrid

| Setting     | Value                       |
|-------------|-----------------------------|
| Host        | `smtp.sendgrid.net`         |
| Port        | `587`                       |
| Encryption  | TLS                         |
| Username    | `apikey` (literal string)   |
| Password    | Your SendGrid API key       |

The username is always the literal text `apikey` -- do not enter your email address. Generate an API key from **Settings > API Keys** in the SendGrid dashboard. The key must have **Mail Send** permissions.

---

### Mailgun

| Setting     | Value                                   |
|-------------|-----------------------------------------|
| Host        | `smtp.mailgun.org`                      |
| Port        | `587`                                   |
| Encryption  | TLS                                     |
| Username    | SMTP username from Mailgun domain settings |
| Password    | SMTP password from Mailgun domain settings |

Find your SMTP credentials in the Mailgun dashboard under **Sending > Domain settings > SMTP credentials**. The username is typically in the format `postmaster@your-domain.com`. Do not use your Mailgun account password.

---

### Amazon SES

| Setting     | Value                                          |
|-------------|------------------------------------------------|
| Host        | `email-smtp.{region}.amazonaws.com`            |
| Port        | `587`                                          |
| Encryption  | TLS                                            |
| Username    | SES SMTP username (from IAM credentials)       |
| Password    | SES SMTP password (from IAM credentials)       |

::: tip
Replace `{region}` with your AWS region (e.g., `us-east-1`, `eu-west-1`). The host field is editable so you can specify the correct regional endpoint.
:::

SES SMTP credentials are **not** the same as your AWS access keys. Generate them from the **Amazon SES console > SMTP settings > Create SMTP credentials**. Make sure your sending domain and email addresses are verified in SES.

---

### Postmark

| Setting     | Value                         |
|-------------|-------------------------------|
| Host        | `smtp.postmarkapp.com`        |
| Port        | `587`                         |
| Encryption  | TLS                           |
| Username    | Your Server API Token         |
| Password    | Your Server API Token         |

Postmark uses the same Server API Token for both the username and password fields. Find it in your Postmark server under **Settings > API Tokens**.

---

### Mandrill (Mailchimp Transactional)

| Setting     | Value                      |
|-------------|----------------------------|
| Host        | `smtp.mandrillapp.com`     |
| Port        | `587`                      |
| Encryption  | TLS                        |
| Username    | Your Mailchimp email       |
| Password    | Your Mandrill API key      |

::: info
Mandrill is a paid add-on to Mailchimp. You must have an active Mailchimp account with the Transactional Email (Mandrill) add-on enabled. Generate an API key from the Mandrill dashboard under **Settings > SMTP & API Info**.
:::

---

### Elastic Email

| Setting     | Value                        |
|-------------|------------------------------|
| Host        | `smtp.elasticemail.com`      |
| Port        | `2525`                       |
| Encryption  | TLS                          |
| Username    | Your Elastic Email address   |
| Password    | Your SMTP password           |

Generate SMTP credentials from **Settings > SMTP** in the Elastic Email dashboard. Note the non-standard port 2525.

---

### SMTP2GO

| Setting     | Value                    |
|-------------|--------------------------|
| Host        | `mail.smtp2go.com`       |
| Port        | `2525`                   |
| Encryption  | TLS                      |
| Username    | Your SMTP2GO username    |
| Password    | Your SMTP2GO password    |

Create SMTP credentials from the SMTP2GO dashboard under **Settings > SMTP Users**. Port 2525 is used by default to avoid ISP blocking of standard ports.

---

### Mailtrap

| Setting     | Value                                    |
|-------------|------------------------------------------|
| Host        | `live.smtp.mailtrap.io` (production) or `sandbox.smtp.mailtrap.io` (testing) |
| Port        | `587`                                    |
| Encryption  | TLS                                      |
| Username    | Your Mailtrap SMTP username              |
| Password    | Your Mailtrap SMTP password              |

::: tip
Mailtrap offers two environments. Use `live.smtp.mailtrap.io` for production email delivery and `sandbox.smtp.mailtrap.io` for development and testing. The sandbox catches all emails without delivering them to real recipients.
:::

---

### Zoho Mail

| Setting     | Value                   |
|-------------|-------------------------|
| Host        | `smtp.zoho.com`         |
| Port        | `587`                   |
| Encryption  | TLS                     |
| Username    | Your full Zoho email    |
| Password    | Your password or App Password |

::: warning
If two-factor authentication is enabled on your Zoho account, you must generate an **App Password** from **Zoho Account > Security > App Passwords**. Your regular password will not work with 2FA active.
:::

---

### Brevo (formerly Sendinblue)

| Setting     | Value                          |
|-------------|--------------------------------|
| Host        | `smtp-relay.brevo.com`         |
| Port        | `587`                          |
| Encryption  | TLS                            |
| Username    | Your Brevo account email       |
| Password    | Your SMTP key                  |

Find your SMTP key in the Brevo dashboard under **Settings > SMTP & API > SMTP**. This is not your account password -- it is a separate SMTP-specific key.

---

### Custom SMTP

| Setting     | Value                    |
|-------------|--------------------------|
| Host        | Your SMTP server hostname |
| Port        | Your SMTP server port     |
| Encryption  | None, SSL, or TLS        |
| Username    | Your SMTP username        |
| Password    | Your SMTP password        |

Use the Custom SMTP option to connect to any SMTP server not listed above. All fields are fully editable. Common port and encryption combinations:

| Port  | Encryption | Notes                       |
|-------|------------|-----------------------------|
| `25`  | None       | Unencrypted, often blocked  |
| `465` | SSL        | Implicit TLS (legacy)       |
| `587` | TLS        | STARTTLS, recommended       |
| `2525`| TLS        | Alternative to avoid blocks |

## Quick Reference

| Provider               | Host                                  | Port   | Encryption |
|------------------------|---------------------------------------|--------|------------|
| Gmail                  | `smtp.gmail.com`                      | `587`  | TLS        |
| Outlook / Microsoft 365| `smtp.office365.com`                  | `587`  | TLS        |
| Yahoo Mail             | `smtp.mail.yahoo.com`                 | `587`  | TLS        |
| SendGrid               | `smtp.sendgrid.net`                   | `587`  | TLS        |
| Mailgun                | `smtp.mailgun.org`                    | `587`  | TLS        |
| Amazon SES             | `email-smtp.{region}.amazonaws.com`   | `587`  | TLS        |
| Postmark               | `smtp.postmarkapp.com`                | `587`  | TLS        |
| Mandrill               | `smtp.mandrillapp.com`                | `587`  | TLS        |
| Elastic Email          | `smtp.elasticemail.com`               | `2525` | TLS        |
| SMTP2GO                | `mail.smtp2go.com`                    | `2525` | TLS        |
| Mailtrap (Production)  | `live.smtp.mailtrap.io`               | `587`  | TLS        |
| Mailtrap (Sandbox)     | `sandbox.smtp.mailtrap.io`            | `587`  | TLS        |
| Zoho Mail              | `smtp.zoho.com`                       | `587`  | TLS        |
| Brevo                  | `smtp-relay.brevo.com`                | `587`  | TLS        |
