#!/bin/bash
# Manual cache invalidation script
# Usage: ./invalidate-cache.sh [pageName]
# Example: ./invalidate-cache.sh Introduction

PAGE_NAME=${1:-"Introduction"}

echo "Invalidating cache for page: $PAGE_NAME"

curl -X POST http://localhost:3010/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-contentful-webhook-secret: productprimer_webhook_secret_2024" \
  -d "{
    \"sys\": {
      \"contentType\": {
        \"sys\": {
          \"id\": \"page\"
        }
      }
    },
    \"fields\": {
      \"pageName\": {
        \"en-US\": \"$PAGE_NAME\"
      }
    }
  }"

echo "\nCache invalidated! Refresh your browser to see changes."
