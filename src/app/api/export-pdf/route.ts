import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { getAllPagesOrdered } from '@/lib/contentful';

export async function GET(request: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Reduce memory usage
        '--disable-gpu', // Disable GPU for faster processing
        '--disable-web-security', // Allow cross-origin requests
        '--no-zygote', // Reduce memory footprint
        '--single-process', // Use single process
      ],
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
    
    // Set the HTML content
    await page.setContent(bookletHtml, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

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
      // Optimize for smaller file size
      tagged: false, // Disable accessibility tagging to reduce size
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
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Shippori+Mincho:wght@600;700&display=swap" rel="stylesheet">
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
                    <span class="page-num">${page.pageNumber}.</span>
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

async function renderPageContent(page: any, baseUrl: string): Promise<string> {
  // Import the Contentful rich text types
  const { BLOCKS, INLINES, MARKS } = await import('@contentful/rich-text-types');
  
  // Custom HTML renderer function
  function renderRichTextToHtml(document: any): string {
    if (!document || !document.content) return '';
    
    return document.content.map((node: any) => renderNode(node)).join('');
  }
  
  function renderNode(node: any): string {
    if (node.nodeType === 'text') {
      let text = node.value;
      if (node.marks) {
        node.marks.forEach((mark: any) => {
          if (mark.type === MARKS.BOLD) {
            text = `<strong>${text}</strong>`;
          } else if (mark.type === MARKS.ITALIC) {
            text = `<em>${text}</em>`;
          }
        });
      }
      return text;
    }
    
    const children = node.content ? node.content.map((child: any) => renderNode(child)).join('') : '';
    
    switch (node.nodeType) {
      case BLOCKS.PARAGRAPH:
        if (node.content.length === 1 && node.content[0].nodeType === 'embedded-asset-block') {
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
        const { file, description } = node.data.target.fields;
        // Optimize image for PDF by using smaller dimensions and quality
        const originalUrl = file.url;
        const optimizedUrl = `${originalUrl}?w=600&q=60&fm=webp`; // Compress to 600px width, 60% quality, WebP format
        return `
          <div class="image-wrapper">
            <img 
              src="https:${optimizedUrl}" 
              alt="${description || ''}" 
              class="content-image"
              loading="lazy"
            />
          </div>
        `;
      case INLINES.HYPERLINK:
        return `<a href="${node.data.uri}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      case INLINES.ENTRY_HYPERLINK:
        const slug = node.data.target.fields.slug;
        return `<a href="${baseUrl}/${slug}">${children}</a>`;
      default:
        return children;
    }
  }

  // Convert rich text to HTML string
  const contentHtml = renderRichTextToHtml(page.content);
  
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
    *{box-sizing:border-box}
    body{font-family:'Inter',sans-serif;font-size:11pt;line-height:1.5;margin:0;padding:0}
    .booklet-container{max-width:100%;margin:0;padding:0}
    .title-page{text-align:center;page-break-after:always;padding:40px 0}
    .title-page h1{font-family:'Shippori Mincho',serif;font-weight:700;font-size:28pt;margin-bottom:10px}
    .title-page h2{font-family:'Shippori Mincho',serif;font-weight:600;font-size:16pt;margin-bottom:40px}
    .toc-pdf{text-align:left;margin:40px auto;max-width:400px}
    .toc-pdf h3{font-family:'Shippori Mincho',serif;font-weight:700;font-size:14pt;margin-bottom:20px;color:#422}
    .toc-pdf ul{list-style:none;padding:0;margin:0}
    .toc-pdf li{margin-bottom:12px;padding:8px;border-bottom:1px solid #eee}
    .page-num{font-weight:600;color:#c99;margin-right:8px}
    .page-title{font-weight:600;color:#422;display:block}
    .page-subtitle{font-size:9pt;color:#666;font-style:italic;display:block;margin-top:2px}
    .page-section{margin-bottom:20px}
    .page-break{page-break-before:always}
    .page-title{font-family:'Shippori Mincho',serif;font-weight:700;font-size:18pt;margin-bottom:8px}
    .page-subtitle{font-family:'Inter',sans-serif;font-weight:600;font-size:10pt;color:#c99;margin-bottom:20px;margin-top:-8px}
    h1,h2,h3{font-family:'Shippori Mincho',serif;font-weight:700}
    h1{font-size:16pt;margin:20px 0 10px 0}
    h2{font-size:14pt;margin:16px 0 8px 0}
    h3{font-size:12pt;margin:12px 0 6px 0}
    h4{color:#c99;font-weight:600}
    .content-text,p{font-family:'Inter',sans-serif;font-size:10pt;line-height:1.5;margin:0 0 8px 0}
    .image-wrapper{text-align:center;margin:16px 0;page-break-inside:avoid}
    .content-image{max-width:80%;height:auto;max-height:250px;object-fit:contain;display:block;margin:0 auto}
    .content-table{width:100%;border-collapse:collapse;margin:12px 0;font-size:8pt;page-break-inside:avoid}
    .content-table th,.content-table td{border:1px solid #ddd;padding:4px 6px;text-align:left;vertical-align:top}
    .content-table th{background-color:#f8f8f8;font-weight:600}
    ul,ol{margin:8px 0;padding-left:20px}
    li{margin-bottom:4px}
    a{text-decoration:underline}
    strong{font-weight:600}
    em{font-style:italic}
    @page{margin:20mm 15mm}
  `;
}
