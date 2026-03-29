# Setup Wizard

The Setup Wizard guides you through configuring SendGrail for the first time. It runs automatically after plugin activation and takes under two minutes to complete.

## Accessing the Wizard

The wizard launches automatically when you first visit the SendGrail dashboard and no connections have been configured yet. If you need to run it again, navigate to `#/setup-wizard` from the SendGrail admin page.

::: info
When the dashboard detects no existing connections, it automatically redirects you to the wizard. This redirect only happens when `sendgrail_setup_complete` has not been set in your WordPress options.
:::

## Step 1: Welcome

The welcome screen introduces SendGrail and outlines what the wizard will configure. You have two options:

- **Continue** -- Proceed to the next step.
- **Skip** -- Mark the wizard as complete and go directly to the dashboard. This sets the `sendgrail_setup_complete` option to `true`, preventing future auto-redirects.

## Step 2: Configure

This is the main configuration step. You will:

1. **Select a provider** from the dropdown list (Gmail, SendGrid, Amazon SES, etc.). Selecting a provider auto-fills the host, port, and encryption fields with the correct defaults.
2. **Enter your credentials:**
   - From Email
   - From Name
   - SMTP Username
   - SMTP Password (or API key, depending on the provider)
3. **Save** the connection.

::: warning
For providers like Gmail, Yahoo, and Zoho Mail, you must use an **App Password** if two-factor authentication is enabled on your account. Your regular account password will not work.
:::

## Step 3: Test

SendGrail sends a test email through the connection you just configured. Enter a recipient email address and click **Send Test Email**.

- **Success** -- A confirmation message appears. The test email should arrive in the recipient's inbox within seconds.
- **Failure** -- An error message is displayed with details about what went wrong (authentication failure, connection timeout, etc.). You can go back to Step 2 to correct your settings.

## Step 4: Done

The wizard marks setup as complete by saving `sendgrail_setup_complete` to the WordPress options table. You are presented with:

- A summary of the connection you created.
- A link to the SendGrail dashboard.
- Quick links to configure additional settings like email logging, fallback connections, and notifications.

## The `sendgrail_setup_complete` Option

This WordPress option (`wp_options` table) controls the auto-redirect behavior:

| Value       | Behavior                                                |
|-------------|---------------------------------------------------------|
| Not set     | Dashboard redirects to the Setup Wizard automatically.  |
| `true`      | Dashboard loads normally. Wizard is accessible manually. |

Skipping the wizard or completing it both set this option to `true`. If you ever want to force the wizard to appear again, delete this option from the database:

```sql
DELETE FROM wp_options WHERE option_name = 'sendgrail_setup_complete';
```
