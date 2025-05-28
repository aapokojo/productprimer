import { getPageContent, getAllPagesOrdered, debugContentfulStructure } from '@/lib/contentful';

export default async function TestPage() {
  let debugInfo = '';
  
  try {
    // First, debug the structure to see what we actually have
    debugInfo += '=== CONTENTFUL STRUCTURE DEBUG ===\n';
    const entries = await debugContentfulStructure();
    
    debugInfo += `Total entries found: ${entries.length}\n\n`;
    
    entries.forEach((entry, index) => {
      debugInfo += `Entry ${index + 1}:\n`;
      debugInfo += `  Content Type: ${entry.sys.contentType.sys.id}\n`;
      debugInfo += `  Fields: ${Object.keys(entry.fields).join(', ')}\n`;
      
      // Show field values
      Object.entries(entry.fields).forEach(([key, value]) => {
        if (typeof value === 'string') {
          debugInfo += `  ${key}: "${value}"\n`;
        } else if (typeof value === 'number') {
          debugInfo += `  ${key}: ${value}\n`;
        } else {
          debugInfo += `  ${key}: [${typeof value}]\n`;
        }
      });
      debugInfo += '\n';
    });
    
    debugInfo += '=== TESTING PAGE FUNCTIONS ===\n';
    
    // Test getAllPagesOrdered
    const pages = await getAllPagesOrdered();
    debugInfo += `getAllPagesOrdered returned ${pages.length} pages:\n`;
    pages.forEach(page => {
      debugInfo += `- Slug: ${page.pageName}, Title: ${page.header}, Subtitle: ${page.subHeader}\n`;
    });
    
    // Test specific page content
    debugInfo += '\n=== TESTING SPECIFIC PAGES ===\n';
    
    const testSlugs = ['introduction', 'home', 'why', 'how', 'what', 'summary'];
    
    for (const slug of testSlugs) {
      const content = await getPageContent(slug);
      debugInfo += `${slug}: ${content ? 'Found' : 'Not found'}`;
      if (content) {
        debugInfo += ` (Title: "${content.header}", Subtitle: "${content.subHeader}")`;
      }
      debugInfo += '\n';
    }
    
  } catch (error) {
    debugInfo += `Error: ${error instanceof Error ? error.message : String(error)}\n`;
    debugInfo += `Stack: ${error instanceof Error ? error.stack : ''}\n`;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Contentful Debug Info</h1>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
        {debugInfo}
      </pre>
    </div>
  );
}
