import { Template } from "tinacms"
import { itemTemplate } from "./toc-item.template"

const uiAndLabelling: any = {
    label: 'Submenu',
    name: 'submenu',
    ui: {
        itemProps: (item) => {
            return { label: '🗂️ ' + (item?.name ?? "Unnamed Menu Group") };
        },
    },
}

const thirdLevelSubmenu: Template = {
    ...uiAndLabelling,
    fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'submenuItems', label: 'Submenu Items', type: 'object', list: true, templates: [itemTemplate] }
    ]
}

const secondLevelSubmenu: Template = {
    ...uiAndLabelling,
    fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'submenuItems', label: 'Submenu Items', type: 'object', list: true, templates: [thirdLevelSubmenu, itemTemplate] }
    ]
}

export const submenuTemplate: Template = {
    ...uiAndLabelling,
    fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'submenuItems', label: 'Submenu Items', type: 'object', list: true, templates: [secondLevelSubmenu, itemTemplate] }
    ]
}