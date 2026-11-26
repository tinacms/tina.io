import { SURFACE } from '@/component/styles/typography';

interface SectionProps {
  children: any | any[];
  color?: 'seafoam' | 'white';
}

export const Section = ({ children, color = 'white' }: SectionProps) => {
  return (
    <section
      className={`py-12 lg:py-16 w-full ${
        color === 'seafoam' ? `bg-linear-to-br ${SURFACE.sectionSeafoam}` : ''
      }`}
    >
      {children}
    </section>
  );
};
