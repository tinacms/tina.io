import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import {
  BODY_SMALL,
  SUB_HEADING,
  SURFACE,
} from '@/component/styles/typography';

type ChooserCardImage = {
  src: string;
  alt: string;
  /** A person's 72px photo, hidden below md, or a 40px flag that always shows. */
  kind: 'photo' | 'flag';
};

type ChooserCardAction =
  | { href: string; prefetch?: boolean; onClick?: never }
  | { onClick: () => void; href?: never; prefetch?: never };

export type ChooserCardProps = ChooserCardAction & {
  name: string;
  description: string;
  image?: ChooserCardImage;
  selected?: boolean;
  /** Stack the image, text and chevron in a column below md. */
  stackOnMobile?: boolean;
};

const IMAGE_SIZE = {
  photo: {
    px: 72,
    className: 'hidden md:block w-18 h-18 object-cover md:mr-4',
  },
  flag: { px: 40, className: 'w-10 h-10 mr-4' },
} as const;

/**
 * A card that picks one option from a short list: who to book a call with,
 * or which language to read in. A link when given `href`, a button when given
 * `onClick`.
 */
export const ChooserCard = (props: ChooserCardProps) => {
  const { name, description, image, selected, stackOnMobile } = props;

  const className = [
    'flex w-full h-full items-center justify-between rounded-lg border p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring',
    stackOnMobile ? 'flex-col md:flex-row' : 'flex-row',
    selected ? `${SURFACE.info} border-selected` : 'border-input bg-background',
  ].join(' ');

  const content = (
    <>
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          className={`${IMAGE_SIZE[image.kind].className} aspect-square rounded-full`}
          width={IMAGE_SIZE[image.kind].px}
          height={IMAGE_SIZE[image.kind].px}
        />
      )}
      <span
        className={`grow ${stackOnMobile ? 'text-center md:text-left' : 'text-left'}`}
      >
        <span className={`block ${SUB_HEADING}`}>{name}</span>
        <span className={`block ${BODY_SMALL}`}>{description}</span>
      </span>
      <span className="shrink-0">
        <FaChevronRight className="h-6 w-6 text-muted-foreground" />
      </span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} prefetch={props.prefetch} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={className}>
      {content}
    </button>
  );
};
