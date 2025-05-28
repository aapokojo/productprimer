# ProductPrimer ISR + Webhooks Setup Guide

## Overview
This guide explains how to set up Contentful webhooks to work with our Next.js ISR (Incremental Static Regeneration) implementation for instant content updates.

## Architecture
- **ISR**: Pages are cached for 30 minutes (1800 seconds) for fast loading
- **Webhooks**: When content changes in Contentful, a webhook triggers instant cache invalidation
- **Result**: Fast cached pages + instant updates = best of both worlds

## Implementation Details

### 1. ISR Configuration
All page components now include:
```typescript
export const revalidate = 1800; // 30 minutes cache
```

### 2. Webhook Endpoint
**URL**: `/api/revalidate`
**File**: `/src/app/api/revalidate/route.ts`

**Features**:
- Validates webhook security with secret token
- Only processes 'page' content type
- Maps page names to specific routes
- Comprehensive logging
- Error handling

### 3. Environment Variables
Add to `.env.local`:
```bash
CONTENTFUL_WEBHOOK_SECRET=productprimer_webhook_secret_2024
```

## Setting up Contentful Webhook

### Step 1: Access Contentful Admin
1. Log into your Contentful space
2. Go to **Settings** → **Webhooks**

### Step 2: Create New Webhook
1. Click **Add webhook**
2. **Name**: "ProductPrimer ISR Cache Invalidation"
3. **URL**: `https://your-domain.com/api/revalidate`
   - For local testing: `http://localhost:3010/api/revalidate`
   - For production: `https://productprimer.vercel.app/api/revalidate`

### Step 3: Configure Webhook Settings
1. **Method**: POST
2. **Headers**:
   - Add header: `x-contentful-webhook-secret`
   - Value: `productprimer_webhook_secret_2024`
3. **Content type**: application/json

### Step 4: Select Triggers
Enable these events:
- ✅ **Entry publish** (when content is published)
- ✅ **Entry unpublish** (when content is unpublished)
- ✅ **Entry auto save** (optional, for live preview)

### Step 5: Content Type Filter
- **Limit to content types**: Select "Page" only
- This ensures only page content changes trigger webhooks

### Step 6: Test the Webhook
1. Save the webhook configuration
2. Edit any page in Contentful
3. Publish the changes
4. Check your application logs for webhook activity

## Page Mapping
The webhook maps Contentful page names to routes:

| Contentful Page Name | Next.js Route | Cache Revalidated |
|---------------------|---------------|-------------------|
| Introduction        | `/`           | Home page         |
| Why                 | `/why`        | Why page          |
| How                 | `/how`        | How page          |
| What                | `/what`       | What page         |
| Summary             | `/summary`    | Summary page      |

## Testing Webhooks

### Local Testing
```bash
# Test GET endpoint
curl -X GET http://localhost:3010/api/revalidate

# Test POST with valid secret
curl -X POST http://localhost:3010/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-contentful-webhook-secret: productprimer_webhook_secret_2024" \
  -d '{
    "sys": {
      "contentType": {
        "sys": {
          "id": "page"
        }
      }
    },
    "fields": {
      "pageName": {
        "en-US": "Introduction"
      }
    }
  }'

# Test security (should return 401)
curl -X POST http://localhost:3010/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-contentful-webhook-secret: wrong_secret" \
  -d '{"test": true}'
```

### Production Testing
Replace `localhost:3010` with your production domain.

## Monitoring
- Check webhook delivery in Contentful admin
- Monitor application logs for webhook activity
- Use GET endpoint for health checks

## Benefits
1. **Performance**: Pages load instantly from cache
2. **Freshness**: Content updates appear immediately
3. **Reliability**: Fallback to periodic revalidation
4. **Efficiency**: Only affected pages are revalidated

## Troubleshooting

### Webhook Not Triggering
- Check webhook URL is correct
- Verify secret token matches
- Ensure content type is "page"
- Check Contentful webhook delivery logs

### Cache Not Clearing
- Verify page name mapping
- Check application logs
- Test webhook endpoint manually

### Performance Issues
- Monitor cache hit rates
- Adjust revalidation time if needed
- Check for unnecessary webhooks
