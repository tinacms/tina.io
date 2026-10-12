import type { Components } from 'tinacms/dist/rich-text';

// biome-ignore lint/complexity/noBannedTypes: <TODO>
export const textAndMediaColumnsComponent: Components<{}> = {
  p: (props) => (
    <>
      {props.children.props.content.map((content, index) => (
        <p
          key={`${content.text}-${index}`}
          className="text-lg lg:text-xl text-black"
        >
          {' '}
          {content.text}{' '}
        </p>
      ))}
      <br />
    </>
  ),
  h6: (props) => (
    <>
      {props.children.props.content.map((content, index) => (
        <h6
          key={`${content.text}-${index}`}
          className="font-ibm-plex text-3xl lg:text-4xl lg:leading-tight text-orange-400"
        >
          {' '}
          {content.text}{' '}
        </h6>
      ))}
      <br />
    </>
  ),
};
