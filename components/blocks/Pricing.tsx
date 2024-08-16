import { TinaMarkdown } from 'tinacms/dist/rich-text'
import RenderButton from 'utils/renderButtonArrayHelper'

const pricingComponents = {
  strong: ({ children }) => {
    return <strong>{children}</strong>
  },

  b: ({ children }) => {
    return <strong>{children}</strong>
  },
}

const FreeTier = ({ data }) => {
  return (
    <div className="shadow-xl rounded-xl w-full p-10 transform transition-transform duration-300 border border-transparent hover:scale-105">
      {data.freeTier && (
        <div className="flex justify-between pb-2">
          <h2 className="font-tuner text-3xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
            {data.freeTier.name}
          </h2>
          <div className="flex items-baseline">
            <h2 className="font-tuner text-3xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.freeTier.price}
            </h2>
            <span className="text-lg ml-2 bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.freeTier.interval}
            </span>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <TinaMarkdown
          content={data.freeTier.description}
          components={pricingComponents}
        />
        {data.freeTier.buttons &&
          data.freeTier.buttons.map((button, index) => (
            <RenderButton key={index} button={button} index={index} />
          ))}
      </div>
    </div>
  )
}

export function PricingBlock({ data, index }) {
  console.log(data)
  console.log('description: ', data.freeTier.description)

  return (
    <div className="p-6">
      <div className="py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-6xl mx-auto">
        <h1 className="text-center justify-center font-tuner text-4xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-600 to-orange-700 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
          {data.headline}
        </h1>
        <div className='py-2'>
          <FreeTier data={data}/>
        </div>
        <div className='pt-10 pb-6 text-center'>
          <TinaMarkdown content={data.intro} components={pricingComponents} />
        </div>
      </div>
    </div>
  )
}
