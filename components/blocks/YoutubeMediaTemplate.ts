import { Template } from "tinacms";

export const youtubeMediaTemplate: Template = {
    label: 'Youtube Media',
    name: 'youtubeMedia',
    fields: [
        {name: 'embedUrl', label: 'YouTube Embed Url', type: 'string', description:'⚠️ This will only work for YouTube embed urls, they look like https://www.youtube.com/embed/{{ ID }}'},
    ]
    
}