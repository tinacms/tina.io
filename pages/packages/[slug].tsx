import {
    DocsLayout,
    Wrapper,
    DocsTextWrapper,
    Footer,
    MarkdownContent,
  } from '../../components/layout'
  import React, { useState } from 'react'
  import { NextSeo } from 'next-seo'
  import {
    DocsNavToggle,
    DocsMobileTinaIcon,
    DocsContent,
    DocsHeaderNav,
  } from '../docs/[...slug]'
  import { DocsNav, Overlay } from '../../components/ui'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getDocProps } from '../../utils/docs/getDocProps'
import { GithubError } from 'next-tinacms-github'
import path from 'path'
import fs from 'fs'
import { getPackageProps } from '../../utils/docs/getPackageProps'

  
  interface Package {
    name: string
  }
  
  const packages: Package[] = [{ name: 'react-tinacms-github' }]
  
  export default function Packages(props) {
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
        <DocsNav open={open} navItems={props.docsNav} />
        <DocsContent>
          <DocsHeaderNav color={'light'} open={open} />
          <DocsTextWrapper>
            <Wrapper narrow>
                <MarkdownContent escapeHtml={false} content={props.content} />
            </Wrapper>
          </DocsTextWrapper>
          <Footer light preview={false} />
        </DocsContent>
        <Overlay open={open} onClick={() => setOpen(false)} />
      </DocsLayout>
    )
  }

  export const getStaticProps: GetStaticProps = async function(props) {

    const slug = props.params.slug


    console.log("slugs: " + slug);
    

    try {
      return await getPackageProps(props, `${slug}`)
      //return await getDocProps(props, slug)
    } catch (e) {
      if (e instanceof GithubError) {
        return {
          props: {
            previewError: { ...e }, //workaround since we cant return error as JSON
          },
        }
      } else {
        throw e
      }
    }
  }
  
 
  export const getStaticPaths: GetStaticPaths = async function() {
    const filePath = path.join(process.cwd(), 'content/packages.json')
    const file = await JSON.parse(fs.readFileSync(filePath, 'utf8'))

    console.log("Getting Static Paths");
    
    //file.packages.map( p => { params: { slug: p.name } })

    var paths = []

    file.packages.forEach(element => {
      console.log("PAckage: " + element.name);

      paths.push(
        {
          params: {
            slug: element.name
          }
        }
      )
      
    });


    return {
      paths: paths,
      fallback: false
    }
  }