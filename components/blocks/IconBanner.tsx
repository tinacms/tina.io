import React from 'react'
import { FaClock } from 'react-icons/fa'

const IconBannerComponent = ({ data }) => {
    const { iconColumn } = data || {}


    // const components: Components<{}> = {
    //     p: (props) => <>
    //         {props.children.props.content.map(content => <p className="text-lg lg:text-xl"> {content.text} </p>)}
    //         <br />
    //     </>,
    //     h6: (props) => <>
    //         {props.children.props.content.map(content => <h6 className="font-tuner text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"> {content.text} </h6>)}
    //         <br />
    //     </>
    // }

    return (
        <div className="h-fit lg:py-16 lg:my-8 bg-gradient-to-r from-blue-700 to-blue-900 w-screen">
            <div className="flex justify-center lg:gap-36">
                {Array.isArray(iconColumn) && iconColumn.map((item, index) => {
                    return <div className="text-start grid grid-cols-1" key={`iconColumn-${index}`}>
                        <h4 className="font-tuner text-3xl text-white">{item.heading}</h4>
                    </div>
                })}
            </div>
        </div>
    )
}

export { IconBannerComponent }
