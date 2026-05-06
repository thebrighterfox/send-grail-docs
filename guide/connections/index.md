# Provider Setup Guides

Step-by-step walkthroughs for connecting each supported email provider to SendGrail. Pick your provider below and follow the guide — most setups take **2 to 10 minutes** depending on the provider.

::: tip What's a "connection"?
A **connection** is a saved set of credentials for one email provider. You can have multiple connections (e.g. SendGrid for marketing, Postmark for transactional) and switch between them per email using [Email Routing](/features/email-routing).
:::

## OAuth-based (most secure)

Recommended for personal Gmail / Outlook accounts and Google Workspace / Microsoft 365 organizations. No SMTP password stored in WordPress — uses signed tokens that auto-rotate.

<ul class="conn-index">
  <li><a href="/guide/connections/gmail-oauth"><div class="conn-index__logo"><img src="/provider-icons/gmail.svg" alt="" /><strong>Gmail OAuth</strong></div><small>Personal Gmail accounts via Google Cloud OAuth client.</small><span class="conn-index__pill conn-index__pill--oauth">OAuth · Easy</span></a></li>
  <li><a href="/guide/connections/google-workspace"><div class="conn-index__logo"><img src="/provider-icons/gmail.svg" alt="" /><strong>Google Workspace</strong></div><small>Domain-verified Workspace accounts with full OAuth + DKIM.</small><span class="conn-index__pill conn-index__pill--oauth">OAuth · Medium</span></a></li>
  <li><a href="/guide/connections/outlook"><div class="conn-index__logo"><img src="/provider-icons/outlook.svg" alt="" /><strong>Outlook / Microsoft 365</strong></div><small>Personal Outlook.com / Hotmail or business Microsoft 365 mailboxes via Azure app.</small><span class="conn-index__pill conn-index__pill--oauth">OAuth · Medium</span></a></li>
</ul>

## API-based providers

API providers offer the highest deliverability and detailed engagement events. Setup is a 1-input step — paste an API key.

<ul class="conn-index">
  <li><a href="/guide/connections/sendgrid"><div class="conn-index__logo"><img src="/provider-icons/sendgrid.svg" alt="" /><strong>SendGrid</strong></div><small>Twilio's transactional email service. Enterprise-grade delivery.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/mailgun"><div class="conn-index__logo"><img src="/provider-icons/mailgun.svg" alt="" /><strong>Mailgun</strong></div><small>Sinch's email API with detailed analytics and webhooks.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/postmark"><div class="conn-index__logo"><img src="/provider-icons/postmark.svg" alt="" /><strong>Postmark</strong></div><small>ActiveCampaign's transactional email — fast, reliable.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/amazon-ses"><div class="conn-index__logo"><img src="/provider-icons/amazonses.svg" alt="" /><strong>Amazon SES</strong></div><small>AWS Simple Email Service. Cheap at high volumes.</small><span class="conn-index__pill">API · Medium</span></a></li>
  <li><a href="/guide/connections/brevo"><div class="conn-index__logo"><img src="/provider-icons/brevo.svg" alt="" /><strong>Brevo</strong></div><small>Formerly Sendinblue. Email + SMS marketing platform.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/mandrill"><div class="conn-index__logo"><img src="/provider-icons/mandrill.svg" alt="" /><strong>Mandrill</strong></div><small>Mailchimp's transactional add-on. Requires paid plan.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/sparkpost"><div class="conn-index__logo"><img src="/provider-icons/sparkpost.svg" alt="" /><strong>SparkPost</strong></div><small>MessageBird's email infrastructure. High-volume sending.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/elastic-email"><div class="conn-index__logo"><img src="/provider-icons/elasticemail.svg" alt="" /><strong>Elastic Email</strong></div><small>Affordable transactional + marketing platform.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/smtp2go"><div class="conn-index__logo"><img src="/provider-icons/smtp2go.svg" alt="" /><strong>SMTP2GO</strong></div><small>Reliable SMTP relay with global infrastructure.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/mailjet"><div class="conn-index__logo"><img src="/provider-icons/mailjet.svg" alt="" /><strong>Mailjet</strong></div><small>Sinch's email platform with API key/secret pair.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/netcore"><div class="conn-index__logo"><img src="/provider-icons/netcore.svg" alt="" /><strong>Netcore Email</strong></div><small>Customer engagement platform with email API.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/sendlayer"><div class="conn-index__logo"><img src="/provider-icons/sendlayer.svg" alt="" /><strong>SendLayer</strong></div><small>WordPress-focused SMTP service from the makers of WPForms.</small><span class="conn-index__pill">API · Easy</span></a></li>
  <li><a href="/guide/connections/resend"><div class="conn-index__logo"><img src="/provider-icons/resend.svg" alt="" /><strong>Resend</strong></div><small>Developer-focused transactional email API.</small><span class="conn-index__pill">API · Easy</span></a></li>
</ul>

## SMTP-based providers

Username + password authentication over standard SMTP ports.

<ul class="conn-index">
  <li><a href="/guide/connections/gmail"><div class="conn-index__logo"><img src="/provider-icons/gmail.svg" alt="" /><strong>Gmail (App Password)</strong></div><small>Personal Gmail with a 2FA app password.</small><span class="conn-index__pill">SMTP · Easy</span></a></li>
  <li><a href="/guide/connections/zoho"><div class="conn-index__logo"><img src="/provider-icons/zoho.svg" alt="" /><strong>Zoho Mail</strong></div><small>Zoho Suite mailboxes with app password.</small><span class="conn-index__pill">SMTP · Easy</span></a></li>
  <li><a href="/guide/connections/mailtrap"><div class="conn-index__logo"><img src="/provider-icons/mailtrap.svg" alt="" /><strong>Mailtrap</strong></div><small>Production sending or sandbox testing.</small><span class="conn-index__pill">SMTP · Easy</span></a></li>
  <li><a href="/guide/connections/custom-smtp"><div class="conn-index__logo"><img src="/provider-icons/custom-smtp.svg" alt="" /><strong>Other SMTP</strong></div><small>Any SMTP server with host/port/credentials.</small><span class="conn-index__pill">SMTP · Easy</span></a></li>
</ul>

## Server-based

For situations where SMTP / API providers aren't available.

<ul class="conn-index">
  <li><a href="/guide/connections/php"><div class="conn-index__logo"><img src="/provider-icons/php.svg" alt="" /><strong>PHP Mail</strong></div><small>Server's built-in mail() function. No credentials. Low deliverability.</small><span class="conn-index__pill">PHP · Easy</span></a></li>
</ul>

## What you'll need

For every connection, you'll need to be **logged into WordPress as an administrator**. Most providers also require:

- An account with the provider (free tiers work for testing)
- Access to a verified sending domain (or use the provider's shared domain for free tiers)
- About 5 minutes of uninterrupted setup time

::: tip Sandbox first
If you're trying a provider for the first time, send a [test email](/features/test-simulate) before flipping it to Default. Test mode skips routing and fallback so you're verifying just the connection.
:::
