import type { Maybe, Scalars } from 'tina/__generated__/types';

export type ExamplesExamples = {
  __typename?: 'ExamplesExamples';
  label?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
};

export type Examples = {
  __typename?: 'Examples';
  examples?: Maybe<{
    examples: Maybe<ExamplesExamples[]>;
  }>;
};
