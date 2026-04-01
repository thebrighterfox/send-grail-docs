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

## Setup Wizard

After activation, you will be automatically redirected to the **Setup Wizard**. It takes under two minutes to complete.

::: tip
If you prefer to skip the wizard, click "Skip" on the welcome screen. You can always configure connections manually from the dashboard.
:::

### Step 1: Welcome

The welcome screen introduces SendGrail and outlines what the wizard will configure. Click **Continue** to proceed, or **Skip** to go directly to the dashboard.

### Step 2: Configure

1. **Select a provider** from the dropdown (Gmail, SendGrid, Amazon SES, etc.). The host, port, and encryption fields are auto-filled.
2. **Enter your credentials:**
   - From Email
   - From Name
   - SMTP Username
   - SMTP Password (or API key, depending on the provider)
3. Click **Save**.

::: warning
For providers like Gmail, Yahoo, and Zoho Mail, you must use an **App Password** if two-factor authentication is enabled. Your regular account password will not work.
:::

### Step 3: Test

Enter a recipient email address and click **Send Test Email**. A success message confirms your connection is working. If it fails, you can go back to Step 2 to correct your settings.

### Step 4: Done

Setup is complete. You'll see a summary of the connection you created, a link to the dashboard, and quick links to configure email logging, fallback connections, and notifications.

::: info
If you ever need to run the wizard again, navigate to `#/setup-wizard` from the SendGrail admin page.
:::

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
- [Learn about all 17+ supported providers](/guide/providers).
