import Link from 'next/link';
import { FaGithub, FaNewspaper } from 'react-icons/fa';
import {
  BODY_MUTED,
  BODY_SMALL,
  CARD_TITLE,
  CODE,
  EYEBROW_LINK,
  LABEL,
  PAGE_TITLE,
  SUB_HEADING,
  SURFACE,
} from '@/component/styles/typography';
import { formatDate } from '@/utils/formatDate';

interface ChangeItem {
  pull_request_number?: string;
  pull_request_link?: string;
  commit_hash?: string;
  commit_link?: string;
  gitHubName?: string;
  gitHubLink?: string;
  changesDescription?: string;
}

interface WhatsNewCardProps {
  item: {
    versionNumber: string;
    dateReleased: string;
    changesObject: {
      changesTitle: string;
      changesList: ChangeItem[];
    }[];
    key: string;
  };
}

const ChangeItemComponent = ({ change }: { change: ChangeItem }) => {
  return (
    <li className="flex flex-wrap items-start gap-2 sm:col-span-full sm:grid sm:grid-cols-subgrid">
      {change.gitHubName && change.gitHubLink && (
        <>
          <Link
            href={change.gitHubLink}
            className={`${SURFACE.brand} ${LABEL} justify-self-start whitespace-nowrap items-center px-2 py-1 rounded-md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{change.gitHubName}
          </Link>
          <span className={`${BODY_SMALL} hidden sm:block`}>-</span>
        </>
      )}
      {change.changesDescription && (
        <p
          className={`${BODY_SMALL} order-last w-full wrap-anywhere sm:order-none sm:col-start-3 sm:w-auto`}
        >
          {change.changesDescription}
        </p>
      )}
      <div className="flex gap-2 sm:col-start-4">
        {change.pull_request_number && change.pull_request_link && (
          <Link
            href={change.pull_request_link}
            className={`${SURFACE.neutral} ${CODE} h-fit items-center px-2 py-1 rounded-md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            #{change.pull_request_number}{' '}
          </Link>
        )}
        {change.commit_hash && change.commit_link && (
          <Link
            href={change.commit_link}
            className={`${SURFACE.neutral} ${CODE} h-fit items-center px-2 py-1 rounded-md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {change.commit_hash.substring(0, 7)}{' '}
          </Link>
        )}
      </div>
    </li>
  );
};

export const WhatsNewCard = ({ item }: WhatsNewCardProps) => {
  return (
    <div
      key={item.key}
      className="mb-6 p-10 shadow-xl rounded-lg bg-linear-to-br from-white/25 via-white/50 to-white/75"
    >
      <div className="flex justify-between items-baseline mb-6">
        <h2 className={CARD_TITLE}>Version {item.versionNumber}</h2>
        <p className={BODY_MUTED}>
          Released on {formatDate(item.dateReleased)}
        </p>
      </div>

      {item.changesObject?.map((section, sectionIndex) => (
        <div
          key={`section-${section.changesTitle}-${sectionIndex}`}
          className="mb-6"
        >
          <h3 className={`${SUB_HEADING} mb-3 border-b border-gray-200 pb-2`}>
            {section.changesTitle}
          </h3>
          {section.changesList && section.changesList.length > 0 ? (
            <ul className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-[auto_auto_1fr_auto]">
              {section.changesList.map((change, changeIndex) => (
                <ChangeItemComponent
                  key={`change-${changeIndex}-${change.commit_hash || change.gitHubName || 'unknown'}`}
                  change={change}
                />
              ))}
            </ul>
          ) : (
            <p className={BODY_MUTED}>No changes in this section</p>
          )}
        </div>
      ))}
    </div>
  );
};

const WhatsNewTinaCMSPageLayout = ({ data }) => {
  const items = data.WhatsNewTinaCMSConnection.edges.map((edge) => edge.node);

  return (
    <div className="p-6 py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-5xl md:mx-auto">
      <h1 className={`${PAGE_TITLE} text-center justify-center`}>
        What's new with TinaCMS
      </h1>
      <div className="mt-8">
        {items.map((item) => (
          <WhatsNewCard key={item.id} item={item} />
        ))}
      </div>
      <div className="text-center">
        <Link
          href="https://github.com/tinacms/tinacms/blob/main/packages/tinacms/CHANGELOG.md"
          className={`${EYEBROW_LINK} flex items-center justify-center`}
        >
          See more on GitHub <FaGithub className="ml-2" />
        </Link>
        <Link
          href="https://us20.campaign-archive.com/home/?u=1fea337bee20e7270d025ea8a&id=c1062536a1"
          className={`${EYEBROW_LINK} flex items-center justify-center`}
        >
          See Newsletters <FaNewspaper className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default WhatsNewTinaCMSPageLayout;
