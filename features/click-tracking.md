# Click Tracking

Click tracking monitors which links recipients click in your emails. When enabled, SendGrail rewrites links in HTML emails to pass through a tracking endpoint that records the click before redirecting to the original destination.

## How It Works

1. **Link rewriting** -- All `<a href>` links in HTML emails are rewritten to point to a tracking URL on your WordPress site.

2. **Tracking URL format**:
   ```
   /wp-json/sendgrail/v2/t/click/{tracking_id}/{link_hash}
   ```
   - `tracking_id` -- The unique UUID assigned to the email
   - `link_hash` -- The first 12 characters of the MD5 hash of the original URL

3. **URL map storage** -- A mapping of link hashes to original URLs is stored in a WordPress transient with a **30-day TTL**.

4. **Click handling** -- When a recipient clicks a tracked link:
   - The click event is recorded (IP, User-Agent, original URL, timestamp)
   - A **302 redirect** sends the user to the original destination URL

5. **Denormalized counts** -- For fast access, `click_count` and `first_clicked_at` are stored directly on the email log entry.

## Skipped Links

The following link types are **not rewritten** and are left as-is:

| Link Type | Example |
|-----------|---------|
| Mailto links | `mailto:user@example.com` |
| Telephone links | `tel:+1234567890` |
| Anchor links | `#section-name` |
| JavaScript links | `javascript:void(0)` |
| Already-tracked URLs | Links that already point to the SendGrail tracking endpoint |

## Configuration

Click tracking is controlled by the `enable_click_tracking` setting in the plugin settings page. Toggle it on or off as needed.

When disabled, links in outgoing emails are not modified and no click events are recorded.

## Viewing Click Data

Click tracking data is available in the [email report view](/features/email-logging#email-report-view) for each individual email:

- **Click count** -- Total number of link clicks across all links in the email
- **First clicked** -- Timestamp of the first recorded click
- **Event timeline** -- Chronological list of click events showing which URL was clicked, along with IP, User-Agent, and timestamp

## URL Map Expiration

::: warning
The URL map transient has a **30-day TTL**. After 30 days, tracked links in older emails will no longer redirect correctly because the original URL can no longer be resolved from the link hash. Recipients clicking expired tracked links will see an error.
:::

::: tip
If long-term link functionality is critical, consider the retention implications of the 30-day transient window when planning your email retention policy.
:::

## Privacy Considerations

Click tracking records IP addresses, User-Agent strings, and the URLs that recipients interact with. This data can reveal user behavior patterns. Ensure your use of click tracking complies with applicable privacy regulations and that your privacy policy appropriately discloses this practice.
