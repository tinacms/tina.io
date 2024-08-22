import { Template } from 'tinacms'
import { wrapFieldsWithMeta } from 'tinacms';
import IconSelector from './IconSelector';

export const iconBannerTemplate: Template = {
    label: 'Icon Ribbon Component',
    name: 'iconBanner',
    fields: [
        { 
            name: 'iconColumn', 
            label: 'Icon Column', 
            type: 'object', 
            list: true, 
            ui: {
                max: 3,
                itemProps: (item) => {
                    // Field values are accessed by item?.<Field name>
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
                    name: 'iconList',
                    label: 'Icons',
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
                    ]
                },
            ],
        },
        
    ],
}