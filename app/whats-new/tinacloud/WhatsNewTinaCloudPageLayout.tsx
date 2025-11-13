import Link from 'next/link';
import { FaNewspaper } from 'react-icons/fa';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import { WhatsNewCard } from '../tinacms/WhatsNewTinaCMSLayout';

export const WhatsNewTinaCloudPageLayout = ({ data }) => {
  const items = data.WhatsNewTinaCloudConnection.edges.map((edge) => edge.node);

  return (
    <div className="p-6 py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-5xl md:mx-auto">
      <h1
        className={`${H1_HEADINGS_SIZE} text-center justify-center font-ibm-plex lg:leading-tight`}
      >
        What's new with <span className="text-orange-500">TinaCloud</span>
      </h1>
      <div className='mt-8'>

      {items && items.map((item) => (
        <WhatsNewCard key={item.id} item={item} />
      ))}
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
