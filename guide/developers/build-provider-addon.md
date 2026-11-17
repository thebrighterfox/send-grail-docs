# Build a Provider Add-on

SendGrail ships with 18 built-in providers. If you use an email service that isn't one of them,
such as your own sending API, a regional provider or a company mail gateway, you can add it with a
small companion plugin. You don't change SendGrail itself, and your provider keeps working when
SendGrail updates.

A provider added this way works like a built-in one. It appears in the connection picker and the
setup wizard, its fields render on the connection form, and its sends get logging, open and click
tracking, routing, fallback and failure alerts.

This page walks through a complete add-on for a fictional **Acme Mail** API. For every key a
provider config accepts, see the [Provider Config Reference](/guide/developers/custom-providers).

::: tip Only need SMTP?
If your provider gives you an SMTP host and login, you don't need an add-on. Use
[Other SMTP](/guide/connections/custom-smtp). To give many sites a pre-filled SMTP preset, see
[SMTP-only providers](#smtp-only-providers) below.
:::

## Requirements

- SendGrail 1.0.6 or later (it defines `SENDGRAIL_EXTENSION_API`)
- PHP 8.0 or later
- Your provider's API documentation

## File structure

```text
acme-mail-for-sendgrail/
├── acme-mail-for-sendgrail.php   # plugin header, constants, autoloader, boot hook
├── includes/
│   ├── Plugin.php                # checks SendGrail is present, registers the filters
│   ├── Provider.php              # provider config + handler mapping
│   └── AcmeMailHandler.php       # sends the email over the Acme API
├── assets/acme-mail.svg          # icon shown in the provider picker
└── languages/
```

The add-on needs no build step or Composer packages, and it stores no options or tables of its own.
Connections, settings and logs belong to SendGrail, so don't add an `uninstall.php`. The only data
it could delete is SendGrail's.

## 1. The main plugin file

```php
<?php
/*
 * Plugin Name: Acme Mail for SendGrail
 * Description: Adds Acme Mail as an email provider inside SendGrail SMTP.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Requires Plugins: sendgrail
 * License: GPL-2.0-or-later
 * Text Domain: acme-mail-for-sendgrail
 * Domain Path: /languages
 */

defined('ABSPATH') || exit;

define('ACME_MAIL_VERSION', '1.0.0');
define('ACME_MAIL_URL', plugin_dir_url(__FILE__));

// The SendGrail extension contract this add-on was written against.
define('ACME_MAIL_MIN_EXTENSION_API', 1);

spl_autoload_register(function ($class) {
    $prefix = 'AcmeMail\\';

    if (strpos($class, $prefix) !== 0) {
        return;
    }

    $relative = substr($class, strlen($prefix));

    // class_exists() passes any string through; reject traversal sequences
    // so a crafted name cannot require a file outside includes/.
    if (!preg_match('/^[A-Za-z0-9_\\\\]{1,128}$/', $relative)) {
        return;
    }

    $path = __DIR__ . '/includes/' . str_replace('\\', '/', $relative) . '.php';

    if (is_readable($path)) {
        require $path;
    }
});

add_action('init', function () {
    load_plugin_textdomain('acme-mail-for-sendgrail', false, dirname(plugin_basename(__FILE__)) . '/languages');
});

// Priority 1: SendGrail caches its provider and handler lists on first read,
// which can happen as soon as plugins_loaded starts firing.
add_action('plugins_loaded', [AcmeMail\Plugin::class, 'boot'], 1);
```

- **`Requires Plugins: sendgrail`** stops the add-on from being activated without SendGrail
  (WordPress 6.5+).
- **The autoloader** rejects class names containing anything but letters, digits, `_` and `\`.
  `class_exists()` passes any string to autoloaders, so without this check a name containing
  `../` could load an arbitrary PHP file.
- **Translations load on `init`.** WordPress warns when a text domain loads before the locale is set.
- **Boot on `plugins_loaded` at priority `1`.** SendGrail caches its provider and handler lists the
  first time they are read, and that can happen as soon as `plugins_loaded` starts.

## 2. Check that SendGrail is active

```php
<?php

namespace AcmeMail;

defined('ABSPATH') || exit;

class Plugin
{
    public static function boot(): void
    {
        if (!self::hostSupported()) {
            add_action('admin_notices', [self::class, 'renderRequirementNotice']);

            return;
        }

        add_filter('sendgrail/register_providers', [Provider::class, 'register']);
        add_filter('sendgrail/register_mail_handlers', [Provider::class, 'registerHandler']);
    }

    private static function hostSupported(): bool
    {
        return defined('SENDGRAIL_EXTENSION_API')
            && (int) SENDGRAIL_EXTENSION_API >= ACME_MAIL_MIN_EXTENSION_API;
    }

    public static function renderRequirementNotice(): void
    {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        $message = defined('SENDGRAIL_VERSION')
            ? __('Acme Mail for SendGrail needs a newer version of SendGrail SMTP.', 'acme-mail-for-sendgrail')
            : __('Acme Mail for SendGrail needs SendGrail SMTP to be installed and active.', 'acme-mail-for-sendgrail');

        printf('<div class="notice notice-warning"><p>%s</p></div>', esc_html($message));
    }
}
```

Run this check inside the `plugins_loaded` callback, not at the top of the main file. WordPress loads
plugins in alphabetical order by folder, so `acme-mail-for-sendgrail/` loads before `sendgrail/` and
SendGrail's constants don't exist yet when your main file runs.

Check `SENDGRAIL_EXTENSION_API`, not `SENDGRAIL_VERSION`. It's an integer that only changes when the
extension contract changes, so your add-on doesn't break every time SendGrail releases a new version.

## 3. Describe the provider

```php
<?php

namespace AcmeMail;

defined('ABSPATH') || exit;

class Provider
{
    public const SLUG = 'acmemail';

    /**
     * @param array<string, array<string, mixed>> $providers
     * @return array<string, array<string, mixed>>
     */
    public static function register(array $providers): array
    {
        $providers[self::SLUG] = [
            'name'      => 'Acme Mail',
            'type'      => 'api',
            'key_store' => 'db',
            'priority'  => 50,
            'docs_url'  => 'https://example.com/docs/acme-mail-for-sendgrail',
            'icon_url'  => ACME_MAIL_URL . 'assets/acme-mail.svg',
            'note'      => 'Transactional email over the Acme HTTPS API.',
            'from_hint' => 'Acme only sends from verified domains. Use an address at a domain verified in your Acme dashboard.',
            'constants' => [
                'password' => 'SENDGRAIL_ACME_API_KEY',
            ],
            'fields'    => [
                'host'       => ['hidden' => true],
                'port'       => ['hidden' => true],
                'encryption' => ['hidden' => true],
                'auth'       => ['hidden' => true],
                'auto_tls'   => ['hidden' => true],
                'username'   => ['hidden' => true, 'default' => 'acmemail'],
                'password'   => [
                    'label' => 'API Key',
                    'hint'  => 'Create one in your Acme dashboard under Settings, API Keys, with send access.',
                ],
            ],
            'extra_fields' => [
                'region' => [
                    'type'    => 'radio',
                    'label'   => 'Region',
                    'default' => 'us',
                    'options' => [
                        ['value' => 'us', 'label' => 'US'],
                        ['value' => 'eu', 'label' => 'EU'],
                    ],
                ],
            ],
        ];

        return $providers;
    }

    /**
     * @param array<string, string> $handlers
     * @return array<string, string>
     */
    public static function registerHandler(array $handlers): array
    {
        $handlers[self::SLUG] = AcmeMailHandler::class;

        return $handlers;
    }
}
```

- **`fields`** changes the standard connection form. `hidden` removes a field, `locked` shows the
  value but prevents editing, and `label`, `hint` and `default` change its text.
- **`extra_fields`** adds controls of your own (`text`, `select` or `radio`). The selected value is
  saved with the connection, and the handler reads it with `getMeta()`.
- **`constants`** names the `wp-config.php` constants used when an admin sets the connection's
  **Credential Storage** to **wp-config.php Constants**. Names must start with `SENDGRAIL_`; any
  other name is dropped.
- **Text values** pass through `sanitize_text_field()`, which strips angle brackets. Write
  `@your-domain`, not `@<your-domain>`.

## 4. Write the handler

A handler extends `SendGrail\App\Mail\Handlers\AbstractHandler` and implements one method:

```php
public function send(PHPMailer $mail, ConnectionData $connection): MailResult
```

`$mail` arrives fully built, with recipients, subject, HTML or text body, custom headers and
attachments. Convert it to your API's format and return a `MailResult`.

```php
<?php

namespace AcmeMail;

defined('ABSPATH') || exit;

use PHPMailer\PHPMailer\PHPMailer;
use SendGrail\App\Data\ConnectionData;
use SendGrail\App\Mail\Handlers\AbstractHandler;
use SendGrail\App\Mail\MailResult;
use SendGrail\App\Services\SettingsService;

class AcmeMailHandler extends AbstractHandler
{
    /**
     * The region setting picks from this list and is never put into a URL,
     * so a saved form value cannot send the API key to another host.
     */
    private const ENDPOINTS = [
        'us' => 'https://api.acme-mail.example/v1/emails',
        'eu' => 'https://api.eu.acme-mail.example/v1/emails',
    ];

    public function send(PHPMailer $mail, ConnectionData $connection): MailResult
    {
        $apiKey = $this->getCredential($connection, 'password');

        if ($apiKey === '') {
            return MailResult::fail('Acme Mail: API key is required.');
        }

        $region   = $this->getMeta($connection, 'region', 'us');
        $endpoint = self::ENDPOINTS[$region] ?? self::ENDPOINTS['us'];

        $body = wp_json_encode($this->buildPayload($mail));

        if ($body === false) {
            return MailResult::fail('Acme Mail: could not encode the message as JSON.');
        }

        $response = wp_safe_remote_post($endpoint, [
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json',
            ],
            'body'    => $body,
            'timeout' => (int) SettingsService::get('connection_timeout', 30),
        ]);

        if (is_wp_error($response)) {
            return MailResult::fail('Acme Mail: ' . $response->get_error_message());
        }

        $code         = (int) wp_remote_retrieve_response_code($response);
        $responseBody = (string) wp_remote_retrieve_body($response);

        if ($code >= 200 && $code < 300) {
            $decoded   = json_decode($responseBody, true);
            $messageId = is_array($decoded) ? (string) ($decoded['id'] ?? '') : '';

            return MailResult::ok($responseBody, $messageId !== '' ? $messageId : null);
        }

        return MailResult::fail($this->parseError($responseBody, $code), $responseBody);
    }

    private function buildPayload(PHPMailer $mail): array
    {
        $payload = [
            'from'    => $this->formatAddress($mail->From, $mail->FromName),
            'to'      => $this->formatAddressList($mail->getToAddresses()),
            'subject' => (string) $mail->Subject,
        ];

        if ($mail->ContentType === PHPMailer::CONTENT_TYPE_TEXT_HTML) {
            $payload['html'] = (string) $mail->Body;
            if ($mail->AltBody !== '') {
                $payload['text'] = (string) $mail->AltBody;
            }
        } else {
            $payload['text'] = (string) $mail->Body;
        }

        $optionalLists = [
            'cc'       => $mail->getCcAddresses(),
            'bcc'      => $mail->getBccAddresses(),
            'reply_to' => $mail->getReplyToAddresses(),
        ];

        foreach ($optionalLists as $key => $addresses) {
            $formatted = $this->formatAddressList($addresses);
            if (!empty($formatted)) {
                $payload[$key] = $formatted;
            }
        }

        $headers = [];
        foreach ($mail->getCustomHeaders() as [$name, $value]) {
            if ($name !== '' && $value !== '') {
                $headers[$name] = $value;
            }
        }
        if (!empty($headers)) {
            $payload['headers'] = $headers;
        }

        $attachments = $this->readAttachments($mail);
        if (!empty($attachments)) {
            $payload['attachments'] = array_map(static fn(array $file) => [
                'filename'     => $file['name'],
                'content'      => $file['content_b64'],
                'content_type' => $file['type'],
            ], $attachments);
        }

        return $payload;
    }

    private function formatAddress(string $email, string $name = ''): string
    {
        return $name !== '' ? "{$name} <{$email}>" : $email;
    }

    /**
     * @param array<int|string, array{0: string, 1?: string}> $addresses PHPMailer's [email, name] pairs
     * @return array<int, string>
     */
    private function formatAddressList(array $addresses): array
    {
        $formatted = [];

        foreach ($addresses as $address) {
            $email = (string) ($address[0] ?? '');
            if ($email !== '') {
                $formatted[] = $this->formatAddress($email, (string) ($address[1] ?? ''));
            }
        }

        return $formatted;
    }

    /**
     * The message ends up in SendGrail's logs and failure alerts, so it is
     * capped rather than echoing an arbitrarily large response body.
     */
    private function parseError(string $body, int $code): string
    {
        $decoded = json_decode($body, true);

        if (is_array($decoded) && is_string($decoded['message'] ?? null) && $decoded['message'] !== '') {
            return 'Acme Mail: ' . $decoded['message'];
        }

        if ($body !== '') {
            return 'Acme Mail: HTTP ' . $code . ' - ' . substr($body, 0, 300);
        }

        return 'Acme Mail: HTTP ' . $code . ' (empty response).';
    }
}
```

### Helpers from `AbstractHandler`

| Helper | Returns |
| --- | --- |
| `getCredential($connection, 'password')` | The decrypted credential, or the `wp-config.php` constant when the connection uses constant storage |
| `getMeta($connection, 'region', 'us')` | An `extra_fields` value, with the same constant support |
| `readAttachments($mail)` | Every attachment, from a file path or in memory, as `name`, `type` and `content_b64` |

Use these rather than reading credentials yourself.

### Returning a result

- `MailResult::ok($rawResponse, $messageId)` logs the email as **Sent**. Pass the provider's message
  ID so log entries can be matched to the provider's dashboard.
- `MailResult::fail($message, $rawResponse)` logs it as **Failed**, then SendGrail retries on the
  [fallback connection](/guide/fallback) and sends [failure alerts](/features/failure-alerts).

Return a failure rather than throwing an exception. The failure message is what admins see in the
log and in alerts.

## Security checklist

The handler receives every email the site sends, including password resets and order receipts.

- **Don't build the API URL from saved settings.** Pick from a fixed list, as `ENDPOINTS` does. An
  invalid region falls back to the US endpoint instead of sending the API key to another host.
- **Use `wp_safe_remote_post()` over HTTPS.** It refuses local and private-network addresses. Never
  set `sslverify => false`.
- **Never log or return the API key.** Don't `error_log()` request headers.
- **Use SendGrail's timeout.** `SettingsService::get('connection_timeout', 30)` is the
  **Connection Timeout** admins set in SendGrail's settings.
- **Cap error messages.** They appear in logs and in Slack, Discord and Telegram alerts.

## Testing

### In the dashboard

1. Activate the add-on and open **SendGrail → Connections → Add Connection**. Your provider should
   be listed with its icon and fields. If it's missing, the config failed validation. Check `name`,
   `type` and the slug (lowercase letters, digits, `-` and `_`, up to 32 characters).
2. Save a connection with a real API key and click **Send Test Email**.
3. Open **Email Logs** and check the entry is marked *Sent*. Then send with a wrong key and check
   the failure message is readable.
4. Set a working connection as the backup, break your add-on's key, and send again. The email should
   go out through the backup.

### With WP-CLI, without a real account

WordPress's `pre_http_request` filter intercepts the API call, so you can inspect the payload and
return any response:

```php
// test-acme.php, run with: wp eval-file test-acme.php
require_once ABSPATH . WPINC . '/PHPMailer/PHPMailer.php';
require_once ABSPATH . WPINC . '/PHPMailer/Exception.php';

