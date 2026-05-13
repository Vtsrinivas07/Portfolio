# Contact Form Setup Guide - EmailJS

Your contact form is now ready to receive messages from recruiters! Follow these steps to complete the setup:

## Step 1: Create a Free EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com)
2. Click "Sign up" and create a free account
3. Verify your email

## Step 2: Add Your Email Service

1. After logging in, go to **Email Services** (left sidebar)
2. Click **Add Service**
3. Select **Gmail** (recommended - easiest setup)
4. Click **Connect Account**
5. Authorize EmailJS to access your Gmail
6. Your email service is now created (note the **Service ID**)

## Step 3: Create an Email Template

1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Copy and paste the following template:

```
Name: Contact Form

Subject: New Portfolio Message from {{name}}

Body:
From: {{name}}
Email: {{email}}

Message:
{{message}}

---
Sent from Srinivas Vuriti's Portfolio
```

4. Click **Save**
5. Note the **Template ID** (shown at the top)

## Step 4: Get Your Public Key

1. Go to **Account** (top right)
2. Copy your **Public Key**

## Step 5: Update Your Portfolio Code

1. Open `main.js` in VS Code
2. Find these three lines (around line 160):
   ```
   emailjs.init('YOUR_PUBLIC_KEY_HERE');
   emailjs.send(
       'YOUR_SERVICE_ID_HERE',      // Replace with your Service ID
       'YOUR_TEMPLATE_ID_HERE',     // Replace with your Template ID
   ```

3. Replace the placeholders:
   - `YOUR_PUBLIC_KEY_HERE` → Paste your Public Key
   - `YOUR_SERVICE_ID_HERE` → Paste your Service ID
   - `YOUR_TEMPLATE_ID_HERE` → Paste your Template ID

## Example (How it should look):
```javascript
emailjs.init('abc123xyz_your_public_key');
emailjs.send(
    'gmail_12345',           // Your Service ID
    'template_67890',        // Your Template ID
    formData
)
```

## Step 6: Test Your Form

1. Open your portfolio in a browser
2. Scroll to the Contact section
3. Fill in the form and click "Send Message"
4. You should receive an email at tirumalasrinivasvuriti@gmail.com

## Troubleshooting

**Not receiving emails?**
- Check your EmailJS dashboard to see if emails are being sent
- Check spam folder in Gmail
- Make sure Service ID and Template ID are correct
- Verify your email is connected to EmailJS

**Form not submitting?**
- Open browser console (F12) and check for errors
- Make sure Public Key is correct
- Clear browser cache and refresh

## Free Tier Limits

EmailJS free account allows:
- **200 emails per month**
- Perfect for a portfolio website

For more details, visit the [EmailJS Documentation](https://www.emailjs.com/docs/)
