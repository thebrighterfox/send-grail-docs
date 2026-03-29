# Hooks & Filters

SendGrail provides a set of WordPress actions and filters that allow developers to extend and customize plugin behavior. This page also documents the core WordPress hooks that SendGrail uses internally.

## Actions

### `sendgrail_loaded`

Fires after the SendGrail plugin has fully loaded and initialized. Receives the application instance as a parameter.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$app` | `SendGrail\App\Application` | The plugin application instance |

**Example:**

```php
add_action('sendgrail_loaded', function ($app) {
    // Plugin is ready, perform custom initialization
    error_log('SendGrail loaded successfully');
});
```

---

### `sendgrail_before_enqueue_admin_assets`

Fires immediately before SendGrail enqueues its admin JavaScript and CSS assets. Use this to conditionally load your own scripts or styles alongside the plugin's admin interface.

**Example:**

```php
add_action('sendgrail_before_enqueue_admin_assets', function () {
    wp_enqueue_script(
        'my-sendgrail-addon',
        plugin_dir_url(__FILE__) . 'js/addon.js',
        [],
        '1.0.0',
        true
    );
});
```

---

### `sendgrail_cleanup_logs`

Fires on a daily cron schedule. Handles automatic cleanup of old email logs based on the configured retention period.

**Example:**

```php
add_action('sendgrail_cleanup_logs', function () {
    // Perform additional cleanup tasks alongside log pruning
    global $wpdb;

    $wpdb->query(
        "DELETE FROM {$wpdb->prefix}my_custom_table
         WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY)"
    );
});
```

::: tip
The default retention period is configured in **Settings > Log Retention Days**. This action runs regardless of whether there are logs to delete.
:::

---

### `sendgrail_weekly_summary`

Fires on a weekly cron schedule. Triggers the generation and delivery of the weekly email summary report to configured recipients.

**Example:**

```php
add_action('sendgrail_weekly_summary', function () {
    // Send a copy to an external monitoring service
    wp_remote_post('https://hooks.example.com/email-stats', [
        'body' => json_encode([
            'site' => get_site_url(),
            'timestamp' => current_time('mysql'),
        ]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
});
```

---

## Filters

### `sendgrail_admin_roles`

Customize which WordPress user roles can access the SendGrail admin interface. By default, only users with the `administrator` role have access.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$roles` | `array` | `['administrator']` | Array of WordPress role slugs |

**Return:** `array` -- Array of role slugs that should have access.

**Example:**

```php
add_filter('sendgrail_admin_roles', function (array $roles): array {
    // Allow editors to view the SendGrail dashboard
    $roles[] = 'editor';
    return $roles;
});
```

::: warning
Granting access to non-administrator roles will allow those users to view email logs and connection credentials. Use with caution.
:::

---

### `sendgrail_before_render_submenus`

Modify the WordPress admin submenu items that appear under the SendGrail top-level menu. Use this to add, remove, or reorder submenu entries.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$submenus` | `array` | Array of submenu item definitions |

**Return:** `array` -- Modified array of submenu items.

**Example:**

```php
add_filter('sendgrail_before_render_submenus', function (array $submenus): array {
    // Add a custom submenu page
    $submenus[] = [
        'title'      => 'My Addon',
        'slug'       => 'sendgrail-my-addon',
        'capability' => 'manage_options',
        'callback'   => function () {
            echo '<div id="my-addon-app"></div>';
        },
    ];

    return $submenus;
});
```

---

### `sendgrail_before_render_menu_items`

Modify the top navigation menu items displayed within the SendGrail SPA interface. These are the tabs shown at the top of the plugin's admin pages.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$items` | `array` | Array of menu item definitions |

**Return:** `array` -- Modified array of menu items.

**Example:**

```php
add_filter('sendgrail_before_render_menu_items', function (array $items): array {
    // Add a custom tab to the SPA navigation
    $items[] = [
        'label' => 'Analytics',
        'route' => '/analytics',
        'icon'  => 'DataLine',
    ];

    return $items;
});
```

---

## WordPress Hooks Used by SendGrail

These are core WordPress hooks that SendGrail hooks into. They are listed here for reference so that developers understand potential interactions with other plugins.

### `phpmailer_init` (priority 999)

SendGrail configures the PHPMailer instance at priority 999 to override SMTP settings with the active connection configuration. This high priority ensures SendGrail's configuration takes precedence over other plugins.

```php
// How SendGrail uses this hook internally:
add_action('phpmailer_init', function (PHPMailer $phpmailer) {
    $phpmailer->isSMTP();
    $phpmailer->Host       = $connection->host;
    $phpmailer->Port       = $connection->port;
    $phpmailer->SMTPSecure = $connection->encryption;
    $phpmailer->SMTPAuth   = $connection->auth;
    $phpmailer->Username   = $connection->username;
    $phpmailer->Password   = $connection->decrypted_password;
}, 999);
```

::: info
If you need to modify PHPMailer settings after SendGrail, use a priority higher than 999 (e.g., 1000).
:::

---

### `wp_mail_from` / `wp_mail_from_name` (priority 999)

SendGrail overrides the sender email and display name using the values configured on the active connection.

```php
add_filter('wp_mail_from', function (string $from_email): string {
    // Returns the from_email from the active connection
    return $connection->from_email ?? $from_email;
}, 999);

add_filter('wp_mail_from_name', function (string $from_name): string {
    // Returns the from_name from the active connection
    return $connection->from_name ?? $from_name;
}, 999);
```

---

### `wp_mail_failed`

SendGrail listens for email failures to log them and optionally trigger the fallback mechanism. When fallback is enabled, a failed email is automatically retried through the next available connection.

```php
add_action('wp_mail_failed', function (WP_Error $error) {
    // Log the failure
    EmailLog::markFailed($log_id, $error->get_error_message());

    // Attempt fallback if enabled
    if (Settings::get('fallback_enabled')) {
        FallbackHandler::retry($original_args, $failed_connection_id);
    }
});
```

---

### `wp_mail_succeeded`

SendGrail listens for successful email delivery to update log entries with the success status and record a `sent` event.

```php
add_action('wp_mail_succeeded', function (array $mail_data) {
    EmailLog::markSent($log_id);
    EmailEvent::record($log_id, 'sent');
});
```

::: tip
Both `wp_mail_failed` and `wp_mail_succeeded` are WordPress 5.2+ hooks. SendGrail requires WordPress 6.0+, so these are always available.
:::
