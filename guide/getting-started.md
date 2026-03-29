# Getting Started

This guide walks you through installing SendGrail and sending your first authenticated email.

## Installation

### From WordPress Admin

1. Go to **Plugins > Add New** in your WordPress dashboard.
2. Search for **SendGrail**.
3. Click **Install Now**, then **Activate**.

### Manual Upload

1. Download the `sendgrail.zip` file from [WordPress.org](https://wordpress.org/plugins/sendgrail/).
2. Go to **Plugins > Add New > Upload Plugin**.
3. Choose the zip file and click **Install Now**.
4. Click **Activate**.

## First-Time Setup

After activation, you will be automatically redirected to the **Setup Wizard**. The wizard guides you through four steps:

1. **Welcome** -- Overview of what SendGrail does.
2. **Configure** -- Pick your SMTP provider and enter credentials.
3. **Test** -- Send a test email to verify everything works.
4. **Done** -- Confirmation that your site is ready.

::: tip
If you prefer to skip the wizard, click "Skip" on the welcome screen. You can always configure connections manually from the dashboard.
:::

For a detailed breakdown of each wizard step, see the [Setup Wizard](/guide/setup-wizard) page.

## Creating a Connection Manually

If you skipped the wizard or want to add additional connections:

1. Navigate to **SendGrail** in the WordPress admin sidebar.
2. Click the **Connections** tab.
3. Click **Add Connection**.
4. Select your SMTP provider from the dropdown. The host, port, and encryption fields will be pre-filled.
5. Enter your credentials:
   - **From Email** -- The sender email address.
   - **From Name** -- The sender display name.
   - **Username** -- Your SMTP username.
   - **Password** -- Your SMTP password or API key.
6. Click **Save Connection**.

::: warning
Some providers (like Gmail and Yahoo) require an **App Password** instead of your regular account password. See the [SMTP Providers](/guide/providers) page for provider-specific instructions.
:::

## Sending a Test Email

After saving a connection, verify it works:

1. Go to the **Connections** tab.
2. Find your connection in the list and click **Test**.
3. Enter a recipient email address.
4. Click **Send Test Email**.
5. Check the recipient's inbox (and spam folder) for the test message.

A successful test confirms that your SMTP credentials are correct, the connection is working, and emails will be delivered through this provider.

## Setting as Default

To make a connection the default for all outgoing WordPress emails:

1. Go to **Settings > General**.
2. Under **Default Connection**, select your connection from the dropdown.
3. Click **Save Settings**.

All calls to `wp_mail()` from WordPress core, plugins, and themes will now route through this connection.

## Next Steps

- [Configure a fallback connection](/guide/fallback) for reliability.
- [Review all available settings](/guide/settings) including email logging and tracking.
- [Learn about all 13+ supported providers](/guide/providers).
