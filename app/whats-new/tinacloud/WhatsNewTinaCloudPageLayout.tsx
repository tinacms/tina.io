import { PAGE_TITLE } from '@/component/styles/typography';
import { TextLink } from '@/component/ui/TextLink';
import { WhatsNewCard } from '../tinacms/WhatsNewTinaCMSLayout';

export const WhatsNewTinaCloudPageLayout = ({ data }) => {
  const items = data.WhatsNewTinaCloudConnection.edges.map((edge) => edge.node);

  return (
    <div className="p-6 py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-5xl md:mx-auto">
      <h1 className={`${PAGE_TITLE} text-center justify-center`}>
        What's new with TinaCloud
      </h1>
      <div className="mt-8">
        {items?.map((item) => (
          <WhatsNewCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <TextLink href="https://us20.campaign-archive.com/home/?u=1fea337bee20e7270d025ea8a&id=c1062536a1">
          See Newsletters
        </TextLink>
      </div>
    </div>
  );
};

export default WhatsNewTinaCloudPageLayout;
