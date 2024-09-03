import { Template } from "tinacms"
import { itemTemplate } from "./toc-item.template"

const uiAndLabelling: any = {
    label: 'Submenu',
    name: 'items',
    ui: {
        itemProps: (item) => {
            return { label: '🗂️ ' + (item?.title ?? "Unnamed Menu Group") };
        },
    },
}

const thirdLevelSubmenu: Template = {
    ...uiAndLabelling,
    fields: [
        { name: 'title', label: 'Name', type: 'string' },
        { name: 'items', label: 'Submenu Items', type: 'object', list: true, templates: [itemTemplate] }
    ]
}

const secondLevelSubmenu: Template = {
    ...uiAndLabelling,
    fields: [
        { name: 'title', label: 'Name', type: 'string' },
        { name: 'items', label: 'Submenu Items', type: 'object', list: true, templates: [thirdLevelSubmenu, itemTemplate] }
    ]
}

export const submenuTemplate: Template = {
    ...uiAndLabelling,
    fields: [
        { name: 'title', label: 'Name', type: 'string' },
        { name: 'items', label: 'Submenu Items', type: 'object', list: true, templates: [secondLevelSubmenu, itemTemplate] }
    ]
}