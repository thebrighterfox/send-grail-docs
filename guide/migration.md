# Migration

SendGrail can automatically import SMTP settings from other popular WordPress email plugins. Migration is available during the Setup Wizard or as a standalone page.

## Supported Plugins

| Plugin         | Detection Method                        |
|----------------|-----------------------------------------|
| WP Mail SMTP   | Reads `wp_mail_smtp` option             |
| Post SMTP      | Reads `postman_state` and related options |
| FluentSMTP     | Reads `fluentmail-settings` option      |
| Easy WP SMTP   | Reads `swpsmtp_options` option          |

## How Detection Works

When you visit the migration page (or reach the migration step in the Setup Wizard), SendGrail queries the `wp_options` table for known option keys used by each supported plugin. If a matching option is found and contains valid SMTP configuration data, that plugin appears in the list of available migrations.

Detection happens automatically -- you do not need to have the original plugin activated. As long as its settings remain in the database, SendGrail can read them.

## What Gets Imported

The following settings are extracted and mapped to a new SendGrail connection:

| Setting        | Description                                    |
|----------------|------------------------------------------------|
| `host`         | SMTP server hostname                           |
| `port`         | SMTP server port                               |
| `encryption`   | Encryption type (TLS, SSL, or none)            |
| `auth`         | Whether authentication is required             |
| `username`     | SMTP username                                  |
| `password`     | SMTP password or API key                       |
| `from_email`   | Default sender email address                   |
| `from_name`    | Default sender display name                    |

SendGrail normalizes these values across different plugin formats. For example, some plugins store encryption as `tls` while others use `STARTTLS` -- SendGrail handles both.

## Non-Destructive Import

::: tip
Migration is completely non-destructive. SendGrail reads the original plugin's settings but never modifies or deletes them. Your original configuration remains intact in the database.
:::

This means you can:

- Keep the original plugin installed (deactivated) as a safety net.
- Roll back to the original plugin at any time without reconfiguring.
- Import the same settings multiple times if needed.

## Using Migration

### During the Setup Wizard

Migration is Step 2 of the Setup Wizard. If compatible plugins are detected, you will see a list with an **Import** button next to each one. Click Import to create a SendGrail connection from those settings. If no plugins are detected, this step is skipped automatically.

### Standalone Migration Page

You can access migration at any time from the SendGrail admin panel by navigating to `#/migration`. This is useful if you:

- Skipped migration during the wizard.
- Installed a new SMTP plugin after initial setup and want to import its settings.
- Want to re-import settings after making changes in the original plugin.

## After Migration

Once settings are imported, SendGrail creates a new connection with the provider automatically identified based on the SMTP host. You should:

1. **Review the connection** -- Verify that all fields are correct on the Connections page.
2. **Send a test email** -- Confirm that the imported credentials are still valid.
3. **Set as default** -- If this should be your primary connection, set it as the default in Settings.
4. **Deactivate the old plugin** -- Once you have verified everything works, deactivate (but optionally keep installed) the original SMTP plugin to avoid conflicts.

::: warning
Do not run two SMTP plugins simultaneously. Both will try to hook into `wp_mail()`, which can cause unpredictable behavior. Deactivate the original plugin after confirming SendGrail is working.
:::
