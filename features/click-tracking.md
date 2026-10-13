# Click Tracking

Click tracking monitors which links recipients click in your emails. When enabled, SendGrail rewrites links in HTML emails to pass through a tracking endpoint that records the click before redirecting to the original destination.

## How It Works

1. **Link rewriting** -- Every `http://` / `https://` link in an HTML email is rewritten to point to a tracking URL on your WordPress site.

2. **Tracking URL format**:
   ```
   /wp-json/sendgrail/v2/t/click/{tracking_id}?u={destination}&s={signature}
   ```
   - `tracking_id` -- The unique UUID assigned to the email
   - `u` -- The original destination URL (base64url-encoded)
   - `s` -- A signature made with your site's secret keys, so the endpoint only redirects to links your site actually sent (it cannot be used as an open redirect)

3. **No expiry** -- The destination travels inside the link itself, so tracked links keep working however old the email is, even after its log entry has been deleted by the retention policy.

4. **Click handling** -- When a recipient clicks a tracked link:
   - The click event is recorded (IP, User-Agent, original URL, timestamp)
   - A **302 redirect** sends the user to the original destination URL, unchanged

5. **Denormalized counts** -- For fast access, `click_count` and `first_clicked_at` are stored directly on the email log entry.

## Works With Other Tracking

SendGrail keeps every destination exactly as it was written, including its full query string. That means it can be stacked with other tracking layers and each one still works:

- **CRM / marketing plugins** (e.g. FluentCRM) -- their own tracked links and the campaign **UTM parameters** they add are passed through untouched. The CRM still records the click and appends its UTMs.
- **UTM parameters in your links** -- `utm_source`, `utm_medium`, `utm_campaign`, etc. reach the destination unchanged.
- **Provider click tracking** (e.g. Resend, SendGrid, Mailgun) -- the provider wraps SendGrail's link, so a click goes provider → SendGrail → CRM → destination, and every layer records it.

## Skipped Links

The following links are **not rewritten** and are left as-is:

| Link Type | Example |
|-----------|---------|
| Non-web links | `mailto:user@example.com`, `tel:+1234567890`, `#section-name`, relative paths |
| Merge tags filled in by a provider or CRM | `%unsubscribe_url%`, `*\|UNSUB\|*`, `[[UNSUB_LINK_EN]]`, `<%asm_group_unsubscribe_raw_url%>`, <code v-pre>https://example.com/?e={{email}}</code> |
| Already-tracked URLs | Links that already point to the SendGrail tracking endpoint |
| Very long URLs | Links longer than about 6 KB -- they still work, they just aren't tracked |

Merge tags are skipped because the provider replaces them after SendGrail hands the email off -- wrapping them would break unsubscribe and personalised links.

## Configuration

Click tracking is controlled by the `enable_click_tracking` setting in the plugin settings page. Toggle it on or off as needed. It works on its own -- open tracking does not need to be enabled.

When disabled, links in outgoing emails are not modified and no click events are recorded.

## Viewing Click Data

Click tracking data is available in the [email report view](/features/email-logging#email-report-view) for each individual email:

- **Click count** -- Total number of link clicks across all links in the email
- **First clicked** -- Timestamp of the first recorded click
- **Event timeline** -- Chronological list of click events showing which URL was clicked, along with IP, User-Agent, and timestamp

## Privacy Considerations

Click tracking records IP addresses, User-Agent strings, and the URLs that recipients interact with. This data can reveal user behavior patterns. Ensure your use of click tracking complies with applicable privacy regulations and that your privacy policy appropriately discloses this practice.
