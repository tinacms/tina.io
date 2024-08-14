import { Layout } from 'components/layout';
import client from 'tina/__generated__/client';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';

export const versionComponents = {
  h1: (props) => <h1 className="text-lg font-bold mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-lg font-semibold mt-6 mb-4" {...props} />,
  h3: (props) => <h3 className="text-lg font-semibold mt-5 mb-3" {...props} />,
  h4: (props) => <h4 className="text-lg font-medium mt-4 mb-3" {...props} />,
  h5: (props) => <h5 className="text-lg font-medium mt-3 mb-2" {...props} />,
  h6: (props) => <h6 className="text-base font-medium mt-2 mb-2" {...props} />,
  ul: (props) => <ul className="list-disc ml-5 mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal ml-5 mb-4" {...props} />,
  li: (props) => <li className="mb-2" {...props} />
};

export const getStaticProps = async () => {
  const { data: connectionData } = await client.queries.WhatsNewTinaCMSConnection({
    first: 10,
    sort: "dateReleased", 
  });

  const items = connectionData?.WhatsNewTinaCMSConnection?.edges.map(edge => edge.node).reverse() || [];
  console.log(items)
  return {
    props: {
      items,
    },
  };
}

const Tinacms = ({ items }) => {
    console.log(items)
  return (
    <Layout>
      <div className="p-6">
        <div className="py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-prose mx-auto">
          <h3 className="font-tuner inline-block text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-600 to-orange-700 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
            What's New with TinaCMS
          </h3>
          <div className="mt-8">
            {items.map((item) => (
              <div key={item.id} className="mb-6 p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
                <h4 className="text-2xl bg-gradient-to-br from-blue-700 to-blue-1000 bg-clip-text text-transparent text-blue-700 font-semibold">
                  Version {item.versionNumber}
                </h4>
                <p className="text-sm text-gray-500">
                  Released on {new Date(item.dateReleased).toLocaleDateString()}
                </p>
                <TinaMarkdown content={item.body} components={versionComponents} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Tinacms;
