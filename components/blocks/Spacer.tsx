export const SpacerComponent = ({ data }) => {
    const { spacingPx, spacingPxMobile } = data || {}
    return <>
        <div className={`hidden xl:block`} style={{ height: `${spacingPx}px`, width: `100%` }}></div>
        <div className={`xl:hidden`} style={{ height: `${spacingPxMobile}px`, width: `100%` }}></div>
    </>
}