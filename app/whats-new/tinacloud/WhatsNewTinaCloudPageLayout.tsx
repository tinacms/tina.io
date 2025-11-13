import Link from 'next/link';
import { FaExternalLinkAlt, FaNewspaper } from 'react-icons/fa';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';

type ChangeItem = {
  pull_request_number?: string;
  pull_request_link?: string;
  commit_hash?: string;
  commit_link?: string;
  gitHubName?: string;
  gitHubLink?: string;
  changesDescription?: any;
};

const TinaCloudChangeItem = ({ change }: { change: ChangeItem }) => {
  return (
    <li className="mb-3 pl-4 border-l-2 border-blue-200">
      <div className="flex flex-wrap items-start gap-2 mb-2">
        {change.gitHubName && change.gitHubLink && (
          <Link
            href={change.gitHubLink}
            className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{change.gitHubName} <FaExternalLinkAlt className="ml-1 text-xs" />
          </Link>
        )}
        {change.pull_request_link && (
          <Link
            href={change.pull_request_link}
            className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View PR <FaExternalLinkAlt className="ml-1 text-xs" />
          </Link>
        )}
      </div>
      {change.changesDescription && (
        <div className="text-gray-700">
          <TinaMarkdown content={change.changesDescription} />
        </div>
      )}
    </li>
  );
};

export const WhatsNewTinaCloudPageLayout = ({ data }) => {
  const items = data.WhatsNewTinaCloudConnection.edges.map((edge) => edge.node);

  return (
    <div className="p-6 py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-5xl md:mx-auto">
      <h1
        className={`${H1_HEADINGS_SIZE} text-center justify-center font-ibm-plex lg:leading-tight`}
      >
        What's new with TinaCloud
      </h1>
      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-gray-500">No items found</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="mb-6 p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105 bg-linear-to-br from-white/25 via-white/50 to-white/75"
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
                    <ul className="space-y-2">
                      {section.changesList.map((change, changeIndex) => (
                        <TinaCloudChangeItem
                          key={`change-${changeIndex}-${change.gitHubName || 'unknown'}`}
                          change={change}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">
                      No changes in this section
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div className="font-ibm-plex text-lg text-center text-blue-700">
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

export default WhatsNewTinaCloudPageLayout;
