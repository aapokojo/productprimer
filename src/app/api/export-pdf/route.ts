import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { getAllPagesOrdered, PageContent } from '@/lib/contentful';
import { Document, BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

// Type definitions for rich text nodes
interface RichTextNode {
  nodeType: string;
  value?: string;
  content?: RichTextNode[];
  marks?: Array<{ type: string }>;
  data?: {
    target?: {
      fields?: {
        file?: { url: string };
        description?: string;
        slug?: string;
      };
    };
    uri?: string;
  };
}

interface AssetFields {
  file: { url: string };
  description?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Configure for serverless environment
    const isProduction = process.env.NODE_ENV === 'production';
    
    const browser = await puppeteer.launch({
      args: isProduction 
        ? chromium.args
        : [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security',
            '--no-zygote',
            '--single-process',
            '--disable-extensions',
            '--disable-plugins',
          ],
      defaultViewport: chromium.defaultViewport,
      executablePath: isProduction 
        ? await chromium.executablePath()
        : process.platform === 'darwin' 
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : '/usr/bin/google-chrome',
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    // Optimize page settings for smaller PDF
    await page.setViewport({ width: 794, height: 1123 }); // A4 size in pixels
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'); // Lightweight user agent
    
    // Get the base URL from the request
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    // Generate the complete booklet HTML
    const bookletHtml = await generateBookletHtml(baseUrl);
    
    // Set the HTML content with increased timeout for production
    await page.setContent(bookletHtml, { 
      waitUntil: 'networkidle0',
      timeout: 60000 // Increased timeout for serverless
    });

    // Add a delay to ensure images are fully loaded
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate PDF with optimized settings for smaller file size
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: false, // Disable background printing to reduce size
      preferCSSPageSize: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; color: #666; text-align: center; width: 100%; margin-top: 5mm;">
          Product Primer - A Starter Guide to Building Great Products
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; color: #666; text-align: center; width: 100%; margin-bottom: 5mm;">
          <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
      // Optimize for smaller file size with better compression
      tagged: false, // Disable accessibility tagging to reduce size
      timeout: 60000, // Increased timeout for PDF generation
      // Additional optimization options
      omitBackground: true, // Remove page background to reduce size
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Product-Primer-by-Aapo-Kojo.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown',
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function generateBookletHtml(baseUrl: string): Promise<string> {
  try {
    // Get all pages content from Contentful
    const pages = await getAllPagesOrdered();
    
    let contentHtml = '';
    
    for (const page of pages) {
      const pageContent = await renderPageContent(page, baseUrl);
      contentHtml += pageContent;
    }

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Primer - Complete Guide</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <!-- Load only essential font weights to reduce size -->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Shippori+Mincho:wght@600;700&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%20.,!?-:;" rel="stylesheet">
        <style>
          ${getPdfStyles()}
        </style>
      </head>
      <body>
        <div class="booklet-container">
          <div class="title-page">
            <h1>Product Primer</h1>
            <h2>A Starter Guide to Building Great Products</h2>
            <div class="toc-pdf">
              <h3>Table of Contents</h3>
              <ul>
                ${pages.map(page => `
                  <li>
                    <span class="page-num">${page.pageNumber}. </span>
                    <span class="page-title">${page.header}</span>
                    <span class="page-subtitle">${page.subHeader}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
          
          ${contentHtml}
        </div>
      </body>
      </html>
    `;
  } catch (error) {
    console.error('Error generating booklet HTML:', error);
    throw error;
  }
}

async function renderPageContent(page: PageContent, baseUrl: string): Promise<string> {
  // Custom HTML renderer function
  function renderRichTextToHtml(document: Document): string {
    if (!document || !document.content) return '';
    
    return document.content.map((node: RichTextNode) => renderNode(node)).join('');
  }
  
  function renderNode(node: RichTextNode): string {
    if (node.nodeType === 'text') {
      let text = node.value || '';
      if (node.marks) {
        node.marks.forEach((mark: { type: string }) => {
          if (mark.type === MARKS.BOLD) {
            text = `<strong>${text}</strong>`;
          } else if (mark.type === MARKS.ITALIC) {
            text = `<em>${text}</em>`;
          }
        });
      }
      return text;
    }
    
    const children = node.content ? node.content.map((child: RichTextNode) => renderNode(child)).join('') : '';
    
    switch (node.nodeType) {
      case BLOCKS.PARAGRAPH:
        if (node.content && node.content.length === 1 && node.content[0].nodeType === 'embedded-asset-block') {
          return children;
        }
        return `<p class="content-text">${children}</p>`;
      case BLOCKS.HEADING_1:
        return `<h1>${children}</h1>`;
      case BLOCKS.HEADING_2:
        return `<h2>${children}</h2>`;
      case BLOCKS.HEADING_3:
        return `<h3>${children}</h3>`;
      case BLOCKS.UL_LIST:
        return `<ul>${children}</ul>`;
      case BLOCKS.OL_LIST:
        return `<ol>${children}</ol>`;
      case BLOCKS.LIST_ITEM:
        return `<li>${children}</li>`;
      case BLOCKS.TABLE:
        return `<table class="content-table">${children}</table>`;
      case BLOCKS.TABLE_ROW:
        return `<tr>${children}</tr>`;
      case BLOCKS.TABLE_CELL:
        return `<td>${children}</td>`;
      case BLOCKS.TABLE_HEADER_CELL:
        return `<th>${children}</th>`;
      case BLOCKS.EMBEDDED_ASSET:
        if (node.data?.target?.fields) {
          const fields = node.data.target.fields as AssetFields;
          const { file, description } = fields;
          // Optimize image for PDF with better quality and ensure HTTPS
          const originalUrl = file.url;
          // Ensure URL starts with https:// and optimize for PDF
          const fullUrl = originalUrl.startsWith('//') ? `https:${originalUrl}` : originalUrl;
          const optimizedUrl = `${fullUrl}?w=800&q=80&fm=jpg&fit=pad&bg=rgb:ffffff`; // Better quality, ensure proper format
          console.log(`Processing image: ${optimizedUrl}`);
          return `
            <div class="image-wrapper">
              <img 
                src="${optimizedUrl}" 
                alt="${description || ''}" 
                class="content-image"
                style="max-width: 100%; height: auto; display: block; margin: 0 auto;"
                onerror="console.log('Image failed to load: ${optimizedUrl}')"
              />
            </div>
          `;
        }
        return '';
      case INLINES.HYPERLINK:
        if (node.data?.uri) {
          return `<a href="${node.data.uri}" target="_blank" rel="noopener noreferrer">${children}</a>`;
        }
        return children;
      case INLINES.ENTRY_HYPERLINK:
        if (node.data?.target?.fields?.slug) {
          const slug = node.data.target.fields.slug;
          return `<a href="${baseUrl}/${slug}">${children}</a>`;
        }
        return children;
      default:
        return children;
    }
  }

  // Convert rich text to HTML string
  const contentHtml = page.content ? renderRichTextToHtml(page.content) : '';
  
  return `
    <div class="page-section">
      <div class="page-break"></div>
      <h1 class="page-title">${page.header}</h1>
      <h4 class="page-subtitle">${page.subHeader}</h4>
      <div class="page-content">
        ${contentHtml}
      </div>
    </div>
  `;
}

function getPdfStyles(): string {
  return `
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;font-size:11pt;line-height:1.4;color:#000}
    .booklet-container{max-width:100%}
    .title-page{text-align:center;page-break-after:always;padding:40px 0}
    .title-page h1{font-family:'Shippori Mincho',serif;font-weight:700;font-size:26pt;margin-bottom:8px;color:#000}
    .title-page h2{font-family:'Shippori Mincho',serif;font-weight:700;font-size:15pt;margin-bottom:35px;color:#000}
    .toc-pdf{text-align:left;margin:35px auto;max-width:380px}
    .toc-pdf h3{font-family:'Shippori Mincho',serif;font-weight:700;font-size:13pt;margin-bottom:18px;color:#422}
    .toc-pdf ul{list-style:none}
    .toc-pdf li{margin-bottom:10px;padding:6px;border-bottom:1px solid #eee}
    .page-num{font-weight:600;color:#c99;margin-right:6px}
    .page-title{font-weight:600;color:#422;display:inline}
    .page-subtitle{font-size:8.5pt;color:#666;font-style:italic;display:block;margin-top:4px}
    .page-section{margin-bottom:18px}
    .page-break{page-break-before:always}
    .page-title{font-family:'Shippori Mincho',serif;font-weight:700;font-size:17pt;margin-bottom:6px;color:#000!important}
    .page-subtitle{font-family:'Inter',sans-serif;font-weight:600;font-size:9.5pt;color:#c99!important;margin-bottom:18px;margin-top:-6px}
    h1,h2,h3{font-family:'Shippori Mincho',serif;font-weight:700;color:#000!important}
    h1{font-size:15pt;margin:18px 0 8px 0;color:#000!important}
    h2{font-size:13pt;margin:14px 0 6px 0;color:#000!important}
    h3{font-size:11pt;margin:10px 0 4px 0;color:#000!important}
    h4{color:#c99!important;font-weight:600;font-size:9.5pt;font-family:'Inter',sans-serif!important;margin-top:-6px}
    .content-text,p{font-family:'Inter',sans-serif;font-size:10pt;line-height:1.4;margin:0 0 6px 0;color:#000}
    .image-wrapper{text-align:center;margin:12px 0;page-break-inside:avoid}
    .content-image{max-width:75%;height:auto;max-height:220px;object-fit:contain;display:block;margin:0 auto}
    .content-table{width:100%;border-collapse:collapse;margin:10px 0;font-size:7.5pt;page-break-inside:avoid}
    .content-table th,.content-table td{border:1px solid #ccc;padding:3px 5px;text-align:left;vertical-align:top}
    .content-table th{background:#f5f5f5;font-weight:600}
    ul,ol{margin:6px 0;padding-left:18px}
    li{margin-bottom:3px}
    a{text-decoration:underline;color:#000}
    strong{font-weight:600}
    em{font-style:italic}
    @page{margin:18mm 13mm}
  `;
}
