import { formatDate } from '../../utils/blog_helpers'

export const LastEdited = ({
    date
}) => {
    if (!date) return (<></>)

    const formattedDate = formatDate(new Date(date)) 

    return (
        <>
            Last Edited: {formattedDate}
        </>
    )
}


