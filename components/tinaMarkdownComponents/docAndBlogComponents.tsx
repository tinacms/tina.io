import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { CardGrid } from 'components/blocks/CardGrid';
import RecipeBlock from 'components/blocks/Recipe';
import { GraphQLQueryResponseTabs } from 'components/ui/GraphQLQueryResponseTabs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { getDocId } from 'utils/docs/getDocIds';
import { WarningCallout } from 'utils/shortcodes';
import { Prism } from '../styles/Prism';
const ScrollBasedShowcase = dynamic(
  () => import('./templateComponents/scrollBasedShowcase'),
  {
    ssr: false,
  }
);

export const docAndBlogComponents: Components<{
  Iframe: { iframeSrc: string; height: string };
  Youtube: { embedSrc: string };
  CreateAppCta: { ctaText: string; cliText: string };
  GraphQLCodeBlock: {
    query: string;
    response: string;
    preselectResponse: boolean;
  };
  Callout: {
    title: string;
    description: string;
    url: string;
    buttonText: string;
  };
  WebmEmbed: { embedSrc: string; width?: string };
  WarningCallout: { body: string };
  Codesandbox: { embedSrc: string; title: string };
  Diagram: { alt: string; src: string };
  WideImage: { alt: string; src: string };
  CustomFieldComponentDemo: {};
  CloudinaryVideo: { src: string };
  Button: { link: string; label: string };
  ImageAndText: { docText: string; image: string };
  Summary: { heading: string; text: string };
  recipeBlock: {
    title?: string;
    description?: string;
    codeblock?: any;
    instruction?: {
      header?: string;
      itemDescription?: string;
      codeLineStart?: number;
      codeLineEnd?: number;
    }[];
  };
  scrollBasedShowcase: {
    showcaseItems: {
      image: string;
      title: string;
      useAsSubsection: boolean;
      content: string;
    }[];
  };
  cardGrid: {
    cards: {
      title: string;
      description: string;
      link: string;
      linkText: string;
    }[];
  };
}> = {
  scrollBasedShowcase: (props) => {
    return <ScrollBasedShowcase showcaseItems={props.showcaseItems} />;
  },
  cardGrid: (props) => {
    return <CardGrid props={props} />;
  },
  recipeBlock: (props) => {
    return (
      <div className="text-white">
        <RecipeBlock data={props} />
      </div>
    );
  },
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
    );
  },
  code: (props) => (
    <code
      className="px-1 text-orange-500 py-0.5 border-y-stone-600 bg-white rounded"
      {...props}
    />
  ),

  Summary: (props) => {
    const [openTab, setOpenTab] = useState(false);

    const handleToggle = () => {
      setOpenTab(!openTab);
    };

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
            <TinaMarkdown
              content={props.text as any}
              components={docAndBlogComponents}
            />
          </div>
        )}
      </div>
    );
  },
  h1: (props) => <FormatHeaders level={1} {...props} />,
  h2: (props) => <FormatHeaders level={2} {...props} />,
  h3: (props) => <FormatHeaders level={3} {...props} />,
  h4: (props) => <FormatHeaders level={5} {...props} />,
  h5: (props) => <FormatHeaders level={5} {...props} />,
  h6: (props) => <FormatHeaders level={6} {...props} />,
  img: (props) => {
    return (
      <img
        className="my-4 rounded-xl border"
        src={props.url}
        alt={props.alt || ''}
        title={props.caption || ''}
      ></img>
    );
  },
  ul: (props) => <ul className="list-disc my-4 ml-2" {...props} />,
  ol: (props) => <ol className="list-decimal my-4 ml-2" {...props} />,
  li: (props) => <li className="mb-2 ml-8" {...props} />,
  p: (props) => <p className="mb-2" {...props} />,
  a: (props) => {
    return (
      <a
        href={props.url}
        {...props}
        className="underline opacity-80 transition-all duration-200 ease-out hover:text-orange-500"
      />
      //Ripped the styling from styles/RichText.tsx " a:not([class]) "
    );
  },
  //@ts-ignore it doesnt recognside blockquote but wont render block_quote and wil render blockquote....???
  blockquote: (props) => (
    <blockquote
      style={{
        backgroundColor: 'var(--color-white)',
      }}
      className="my-6 border-l-4 py-6 border-x-teal-400/50 pl-4 rounded-tr-lg rounded-br-lg pr-2"
      {...props}
    />
  ),

  Iframe: ({ iframeSrc, height }) => {
    return (
      <div>
        <iframe width="100%" height={`${height}px`} src={iframeSrc} />
      </div>
    );
  },
  table: (props) => {
    // Navigate through the nested structure to find the actual table content
    // @ts-ignore - Linter is wrong about the actual structure
    const tableRows = props?.children?.props?.children || [];

    return (
      <div className="overflow-x-auto my-6 rounded-lg shadow-md">
        <table className="table-auto w-full">
          <tbody>
            {tableRows.map((row, rowIndex) => {
              // Each row has its own props.children array containing cells
              // @ts-ignore - Linter is wrong about the actual structure
              const cells = row?.props?.children || [];
              const CellComponent = rowIndex === 0 ? 'th' : 'td';

              return (
                <tr
                  key={`row-${rowIndex}`}
                  className={
                    rowIndex % 2 === 0 ? 'bg-white/5' : 'bg-blue-500/5'
                  }
                >
                  {cells.map((cell, cellIndex) => {
                    return (
                      <CellComponent
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className={`border border-orange-100 px-4 py-2 ${
                          rowIndex === 0
                            ? 'font-normal bg-white/50 text-left text-orange-500 font-tuner'
                            : ''
                        } ${cellIndex === 0 ? 'break-words max-w-xs' : ''}`}
                      >
                        {/* @ts-ignore - Linter is wrong about the actual structure */}
                        {console.log(cell)}
                        {cell?.props?.children}
                        <TinaMarkdown
                          content={cell?.props?.content as any}
                          components={docAndBlogComponents}
                        />
                      </CellComponent>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
  WebmEmbed: ({ embedSrc, width = '100%' }) => (
    <div className="video-container flex justify-center my-4">
      <video
        width={width}
        height="auto"
        src={embedSrc}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={embedSrc} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  ),
  Youtube: ({ embedSrc }) => (
    <div
      className="youtube-container my-6 w-full relative"
      style={{ paddingBottom: '56.25%' }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full"
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
    const [hasCopied, setHasCopied] = React.useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children || value || '');
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    };

    return (
      <div className="relative py-3 word-break white-space overflow-x-hidden rounded-xl">
        <button
          onClick={handleCopy}
          className="absolute top-6 right-3 z-10 h-6 w-6 flex items-center justify-center text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 rounded"
        >
          {hasCopied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Copy</span>
        </button>
        <Prism
          value={children || value || ''}
          lang={lang || 'jsx'}
          theme="nightOwl"
        />
      </div>
    );
  },

  GraphQLCodeBlock: ({ query, response, preselectResponse }) => {
    return (
      <GraphQLQueryResponseTabs
        query={query}
        response={response}
        preselectResponse={preselectResponse}
      />
    );
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
};

function FormatHeaders({ children, level }) {
  const HeadingTag = `h${level}` as any;
  const id = getDocId(
    children.props?.content.map((content) => content.text).join('') ?? children
  );

  const currentUrl =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const linkHref = `${currentUrl}#${id}`;

  const styles = {
    1: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-4xl mt-4 mb-4',
    2: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-3xl mt-8 mb-2',
    3: 'bg-gradient-to-br from-blue-800 via-blue-900 to-blue-100 bg-clip-text text-transparent text-xl font-medium mt-4 mb-2 !important',
    4: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-xl font-medium mt-2 mb-2',
    5: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-lg font-medium mt-2 mb-1',
    6: 'text-gray-500 text-base font-normal mt-2 mb-1',
  };

  const handleHeaderClick = (event) => {
    event.preventDefault();
    scrollToElement(id);
    window.history.pushState(null, '', linkHref);
  };

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 130; //offset in pixels
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      scrollToElement(hash);
    }
    //this is used for when you get sent a link with a hash (i.e link to a header)
  }, []);

  return (
    <HeadingTag id={id} className={`${styles[level]} relative cursor-pointer`}>
      <a
        href={linkHref}
        className="no-underline group"
        onClick={handleHeaderClick}
      >
        {' '}
        {children}
        <FiLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex mb-2" />
      </a>
    </HeadingTag>
  );
}
