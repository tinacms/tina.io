import { GraphQLQueryResponseTabs } from 'components/ui/GraphQLQueryResponseTabs';
import { useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import {
    TinaMarkdown,
    Components,
  } from 'tinacms/dist/rich-text'
import { getDocId } from 'utils/docs/getDocIds';
import { WarningCallout } from 'utils/shortcodes';
import { Prism } from '../styles/Prism'
import Image from 'next/image';

export const docAndBlogComponents: Components<{
    Iframe: { iframeSrc: string; height: string }
    Youtube: { embedSrc: string;}
    CreateAppCta: { ctaText: string; cliText: string }
    GraphQLCodeBlock: { query: string, response: string }
    Callout: {
      title: string
      description: string
      url: string
      buttonText: string
    }
    WarningCallout: { body: string }
    Codesandbox: { embedSrc: string; title: string }
    Diagram: { alt: string; src: string }
    WideImage: { alt: string; src: string }
    CustomFieldComponentDemo: {}
    CloudinaryVideo: { src: string }
    Button: { link: string; label: string }
    ImageAndText: { docText: string; image: string }
    Summary: { heading: string; text: string }
  
  }> = {
    ImageAndText: (props) => {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red">
            {' '}
            <TinaMarkdown
              content={props.docText as any}
              components={docAndBlogComponents}
            />{' '}
          </div>
          <div>
            <Image src={props?.image} alt="image" className="w-full" />
          </div>
        </div>
      )
    },
  
    Summary: (props) => {
      const [openTab, setOpenTab] = useState(false)
  
      const handleToggle = () => {
        setOpenTab(!openTab)
      }
  
      
  
      return (
        <div>
          <hr></hr>
          <button
            className="flex w-full items-start justify-between text-left text-gray-900"
            onClick={handleToggle}
          >
            <h3>{props.heading}</h3>
            {openTab ? <FaMinus /> : <FaPlus />}
          </button>
          {openTab && (
            <div>
              <TinaMarkdown content={props.text as any} components={docAndBlogComponents} />
            </div>
          )}
        </div>
      )
    },
  
    h1: (props) => <FormatHeaders level={1} {...props} />,
    h2: (props) => <FormatHeaders level={2} {...props} />,
    h3: (props) => <FormatHeaders level={3} {...props} />,
    h4: (props) => <FormatHeaders level={5} {...props} />,
    h5: (props) => <FormatHeaders level={5} {...props} />,
    h6: (props) => <FormatHeaders level={6} {...props} />,
    ul: (props) => <ul className="list-disc ml-5" {...props} />,
    ol: (props) => <ol className="list-decimal ml-5" {...props} />,
    li: (props) => <li className="mb-2" {...props} />,
  
    Iframe: ({ iframeSrc, height }) => {
      return (
        <div>
          <iframe width="100%" height={`${height}px`} src={iframeSrc} />
        </div>
      )
    },
    Youtube: ({ embedSrc }) => (
      <div className="youtube-container">
        <iframe
          width="560"
          height="315"
          src={embedSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
    ),
    CreateAppCta: ({ ctaText, cliText }) => (
      <>
        <a
          href="/docs/introduction/using-starter/"
          style={{
            textDecoration: 'none',
            borderRadius: '10px',
            padding: '1rem 1.5rem',
            lineHeight: '1em',
            fontWeight: 'bold',
            background: '#ec4815',
            display: 'inline-block',
            color: 'white',
          }}
        >
          {ctaText}
        </a>
  
        <div
          style={{
            padding: '1rem 1.5rem',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            width: 'auto',
            display: 'inline-block',
            border: '1px solid #8080803b',
            lineHeight: '1em',
            borderRadius: '10px',
            marginLeft: '20px',
            fontSize: '1rem',
          }}
        >
          {cliText}
        </div>
      </>
    ),
    WarningCallout: ({ body }) => <WarningCallout text={body} />,
    Callout: ({ title, description, url, buttonText }) => (
      <div className="callout">
        <img
          className="learnImage"
          src="/img/tina-laptop.png"
          alt="Tina laptop"
        />
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          <a href={url} className="calloutButton">
            {buttonText}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          </a>
        </div>
      </div>
    ),
    Codesandbox: ({ embedSrc, title }) => (
      <div>
        <iframe
          src={embedSrc}
          style={{
            width: '100%',
            height: '500px',
            border: 'none',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          title={title}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="wide"
        ></iframe>
      </div>
    ),
    Diagram: ({ alt, src }) => (
      <img
        alt={alt}
        style={{
          margin: 'auto',
          padding: '2rem .5rem',
          border: 'none',
        }}
        src={src}
      />
    ),
    WideImage: ({ alt, src }) => (
      <img
        alt={alt}
        style={{
          margin: '1.5rem auto',
          overflow: 'hidden',
          width: '140%',
          maxWidth: 'calc(100vw - 5rem)',
          left: '50%',
          position: 'relative',
          transform: 'translate3d(-50%,0,0)',
          borderRadius: '5px',
          border: '1px solid rgba(0,0,0,0.1)',
        }}
        src={src}
      />
    ),
    // @ts-ignore TODO: fix this in TinaCMS
    code_block: ({ value, lang, children }) => {
      return (
        <Prism
          value={children || value || ''}
          lang={lang || 'jsx'}
          theme="nightOwl"
        />
      )
    },
    GraphQLCodeBlock: ({ query, response }) => {
      return <GraphQLQueryResponseTabs 
        query={query} 
        response={response}
      />
    },
    CustomFieldComponentDemo: () => (
      <iframe
        height="450"
        style={{ width: '100%' }}
        scrolling="no"
        title="CSS Filters + A Springer Spaniel"
        src="https://codepen.io/kendallstrautman/embed/WNbzLJZ?height=265&theme-id=default&default-tab=css,result"
        frameBorder="no"
        allowTransparency={true}
        allowFullScreen={true}
      >
        See the Pen{' '}
        <a href="https://codepen.io/kendallstrautman/pen/WNbzLJZ">
          CSS Filters + A Springer Spaniel
        </a>{' '}
        by Kendall Strautman (
        <a href="https://codepen.io/kendallstrautman">@kendallstrautman</a>) on{' '}
        <a href="https://codepen.io">CodePen</a>.
      </iframe>
    ),
    CloudinaryVideo: ({ src }) => (
      <video className="video my-6" autoPlay loop muted playsInline>
        <source src={src + `.webm`} type="video/webm" />
        <source src={src + `.mp4`} type="video/mp4" />
      </video>
    ),
    Button: ({ link, label }) => (
      <div className="w-full flex justify-start my-6">
        <a
          className="px-6 pt-[12px] pb-[10px] text-base font-medium transition duration-150 ease-out rounded-full flex items-center gap-1 font-tuner whitespace-nowrap focus:outline-none focus:shadow-outline hover:-translate-y-px active:translate-y-px hover:-translate-x-px active:translate-x-px leading-tight text-white hover:text-gray-50 border border-orange-600 bg-gradient-to-br from-orange-400 to-orange-600"
          href={link}
          target="_blank"
        >
          {label} <BiRightArrowAlt className="h-5 w-auto -mt-1 opacity-70" />
        </a>
      </div>
    ),
  }
  
  function FormatHeaders({ children, level }) {
    const HeadingTag = `h${level}` as any
    const id = getDocId(children.props.content.map(content => content.text).join(''))
  
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    const linkHref = `${currentUrl}#${id}`;
  
    return (
      <HeadingTag id={id} className="relative cursor-pointer">
        <a href={linkHref} className="no-underline flex items-center group">
          {children}
          <FiLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </a>
      </HeadingTag>
    );
  }