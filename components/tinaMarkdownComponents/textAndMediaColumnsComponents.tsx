import { Components } from "tinacms/dist/rich-text";

export const components: Components<{}> = {
  p: (props) => (
    <>
      {props.children.props.content.map((content) => (
        <p className="text-lg lg:text-xl text-black"> {content.text} </p>
      ))}
      <br />
    </>
  ),
  h6: (props) => (
    <>
      {props.children.props.content.map((content) => (
        <h6 className="font-tuner text-3xl lg:text-4xl lg:leading-tight text-orange-400">
          {' '}
          {content.text}{' '}
        </h6>
      ))}
      <br />
    </>
  ),
};
