import { Components } from 'tinacms/dist/rich-text';

export const textAndMediaColumnsComponent: Components<{}> = {
  p: (props) => (
    <>
      {props.children.props.content.map((content, index) => (
        <p key={index} className="text-lg lg:text-xl text-black">
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
          key={index}
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
