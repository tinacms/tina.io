interface SectionProps {
  children: any | any[];
  color?: 'seafoam' | 'white';
}

export const Section = ({ children, color = 'white' }: SectionProps) => {
  return (
    <section
      className={`pb-12 lg:pb-16 w-full ${
        color === 'seafoam'
          ? 'bg-linear-to-br from-seafoam-150/50 via-seafoam-100/30 to-white'
          : ''
      }`}
    >
      {children}
    </section>
  );
};
