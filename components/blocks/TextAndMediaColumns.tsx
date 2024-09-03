import React from 'react'
import { VideoGridComponent } from './MediaComponent'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Components } from 'tinacms/dist/rich-text'

const TextAndMediaColumnsComponent = ({ data }) => {
    const { mediaColumnItem, body, isVideoOnLeft } = data || {}

    const typenames = {
        cloudinary: 'PageBlocksTextMediaColumnComponentMediaColumnItemCloudinaryMediaComponent',
        youtube: 'PageBlocksTextMediaColumnComponentMediaColumnItemYoutubeMedia'
    }



    const components: Components<{}> = {
        p: (props) => <>
            {props.children.props.content.map(content => <p className="text-lg lg:text-xl text-black"> {content.text} </p>)}
            <br/>
        </>,
        h6: (props) => <>
            {props.children.props.content.map(content => <h6 className="font-tuner text-3xl lg:text-4xl lg:leading-tight text-orange-400"> {content.text} </h6>)}
            <br />
        </>
    }

    return (
        <div className="px-3 max-w-screen-xl mx-auto pb-4 pt-16 w-full">
            <div className="lg:grid lg:grid-cols-7 mx-auto md:pb-16">
                <div className={`mx-6 my-auto lg:col-span-4 row-start-1 md:h-auto ${isVideoOnLeft ? "lg:mr-0 lg:col-start-1" : "lg:col-start-4 lg:ml-0"}`}>
                    {VideoGridComponent({ data: { mediaItem: mediaColumnItem, typenames } })}
                </div>
                <div className={`lg:col-span-3 py-12 lg:py-0 mx-12 md:mx-16 text-center lg:text-start lg:mx-30 my-auto relative row-start-1 ${isVideoOnLeft ? "lg:col-start-5" : "lg:col-start-1"}`}>
                    {body && <TinaMarkdown content={body} components={components}/>}
                    
                </div>
            </div>
        </div>
    )
}

export { TextAndMediaColumnsComponent }
