import { SocialLinks } from '../../ui/SocialLinks';

export const SocialBlock = (props) => (
  <SocialLinks
    links={{
      tina: props.tina,
      discord: props.discord,
      github: props.github,
      twitter: props.twitter,
    }}
  />
);
