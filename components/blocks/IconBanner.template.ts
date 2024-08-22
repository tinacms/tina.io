import { Template } from 'tinacms'

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
                            options: [
                                {
                                    label: 'GitHub',
                                    value: 'githubCircleIcon'
                                },
                                {
                                    label: 'Database',
                                    value: 'DatabaseIcon'
                                },
                                {
                                    label: 'Branch',
                                    value: 'SourceBranchIcon'
                                },
                                {
                                    label: 'Desktop',
                                    value: 'DesktopMacIcon'
                                },
                                {
                                    label: 'Open Lock',
                                    value: 'LockOpenIcon'
                                },
                                {
                                    label: 'Open Lock',
                                    value: 'LockOpenIcon'
                                },
                                {
                                    label: 'Cursor',
                                    value: 'CursorDefaultIcon'
                                },
                                {
                                    label: 'Clock',
                                    value: 'ClockIcon'
                                },
                            ],
                            ui: {
                                component: 'select'
                            }
                        },
                    ]
                },
            ],
        },
        
    ],
}