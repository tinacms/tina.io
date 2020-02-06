import { unstable_getStaticProps as getStaticProps } from './page/[page_index]'
import Index from './page/[page_index]'

export const unstable_getStaticProps = getStaticProps
export default Index

/**
 *  STYLES -----------------------------------------------------
 */

const BlogWrapper = styled(Wrapper)`
  padding-top: 10rem;
  max-width: 768px;
`

const BlogTitle = styled(({ children, ...styleProps }) => {
  return (
    <h3 className {...styleProps}>
      {children}
    </h3>
  )
})`
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  font-size: 1.5rem;
  color: inherit;
  transition: all 180ms ease-out;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  @media (min-width: 800px) {
    font-size: 2rem;
    max-width: 80%;
  }
`

const BlogExcerpt = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover,
  &:focus {
    outline: none;
    ${BlogTitle} {
      color: var(--color-primary) !important;
    }
  }
  &:focus {
    hr {
      transition: all 230ms ease-out;
      width: 100%;
    }
  }
  hr {
    transition: all 180ms ease-out;
  }
  &:not(:focus) {
    &:not(:hover) {
      hr {
        opacity: 0.3;
        filter: saturate(0%);
      }
    }
  }
`

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
  opacity: 0.5;
  p {
    margin: 0;
    color: 0;
    display: block;
  }
  p:first-child {
    max-width: 250px;
  }
`

const Pagination = styled.div`
  max-width: 704px;
  width: 100%;
  margin: 0 auto 1.5rem auto;
  display: flex;
  padding: 0 32px;
  justify-content: space-between;
  align-items: center;
  div.prev-next {
    display: flex;
    align-items: center;
    p {
      margin-right: 24px;
    }
  }
  p {
    margin-bottom: 0;
    cursor: pointer;
  }
  div.list-numbers {
    display: flex;
    align-items: center;
  }
  ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 3px 8px 6px 8px;
      border-radius: 5px;
      margin-right: 8px;
      a {
        text-decoration: none;
      }
    }

    li:first-of-type {
      margin-left: 8px;
    }

    span.page-dots {
      align-self: flex-end;
      padding-bottom: 6px;
      color: rgba(0, 0, 0, 0.3);
    }
    li.current-li {
      a {
        color: var(--color-primary);
      }
    }
  }
  @media (min-width: 704px) {
    padding: 0;
  }
`

const PaginationSelect = styled.div`
  display: flex;
  div.select {
    border: 1px solid var(--color-seafoam);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 2px 5px 3px 5px;
    margin: 0 8px;
    position: relative;
  }
  select {
    margin-right: 3px;
    padding-right: 6px;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: medium none;
    font-size: 18px;
  }
  option {
    color: inherit;
    padding: 8px;
    font-family: sans-serif;
  }
  svg {
    width: 8px;
    position: absolute;
    right: 6px;
    pointer-events: none;
  }
  p {
    padding-top: 2px;
    margin-bottom: 0;
  }
`
