import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub, FaNewspaper } from 'react-icons/fa';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';

type ChangeItem = {
  pull_request_number?: string;
  pull_request_link?: string;
  commit_hash?: string;
  commit_link?: string;
  gitHubName?: string;
  gitHubLink?: string;
  changesDescription?: string;
};

type WhatsNewCardProps = {
  item: {
    versionNumber: string;
    dateReleased: string;
    changesObject: {
      changesTitle: string;
      changesList: ChangeItem[];
    }[];
    key: string;
  };
};

const ChangeItemComponent = ({ change }: { change: ChangeItem }) => {
  return (
    <li className="mb-3 flex flex-col">
      <div className="flex items-start gap-2 mb-2">
        {change.gitHubName && change.gitHubLink && (
          <Link
            href={change.gitHubLink}
            className=" items-center px-2 py-1 text-xs bg-orange-100 text-orange-500 rounded-md hover:bg-orange-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{change.gitHubName}
          </Link>
        )}
        -
        {change.changesDescription && (
          <p className="text-gray-700">{change.changesDescription}</p>
        )}
      </div>
      <div className='flex gap-2 '>
        {change.pull_request_number && change.pull_request_link && (
          <Link
            href={change.pull_request_link}
            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors font-mono"
            target="_blank"
            rel="noopener noreferrer"
          >
            #{change.pull_request_number}{' '}
          </Link>
        )}
        {change.commit_hash && change.commit_link && (
          <Link
            href={change.commit_link}
            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors font-mono"
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
        <h2 className="text-2xl bg-linear-to-br from-blue-700 to-blue-1000 bg-clip-text text-transparent font-semibold">
          Version {item.versionNumber}
        </h2>
        <p className="text-sm text-gray-500">
          Released on {new Date(item.dateReleased).toLocaleDateString()}
        </p>
      </div>

      {item.changesObject?.map((section, sectionIndex) => (
        <div
          key={`section-${section.changesTitle}-${sectionIndex}`}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            {section.changesTitle}
          </h3>
          {section.changesList && section.changesList.length > 0 ? (
            <ul className="space-y-4">
              {section.changesList.map((change, changeIndex) => (
                <ChangeItemComponent
                  key={`change-${changeIndex}-${change.commit_hash || change.gitHubName || 'unknown'}`}
                  change={change}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No changes in this section</p>
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
      <h1
        className={`${H1_HEADINGS_SIZE} text-center justify-center font-ibm-plex lg:leading-tight`}
      >
        What's new with <span className="text-orange-500">TinaCMS</span>
      </h1>
      <div className="mt-8">
        {items.map((item) => (
          <WhatsNewCard key={item.id} item={item} />
        ))}
      </div>
      <div className="font-ibm-plex text-lg text-center text-blue-700">
        <Link
          href="https://github.com/tinacms/tinacms/blob/main/packages/tinacms/CHANGELOG.md"
          className="flex items-center justify-center hover:text-blue-800"
        >
          See more on GitHub <FaGithub className="ml-2" />
        </Link>
        <Link
          href="https://us20.campaign-archive.com/home/?u=1fea337bee20e7270d025ea8a&id=c1062536a1"
          className="flex items-center justify-center hover:text-blue-800"
        >
          See Newsletters <FaNewspaper className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default WhatsNewTinaCMSPageLayout;
