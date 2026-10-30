import { useState } from 'react';
import { TAB, TAB_LIST } from '@/component/styles/tabs';
import { ON_DARK } from '@/component/styles/typography';
import { Prism } from '../styles/Prism';

export const GraphQLQueryResponseTabs = ({ ...props }) => {
  const [isQuery, setIsQuery] = useState(!props.preselectResponse);

  const overlay = (
    <div
      className="w-full grow rounded-md"
      style={{
        backgroundColor: 'rgb(1, 22, 39)',
      }}
    ></div>
  );
  const containerStyling =
    'w-full flex col-start-1 row-start-1 overflow-x-scroll flex-col';

  return (
    <div className="mb-1">
      <div
        role="tablist"
        className={`${ON_DARK} ${TAB_LIST} w-full relative top-3 pt-1 px-2 z-10 rounded-t-md`}
        style={{
          backgroundColor: 'rgb(1, 22, 39)',
        }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={isQuery}
          onClick={() => setIsQuery(true)}
          className={TAB}
        >
          {props.customQueryName ?? 'Query'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isQuery}
          onClick={() => setIsQuery(false)}
          className={TAB}
        >
          {props.customResponseName ?? 'Response'}
        </button>
      </div>
      <div className="h-fit grid grid-cols-1 w-full">
        <div
          className={`${containerStyling} rounded-b-xl`}
          style={{
            zIndex: isQuery ? 5 : 1,
          }}
        >
          {/* 
                    TECH DEBT: the replaceAll is a hack to get around TinaCMS limitations with nested rich-text.
                    TODO - remove as per https://github.com/tinacms/tina.io/issues/2047 
                */}
          <Prism
            value={props.query?.replaceAll('#', ' ') || ''}
            lang={'graphql'}
            theme="nightOwl"
          />
          {overlay}
        </div>
        <div
          className={`${containerStyling} rounded-b-xl`}
          style={{
            zIndex: isQuery ? 1 : 5,
          }}
        >
          {/*
                    TECH DEBT: the replaceAll is a hack to get around TinaCMS limitations with nested rich-text.
                    TODO - remove as per https://github.com/tinacms/tina.io/issues/2047 
                 */}
          <Prism
            value={props.response?.replaceAll('#', ' ') || ''}
            lang={'json'}
            theme="nightOwl"
          />
          {overlay}
        </div>
      </div>
    </div>
  );
};
