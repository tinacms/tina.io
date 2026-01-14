import Image from 'next/image';
import Link from 'next/link';
import type {
  PageBlocksTripleBox,
  PageBlocksTripleBoxBoxes,
} from 'tina/__generated__/types';
import Container from '@/component/util/Container';
import { cn } from '@/lib/utils';
import RenderButton from '@/utils/renderButtonArrayHelper';

function ConditionalLink({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          className,
          'hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out',
        )}
        target={href.startsWith('http') ? '_blank' : undefined}
      >
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

function TripleBoxItemCard({ data }: { data: PageBlocksTripleBoxBoxes }) {
  const { title, description, image, link, badges } = data;
  return (
    <ConditionalLink
      href={link}
      className="flex flex-col gap-2 bg-gradient-to-br from-white/10 to-white/40 shadow-md rounded-lg p-6 h-full"
    >
      <Image src={image} alt={title} width={40} height={40} />
      <h3 className="text-2xl font-ibm-plex font-semibold h-">{title}</h3>
      <p className="text-sm">{description}</p>
      {badges && badges.length > 0 && (
        <div className="flex gap-2 items-end mt-auto">
          {badges.map((badge) => (
            <span key={badge} className="text-sm bg-slate-400 text-zinc-50 px-1.5 py-0.5 rounded-md">{badge}</span>
          ))}
        </div>
      )}
    </ConditionalLink>
  );
}

export default function TripleBox({ data }: { data: PageBlocksTripleBox }) {
  return (
    <Container size="medium" className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center items-start">
        <h2 className="text-2xl font-semibold font-ibm-plex">{data.title}</h2>
        <div className="flex gap-6 items-center">
          <h3 className="text-xl font-normal text-neutral-text-secondary">
            {data.tagLine}
          </h3>
          {data.buttons && data.buttons.length > 0 && (
            <div className="flex gap-2 items-center">
              {data.buttons.map((button) => (
                <RenderButton key={button.label} button={button} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {data.boxes?.map((box) => (
          <TripleBoxItemCard key={box.title} data={box} />
        ))}
      </div>
    </Container>
  );
}
