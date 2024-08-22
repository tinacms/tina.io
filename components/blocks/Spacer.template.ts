import { Template } from 'tinacms'

export const spacerTemplate: Template = {
    label: 'Spacer',
    name: 'spacer',
    fields: [
        {
            name: 'spacingPx', 
            label: 'Spacing Value', 
            description: 'This is the spacing in pixels provided by the spacer, only the in-built Tailwind values are supported. Set to 0 if not using. See https://tailwindcss.com/docs/height for possible values.', 
            type: 'number',
        },
        { 
            name: 'spacingPxMobile', 
            label: 'Mobile Spacing Value', 
            description: 'This is the spacing in pixels provided by the spacer on small screens, only the in-built Tailwind values are supported. Set to 0 if not using. See https://tailwindcss.com/docs/height for possible values.', 
            type: 'number' ,
        }
    ],
}
