import { Template } from "tinacms";

export const mapTemplate: Template = {
   name: "map",
   label: "Map",
   fields: [
    {
        type: "string",
        name: "heading",
        label: "Heading",
    },
    {
        type: "rich-text",
        name: "content",
        label: "Content",
    },
   ]
}