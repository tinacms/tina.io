import type { PageBlocksHeroV2 } from 'tina/__generated__/types';
import { BLOCK_HEADINGS, H1_HEADINGS } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import Image from 'next/image';
import RenderButton from '@/utils/renderButtonArrayHelper';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';

export default function HeroV2(data: { data: PageBlocksHeroV2 }) {
  const { title, subtext, buttons, image } = data.data;

  return (
    <Container size="medium" className="min-h-[50vh] grid grid-cols-2 gap-4">
      <div className="flex  flex-col gap-8  border-red-500 py-10">
        <h2 className={`${H1_HEADINGS} font-ibm-plex`}>{curlyBracketFormatter(title)}</h2>
        <p className='text-neutral-text-secondary max-w-[62ch] font-light leading-relaxed text-lg'>{subtext}</p>
        <div className='flex gap-2'>
        {buttons && buttons.map((button, index) => (
          <RenderButton key={`button-${index}`} button={button} index={index} className='py-3' />
        ))}
        </div>
      </div>
      <div className="relative"> 
        <Image src={image} alt={title} fill />
      </div>
    </Container>
  );
}
