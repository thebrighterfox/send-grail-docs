# Open Tracking

Open tracking allows you to monitor when recipients open your emails. When enabled, SendGrail embeds an invisible tracking pixel in HTML emails and records each time it is loaded.

## How It Works

1. **Pixel injection** -- When an HTML email is sent, SendGrail injects an invisible 1x1 transparent GIF image just before the closing `</body>` tag.

2. **Unique identifier** -- Each email is assigned a unique UUID (`tracking_id`) that is embedded in the pixel URL.

3. **Tracking URL** -- The pixel loads from your WordPress site:
   ```
   /wp-json/sendgrail/v2/t/{tracking_id}
   ```

4. **Open detection** -- When the recipient's email client renders the email and loads images, the pixel URL is requested from your server.

5. **Event recording** -- SendGrail records the following data for each open event:
   - IP address
   - User-Agent string
   - Timestamp

6. **Denormalized counts** -- For fast access, the `open_count` and `opened_at` (first open timestamp) fields are stored directly on the email log entry.

## Conditions and Limitations

::: warning
Open tracking relies on the recipient's email client loading remote images. Many email clients block images by default, so open tracking will **undercount** actual opens. Treat open rates as a lower-bound estimate, not an exact measurement.
:::

- **HTML emails only** -- Plain text emails do not support pixel injection. Open tracking is automatically skipped for plain text messages.
- **Primary sends only** -- The tracking pixel is injected only on the primary send attempt. Fallback attempts do not receive a separate pixel to avoid duplicate tracking.

## Configuration

Open tracking is controlled by the `enable_open_tracking` setting in the plugin settings page. Toggle it on or off as needed.

When disabled, no tracking pixel is injected into outgoing emails and no open events are recorded.

## Viewing Open Data

Open tracking data is available in the [email report view](/features/email-logging#email-report-view) for each individual email:

- **Open count** -- Total number of times the tracking pixel was loaded
- **First opened** -- Timestamp of the first recorded open
- **Event timeline** -- Chronological list of all open events with IP, User-Agent, and timestamp

::: tip
Multiple opens from the same recipient are counted individually. A high open count on a single email may indicate the recipient opened it multiple times or that the email was forwarded.
:::

## Privacy Considerations

Open tracking collects IP addresses and User-Agent strings. Ensure that your use of open tracking complies with applicable privacy regulations (such as GDPR or CCPA) and that your site's privacy policy discloses email tracking practices where required.
