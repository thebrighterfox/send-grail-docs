# Test Email and Simulation

SendGrail provides two tools for verifying your email configuration: **Test Email** sends a real message, while **Email Simulation** performs a dry run to validate routing and connection resolution without delivering anything.

## Test Email

The test email feature sends an actual email through your configured SMTP connection to verify end-to-end delivery.

### Options

| Field | Description |
|-------|-------------|
| **Connection** | Select a specific connection or use the default |
| **Recipient** | The email address to send the test to |
| **Subject** | Custom subject line for the test email |
| **Message** | Custom message body |

### What Gets Sent

The test email is an HTML-formatted message containing your custom message along with a verification notice confirming that the email was sent through SendGrail. This helps the recipient (typically yourself) confirm delivery and rendering.

### Fallback Detection

If your selected connection fails and the email is delivered via a fallback mechanism, SendGrail reports this in the test result. This alerts you that your primary connection may have an issue even though the email was ultimately delivered.

::: tip
After setting up a new connection, always send a test email to confirm it works before relying on it for production traffic.
:::

::: warning
Test emails are real emails and will appear in your email log. They count toward your provider's sending limits.
:::

## Email Simulation {#email-simulation}

Email simulation is a **dry-run mode** that evaluates your configuration without sending any email. It is accessible via the **Simulate** button on the Test Email page.

### What Simulation Reports

| Output | Description |
|--------|-------------|
| **Connection** | Which SMTP connection would be used |
| **From Email** | The resolved sender email address |
| **From Name** | The resolved sender display name |
| **Tracking Flags** | Whether open tracking and click tracking would be applied |
| **Routing Rule Match** | Which routing rule matched (if any), or indicates default routing |

### When to Use Simulation

- **Verify routing rules** -- Confirm that a specific email would be routed to the correct connection based on your rules
- **Check connection resolution** -- See which connection would handle the email without risking a delivery failure
- **Debug configuration** -- Identify unexpected behavior in your routing or connection setup

::: details Example workflow
1. Create a routing rule that sends WooCommerce emails through Postmark
2. Open the Test Email page and click **Simulate**
3. Enter a subject containing "order" and run the simulation
4. Confirm the output shows the Postmark connection and the correct routing rule
5. Once satisfied, send a real test email to verify delivery
:::
