import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { CardGrid } from 'components/blocks/CardGrid';
import RecipeBlock from 'components/blocks/Recipe';
import { GraphQLQueryResponseTabs } from 'components/ui/GraphQLQueryResponseTabs';
import { ChevronRight, Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineBulb, AiOutlineWarning } from 'react-icons/ai';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { getDocId } from 'utils/docs/getDocIds';
import { Prism } from '../styles/Prism';
import MermaidElement from './mermaid';
const ScrollBasedShowcase = dynamic(
  () => import('./templateComponents/scrollBasedShowcase'),
  {
    ssr: false,
  }
);

export const docAndBlogComponents: Components<{
  Iframe: { iframeSrc: string; height: string };
  Youtube: { embedSrc: string; caption?: string; minutes?: string };
  CreateAppCta: { ctaText: string; cliText: string };
  GraphQLCodeBlock: {
    query: string;
    response: string;
    preselectResponse: boolean;
    customQueryName?: string;
    customResponseName?: string;
  };
  Callout: {
    title: string;
    description: string;
    url: string;
    buttonText: string;
  };
  ApiReference: {
    title: string;
    property: {
      groupName: string;
      name: string;
      description: string;
      type: string;
      default: string;
      required: boolean;
    }[];
  };
  WebmEmbed: { embedSrc: string; width?: string };
  WarningCallout: { body: string };
  Codesandbox: { embedSrc: string; title: string };
  Diagram: { alt: string; src: string };
  WideImage: { alt: string; src: string };
  CustomFieldComponentDemo: {};
  CloudinaryVideo: { src: string };
  Button: { link: string; label: string };
  ImageAndText: { docText: string; image: string; heading?: string };
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
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div
        className={`bg-white/40 rounded-lg shadow-sm mb-2 overflow-hidden transition-[width] duration-300 ease-in-out max-w-full ${
          isExpanded ? 'w-full' : 'w-80 delay-700'
        }`}
      >
        <div
          className="py-1 px-4 cursor-pointer flex justify-between items-center"
          onClick={toggleExpand}
        >
          {FormatHeaders({
            children: props.heading || 'Click to expand',
            level: 6,
          })}
          <div>
            {isExpanded ? (
              <FaMinus className="text-blue-800 size-3" />
            ) : (
              <FaPlus className="text-gray-500 size-3" />
            )}
          </div>
        </div>

        <div
          className={`grid gap-4 border-t border-gray-100 transition-all duration-700 ease-in-out ${
            isExpanded
              ? 'max-h-[2000px] opacity-100 delay-500'
              : 'max-h-0 opacity-0 overflow-hidden'
          } ${props?.image ? 'sm:grid-cols-2' : ''}`}
          ref={contentRef}
        >
          <div className="p-4">
            <TinaMarkdown
              content={props.docText as any}
              components={docAndBlogComponents}
            />
          </div>
          {props?.image && (
            <div className="p-4">
              <img
                src={props?.image}
                alt="image"
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    );
  },
  code: (props) => (
    <code
      className="px-1 text-orange-500 py-0.5 border-y-stone-600 bg-white/50 rounded"
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
      <div className="flex flex-col gap-2 my-4">
        <img
          className="rounded-xl border"
          src={props.url}
          alt={props.alt || ''}
          title={props.caption || ''}
        />
        {props.caption && (
          <div className="text-sm font-tuner text-gray-500">
            Figure: {props.caption}
          </div>
        )}
      </div>
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
      className="!my-6 border-l-4 md:py-6 pt-2 pb-4 border-x-teal-400 pl-3 rounded-tr-lg rounded-br-lg pr-2 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center md:gap-2 items-start">
        <div className="flex-shrink-0">
          <AiOutlineBulb
            size={40}
            className="text-white bg-gradient-to-br from-seafoam-500 to-seafoam-700 p-2 rounded-full my-2 md:my-0 md:mx-2 mx-0"
          />
        </div>
        <div className="leading-6">
          <TinaMarkdown
            content={props.children.props.content as any}
            components={docAndBlogComponents}
          />
        </div>
      </div>
    </blockquote>
  ),
  mermaid: (value) => {
    return <MermaidElement value={value.value} />;
  },
  Iframe: ({ iframeSrc, height }) => {
    return (
      <div>
        <iframe width="100%" height={`${height}px`} src={iframeSrc} />
      </div>
    );
  },
  apiReference: (props) => {
    const [openGroups, setOpenGroups] = useState([]);
    const propertyItem = (property) => {
      return (
        <div className="space-y-4 py-4 px-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-full md:w-1/3">
              <div className="mb-1">
                {property.required && (
                  <span className="text-orange-500 font-medium text-sm">
                    REQUIRED
                  </span>
                )}
                {property.experimental && (
                  <span className="text-seafoam-700 font-medium text-sm">
                    EXPERIMENTAL
                  </span>
                )}
              </div>
              <div className="font-tuner text-blue-500 font-medium break-normal max-w-full inline-block">
                {property?.name?.replace(/([A-Z])/g, '\u200B$1')}
              </div>
              <div className="text-gray-500 text-sm">{property.type}</div>
            </div>
            <div className="w-full md:w-2/3">
              <TinaMarkdown
                content={property.description as any}
                components={docAndBlogComponents}
              />
              {property.default && (
                <div className="text-slate-900 text-md">
                  Default is{' '}
                  <span className="font-mono text-orange-500">
                    {property.default}
                  </span>
                  .
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    const group = (groupName, groupProperties) => {
      const required = groupProperties.some((property) => property.required);

      return (
        <div className=" my-4 overflow-hidden group">
          <button
            onClick={() =>
              setOpenGroups(
                openGroups.includes(groupName)
                  ? openGroups.filter((group) => group !== groupName)
                  : [...openGroups, groupName]
              )
            }
            className="bg-gradient-to-b from-blue-100/20 to-blue-50/20 w-full flex items-center justify-between px-6 py-4 text-left bg-transparent hover:bg-blue-200/10 transition-colors"
          >
            <div>
              {required && (
                <p className="text-orange-500 font-medium text-sm">REQUIRED</p>
              )}
              <h3 className="text-md font-medium text-blue-500 font-tuner">
                {groupName || 'Object'}
              </h3>
            </div>

            <ChevronRight
              className={`w-5 h-5 text-blue-200 transition-transform ${
                openGroups.includes(groupName) ? 'rotate-90' : ''
              } group-hover:text-blue-500`}
            />
          </button>
          {openGroups.includes(groupName) && (
            <div className="px-4">
              {groupProperties.map((property, index) => {
                return (
                  <div key={`property-${index}`}>
                    {index !== 0 && (
                      <hr className="h-0.5 w-[80%] m-auto bg-gray-200 rounded-lg -my-0.5" />
                    )}
                    <div className="mx-2 border-l-2 border-solid border-orange-400">
                      <React.Fragment>{propertyItem(property)}</React.Fragment>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        className={`bg-white rounded-lg shadow-lg my-6 pb-6 ${
          props.title ? 'pt-6' : 'pt-2'
        }`}
      >
        {props.title && (
          <h2 className="text-3xl text-blue-600 mb-6">{props.title}</h2>
        )}

        {/* Process properties in order, grouping only adjacent items with same groupName */}
        {(() => {
          if (!props.property?.length) return null;

          const result = [];
          let currentGroup = null;
          let currentGroupProperties = [];

          // Process each property in original order
          props.property.forEach((property, index) => {
            // If property has no groupName, render it individually
            if (!property.groupName) {
              // If we were building a group, finalize it
              if (currentGroup) {
                result.push(
                  <React.Fragment key={`group-${result.length}`}>
                    {group(currentGroup, currentGroupProperties)}
                  </React.Fragment>
                );
                currentGroup = null;
                currentGroupProperties = [];
              } else {
                if (index !== 0) {
                  result.push(
                    <hr className="h-0.5 w-[80%] m-auto bg-gray-200 rounded-lg" />
                  );
                }
              }

              // Add the individual property
              result.push(
                <React.Fragment key={`ind-${index}`}>
                  {propertyItem(property)}
                </React.Fragment>
              );
            }
            // If property has a groupName
            else {
              // If it's the same group as we're currently building, add to it
              if (currentGroup === property.groupName) {
                currentGroupProperties.push(property);
              }
              // If it's a different group or first group
              else {
                // Finalize previous group if it exists
                if (currentGroup) {
                  result.push(
                    <React.Fragment key={`group-${result.length}`}>
                      {group(currentGroup, currentGroupProperties)}
                    </React.Fragment>
                  );
                }

                // Start a new group
                currentGroup = property.groupName;
                currentGroupProperties = [property];
              }
            }
          });

          // Don't forget to add the last group if we were building one
          if (currentGroup) {
            result.push(
              <React.Fragment key={`group-${result.length}`}>
                {group(currentGroup, currentGroupProperties)}
              </React.Fragment>
            );
          }

          return result;
        })()}

        {props.property?.some((property) => property.required) && (
          <div className=" mx-6 mt-6 p-4 bg-blue-50 rounded-md flex items-start gap-3">
            <Info className="text-[#3B82F6] w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              All properties marked as{' '}
              <span className="text-[#FF5533] font-medium">REQUIRED</span> must
              be specified for the field to work properly.
            </p>
          </div>
        )}
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
  Youtube: ({ embedSrc, caption, minutes }) => (
    <div className="flex flex-col gap-2 my-6">
      <div
        className="youtube-container w-full relative"
        style={{ paddingBottom: '56.25%' }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-md"
          src={embedSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
      {caption && (
        <div className="text-sm font-tuner text-gray-500">
          Video: {caption} {minutes && `(${minutes} minutes)`}
        </div>
      )}
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
  WarningCallout: ({ body }) => (
    <blockquote
      style={{
        backgroundColor: 'var(--color-white)',
      }}
      className="my-4 border-l-4 md:py-6 pt-2 pb-4 border-x-orange-400 pl-4 rounded-tr-lg rounded-br-lg pr-2 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-2 md:items-center items-start">
        <div>
          <AiOutlineWarning
            size={40}
            className="text-white bg-gradient-to-br from-orange-400 to-orange-600 px-2 pt-0.5 pb-1.5 rounded-full my-2 md:my-0 md:mx-2 mx-0"
          />
        </div>
        <div className="leading-6">
          <TinaMarkdown
            content={body as any}
            components={docAndBlogComponents}
          />
        </div>
      </div>
    </blockquote>
  ),
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
      <div className="relative pb-3 word-break white-space overflow-x-hidden !rounded-xl margin-0">
        <button
          onClick={handleCopy}
          className="absolute top-4 right-3 z-10 h-6 w-6 flex items-center justify-center text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 rounded"
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

  GraphQLCodeBlock: ({
    query,
    response,
    preselectResponse,
    customQueryName,
    customResponseName,
  }) => {
    return (
      <GraphQLQueryResponseTabs
        query={query}
        response={response}
        preselectResponse={preselectResponse}
        customQueryName={customQueryName}
        customResponseName={customResponseName}
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

  const [currentUrl, setCurrentUrl] = useState(
    typeof window !== 'undefined' ? window.location.pathname : ''
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.pathname);
    }
  }, [typeof window !== 'undefined' ? window.location.pathname : '']);

  const linkHref = `${currentUrl}#${id}`;

  const styles = {
    1: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-4xl !mt-16 mb-4',
    2: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-3xl !mt-12 mb-2',
    3: 'bg-gradient-to-br from-blue-800 via-blue-900 to-blue-100 bg-clip-text text-transparent text-xl font-medium !mt-8 mb-2 !important',
    4: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-xl font-medium !mt-2 mb-2',
    5: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-lg font-medium !mt-2 mb-1',
    6: 'text-gray-500 text-base font-normal mt-2 mb-1',
  };

  const linkColor = {
    1: 'text-orange-500',
    2: 'text-orange-500',
    3: 'text-blue-900',
    4: 'text-orange-500',
    5: 'text-orange-500',
    6: 'text-gray-500',
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
    <HeadingTag
      id={id}
      className={`${styles[level]} relative cursor-pointer group`}
    >
      <a
        href={linkHref}
        className="no-underline inline-block"
        onClick={handleHeaderClick}
      >
        {' '}
        {children}
        <FiLink
          className={`${linkColor[level]} opacity-0 group-hover:opacity-80 transition-opacity duration-200 absolute ml-1 group-hover:animate-wiggle`}
          style={{
            display: 'inline-block',
            marginTop: '0.25rem',
          }}
        />
      </a>
    </HeadingTag>
  );
}
