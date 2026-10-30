import Link from 'next/link';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { SOCIAL_LINK } from '@/component/styles/links';
import TinaIconSvg from '../../public/svg/tina-icon.svg';
import { ButtonGroup } from './Button';

/**
 * Social links (#4964): button size in the neutral outline, with an ink label
 * and each network's own logo colour. They are not a button level, so a row
 * of them needs no Primary. Stacks full width on phones like any button row.
 */

// Brand logo colours are the networks' own, so they stay as they are.
const NETWORKS = {
  tina: {
    label: 'Discussion',
    logo: (
      <TinaIconSvg aria-hidden="true" className="h-6 w-auto fill-[#EC4815]" />
    ),
  },
  discord: {
    label: 'Discord',
    logo: (
      <FaDiscord aria-hidden="true" className="h-6 w-auto text-[#5865f2]" />
    ),
  },
  github: {
    label: 'GitHub',
    logo: <FaGithub aria-hidden="true" className="h-6 w-auto text-[#24292e]" />,
  },
  twitter: {
    label: 'Twitter',
    logo: (
      <FaTwitter aria-hidden="true" className="h-6 w-auto text-[#1DA1F2]" />
    ),
  },
} as const;

type Network = keyof typeof NETWORKS;

export const SocialLinks = ({
  links,
}: {
  links: Partial<Record<Network, string | null>>;
}) => (
  <ButtonGroup>
    {(Object.keys(NETWORKS) as Network[]).map((network) => {
      const href = links[network];
      if (!href) {
        return null;
      }
      return (
        <Link
          key={network}
          href={href}
          className={SOCIAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          {NETWORKS[network].logo}
          {NETWORKS[network].label}
        </Link>
      );
    })}
  </ButtonGroup>
);
