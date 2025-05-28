/* eslint-disable @typescript-eslint/no-explicit-any */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      // Check if this paragraph only contains an image
      if (node.content.length === 1 && node.content[0].nodeType === 'embedded-asset-block') {
        return <>{children}</>;
      }
      return <div className="content-text">{children}</div>;
    },
    [BLOCKS.HEADING_1]: (node: any, children: any) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: any) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: any) => <h3>{children}</h3>,
    [BLOCKS.UL_LIST]: (node: any, children: any) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: any) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li>{children}</li>,
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, description } = node.data.target.fields;
      return (
        <div className="image-wrapper">
          <Image
            src={`https:${file.url}`}
            alt={description || ''}
            width={file.details.image.width}
            height={file.details.image.height}
            className="content-image"
          />
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => {
      const slug = node.data.target.fields.slug;
      return <Link href={`/${slug}`}>{children}</Link>;
    },
  },
};

interface RichTextRendererProps {
  content: Document | null | undefined;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;
  
  return <>{documentToReactComponents(content, renderOptions)}</>;
}