add_filter('pre_http_request', function ($pre, $args, $url) {
    echo $url . PHP_EOL . $args['body'] . PHP_EOL;

    return ['response' => ['code' => 202], 'body' => '{"id":"msg_123"}', 'headers' => [], 'cookies' => []];
}, 10, 3);

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$mail->setFrom('site@example.com', 'My Site');
$mail->addAddress('alice@example.com', 'Alice');
$mail->isHTML(true);
$mail->Subject = 'Hello';
$mail->Body    = '<p>Hello</p>';

$connection = SendGrail\App\Data\ConnectionData::fromArray([
    'provider' => 'acmemail',
    'password' => 'test-key',
    'meta'     => ['region' => 'eu'],
]);

$result = SendGrail\App\Mail\HandlerRegistry::get('acmemail')->send($mail, $connection);

var_dump($result->ok, $result->messageId);
```

Change the fake response to a `422` with a JSON error, a `500` with a long body, or a `WP_Error`, and
check that each comes back as a short `MailResult::fail()` message.

## SMTP-only providers

If the provider only offers SMTP, skip the handler and reuse SendGrail's own SMTP handler. One file
is enough:

```php
<?php
/*
 * Plugin Name: Acme Relay for SendGrail
 * Description: Adds Acme Relay as a provider in SendGrail SMTP.
 * Version: 1.0.0
 * Requires PHP: 8.0
 * Requires Plugins: sendgrail
 */

