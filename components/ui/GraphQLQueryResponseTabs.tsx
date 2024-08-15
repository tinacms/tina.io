import { useState } from 'react';
import { Prism } from '../styles/Prism'

export const GraphQLQueryResponseTabs = ({ ...props }) => {

    const [isQuery, setIsQuery] = useState(true);

    const buttonStyling = "flex justify-center relative leading-tight text-white mx-6 pt-[12px] pb-[10px] text-base font-medium transition duration-150 ease-out rounded-t-3xl flex items-center gap-1 font-tuner whitespace-nowrap px-2"
    const activeButtonStyling = " hover:-translate-y-px active:translate-y-px hover:-translate-x-px active:translate-x-px hover:text-gray-50 opacity-50 hover:opacity-100"
    const overlay = <div
        className="w-full flex-grow opacity-70 rounded-md"
        style={{
            backgroundColor: 'rgb(1, 22, 39)',
        }}></div>
    const underlineStyling = "transition-[width] absolute h-1 bottom-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg"
    const containerStyling = "w-full flex col-start-1 row-start-1 overflow-x-scroll flex-col"

    return <div
        className="mb-1">
        <div
            className="flex w-full py-0 relative top-3 pt-1 z-10 rounded-t-md border-b border-b-orange-400/30"
            style={{
                backgroundColor: 'rgb(1, 22, 39)'
            }}>
            <button
                onClick={() => setIsQuery(true)}
                className={buttonStyling + (isQuery ? '' : activeButtonStyling)}
                disabled={isQuery}
            >
                Query
                <div
                    className={underlineStyling + (isQuery ? " w-full" : " w-0")}>
                </div>
            </button>
            <button
                onClick={() => setIsQuery(false)}
                className={buttonStyling + (isQuery ? activeButtonStyling : '')}
                disabled={!isQuery}
            >
                Response
                <div
                    className={underlineStyling + (isQuery ? " w-0" : " w-full")}>
                </div>
            </button>
        </div>
        <div
            className="h-fit grid grid-cols-1 w-full">
            <div
                className={containerStyling} 
                style={{
                    zIndex: isQuery ? 5 : 1,
                }}>
                <Prism
                    value={props.query?.replaceAll('#', ' ') || ''}
                    lang={'graphql'}
                    theme="nightOwl"
                />
                {overlay}
            </div>
            <div
                className={containerStyling} 
                style={{
                    zIndex: isQuery ? 1 : 5,
                }}>
                <Prism
                    value={props.response?.replaceAll('#', ' ') || ''}
                    lang={'json'}
                    theme="nightOwl"
                />
                {overlay}
            </div>
        </div>
    </div>
}