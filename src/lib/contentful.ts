/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

const client = createClient({
  space: '470heism3l85',
  environment: 'master',
  accessToken: 'Jnf7fRSHpiuUAvmdiH_urkozsH5ndiW7e5fv1krNkG0',
});

export interface PageContent {
  pageName: string;  // This will map to 'slug' field
  header: string;    // This will map to 'title' field
  subHeader: string; // This will map to 'subtitle' field
  pageNumber: number;
  content: Document | null; // Rich text content from Contentful
}

export async function getPageContent(pageName: string): Promise<PageContent | null> {
  try {
    // First try exact match
    let entries = await client.getEntries({
      content_type: 'page',
      'fields.pageName': pageName,
      include: 2,
    });

    // If no exact match, try case-insensitive search
    if (entries.items.length === 0) {
      // Get all pages and find case-insensitive match
      const allEntries = await client.getEntries({
        content_type: 'page',
        include: 2,
      });
      
      const matchingEntry = allEntries.items.find((entry: any) => 
        entry.fields.pageName?.toLowerCase() === pageName.toLowerCase()
      );
      
      if (matchingEntry) {
        entries = { items: [matchingEntry] } as any;
      }
    }

    if (entries.items.length === 0) {
      console.log(`No content found for page: ${pageName}`);
      return null;
    }

    const entry = entries.items[0];
    const fields = entry.fields as any;

    return {
      pageName: fields.pageName || pageName,
      header: fields.header || '',
      subHeader: fields.subHeader || '',
      pageNumber: fields.pageNumber || 0,
      content: fields.richTextField || null,
    };
  } catch (error) {
    console.error('Error fetching content from Contentful:', error);
    return null;
  }
}

export async function getAllPageNames(): Promise<string[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'page',
      select: ['fields.pageName'],
    });

    return entries.items.map((entry: any) => entry.fields.pageName);
  } catch (error) {
    console.error('Error fetching page names:', error);
    return [];
  }
}

export async function getAllPageSlugs(): Promise<string[]> {
  // This is an alias for getAllPageNames for backward compatibility
  return getAllPageNames();
}

export async function getAllPagesOrdered(): Promise<PageContent[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'page',
      order: ['fields.pageNumber'],
      include: 2,
    });

    return entries.items.map((entry: any) => ({
      pageName: entry.fields.pageName || '',
      header: entry.fields.header || '',
      subHeader: entry.fields.subHeader || '',
      pageNumber: entry.fields.pageNumber || 0,
      content: entry.fields.richTextField || null,
    }));
  } catch (error) {
    console.error('Error fetching ordered pages:', error);
    return [];
  }
}

export async function debugContentfulStructure() {
  try {
    console.log('🔍 Debugging Contentful structure...');
    
    // Get all entries without filtering
    const allEntries = await client.getEntries();
    console.log(`Found ${allEntries.items.length} total entries`);
    
    allEntries.items.forEach((entry, index) => {
      console.log(`\n📄 Entry ${index + 1}:`);
      console.log(`   Content Type: ${entry.sys.contentType.sys.id}`);
      console.log(`   ID: ${entry.sys.id}`);
      console.log(`   Available fields:`, Object.keys(entry.fields));
      
      // Log actual field values for debugging
      Object.entries(entry.fields).forEach(([key, value]) => {
        if (typeof value === 'string') {
          console.log(`   ${key}: "${value}"`);
        } else if (typeof value === 'number') {
          console.log(`   ${key}: ${value}`);
        } else {
          console.log(`   ${key}: [${typeof value}]`);
        }
      });
    });
    
    return allEntries.items;
  } catch (error) {
    console.error('❌ Error debugging Contentful:', error);
    return [];
  }
}
