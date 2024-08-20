import React from 'react'
import { VideoGridComponent } from './MediaComponent'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Components } from 'tinacms/dist/rich-text'

const TextAndMediaColumnsComponent = ({ data }) => {
    const { headline, mediaColumnItem, body, subheading } = data || {}

    const typenames = {
        cloudinary: 'PageBlocksTextMediaColumnComponentMediaColumnItemCloudinaryMediaComponent',
        youtube: 'PageBlocksTextMediaColumnComponentMediaColumnItemYoutubeMedia'
    }



    const components: Components<{}> = {
        p: (props) => <>
            {props.children.props.content.map(content => <p className="text-md lg:text-lg text-gray-900"> {content.text} </p>)}
            <br/>
        </>,
        h6: (props) => <>
            {props.children.props.content.map(content => <h6 className="font-tuner text-xl lg:text-2xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"> {content.text} </h6>)}
            <br />
        </>
    }

    return (
        <div className="md:px-8 xl:px-8 lg:px-8 px-3 max-w-screen-xl mx-auto pb-4 pt-16 w-full">
            <h2 className="text-center font-tuner text-3xl sm:pt-10 md:pt-4 lg:pt-0 lg:text-5xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent pb-10">
                {headline}
            </h2>
            <h3 className=" mx-[5%] lg:mx-[20%] text-xl lg:text-2xl font-inter lg:leading-tight text-gray-900 mb-20 pb-10 text-center">
                {subheading}
            </h3>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-14 pb-16">
                <div className="pb-12 lg:pb-0 mx-6 lg:mx-0">
                    {body && <TinaMarkdown content={body} components={components}/>}
                    
                </div>
                <div className="w-full my-auto">
                    {VideoGridComponent({ data: { mediaItem: mediaColumnItem, typenames } })}
                </div>
            </div>
            
        </div>
    )
}

export { TextAndMediaColumnsComponent }