defined('ABSPATH') || exit;

add_action('plugins_loaded', function () {
    if (!defined('SENDGRAIL_EXTENSION_API') || SENDGRAIL_EXTENSION_API < 1) {
        return;
    }

    add_filter('sendgrail/register_providers', function (array $providers) {
        $providers['acme-relay'] = [
            'name'        => 'Acme Relay',
            'type'        => 'smtp',
            'priority'    => 10,
            'note'        => 'Company mail relay for all client sites.',
            'from_hint'   => 'Use an address on a domain verified in the Acme Relay panel.',
            'host'        => 'smtp.acme-relay.example',
            'port'        => 587,
            'encryption'  => 'tls',
            'auth'        => true,
            'auto_tls'    => true,
            'return_path' => true,
            'constants'   => [
                'username' => 'SENDGRAIL_ACME_RELAY_USERNAME',
                'password' => 'SENDGRAIL_ACME_RELAY_PASSWORD',
            ],
            'fields'      => [
                'host'       => ['locked' => true],
                'port'       => ['locked' => true],
                'encryption' => ['hidden' => true],
                'auth'       => ['hidden' => true],
                'auto_tls'   => ['hidden' => true],
                'password'   => ['hint' => 'Ask the IT team for this site\'s relay password.'],
            ],
        ];

        return $providers;
    });

    add_filter('sendgrail/register_mail_handlers', function (array $handlers) {
        $handlers['acme-relay'] = \SendGrail\App\Mail\Handlers\SmtpHandler::class;

        return $handlers;
    });
}, 1);
```

## When a plugin is deactivated

- **The add-on is deactivated:** connections that use the provider stay saved, but no handler
  matches them. SendGrail hands those emails to WordPress's default mailer instead of failing them,
  and the connection works again when the add-on is reactivated.
- **SendGrail is deactivated:** the add-on finds no `SENDGRAIL_EXTENSION_API`, registers nothing and
  shows a notice. The handler class, which extends a SendGrail class, is never loaded, so nothing
  fatals.
