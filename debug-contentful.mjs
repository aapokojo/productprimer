// Simple test to check Contentful entries
import { createClient } from 'contentful';

const client = createClient({
  space: '470heism3l85',
  environment: 'master',
  accessToken: 'Jnf7fRSHpiuUAvmdiH_urkozsH5ndiW7e5fv1krNkG0',
});

export async function debugContentful() {
  try {
    console.log('🔍 Debugging Contentful content...');
    
    // Get all entries
    const allEntries = await client.getEntries();
    console.log(`Found ${allEntries.items.length} total entries`);
    
    allEntries.items.forEach((entry, index) => {
      console.log(`\n📄 Entry ${index + 1}:`);
      console.log(`   Content Type: ${entry.sys.contentType.sys.id}`);
      console.log(`   ID: ${entry.sys.id}`);
      console.log(`   Fields:`, Object.keys(entry.fields));
      console.log(`   Field values:`, entry.fields);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Make sure this runs
debugContentful();
