import { Template } from "tinacms"

export const itemTemplate: Template = {
    label: 'Item',
    name: 'item',
    ui: {
        itemProps: (item) => {
            return { label: '🔗 ' + (item?.name ?? "Unnamed Menu Item") };
        },
    },
    fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'page', label: 'Page', type: 'reference', collections: ['doc'] }
    ]
}