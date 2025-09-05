

import Container from '@/component/util/Container';
import type { PageBlocksHeroV2 } from 'tina/__generated__/types';

export default function HeroV2(data: { data: PageBlocksHeroV2 }) {
  const { title, subtext, buttons, image } = data.data;
  return (
    <Container size="medium" className="min-h-[50vh]">
      <h2>{title}</h2>
      HeroV2
    </Container>
  );
}
