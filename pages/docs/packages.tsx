import {
  DocsLayout,
  Wrapper,
  DocsTextWrapper,
  Footer,
} from '../../components/layout'
import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import {
  DocsNavToggle,
  DocsMobileTinaIcon,
  DocsContent,
  DocsHeaderNav,
} from './[...slug]'
import { DocsNav, Overlay } from '../../components/ui'

interface Package {
  name: string
}

const packages: Package[] = [{ name: 'react-tinacms-github' }]

export default function Packages() {
  const frontmatter = {
    title: 'packages',
  }
  const excerpt = 'alsdf'

  const [open, setOpen] = useState(false)
  return (
    <DocsLayout isEditing={false}>
      <NextSeo
        title={frontmatter.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [
            {
              url:
                'https://res.cloudinary.com/forestry-demo/image/upload/l_text:tuner-regular.ttf_90_center:' +
                encodeURIComponent(frontmatter.title) +
                ',g_center,x_0,y_50,w_850,c_fit,co_rgb:EC4815/v1581087220/TinaCMS/tinacms-social-empty-docs.png',
              width: 1200,
              height: 628,
              alt: frontmatter.title + ` | TinaCMS Docs`,
            },
          ],
        }}
      />
      <DocsNavToggle open={open} onClick={() => setOpen(!open)} />
      <DocsMobileTinaIcon />
      <DocsNav open={open} navItems={[]} />
      <DocsContent>
        <DocsHeaderNav color={'light'} open={open} />
        <DocsTextWrapper>
          <Wrapper narrow>
            <ul>
              {packages.map(pkg => (
                <li>{pkg.name} </li>
              ))}
            </ul>
          </Wrapper>
        </DocsTextWrapper>
        <Footer light preview={false} />
      </DocsContent>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </DocsLayout>
  )
}
