import styled from 'styled-components';
import { formatDate } from '../../utils/blog_helpers';
import { BODY_MUTED } from '../styles/typography';

export const LastEdited = styled(({ date, className, ...styleProps }) => {
  if (!date) {
    // biome-ignore lint/complexity/noUselessFragments: <TODO>
    return <></>;
  }

  const formattedDate = formatDate(new Date(date));

  return (
    <p {...styleProps} className={`${className ?? ''} ${BODY_MUTED}`}>
      Last Edited: {formattedDate}
    </p>
  );
})`
  margin-top: 2rem !important;
`;
