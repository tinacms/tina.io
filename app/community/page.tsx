import { getJsonPreviewProps } from 'utils/getJsonPreviewProps';
import CommunityPageClient from './community-client';

async function getCommunityPageData() {
  const previewProps = await getJsonPreviewProps(
    'content/pages/community.json'
  );
  return previewProps;
}

export default async function CommunityPage() {
  const data = await getCommunityPageData();
  const cleanData = data.props.file.data;

  return (
    <>
      <div>
        <CommunityPageClient {...cleanData} />
      </div>
    </>
  );
}
