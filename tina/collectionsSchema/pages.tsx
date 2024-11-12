import { Template } from 'tinacms';
import { bookingTemplate } from '../../components/blocks/Booking/Booking.template';
import { columnsTemplate } from '../../components/blocks/Columns/Columns.template';
import { compareBoxTemplate } from '../../components/blocks/CompareBox/CompareBox.template';
import { contentTemplate } from '../../components/blocks/Content/Content.template';
import { eventsTemplate } from '../../components/blocks/Events/Events.template';
import { faqTemplate } from '../../components/blocks/FAQ/FAQ.template';
import { carouselFeatureTemplate } from '../../components/blocks/FeatureCarousel/CarouselFeature.template';
import { featureGridTemplate } from '../../components/blocks/FeatureGrid/FeatureGrid.template';
import { featuresTemplate } from '../../components/blocks/Features/Features.template';
import { flyingTemplate } from '../../components/blocks/Flying/Flying.template';
import { heroTemplate } from '../../components/blocks/Hero/Hero.template';
import { highlightsSectionTemplate } from '../../components/blocks/HighlightsSection/HighlightsSection.template';
import { logoGridTemplate } from '../../components/blocks/LogoGrid/LogoGrid.template';
import { mediaComponentTemplate } from '../../components/blocks/Media/MediaComponent.template';
import { pricingTemplate } from '../../components/blocks/Pricing/Pricing.template';
import { quoteTemplate } from '../../components/blocks/Quote/Quote.template';
import { recentPostsTemplate } from '../../components/blocks/RecentPosts/RecentPosts.template';
import { roadmapGridTemplate } from '../../components/blocks/RoadMap/RoadmapGrid.template';
import { showcaseTemplate } from '../../components/blocks/Showcase/Showcase.template';
import { spacerTemplate } from '../../components/blocks/Spacer/Spacer.template';
import { storyTemplate } from '../../components/blocks/Story/Story.template';
import { testimonialsTemplate } from '../../components/blocks/Testimonial/Testimonials.template';
import { textAndMediaColumnsComponentTemplate } from '../../components/blocks/TextAndMediaColumn/TextAndMediaColumns.template';
import { tinaBannerTemplate } from '../../components/blocks/TinaBanner/TinaBanner.template';
import { RecipeBlock } from '../../components/blocks/Recipe.template'
import { seoInformation } from './sharedFields/seoInformation'

const extendedSeoInformation = {
  ...seoInformation,
  fields: [
    ...seoInformation.fields,
    {
      type: 'boolean',
      label: 'Has Custom Title Suffix?',
      name: 'hasCustomSuffix',
      ui: {
        component: "toggle",
      },
      description:
        "Set to true to remove the appended suffix ' | Tina'.",
    },
  ]
}
export const pagesCollection = {
  label: 'Pages',
  name: 'page',
  path: 'content/blocksPages',
  format: 'json',
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') {
        return `/`;
      }
      return `/${document._sys.filename}`;
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
      ],
    },
    {
      label: 'Page Sections',
      name: 'blocks',
      type: 'object',
      list: true,
      ui: {
        visualSelector: true,
      },
        templates: [
          heroTemplate as Template,
          featuresTemplate as Template,
          flyingTemplate as Template,
          pricingTemplate as Template,
          faqTemplate as Template,
          contentTemplate as Template,
          showcaseTemplate as Template,
          columnsTemplate as Template,
          storyTemplate as Template,
          featureGridTemplate as Template,
          logoGridTemplate as Template,
          roadmapGridTemplate as Template,
          recentPostsTemplate as Template,
          testimonialsTemplate as Template,
          quoteTemplate as Template,
          eventsTemplate as Template,
          compareBoxTemplate as Template,
          bookingTemplate as Template,
          mediaComponentTemplate as Template,
          textAndMediaColumnsComponentTemplate as Template,
          tinaBannerTemplate as Template,
          highlightsSectionTemplate as Template,
          spacerTemplate as Template,
          carouselFeatureTemplate as Template,
          RecipeBlock as Template,
       ],      
    },
  ],
};
