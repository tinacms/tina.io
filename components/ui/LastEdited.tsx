import styled from 'styled-components';
import { formatDate } from '../../utils/blog_helpers';

export const LastEdited = styled(({ date, ...styleProps }) => {
  if (!date) {
    // biome-ignore lint/complexity/noUselessFragments: <TODO>
    return <></>;
  }

  const formattedDate = formatDate(new Date(date));

  return <p {...styleProps}>Last Edited: {formattedDate}</p>;
})`
  margin-top: 2rem !important;
  font-size: 1rem !important;
  color: inherit;
  opacity: 0.5;
`;
