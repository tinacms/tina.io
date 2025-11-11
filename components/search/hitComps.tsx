import path from 'node:path';
import { Hit } from 'algoliasearch';
import {Highlight, Snippet} from "react-instantsearch-dom"
import { formatDate } from '../../utils';
import { DynamicLink } from '../ui/DynamicLink';
import { MouseEventHandler } from 'react';

const DocHit =
  (clickHandler: MouseEventHandler<HTMLDivElement>) =>
  ({hit}: {hit: Hit<string>}) => {
    hit._highlightResult
    return <DynamicLink href={path.join('/docs', (hit as any).slug)}>
      <div onClick={clickHandler}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
          <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      </div>
    </DynamicLink>
  };

const BlogHit =
  (clickHandler: MouseEventHandler<HTMLDivElement>) =>
  ({ hit }: { hit: Hit }) => {
    return (
      <DynamicLink href={path.join('/blog', (hit as any).slug)}>
        <div onClick={clickHandler}>
          <h4>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </h4>
          {
            <Snippet attribute="excerpt" hit={hit} tagName="mark" />
          }
          <div>{formatDate(hit.date)}</div>
        </div>
      </DynamicLink>
    );
  };

const PackageHit =
  (clickHandler: MouseEventHandler<HTMLDivElement>) =>
  ({ hit }: { hit: Hit }) => {
    return (
      <DynamicLink href={path.join('/packages', `/${hit.package}`)}>
        <div onClick={clickHandler}>
          <h4>
            <Highlight attribute="package" hit={hit} tagName="mark" />
          </h4>
            <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </div>
      </DynamicLink>
    );
  };

export const hitComponents = {
  DocHit: DocHit,
  BlogHit: BlogHit,
  PackageHit: PackageHit,
};
