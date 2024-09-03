import { Template } from 'tinacms'
import { wrapFieldsWithMeta } from 'tinacms';
import IconSelector from './IconSelector';

export const highlightsSectionTemplate: Template = {
    label: 'Highlights Section',
    name: 'highlightsSection',
    fields: [
        { 
            name: 'highlightColumn', 
            label: 'Highlight Column', 
            type: 'object', 
            list: true, 
            ui: {
                max: 3,
                itemProps: (item) => {
                    return { label: item?.heading };
                },
            },
            fields: [
                {
                    name: 'heading', 
                    label: 'Heading', 
                    type: 'string'
                },
                {
                    name: 'highlights',
                    label: 'Highlights',
                    type: 'object',
                    list: true,
                    fields: [
                        {
                            name: 'name',
                            label: 'Name',
                            type: 'string'
                        },
                        {
                            name: 'icon',
                            label: 'Icon',
                            type: 'string',
                            description: "Can't find the icon you want? ask a developer to add it",
                            ui: {
                                component: wrapFieldsWithMeta(IconSelector),
                            },
                        },
                    ],
                    ui: {
                        itemProps: (item) => {
                            return { label: item?.name };
                        },
                    }
                },
            ],
        },
        
    ],
}