import { TinaTemplate } from "tinacms";

export const mediaComponentTemplate: TinaTemplate = {
    label: 'Media Component',
    name: 'mediaComponent',
    fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        { name: 'first-media', label: 'Media #1', type: 'image'},
        { name: 'second-media', label: 'Media #2', type: 'image'},
     ],


}