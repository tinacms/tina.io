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
}: Partial<{ data: { slug: string }; content: string }>): Promise<
  {
    excerpt: string;
    objectID: string;
    slug: string;
  }[]
> => {
  //Break up the indexes to keep them within the algolia size limit
  //TODO, a smarter regex might be better here, but this seems to work.
  const paragraphs = (content || '')
    .replaceAll('## ', '__BREAKINDEX__')
    .split('__BREAKINDEX__');

  return Promise.all(
    paragraphs.map(async (paragraph, i) => {

      if(!paragraph)
      {
        throw new Error(`Empty paragraph for ${obj.data?.slug} paragraph ${i}`);
      }
      const excerpt = await stripMarkdown(paragraph);
      
      if (excerpt) {
        return {
          slug: obj.data.slug,
          excerpt,
          objectID: `${obj.data.slug}_${i}`,
        };
      }
      console.log(`Skipping empty excerpt for ${obj.data.slug} paragraph ${i} ${typeof excerpt}`);
      
    }),
  );
};

const saveIndex = async (
  client: SearchClient,
  indexName: string,
  data: any,
) => {
  try {
    console.log(`Saving index: ${indexName} with ${data.length} records`);
    for(let obj of data){
      if(!obj){
        throw new Error(`Undefined object in data for index ${indexName}`);
      }
    }
    var result = await client.replaceAllObjects({indexName, objects: data })
    console.log(`Finished saving index: ${indexName}`);
    await client.setSettings(
      {
        indexSettings: {
          attributesToSnippet: ['excerpt:50'],
          distinct: true
        }, indexName}
      );
    console.log(
      `${indexName}: added/updated ${result.batchResponses.length} entries`,
    );
    // const numRemoved = await cleanupIndex(index, data);
    // if (numRemoved > 0) {
    //   console.log(`${indexName}: removed ${numRemoved} entries`);
    // }
  } catch (error) {
    
    console.log(error);
  }
};

// const cleanupIndex = async (index: SearchIndex, currentData: any) => {
//   const currentObjects: Set<string> = new Set();
//   const objectsToDelete: Set<string> = new Set();
//   let numRemoved = 0;
//   currentData.map((item) => {
//     currentObjects.add(item.objectID);
//   });
//   await index.browseObjects({
//     batch: (hits) => {
//       hits.forEach((hit) => {
//         if (!currentObjects.has(hit.objectID)) {
//           objectsToDelete.add(hit.objectID);
//         }
//       });
//     },
//   });
//   await Promise.all(
//     Array.from(objectsToDelete).map(async (objectID) => {
//       await index.deleteObject(objectID);
//       numRemoved++;
//     }),
//   );
//   return numRemoved;
// };

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
