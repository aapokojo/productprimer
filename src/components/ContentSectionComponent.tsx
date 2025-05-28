import Image from 'next/image';
import { ContentSection } from '@/lib/contentful';
import RichTextRenderer from './RichTextRenderer';

interface ContentSectionComponentProps {
  section: ContentSection;
}

export default function ContentSectionComponent({ section }: ContentSectionComponentProps) {
  return (
    <section id={section.id}>
      {section.heading && <h2>{section.heading}</h2>}
      
      {section.content && <RichTextRenderer content={section.content} />}
      
      {section.listItems && section.listItems.length > 0 && (
        <div className="content-text">
          <ul>
            {section.listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      {section.image && (
        <Image
          src={section.image.url}
          alt={section.image.alt}
          width={section.image.width}
          height={section.image.height}
          className="w-full"
        />
      )}
    </section>
  );
}
