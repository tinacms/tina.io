import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export const ChevronRightIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="inherit"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 24.792L12.2654 26L21.4773 17.2061C22.1747 16.5403 22.1737 15.4588 21.4773 14.7939L12.2654 6L11 7.208L20.2099 16L11 24.792Z" />
  </svg>
)

export interface DocsNavProps {
  navItems: any
}

export function Breadcrumbs({ navItems }: DocsNavProps) {
  // const router = useRouter()
  // const currentPath = router.asPath
  // const [breadcrumb, setBreadcrumb] = React.useState([])

  // const findBreadcrumb = (listItems, breadcrumbs) => {
  //   console.log(listItems)
  //   for (const listItem of listItems) {
  //     const newBreadcrumbs = breadcrumbs
  //     newBreadcrumbs.push(listItem)

  //     if (listItem.slug === currentPath) {
  //       return newBreadcrumbs
  //     } else if (listItem.items) {
  //       findBreadcrumb(listItem.items, newBreadcrumbs)
  //     }
  //   }
  // }

  // React.useEffect(() => {
  //   if (currentPath && navItems) {
  //     setBreadcrumb(findBreadcrumb(navItems, []))
  //   }
  // }, [currentPath, navItems])

  // React.useEffect(() => {
  //   console.log(breadcrumb)
  // }, [breadcrumb])

  return (
    <>
      <BreadcrumbList>
        <li>
          <a href="#">TinaCMS</a>
        </li>
        <ChevronRightIcon />
        <li>
          <a href="#">API Reference</a>
        </li>
        <ChevronRightIcon />
        <li>
          <a href="#">Tina Schema & CLI</a>
        </li>
      </BreadcrumbList>
    </>
  )
}

const BreadcrumbList = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 !important;
  margin: 0 0 -0.25rem 0 !important;

  @media (min-width: 1200px) {
    margin: -0.25rem 0 0rem 0 !important;
  }

  li {
    position: relative;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  svg {
    opacity: 0.2;
    color: currentColor;
    fill: currentColor;
    height: 1.5rem;
    width: auto;
    margin: 1px 0.3rem 0 0.5rem;
    text-align: center;
  }

  a {
    text-decoration-color: transparent !important;
    transition: all 185ms ease-out;
    font-size: 1rem;
    text-transform: uppercase;
    opacity: 0.5 !important;
    color: var(--color-secondary);

    &:hover {
      text-decoration-color: currentColor !important;
      opacity: 1 !important;
    }
  }
`
