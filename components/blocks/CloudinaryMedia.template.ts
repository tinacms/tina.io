import { Template } from "tinacms"

export const cloudinaryMediaComponent: Template = {
    label: 'Cloudinary Media Component',
    name: 'cloudinaryMediaComponent',
    fields: [
        {name: 'media', label: 'media', type: 'image'},
        {name: 'thumbnail', label: 'thumbnail', type: 'image'}
    ]
}