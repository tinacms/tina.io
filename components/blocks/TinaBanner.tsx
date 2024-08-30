import Image from "next/image"

const imageCellSizing = "lg:flex flex-nowrap align-bottom justify-center h-64 lg:h-72 relative";

export const TinaBanner = ({ data }) => {
    const { backdrop, leftFig, rightFig, centerFig, llama, leftScreen, rightScreen } = data || {}
    return <div className="w-full  relative mt-16">
        {backdrop && <div className="absolute w-full h-14 bottom-0 left-0 -mb-[3px] lg:mb-0 z-20">
            <Image
            src={backdrop}
            alt="backdrop"
            fill
            style={{
                objectFit: 'cover',
                }} />
            </div>
        }
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className={`${imageCellSizing} hidden`}>
                {leftFig && <img
                    src={leftFig}
                    alt="content creator"
                    className="mt-auto h-[75%] relative ml-16"
                />}
                {leftScreen && <img
                    src={leftScreen}
                    alt="content creation UI"
                    className="mb-auto mt-10 h-[35%] mr-auto"
                />}
            </div>
            <div className={`${imageCellSizing} flex w-full`}>
                {centerFig && <img
                    src={centerFig}
                    alt="creator developer signpost"
                    className="mt-auto h-full"
                />}
                {llama && <img
                    src={llama}
                    alt="llama logo"
                    className="mt-auto h-[85%] mr-8"
                />}
            </div>
            <div className={`${imageCellSizing} hidden`}>
                {rightScreen && <img
                    src={rightScreen}
                    alt="npx command UI"
                    className="mb-auto mt-6 h-[40%] ml-8"
                />}
                {rightFig && <img
                    src={rightFig}
                    alt="developer"
                    className="right-6 h-[80%] mt-auto relative"
                />}
            </div>
        </div>
    </div>
}