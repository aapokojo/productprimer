// Test script to check Contentful connection and content
const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master'
});

async function testContentful() {
  try {
    console.log('🔍 Testing Contentful connection...');
    console.log('Space ID:', process.env.CONTENTFUL_SPACE_ID);
    console.log('Environment:', process.env.CONTENTFUL_ENVIRONMENT || 'master');
    
    // Test basic connection
    const space = await client.getSpace();
    console.log('✅ Connected to space:', space.name);
    
    // Get all entries
    console.log('\n📄 Fetching all entries...');
    const entries = await client.getEntries();
    console.log('Total entries found:', entries.items.length);
    
    // Show each entry
    entries.items.forEach((entry, index) => {
      console.log(`\n📝 Entry ${index + 1}:`);
      console.log('  Content Type:', entry.sys.contentType.sys.id);
      console.log('  ID:', entry.sys.id);
      console.log('  Fields:', Object.keys(entry.fields));
      
      // Show field values if it's a Page content type
      if (entry.sys.contentType.sys.id === 'page') {
        console.log('  Page Data:');
        console.log('    pageName:', entry.fields.pageName);
        console.log('    header:', entry.fields.header);
        console.log('    subHeader:', entry.fields.subHeader);
        console.log('    pageNumber:', entry.fields.pageNumber);
        console.log('    richTextField exists:', !!entry.fields.richTextField);
      }
    });
    
    // Try to fetch specific page content
    console.log('\n🔍 Testing specific page queries...');
    const testPages = ['introduction', 'why', 'how', 'what', 'summary'];
    
    for (const pageName of testPages) {
      try {
        const pageEntries = await client.getEntries({
          content_type: 'page',
          'fields.pageName': pageName,
          limit: 1
        });
        
        if (pageEntries.items.length > 0) {
          console.log(`✅ Found content for "${pageName}"`);
        } else {
          console.log(`❌ No content found for "${pageName}"`);
        }
      } catch (error) {
        console.log(`❌ Error fetching "${pageName}":`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Contentful connection failed:', error.message);
    console.error('Details:', error);
  }
}

testContentful();
