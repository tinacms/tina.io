require('dotenv').config();

import {
  algoliasearch,
  type SearchClient,
} from 'algoliasearch';

import { fetchRelevantBlogs as fetchBlogs } from '../data-api/fetchBlogs';
import fetchSearchableDocs from '../data-api/fetchDocs';
import { stripMarkdown } from '../utils/blog_helpers';

const mapContentToIndex = async ({
  content,
  ...obj
}: Partial<{ data: { slug: string, title: string }; content: string }>): Promise<
  {
    excerpt: string;
    objectID: string;
    slug: string;
    title: string;
  }[]
> => {
  //Break up the indexes to keep them within the algolia size limit
  //TODO, a smarter regex might be better here, but this seems to work.
  const paragraphs = (content || '')
    .replaceAll('## ', '__BREAKINDEX__')
    .split('__BREAKINDEX__');

  const data = await Promise.all(
    paragraphs.map(async (paragraph, i) => {
      const excerpt = await stripMarkdown(paragraph);
      
      if (excerpt) {
        return {
          slug: obj.data.slug,
          excerpt,
          title: obj.data.title,
          objectID: `${obj.data.slug}_${i}`,
        };
      }
      
    }),
  );
  return data.filter(item => item)
};

const saveIndex = async (
  client: SearchClient,
  indexName: string,
  data: any,
) => {
  try {
    for(let obj of data){
      if(!obj){
        throw new Error(`Undefined object in data for index ${indexName}`);
      }
    }

    var initial = (await client.searchSingleIndex({indexName})).nbHits;
    var result = await client.replaceAllObjects({indexName, objects: data })
    console.log(`Finished saving index: ${indexName}`);
    await client.setSettings(
      {
        indexSettings: {
          attributesToSnippet: ['excerpt:50'],
          distinct: true
        }, indexName}
      );
    let after = (await client.searchSingleIndex({indexName})).nbHits;
    let diff = after - initial;
    if (diff > 0) {
      console.log(`${indexName}: added ${diff} entries`);
    }
    if (diff < 0) {
      console.log(`${indexName}: removed ${Math.abs(diff)} entries`);
    }
  } catch (error) {
    console.log(error);
  }
};

const createIndices = async () => {


  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY,
  );
  const docs = await fetchSearchableDocs();

  await saveIndex(
    client,
    'Tina-Docs-Next',
    (await Promise.all(docs.map(mapContentToIndex))).flat(),
  );

  const blogs = await fetchBlogs();
  await saveIndex(
    client,
    'Tina-Blogs-Next',
    (await Promise.all(blogs.map(mapContentToIndex))).flat(),
  );
};

createIndices()
  .then(() => {
    console.log('indices created');
  })
  .catch((e) => {
    console.error(e);
    process.kill(1);
  });
