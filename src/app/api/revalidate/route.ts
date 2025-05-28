import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    console.log('Webhook received from Contentful');
    
    // Get the request body
    const body = await request.json();
    console.log('Webhook body:', JSON.stringify(body, null, 2));
    
    // Optional: Verify the webhook is from Contentful using a secret
    const webhookSecret = request.headers.get('x-contentful-webhook-secret');
    const expectedSecret = process.env.CONTENTFUL_WEBHOOK_SECRET;
    
    if (expectedSecret && webhookSecret !== expectedSecret) {
      console.error('Unauthorized webhook request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract page information from the webhook payload
    const contentType = body.sys?.contentType?.sys?.id;
    
    if (contentType !== 'page') {
      console.log('Webhook not for page content type, ignoring');
      return NextResponse.json({ 
        message: 'Webhook ignored - not a page content type',
        contentType 
      });
    }

    // Get the page name from the webhook
    const pageName = body.fields?.pageName?.['en-US'];
    console.log('Page name from webhook:', pageName);
    
    if (pageName) {
      // Revalidate specific pages based on pageName
      switch (pageName.toLowerCase()) {
        case 'introduction':
          console.log('Revalidating home page (/)');
          revalidatePath('/');
          break;
        case 'why':
          console.log('Revalidating /why page');
          revalidatePath('/why');
          break;
        case 'how':
          console.log('Revalidating /how page');
          revalidatePath('/how');
          break;
        case 'what':
          console.log('Revalidating /what page');
          revalidatePath('/what');
          break;
        case 'summary':
          console.log('Revalidating /summary page');
          revalidatePath('/summary');
          break;
        default:
          console.log('Unknown page name, revalidating all pages');
          // Revalidate all pages if we don't recognize the page name
          revalidatePath('/', 'layout');
      }
    } else {
      console.log('No page name found, revalidating all pages');
      // If we can't determine the specific page, revalidate everything
      revalidatePath('/', 'layout');
    }

    // Also revalidate navigation components that depend on page data
    console.log('Revalidating navigation');
    revalidatePath('/', 'layout'); // This will update the DynamicNavigation component

    const response = {
      message: 'Cache revalidated successfully',
      revalidated: true,
      timestamp: new Date().toISOString(),
      pageName,
      contentType
    };

    console.log('Webhook response:', response);
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to revalidate cache',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}

// Also handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Contentful webhook endpoint is active',
    timestamp: new Date().toISOString(),
    endpoint: '/api/revalidate'
  });
}
