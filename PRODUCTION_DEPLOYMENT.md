# 🚀 Production Deployment Guide - Meta WhatsApp Business API

## ⚠️ CRITICAL SAFETY CHECKLIST
Before touching the company Meta account, complete ALL these steps:

- [ ] **Backup**: Take screenshots of current Meta Business settings
- [ ] **Test Environment**: Verify bot works 100% in development first
- [ ] **Access Control**: Confirm you have the correct permission level (Admin/Developer)
- [ ] **Rollback Plan**: Document how to disconnect the webhook if something breaks
- [ ] **Monitoring**: Set up logging to catch errors immediately

---

## 📋 Prerequisites

### 1. Meta Business Account Requirements
You need access to:
- **Meta Business Manager** (business.facebook.com)
- **WhatsApp Business Account** (linked to the company)
- **Developer Access** to create/manage apps

### 2. Server Requirements
- **Public HTTPS URL** (Meta requires SSL)
- **Domain with valid SSL certificate** (Let's Encrypt is fine)
- **Server running 24/7** (AWS, DigitalOcean, Heroku, etc.)

### 3. Environment Variables Needed
```env
# These will come from Meta Business Manager
WHATSAPP_PHONE_NUMBER_ID=<from Meta>
WHATSAPP_TOKEN=<from Meta>
WHATSAPP_VERIFY_TOKEN=<YOU create this - use a strong random string>
```

---

## 🔐 PHASE 1: SAFE SETUP (Do NOT touch production yet)

### Step 1.1: Create a Test App First
**Why**: Never test on production. Create a sandbox app.

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Business"** type
4. Name it: `Samsara WhatsApp Bot - TEST`
5. Link it to your **company's Business Manager**

### Step 1.2: Add WhatsApp Product
1. In your TEST app, click **"Add Product"**
2. Find **"WhatsApp"** and click **"Set Up"**
3. You'll see the **WhatsApp API setup page**

### Step 1.3: Get Test Credentials
1. In WhatsApp settings, find:
   - **Phone Number ID** (looks like: `123456789012345`)
   - **Temporary Access Token** (starts with `EAAA...`)
2. **DO NOT USE THESE IN PRODUCTION YET**

---

## 🧪 PHASE 2: LOCAL TESTING WITH NGROK

### Step 2.1: Install ngrok
```bash
# Download from https://ngrok.com/download
# Or use npm
npm install -g ngrok
```

### Step 2.2: Start Your Local Server
```bash
cd d:\Samsara\NodeBoilerPlate-main
npm run dev
```
Server should start on `http://localhost:3000`

### Step 2.3: Create Public Tunnel
```bash
# In a NEW terminal
ngrok http 3000
```

You'll get a URL like: `https://abc123.ngrok.io`

### Step 2.4: Configure Webhook in Meta (TEST App)
1. In Meta Developer Console → WhatsApp → **Configuration**
2. Find **"Webhook"** section
3. Click **"Edit"**
4. Enter:
   - **Callback URL**: `https://abc123.ngrok.io/v1/whatsapp/webhook`
   - **Verify Token**: Create a strong random string (e.g., `my_super_secret_verify_token_12345`)
5. Add this token to your `.env`:
   ```env
   WHATSAPP_VERIFY_TOKEN=my_super_secret_verify_token_12345
   ```
6. Click **"Verify and Save"**

**Expected Result**: ✅ Green checkmark = Success

### Step 2.5: Subscribe to Webhook Fields
Still in Webhook settings:
- Check: `messages` (required)
- Click **"Subscribe"**

### Step 2.6: Send Test Message
1. In Meta Console, find **"API Setup"** → **"Send and receive messages"**
2. You'll see a test phone number
3. Scan the QR code with your personal WhatsApp
4. Send a message: `hi`

**Expected Result**: Your bot should respond with the main menu!

---

## 🏗️ PHASE 3: PRODUCTION SERVER SETUP

### Option A: Deploy to Railway (Recommended - Easy)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables in Railway dashboard
# Then deploy
railway up
```

### Option B: Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create samsara-whatsapp-bot

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URL=<your-mongodb-atlas-url>
heroku config:set JWT_SECRET=<strong-secret>
heroku config:set WHATSAPP_PHONE_NUMBER_ID=<from-meta>
heroku config:set WHATSAPP_TOKEN=<from-meta>
heroku config:set WHATSAPP_VERIFY_TOKEN=<your-verify-token>

# Deploy
git push heroku main
```

### Option C: Deploy to DigitalOcean/AWS
1. Set up Ubuntu server
2. Install Node.js, PM2, Nginx
3. Configure SSL with Let's Encrypt
4. Use PM2 to run the app:
   ```bash
   pm2 start ecosystem.config.json --env production
   ```

---

## 🔴 PHASE 4: PRODUCTION META SETUP (CAREFUL!)

### Step 4.1: Create Production App
1. Go to Meta for Developers
2. Create **NEW** app: `Samsara WhatsApp Bot - PRODUCTION`
3. Link to company Business Manager
4. Add WhatsApp product

### Step 4.2: Request Production Access
**IMPORTANT**: Test apps have limits (50 messages/day). For production:

1. In WhatsApp settings → **"API Setup"**
2. Click **"Add phone number"**
3. Follow Meta's verification process:
   - Business verification (may take 1-3 days)
   - Display name approval
   - Phone number verification

### Step 4.3: Get Production Credentials
1. Once approved, get:
   - **Phone Number ID** (production)
   - **Permanent Access Token** (create in Business Manager)

**🔐 SECURITY**: Never share these tokens. Store in environment variables only.

### Step 4.4: Configure Production Webhook
1. In Production App → WhatsApp → Configuration
2. Set Callback URL: `https://your-production-domain.com/v1/whatsapp/webhook`
3. Use the SAME verify token from your `.env`
4. Click **"Verify and Save"**
5. Subscribe to `messages` field

---

## ✅ PHASE 5: VERIFICATION & MONITORING

### Step 5.1: Test Production Bot
1. Send message from a real customer number
2. Verify:
   - ✅ Bot responds correctly
   - ✅ Menu navigation works
   - ✅ Escalation triggers properly
   - ✅ No errors in server logs

### Step 5.2: Set Up Monitoring
```bash
# Check logs in real-time
pm2 logs

# Or on Heroku
heroku logs --tail

# Or on Railway
railway logs
```

### Step 5.3: Set Up Error Alerts
Add to your code (optional but recommended):
```javascript
// In src/index.js
process.on('uncaughtException', (error) => {
  logger.error('CRITICAL ERROR:', error);
  // Send alert to Slack/Email
});
```

---

## 🚨 ROLLBACK PROCEDURE (If Something Goes Wrong)

### Immediate Actions:
1. **Disable Webhook**:
   - Go to Meta Console → WhatsApp → Configuration
   - Click "Edit" on Webhook
   - Click "Delete" or change URL to a dummy endpoint

2. **Stop Server**:
   ```bash
   pm2 stop all
   # or
   heroku ps:scale web=0
   ```

3. **Check Logs**:
   ```bash
   pm2 logs --err
   ```

4. **Restore Previous Version**:
   ```bash
   git revert HEAD
   git push heroku main --force
   ```

---

## 📊 PRODUCTION CHECKLIST

Before going live:
- [ ] MongoDB Atlas set up with production cluster
- [ ] All environment variables configured
- [ ] SSL certificate valid
- [ ] Server has auto-restart (PM2/systemd)
- [ ] Logs are being captured
- [ ] Tested all conversation flows
- [ ] Escalation service works
- [ ] Rate limiting enabled (already in code)
- [ ] CORS configured properly
- [ ] Backup strategy in place

---

## 🔒 SECURITY BEST PRACTICES

1. **Never commit `.env` to Git** (already in `.gitignore`)
2. **Use environment variables** for all secrets
3. **Rotate tokens** every 60-90 days
4. **Monitor for unusual activity** (sudden spike in messages)
5. **Set up IP whitelisting** if possible
6. **Use HTTPS only** (Meta requirement)
7. **Keep dependencies updated**: `npm audit fix`

---

## 📞 SUPPORT CONTACTS

If something breaks:
- **Meta Support**: https://business.facebook.com/business/help
- **WhatsApp Business API Docs**: https://developers.facebook.com/docs/whatsapp
- **Your Team Lead**: [Add contact info]

---

## 🎯 QUICK START (After Reading Above)

```bash
# 1. Set environment variables in your hosting platform
# 2. Deploy code
# 3. Configure webhook in Meta Console
# 4. Test with a message
# 5. Monitor logs for 24 hours
```

**Remember**: Start with TEST app, verify everything works, THEN move to production!
