import { Layout } from 'components/layout'
import client from 'tina/__generated__/client'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { versionComponents } from 'components/styles/WhatsNewVisualComponents'


export const getStaticProps = async () => {
  const { data: connectionData } =
    await client.queries.WhatsNewTinaCloudConnection({
      last: 10,
      sort: 'dateReleased',
    })

  const items =
    connectionData?.WhatsNewTinaCloudConnection?.edges.map(
      (edge) => edge.node
    ) || []
  return {
    props: {
      items,
    },
  }
}

const Tinacloud = ({ items }) => {
  console.log(items)
  return (
    <Layout>
      <div className="p-6">
        <div className="py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-prose mx-auto">
          <h1 className="text-center justify-center font-tuner text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-600 to-orange-700 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
            What's new with TinaCloud
          </h1>
          <div className="mt-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="mb-6 p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105"
              >
                <h4 className="text-2xl bg-gradient-to-br from-blue-700 to-blue-1000 bg-clip-text text-transparent text-blue-700 font-semibold">
                  Version {item.versionNumber}
                </h4>
                <p className="text-sm text-gray-500">
                  Released on {new Date(item.dateReleased).toLocaleDateString()}
                </p>
                <TinaMarkdown
                  content={item.body}
                  components={versionComponents}
                />
              </div>
            ))}
          </div>
          <div className="font-tuner text-lg text-center text-blue-700">
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Tinacloud
