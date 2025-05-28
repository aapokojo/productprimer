// Example webhook endpoint for instant updates
// pages/api/revalidate.ts (if using Pages Router)
// or app/api/revalidate/route.ts (for App Router)

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify the webhook is from Contentful (optional but recommended)
    const secret = request.headers.get('x-contentful-webhook-secret');
    if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the updated page from the webhook payload
    const pageName = body.fields?.pageName?.['en-US'];
    
    // Revalidate specific pages
    if (pageName) {
      switch (pageName.toLowerCase()) {
        case 'introduction':
          revalidatePath('/');
          break;
        case 'why':
          revalidatePath('/why');
          break;
        case 'how':
          revalidatePath('/how');
          break;
        case 'what':
          revalidatePath('/what');
          break;
        case 'summary':
          revalidatePath('/summary');
          break;
        default:
          // Revalidate all pages if unsure
          revalidatePath('/', 'layout');
      }
    } else {
      // Revalidate all pages
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({ 
      message: 'Cache revalidated successfully',
      revalidated: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate cache' }, 
      { status: 500 }
    );
  }
}
