import React from 'react'
import { VideoGridComponent } from './MediaComponent'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Components } from 'tinacms/dist/rich-text'

const TextAndMediaColumnsComponent = ({ data }) => {
    const { mediaColumnItem, body } = data || {}

    const typenames = {
        cloudinary: 'PageBlocksTextMediaColumnComponentMediaColumnItemCloudinaryMediaComponent',
        youtube: 'PageBlocksTextMediaColumnComponentMediaColumnItemYoutubeMedia'
    }



    const components: Components<{}> = {
        p: (props) => <>
            {props.children.props.content.map(content => <p className="text-lg lg:text-xl"> {content.text} </p>)}
            <br/>
        </>,
        h6: (props) => <>
            {props.children.props.content.map(content => <h6 className="font-tuner text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"> {content.text} </h6>)}
            <br />
        </>
    }

    return (
        <div className="md:px-8 xl:px-8 lg:px-8 px-3 max-w-screen-xl mx-auto pb-4 pt-16 w-full">
            <div className="lg:grid lg:grid-cols-2 mx-auto pb-16">
                <div className="pb-12 lg:pb-0 mx-6 md:mx-16 lg:mx-30 my-auto relative bottom-5">
                    {body && <TinaMarkdown content={body} components={components}/>}
                    
                </div>
                <div className="my-auto">
                    {VideoGridComponent({ data: { mediaItem: mediaColumnItem, typenames } })}
                </div>
            </div>
        </div>
    )
}

export { TextAndMediaColumnsComponent }
