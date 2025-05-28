// Test script to check Contentful connection and content
const { createClient } = require('contentful');

const client = createClient({
  space: '470heism3l85',
  environment: 'master',
  accessToken: 'Jnf7fRSHpiuUAvmdiH_urkozsH5ndiW7e5fv1krNkG0',
});

async function testContentful() {
  console.log('🔍 Testing Contentful connection...\n');

  try {
    // Test 1: Check space connection
    console.log('1. Testing space connection...');
    const space = await client.getSpace();
    console.log(`✅ Connected to space: ${space.name} (ID: ${space.sys.id})\n`);

    // Test 2: List all content types
    console.log('2. Checking available content types...');
    const contentTypes = await client.getContentTypes();
    console.log(`Found ${contentTypes.items.length} content types:`);
    contentTypes.items.forEach(ct => {
      console.log(`   - ${ct.name} (ID: ${ct.sys.id})`);
    });
    console.log();

    // Test 3: Check for 'page' content type specifically
    console.log('3. Checking for "page" content type...');
    const pageContentType = contentTypes.items.find(ct => ct.sys.id === 'page');
    if (pageContentType) {
      console.log('✅ Found "page" content type');
      console.log('   Fields:');
      pageContentType.fields.forEach(field => {
        console.log(`     - ${field.name} (ID: ${field.id}, Type: ${field.type})`);
      });
    } else {
      console.log('❌ No "page" content type found');
    }
    console.log();

    // Test 4: Try to fetch entries
    console.log('4. Fetching all entries...');
    const allEntries = await client.getEntries();
    console.log(`Found ${allEntries.items.length} total entries\n`);

    // Test 5: Try to fetch page entries specifically
    console.log('5. Fetching page entries...');
    try {
      const pageEntries = await client.getEntries({
        content_type: 'page'
      });
      console.log(`Found ${pageEntries.items.length} page entries:`);
      pageEntries.items.forEach(entry => {
        console.log(`   - ${entry.fields.title || entry.fields.pageName || 'Untitled'} (ID: ${entry.sys.id})`);
        console.log(`     Fields available:`, Object.keys(entry.fields));
      });
    } catch (error) {
      console.log('❌ Error fetching page entries:', error.message);
    }
    console.log();

    // Test 6: List all entries with their content types
    console.log('6. All entries with their content types:');
    allEntries.items.forEach(entry => {
      console.log(`   - Content Type: ${entry.sys.contentType.sys.id}, Fields:`, Object.keys(entry.fields));
    });

  } catch (error) {
    console.error('❌ Error testing Contentful:', error.message);
  }
}

testContentful();
