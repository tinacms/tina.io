export const SpacerComponent = ({ data }) => {
    const { spacingPx, spacingPxMobile } = data || {}
    return <div className={`md:h-${spacingPx} h-${spacingPxMobile}`} style={{width: `100%`}}></div>
}