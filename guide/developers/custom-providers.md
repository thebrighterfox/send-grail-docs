# Registering a Custom Provider

*Requires a SendGrail release that defines `SENDGRAIL_EXTENSION_API`.*

SendGrail ships with 18 built-in providers. If you run your own sending service, or need a provider
SendGrail does not cover, a companion plugin can register one through two filters. No changes to the
SendGrail plugin are needed, and your provider survives SendGrail updates.

A registered provider behaves like a built-in one everywhere: it appears in the connection picker
and the setup wizard, its fields render on the connection form, it participates in routing and
fallback, and its sends are logged and tracked.

## The two filters

| Filter | Returns | Purpose |
| --- | --- | --- |
| `sendgrail/register_providers` | `[slug => config]` | The provider preset — name, credentials, form fields |
| `sendgrail/register_mail_handlers` | `[slug => class-string]` | The class that actually sends the mail |

Both are **additive only**. Built-in providers always win on a slug collision, so registering
`sendgrid` will not override SendGrail's own SendGrid support.

Register on `plugins_loaded` at priority `1`. SendGrail caches both maps the first time they are
read, and reads become possible as soon as `plugins_loaded` starts firing.

Gate your plugin on `SENDGRAIL_EXTENSION_API` rather than `SENDGRAIL_VERSION`. It is an integer
contract version for these filters, bumped only when they change shape, so it does not move with
SendGrail's release numbering:

```php
if (!defined('SENDGRAIL_EXTENSION_API') || SENDGRAIL_EXTENSION_API < 1) {
    return; // SendGrail is missing or too old — show a notice instead
}
```

## A minimal example

```php
add_action('plugins_loaded', function () {
    add_filter('sendgrail/register_providers', function (array $providers) {
        $providers['acmemail'] = [
            'name'      => 'Acme Mail',
            'type'      => 'api',            // 'api', 'smtp' or 'php'
            'key_store' => 'db',
            'priority'  => 50,               // lower sorts earlier in the picker
            'note'      => 'Acme transactional email.',
            'icon_url'  => plugins_url('assets/acme.svg', __FILE__),
            'constants' => [
                'password' => 'SENDGRAIL_ACME_API_KEY',
            ],
            'fields'    => [
                'host'       => ['hidden' => true],
                'port'       => ['hidden' => true],
                'encryption' => ['hidden' => true],
                'auth'       => ['hidden' => true],
                'auto_tls'   => ['hidden' => true],
                'username'   => ['hidden' => true, 'default' => 'acme'],
                'password'   => [
                    'label' => 'API Key',
                    'hint'  => 'Generate one in your Acme dashboard under API Keys.',
                ],
            ],
        ];

        return $providers;
    });

    add_filter('sendgrail/register_mail_handlers', function (array $handlers) {
        $handlers['acmemail'] = \AcmeMail\Handler::class;

        return $handlers;
    });
}, 1);
```

## Writing the handler

Extend `SendGrail\App\Mail\Handlers\AbstractHandler` and implement `send()`. The base class gives you
`getCredential()`, `getMeta()` and `readAttachments()`, which resolve credentials through SendGrail's
encrypted storage and its `wp-config.php` constant support — do not re-implement those.

```php
namespace AcmeMail;

use PHPMailer\PHPMailer\PHPMailer;
use SendGrail\App\Data\ConnectionData;
use SendGrail\App\Mail\Handlers\AbstractHandler;
use SendGrail\App\Mail\MailResult;

class Handler extends AbstractHandler
{
    public function send(PHPMailer $mail, ConnectionData $connection): MailResult
    {
        $apiKey = $this->getCredential($connection, 'password');

        if ($apiKey === '') {
            return MailResult::fail('Acme Mail: API key is required.');
        }

        $response = wp_remote_post('https://api.acme.test/v1/send', [
            'headers' => ['Authorization' => 'Bearer ' . $apiKey],
            'body'    => wp_json_encode([
                'from'    => $mail->From,
                'to'      => array_column($mail->getToAddresses(), 0),
                'subject' => $mail->Subject,
                'html'    => $mail->Body,
            ]),
        ]);

        if (is_wp_error($response)) {
            return MailResult::fail('Acme Mail: ' . $response->get_error_message());
        }

        $code = (int) wp_remote_retrieve_response_code($response);
        $body = (string) wp_remote_retrieve_body($response);

        return $code >= 200 && $code < 300
            ? MailResult::ok($body)
            : MailResult::fail('Acme Mail: HTTP ' . $code, $body);
    }
}
```

A handler class is only trusted if it exists and actually implements
`SendGrail\App\Mail\Handlers\HandlerInterface`. Anything else is ignored.

## Config reference

Registered provider configs are validated against an allowlist. **Keys not listed here are dropped**,
and a provider that fails a required rule is skipped entirely rather than partially applied.

| Key | Type | Notes |
| --- | --- | --- |
| `name` | string | **Required.** Max 64 characters |
| `type` | string | **Required.** `api`, `smtp` or `php` |
| `key_store` | string | `db` (default) or `const` |
| `priority` | int | Picker order, default `100`; lower sorts earlier |
| `note` | string | Shown on the provider card |
| `from_hint` | string | Shown under the From Email field |
| `docs_url` | string | `http`/`https` only |
| `icon_url` | string | `http`/`https`, or a base64 `data:image/*` URI under 32 KB |
| `host`, `port`, `encryption` | string / int / string | SMTP defaults; `encryption` is `tls`, `ssl` or `none` |
| `auth`, `auto_tls`, `return_path` | bool | SMTP behaviour defaults |
| `strip_password_whitespace` | bool | Strips spaces from pasted app passwords |
| `constants` | array | `field => CONSTANT_NAME`; see below |
| `fields` | array | Per-field `label`, `hint`, `default`, `hidden`, `locked` |

::: warning Constant names must be namespaced
Values in `constants` are read back with `constant()`, so registered providers may only reference
constants matching `SENDGRAIL_*`. `SENDGRAIL_ACME_API_KEY` is accepted; `DB_PASSWORD` is silently
dropped.
:::

::: tip Text is sanitized
`name`, `note`, `from_hint` and field labels pass through `sanitize_text_field()`, which strips
angle brackets. Write `@your-domain`, not `@<your-domain>`.
:::

## Not yet supported

`oauth`, `auth_methods` and `extra_fields` cannot be supplied by a registered provider. They require
validation that is not in place yet, and are dropped from a registered config. Providers needing
OAuth still have to be built into SendGrail itself.

## When your plugin is deactivated

Connections using your provider stay in the database but stop matching a handler. SendGrail hands
those sends back to WordPress's native mailer rather than failing, and the connection becomes
read-only until your plugin is active again.
