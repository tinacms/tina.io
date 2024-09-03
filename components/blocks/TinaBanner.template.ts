import { Template } from 'tinacms'

export const tinaBannerTemplate: Template = {
    label: 'Tina Banner',
    name: 'tinaBanner',
    fields: [
        {name: 'backdrop', label: 'Backdrop', type: 'image'},
        { name: 'leftFig', label: 'Left Figure', type: 'image' },
        { name: 'rightFig', label: 'Right Figure', type: 'image' },
        { name: 'leftScreen', label: 'Left Screen', type: 'image' },
        { name: 'rightScreen', label: 'Right Screen', type: 'image' },
        { name: 'centerFig', label: 'Center Figure', type: 'image' },
        { name: 'llama', label: 'Llama', type: 'image' },
    ],
}
