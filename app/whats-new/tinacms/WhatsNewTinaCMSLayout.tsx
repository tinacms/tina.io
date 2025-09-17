import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import { whatsNewMDComponents } from 'components/styles/WhatsNewMDComponents';
import Link from 'next/link';
import { FaGithub, FaNewspaper } from 'react-icons/fa';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const WhatsNewTinaCMSPageLayout = ({ data }) => {
  const items = data.WhatsNewTinaCMSConnection.edges.map((edge) => edge.node);

  return (
    <div className="p-6 py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-prose md:mx-auto">
      <h1 className={`${H1_HEADINGS_SIZE} text-center justify-center font-ibm-plex lg:leading-tight`}>
        What's new with TinaCMS
      </h1>
      <div className="mt-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="mb-6 p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105 bg-linear-to-br from-white/25 via-white/50 to-white/75"
          >
            <h2 className="text-2xl bg-linear-to-br from-blue-700 to-blue-1000 bg-clip-text text-transparent font-semibold">
              Version {item.versionNumber}
            </h2>
            <p className="text-sm text-gray-500">
              Released on {new Date(item.dateReleased).toLocaleDateString()}
            </p>
            <TinaMarkdown
              content={item.body}
              components={whatsNewMDComponents}
            />
          </div>
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
