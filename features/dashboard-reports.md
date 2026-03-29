# Dashboard and Reports

SendGrail provides a real-time dashboard for quick status checks and a detailed reports page for in-depth analysis of your email delivery performance.

## Dashboard

The dashboard is the first screen you see when opening SendGrail. It provides an at-a-glance overview of your email activity.

::: info
If no SMTP connections have been configured, the dashboard automatically redirects to the setup wizard.
:::

### Stat Cards

Four summary cards are displayed at the top of the dashboard:

| Card | Description |
|------|-------------|
| **Total Emails** | Total number of emails processed |
| **Emails Sent** | Count of successfully delivered emails |
| **Emails Failed** | Count of failed delivery attempts |
| **Success Rate** | Percentage of successful deliveries |

Each card includes a **7-day trend arrow** indicating whether the metric is trending up or down compared to the previous period.

### Email Volume Chart

A bar chart showing email volume over time with three selectable ranges:

- **7 days** -- Daily breakdown for the past week
- **30 days** -- Daily breakdown for the past month
- **90 days** -- Daily breakdown for the past quarter

### Delivery Breakdown Chart

A donut chart showing the distribution of email outcomes:

- **Sent** -- Successfully delivered
- **Failed** -- Delivery failed
- **Opened** -- Delivered and opened by recipient (when [open tracking](/features/open-tracking) is enabled)

### Recent Activity

A table displaying the **last 10 emails** with key details including recipient, subject, status, and timestamp.

### Recent Failures

A dedicated section listing the **last 5 failed emails** for quick identification of delivery issues. This section helps you spot problems without navigating to the full email log.

## Reports Page

The reports page provides deeper analytics for understanding email performance over time.

### Overview Metrics

A comprehensive set of delivery and engagement metrics:

| Metric | Description |
|--------|-------------|
| **Total** | Total emails processed |
| **Sent** | Successfully delivered |
| **Failed** | Failed delivery attempts |
| **Opened** | Emails opened by recipients |
| **Clicked** | Emails with at least one link click |
| **Delivery Rate** | Sent / Total |
| **Open Rate** | Opened / Sent |
| **Click Rate** | Clicked / Sent |
| **Bounce Rate** | Failed / Total |

### Send Activity Heatmap

A grid visualization showing email sending patterns over the **last 30 days**:

- **Rows**: Days of the week (Monday through Sunday)
- **Columns**: Hours of the day (0 through 23)
- **Color intensity**: Represents the volume of emails sent during that time slot

This heatmap helps you understand when your site sends the most email and identify unusual patterns.

### Per-Connection Performance

A table breaking down performance by individual SMTP connection:

| Column | Description |
|--------|-------------|
| **Name** | Connection name |
| **Provider** | SMTP provider |
| **Total** | Total emails attempted |
| **Sent** | Successfully delivered |
| **Failed** | Delivery failures |
| **Opened** | Emails opened |
| **Delivery Rate** | Success percentage for this connection |

This view is particularly useful when you have multiple connections and need to compare the reliability and engagement metrics of different providers.

::: tip
Use the per-connection performance table to identify underperforming providers. A connection with a significantly lower delivery rate than others may indicate configuration issues or provider-side problems.
:::
