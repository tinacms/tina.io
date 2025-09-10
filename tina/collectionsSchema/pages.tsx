import type { Form, Template, TinaCMS } from 'tinacms';
import { videoEmbedTemplate } from '@/component/blocks/VideoEmbed/VideoEmbed.template';
import { herov2Template } from '@/component/blocks-v2/hero/hero-v2.template';
import { bookingTemplate } from '../../components/blocks/Booking/Booking.template';
import { columnsTemplate } from '../../components/blocks/Columns/Columns.template';
import {
  compareBoxTemplate,
  criteriaMapping,
} from '../../components/blocks/CompareBox/CompareBox.template';
import { contentTemplate } from '../../components/blocks/Content/Content.template';
import { eventsTemplate } from '../../components/blocks/Events/Events.template';
import { faqTemplate } from '../../components/blocks/FAQ/FAQ.template';
import { carouselFeatureTemplate } from '../../components/blocks/FeatureCarousel/CarouselFeature.template';
import { featureGridTemplate } from '../../components/blocks/FeatureGrid/FeatureGrid.template';
import { featuresTemplate } from '../../components/blocks/Features/Features.template';
import { flyingTemplate } from '../../components/blocks/Flying/Flying.template';
import { footerLinkContentTemplate } from '../../components/blocks/FooterLinkContent/footerLinkContent.template';
import { heroTemplate } from '../../components/blocks/Hero/Hero.template';
import { highlightsSectionTemplate } from '../../components/blocks/HighlightsSection/HighlightsSection.template';
import { logoGridTemplate } from '../../components/blocks/LogoGrid/LogoGrid.template';
import { mediaComponentTemplate } from '../../components/blocks/Media/MediaComponent.template';
import { pricingTemplate } from '../../components/blocks/Pricing/Pricing.template';
import { quoteTemplate } from '../../components/blocks/Quote/Quote.template';
import { recentPostsTemplate } from '../../components/blocks/RecentPosts/RecentPosts.template';
import { RecipeBlock } from '../../components/blocks/Recipe.template';
import { roadmapGridTemplate } from '../../components/blocks/RoadMap/RoadmapGrid.template';
import { showcaseTemplate } from '../../components/blocks/Showcase/Showcase.template';
import { spacerTemplate } from '../../components/blocks/Spacer/Spacer.template';
import { storyTemplate } from '../../components/blocks/Story/Story.template';
import { tableTemplate } from '../../components/blocks/Table/table.template';
import { testimonialsTemplate } from '../../components/blocks/Testimonial/Testimonials.template';
import { textAndMediaColumnsComponentTemplate } from '../../components/blocks/TextAndMediaColumn/TextAndMediaColumns.template';
import { tinaBannerTemplate } from '../../components/blocks/TinaBanner/TinaBanner.template';
import { blockSettings } from './sharedFields/blockSettings';
import { seoInformation } from './sharedFields/seoInformation';

const extendedSeoInformation = {
  ...seoInformation,
  fields: [
    ...seoInformation.fields,
    {
      type: 'boolean',
      label: 'Has Custom Title Suffix?',
      name: 'hasCustomSuffix',
      ui: {
        component: 'toggle',
      },
      description: "Set to true to remove the appended suffix ' | Tina'.",
    },
  ],
};

const templates = [
  featuresTemplate as Template,
  logoGridTemplate as Template,
  testimonialsTemplate as Template,
  carouselFeatureTemplate as Template,
  eventsTemplate as Template,
  highlightsSectionTemplate as Template,
  recentPostsTemplate as Template,
  compareBoxTemplate as Template,
  RecipeBlock as Template,
  tableTemplate as Template,
  pricingTemplate as Template,
  spacerTemplate as Template,
  featureGridTemplate as Template,
  heroTemplate as Template,
  flyingTemplate as Template,
  faqTemplate as Template,
  contentTemplate as Template,
  showcaseTemplate as Template,
  columnsTemplate as Template,
  roadmapGridTemplate as Template,
  quoteTemplate as Template,
  bookingTemplate as Template,
  mediaComponentTemplate as Template,
  textAndMediaColumnsComponentTemplate as Template,
  tinaBannerTemplate as Template,
  storyTemplate as Template,
  footerLinkContentTemplate as Template,
  videoEmbedTemplate as Template,
  herov2Template as Template,
].map((template) => {
  const updatedTemplate = template;
  if (updatedTemplate.fields) {
    //@ts-ignore - this is necessary as block settings are not being recognised as a Field type (even though it is)
    updatedTemplate.fields = [blockSettings, ...updatedTemplate.fields];
  }
  return updatedTemplate as Template;
});

export const pagesCollection = {
  label: 'Pages',
  name: 'page',
  path: 'content/blocksPages',
  format: 'json',
  ui: {
    router: ({ document, collection }) => {
      const fullPath = document._sys.path;
      const basePath = `${collection.path}`;
      const relativePath = fullPath
        .substring(basePath.length)
        .replace(/\.[^/.]+$/, '');

      return `${relativePath}`;
    },
    beforeSubmit: async ({
      values,
    }: {
      form: Form;
      cms: TinaCMS;
      values: Record<string, any>;
    }) => {
      //Template based transformations (NOTE: this is the only way to pass data between parent/child form fields)
      const criteriaMappedValues = criteriaMapping(values);
      return {
        ...criteriaMappedValues.values,
      };
    },
  },
  fields: [
    extendedSeoInformation,
    {
      label: 'Page Sections',
      name: 'blocks',
      type: 'object',
      list: true,
      ui: {
        visualSelector: true,
      },
      templates: [...templates],
    },
  ],
};
