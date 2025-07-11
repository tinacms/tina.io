import crypto from 'node:crypto';
import axios from 'axios';
// @ts-ignore
import * as debounce from 'lodash/debounce';
import router from 'next/router';
import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchIcon } from './SearchIcon';
import { IconWrapper, Input, SearchContainer } from './styles';

/* Copied from SearchBoxProvided in react-instantsearch-dom */
interface SearchBoxProps {
  refine: (...args: any[]) => any;
  currentRefinement: string;
  isSearchStalled: boolean;
  expanded: boolean;
}

export const logSearchQuery = async (query: string) => {
  let aid = window.sessionStorage.getItem('tina_anon_sessionid');
  if (!aid) {
    aid = crypto.randomBytes(16).toString('hex');
    window.sessionStorage.setItem('tina_anon_sessionid', aid);
  }
  return axios.post('/api/analytics/', {
    id: aid,
    query,
    timestamp: Date.now(),
  });
};

export default connectSearchBox(
  ({ refine, expanded, ...rest }: SearchBoxProps) => {
    const debouncedSearch = debounce((e: any) => {
      refine(e.target.value);
      // logSearchQuery(e.target.value).catch(console.error)
    }, 250);
    const onChange = (e: any) => {
      e.persist();
      debouncedSearch(e);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        const searchTerm = e.target.value;
        if (searchTerm.trim()) {
          router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
      }
    };

    return (
      <SearchContainer expanded={expanded}>
        <Input
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={onChange}
          onKeyDown={handleKeyDown}
          expanded={expanded}
          {...rest}
        />
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
      </SearchContainer>
    );
  },
) as any;
