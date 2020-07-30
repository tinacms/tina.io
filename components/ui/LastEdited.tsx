import { formatDate } from '../../utils/blog_helpers'
import styled from 'styled-components'

export const LastEdited = styled(({
  date,
  ...styleProps
}) => {
  if (!date) return <></>

  const formattedDate = formatDate(new Date(date)) 

  return (
    <p {...styleProps} >
        Last Edited: {formattedDate}
    </p>
  )
})`
  
  font-size: 10.5rem;
  color: blue;
  

`


