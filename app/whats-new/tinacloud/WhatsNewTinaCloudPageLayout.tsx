'use client';

import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Link from 'next/link';
import { whatsNewMDComponents } from 'components/styles/WhatsNewMDComponents';
import { FaNewspaper } from 'react-icons/fa';

export const TinaCloudClient = ({ data }) => {
  const items = data.WhatsNewTinaCloudConnection.edges.map((edge) => edge.node);

  return (
    
      <div className="p-6 py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-prose mx-auto">
        <h1 className="text-center justify-center font-tuner text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-600 to-orange-700 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
          What's new with TinaCloud
        </h1>
        <div className="mt-8">
          {items.length === 0 ? (
            <p className="text-gray-500">No items found</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="mb-6 p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-white/25 via-white/50 to-white/75"
              >
                <h2 className="text-2xl bg-gradient-to-br from-blue-700 to-blue-1000 bg-clip-text text-transparent text-blue-700 font-semibold">
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
            ))
          )}
        </div>
        <div className="font-tuner text-lg text-center text-blue-700">
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

export default TinaCloudClient;
