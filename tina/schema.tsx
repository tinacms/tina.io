/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import type { Collection } from 'tinacms';
import { defineSchema } from 'tinacms';
import { blogsCollection } from './collectionsSchema/blogs';
import { blogsZhCollection } from './collectionsSchema/blogsZh';
import { conferenceTinaCMSCollection } from './collectionsSchema/conference';
import { eventsCollection } from './collectionsSchema/eventsSchema';
import { examplesCollection } from './collectionsSchema/examples';
import { footerCollection } from './collectionsSchema/footer';
import { meetingLinksCollection } from './collectionsSchema/meetingLinks';
import { navigationBarCollection } from './collectionsSchema/navigationBar';
import { pagesCollection } from './collectionsSchema/pages';
import { settingCollection } from './collectionsSchema/settings';
import { whatsNewTinaCloudCollection } from './collectionsSchema/whatsNewTinaCloud';
import { whatsNewTinaCMSCollection } from './collectionsSchema/whatsNewTinaCMS';

export const schema = defineSchema({
  collections: [
    pagesCollection as Collection,
    blogsCollection as Collection,
    blogsZhCollection as Collection,
    examplesCollection as Collection,
    meetingLinksCollection as Collection,
    whatsNewTinaCMSCollection as Collection,
    whatsNewTinaCloudCollection as Collection,
    navigationBarCollection as Collection,
    eventsCollection as Collection,
    footerCollection as Collection,
    conferenceTinaCMSCollection as Collection,
    settingCollection as Collection,
  ],
});
