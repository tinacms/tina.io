import { BODY } from '@/component/styles/typography';

export const pricingComponents = {
  p: (props) => <p className={BODY} {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
};
