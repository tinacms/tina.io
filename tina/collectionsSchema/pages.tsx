import { Form, Template, TinaCMS } from 'tinacms'
import { bookingTemplate } from '../../components/blocks/Booking.template'
import { carouselFeatureTemplate } from '../../components/blocks/CarouselFeature.template'
import { columnsTemplate } from '../../components/blocks/Columns.template'
import { compareBoxTemplate, criteriaMapping } from '../../components/blocks/CompareBox.template'
import { contentTemplate } from '../../components/blocks/Content.template'
import { eventsTemplate } from '../../components/blocks/Events.template'
import { faqTemplate } from '../../components/blocks/FAQ.template'
import { featureGridTemplate } from '../../components/blocks/FeatureGrid.template'
import { featuresTemplate } from '../../components/blocks/Features.template'
import { flyingTemplate } from '../../components/blocks/Flying.template'
import { heroTemplate } from '../../components/blocks/Hero.template'
import { highlightsSectionTemplate } from '../../components/blocks/HighlightsSection.template'
import { logoGridTemplate } from '../../components/blocks/LogoGrid.template'
import { mediaComponentTemplate } from '../../components/blocks/MediaComponent.template'
import { pricingTemplate } from '../../components/blocks/Pricing.template'
import { quoteTemplate } from '../../components/blocks/Quote.template'
import { recentPostsTemplate } from '../../components/blocks/RecentPosts.template'
import { RecipeBlock } from '../../components/blocks/Recipe.template'
import { roadmapGridTemplate } from '../../components/blocks/RoadmapGrid.template'
import { showcaseTemplate } from '../../components/blocks/Showcase.template'
import { spacerTemplate } from '../../components/blocks/Spacer.template'
import { storyTemplate } from '../../components/blocks/Story.template'
import { testimonialsTemplate } from '../../components/blocks/Testimonials.template'
import { textAndMediaColumnsComponentTemplate } from '../../components/blocks/TextAndMediaColumns.template'
import { tinaBannerTemplate } from '../../components/blocks/TinaBanner.template'
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
          return `/`
        }
        return `/${document._sys.filename}`
      },
      beforeSubmit: async ({ values, cms, form }: {
        form: Form
        cms: TinaCMS
        values: Record<string, any>
      }) => {
        //Template based transformations (NOTE: this is the only way to pass data between parent/child form fields)
        const criteriaMappedValues = criteriaMapping(values);
        return {
          ...criteriaMappedValues.values
        }
      }
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