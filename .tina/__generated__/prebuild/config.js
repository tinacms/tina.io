import { defineSchema as s, defineConfig as o } from "tinacms";
const t = {
  label: "Actions",
  name: "actions",
  type: "object",
  list: !0,
  ui: {
    defaultItem: {
      variant: "default",
      label: "Secondary Action",
      icon: !1,
      size: "medium",
      url: "/"
    }
  },
  fields: [
    { name: "label", label: "Label", type: "string" },
    { name: "icon", label: "Icon", type: "boolean" },
    {
      name: "variant",
      label: "Variant",
      type: "string",
      options: [
        {
          value: "default",
          label: "Seafoam"
        },
        {
          value: "blue",
          label: "Blue"
        },
        {
          value: "orange",
          label: "Orange"
        },
        {
          value: "white",
          label: "White"
        },
        {
          value: "ghost",
          label: "Ghost"
        },
        {
          value: "command",
          label: "Command"
        }
      ]
    },
    {
      name: "size",
      label: "Size",
      type: "string",
      options: [
        {
          value: "small",
          label: "Small"
        },
        {
          value: "medium",
          label: "Medium"
        },
        {
          value: "large",
          label: "Large"
        }
      ]
    },
    { name: "url", label: "URL", type: "string" }
  ]
}, r = {
  label: "Hero",
  name: "hero",
  ui: {
    previewSrc: "/img/blocks/hero.png",
    defaultItem: {
      headline: "Next Gen Content Management",
      text: "Tina is an open-source, Git-backed CMS with the ability to add visual editing to your NextJS site",
      actions: [
        {
          variant: "orange",
          label: "Primary Action",
          icon: !0,
          url: "/"
        },
        {
          variant: "",
          label: "Secondary Action",
          icon: !1,
          url: "/"
        }
      ]
    }
  },
  fields: [
    { name: "headline", label: "Headline", type: "string" },
    { name: "text", label: "Text", type: "string" },
    t,
    { name: "videoSrc", label: "Video Source", type: "string" }
  ]
}, m = {
  label: "Features",
  name: "features",
  ui: {
    previewSrc: "/img/blocks/features.png"
  },
  fields: [
    {
      name: "items",
      label: "Feature Items",
      type: "object",
      list: !0,
      templates: [
        {
          label: "Feature",
          name: "feature",
          fields: [
            { name: "headline", label: "Headline", type: "string" },
            {
              name: "text",
              label: "Text",
              ui: { component: "textarea" },
              type: "string"
            },
            {
              name: "media",
              label: "Media",
              type: "object",
              fields: [
                { name: "src", label: "Image Source", type: "string" },
                { name: "videoSrc", label: "Video Source", type: "string" },
                { name: "cli", label: "CLI", type: "boolean" }
              ]
            },
            t
          ]
        }
      ]
    }
  ]
}, p = {
  name: "flying",
  label: "Flying",
  ui: {
    previewSrc: "/img/blocks/flying.png"
  },
  fields: [
    { name: "headline", label: "Headline", type: "string" },
    {
      name: "text",
      label: "Text",
      ui: { component: "textarea" },
      type: "string"
    },
    t
  ]
}, a = {
  name: "card",
  label: "Card",
  type: "object",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "string"
    },
    {
      name: "price",
      label: "Price",
      type: "string"
    },
    {
      name: "interval",
      label: "Interval",
      type: "string"
    },
    {
      name: "body",
      label: "Body",
      type: "rich-text"
    },
    t
  ]
}, b = {
  name: "pricing",
  label: "Pricing",
  ui: {
    previewSrc: "/img/blocks/pricing.png",
    defaultItem: {
      intro: `**No surprises. **Predictable pricing for every project. Complete control of your content, forever.

Tina\u2019s source code is open-source. Your content lives in accessible formats right in your Git repository.
`
    }
  },
  fields: [
    {
      name: "intro",
      label: "Intro Text",
      type: "rich-text"
    },
    {
      name: "base",
      label: "Base Plan",
      type: a.type,
      fields: a.fields
    },
    {
      name: "plans",
      label: "Pricing Plans",
      type: a.type,
      list: !0,
      fields: a.fields,
      ui: {
        itemProps: (e) => ({
          key: e.id,
          label: e.name
        }),
        defaultItem: {
          name: "Pricing Tier",
          price: "$99",
          interval: "month"
        }
      }
    }
  ]
}, c = {
  label: "FAQ",
  name: "faq",
  ui: {
    previewSrc: "/img/blocks/faq.png",
    defaultItem: {
      title: "Frequently Asked Questions",
      questions: [
        {
          question: "What is Tina?",
          answer: `Tina is a Git-backed headless content management system that enables developers and content creators to collaborate seamlessly. With Tina, developers can create a custom visual editing experience that is perfectly tailored to their site.
`
        }
      ],
      color: "seafoam"
    }
  },
  fields: [
    { name: "title", label: "Title", type: "string" },
    {
      name: "intro",
      label: "Introduction",
      type: "rich-text"
    },
    {
      name: "questions",
      label: "Questions",
      type: "object",
      list: !0,
      fields: [
        { name: "question", label: "Question", type: "string" },
        {
          name: "answer",
          label: "Answer",
          type: "rich-text"
        }
      ]
    },
    {
      name: "color",
      label: "Color",
      type: "string",
      options: [
        {
          label: "Gradient",
          value: "gradient"
        },
        {
          label: "White",
          value: "white"
        }
      ]
    }
  ]
}, n = {
  name: "newsletter",
  label: "Newsletter Signup",
  ui: {
    defaultItem: {
      style: "default"
    }
  },
  fields: [
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Default",
          value: "default"
        },
        {
          label: "Small",
          value: "small"
        }
      ]
    }
  ]
}, i = {
  name: "social",
  label: "Social Links",
  ui: {
    defaultItem: {
      tina: "https://github.com/tinacms/tinacms/discussions",
      discord: "https://discord.com/invite/zumN63Ybpf",
      github: "https://github.com/tinacms/tinacms",
      twitter: "https://twitter.com/tinacms"
    }
  },
  fields: [
    {
      type: "string",
      name: "tina",
      label: "Tina"
    },
    {
      type: "string",
      name: "discord",
      label: "Discord"
    },
    {
      type: "string",
      name: "github",
      label: "GitHub"
    },
    {
      type: "string",
      name: "twitter",
      label: "Twitter"
    }
  ]
}, d = {
  label: "Content",
  name: "content",
  ui: {
    previewSrc: "/img/blocks/content.png"
  },
  fields: [
    {
      name: "options",
      label: "Options",
      type: "object",
      fields: [
        {
          name: "narrow",
          label: "Narrow",
          type: "boolean"
        },
        {
          name: "color",
          label: "Color",
          type: "string",
          options: [
            {
              label: "Seafoam",
              value: "seafoam"
            },
            {
              label: "White",
              value: "white"
            }
          ]
        },
        {
          name: "align",
          label: "Align Content",
          type: "string",
          options: [
            {
              label: "Left",
              value: "left"
            },
            {
              label: "Center",
              value: "center"
            },
            {
              label: "Right",
              value: "right"
            }
          ]
        }
      ]
    },
    {
      name: "content",
      label: "Content",
      type: "rich-text",
      templates: [
        t,
        i,
        n
      ]
    }
  ]
}, u = {
  label: "Columns",
  name: "columns",
  ui: {
    previewSrc: "/img/blocks/columns.png"
  },
  fields: [
    {
      name: "options",
      label: "Options",
      type: "object",
      fields: [
        {
          name: "columns",
          label: "Column Sizes",
          type: "string",
          options: [
            {
              label: "Default",
              value: "default"
            },
            {
              label: "Not Default",
              value: "notDefault"
            }
          ]
        },
        {
          name: "narrow",
          label: "Narrow",
          type: "boolean"
        },
        {
          name: "color",
          label: "Color",
          type: "string",
          options: [
            {
              label: "Seafoam",
              value: "seafoam"
            },
            {
              label: "White",
              value: "white"
            }
          ]
        },
        {
          name: "align",
          label: "Align Content",
          type: "string",
          options: [
            {
              label: "Left",
              value: "left"
            },
            {
              label: "Center",
              value: "center"
            },
            {
              label: "Right",
              value: "right"
            }
          ]
        }
      ]
    },
    {
      name: "columnOne",
      label: "Column One",
      type: "rich-text",
      templates: [
        t,
        i,
        n
      ]
    },
    {
      name: "columnTwo",
      label: "Column Two",
      type: "rich-text",
      templates: [
        t,
        i,
        n
      ]
    }
  ]
}, g = {
  label: "Showcase",
  name: "showcase",
  ui: {
    previewSrc: "/img/blocks/features.png"
  },
  fields: [
    {
      name: "items",
      label: "Showcase Items",
      type: "object",
      list: !0,
      ui: {
        itemProps: (e) => ({ label: e == null ? void 0 : e.headline })
      },
      fields: [
        { name: "headline", label: "Headline", type: "string" },
        {
          name: "text",
          label: "Text",
          ui: { component: "textarea" },
          type: "string"
        },
        { name: "url", label: "URL", type: "string" },
        {
          name: "media",
          label: "Media",
          type: "object",
          fields: [{ name: "src", label: "Image Source", type: "string" }]
        }
      ]
    }
  ]
}, y = {
  label: "Story",
  name: "story",
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string"
    }
  ]
}, f = {
  label: "Feature Grid",
  name: "featureGrid",
  fields: [
    {
      name: "items",
      label: "Feature Items",
      type: "object",
      list: !0,
      ui: {
        itemProps: (e) => ({
          key: e.id,
          label: e.headline
        })
      },
      fields: [
        { name: "headline", label: "Headline", type: "string" },
        {
          name: "text",
          label: "Text",
          ui: { component: "textarea" },
          type: "string"
        },
        t
      ]
    }
  ]
}, h = {
  label: "Logo Grid",
  name: "logoGrid",
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string"
    },
    {
      label: "Link",
      name: "link",
      type: "string"
    },
    {
      name: "items",
      label: "Logos",
      type: "object",
      list: !0,
      ui: {
        itemProps: (e) => ({
          key: e.id,
          label: e.name
        })
      },
      fields: [
        { name: "name", label: "Name", type: "string" },
        { name: "logo", label: "Logo Link", type: "string" },
        { name: "size", label: "Size", type: "number" }
      ]
    }
  ]
}, T = {
  label: "Roadmap Grid",
  name: "roadmapGrid",
  fields: [
    { name: "headline", label: "Headline", type: "string" },
    {
      name: "items",
      label: "Roadmap Items",
      type: "object",
      list: !0,
      ui: {
        itemProps: (e) => ({
          key: e.id,
          label: e.headline
        })
      },
      fields: [
        { name: "headline", label: "Headline", type: "string" },
        { name: "status", label: "Status", type: "string" },
        {
          name: "content",
          label: "Content",
          type: "rich-text"
        },
        t
      ]
    },
    {
      name: "options",
      label: "Options",
      type: "object",
      fields: [
        { name: "paddingTop", label: "Top Padding", type: "boolean" },
        { name: "paddingBottom", label: "Bottom Padding", type: "boolean" }
      ]
    }
  ]
}, v = {
  name: "recentPosts",
  label: "Recent Posts",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string"
    }
  ]
}, C = s({
  collections: [
    {
      label: "Pages",
      name: "page",
      path: "content/blocksPages",
      format: "json",
      ui: {
        router: ({ document: e }) => e._sys.filename === "home" ? "/" : `/${e._sys.filename}`
      },
      fields: [
        {
          type: "object",
          name: "seo",
          label: "SEO Information",
          fields: [
            { type: "string", label: "Title", name: "title" },
            {
              type: "string",
              label: " Description",
              name: "description",
              ui: {
                component: "textarea"
              }
            }
          ]
        },
        {
          label: "Page Sections",
          name: "blocks",
          type: "object",
          list: !0,
          ui: {
            visualSelector: !0
          },
          templates: [
            r,
            m,
            p,
            b,
            c,
            d,
            g,
            u,
            y,
            f,
            h,
            T,
            v
          ]
        }
      ]
    },
    {
      name: "doc",
      label: "Docs",
      path: "content/docs",
      format: "md",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string"
        },
        {
          type: "datetime",
          name: "last_edited",
          label: "Last Edited"
        },
        {
          name: "prev",
          label: "Prev",
          type: "string"
        },
        {
          name: "next",
          label: "Next",
          type: "string"
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: !0
        }
      ]
    },
    {
      name: "post",
      label: "Blog Posts",
      path: "content/blog",
      format: "md",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: !0,
          required: !0,
          list: !1,
          ui: {
            validate: (e) => {
              if ((e == null ? void 0 : e.length) > 70)
                return "Title can not be more then 70 characters long";
            }
          }
        },
        {
          type: "datetime",
          name: "date",
          label: "Date Created"
        },
        {
          type: "datetime",
          name: "last_edited",
          label: "Last Edited"
        },
        {
          type: "string",
          name: "author",
          label: "Author"
        },
        {
          type: "reference",
          name: "prev",
          label: "Previous Post",
          description: "(Optional) link to an earlier post at the bottom of this one",
          collections: ["post"]
        },
        {
          type: "reference",
          name: "next",
          label: "Next Post",
          description: "(Optional) link to a later post at the bottom of this one",
          collections: ["post"]
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: !0,
          templates: [
            {
              name: "Youtube",
              label: "Youtube Embed",
              fields: [
                {
                  type: "string",
                  name: "embedSrc",
                  label: "Embed URL"
                }
              ]
            },
            {
              name: "Iframe",
              label: "Embeded an Iframe",
              fields: [
                { name: "iframeSrc", type: "string" },
                {
                  name: "height",
                  type: "number",
                  label: "Height",
                  description: "The hight of the iframe (in px) "
                }
              ]
            },
            {
              name: "CreateAppCta",
              label: '"Create Tina App" Call-to-action',
              fields: [
                {
                  type: "string",
                  name: "ctaText",
                  label: "Button Text"
                },
                {
                  type: "string",
                  name: "cliText",
                  label: "CLI Command Example"
                }
              ]
            },
            {
              name: "Callout",
              label: "Callout",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Title"
                },
                {
                  type: "string",
                  name: "description",
                  label: "Description"
                },
                {
                  type: "string",
                  name: "url",
                  label: "URL"
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text"
                }
              ]
            },
            {
              name: "Codesandbox",
              label: "Codesandbox embed",
              fields: [
                {
                  type: "string",
                  name: "embedSrc",
                  label: "Embed URL"
                },
                {
                  type: "string",
                  name: "title",
                  label: "A11y Title"
                }
              ]
            },
            {
              name: "Diagram",
              label: "Diagram",
              fields: [
                {
                  type: "string",
                  name: "src"
                },
                {
                  type: "string",
                  name: "alt"
                }
              ]
            },
            {
              name: "WideImage",
              label: "Wide Image",
              fields: [
                {
                  type: "image",
                  name: "src"
                },
                {
                  type: "string",
                  name: "alt"
                }
              ]
            },
            {
              name: "CustomFieldComponentDemo",
              label: "Field Component Demo [do not use]",
              fields: [{ type: "string", name: "test" }]
            }
          ]
        }
      ]
    },
    {
      label: "AB Test",
      name: "abtest",
      path: "content/ab-tests",
      format: "json",
      fields: [
        {
          type: "object",
          label: "tests",
          name: "tests",
          list: !0,
          ui: {
            itemProps: (e) => ({ label: e.testId })
          },
          fields: [
            { type: "string", label: "Id", name: "testId" },
            {
              type: "string",
              label: "Page",
              name: "href",
              description: "This is the root page that will be conditionally swapped out"
            },
            {
              type: "object",
              name: "variants",
              label: "Variants",
              list: !0,
              fields: [
                { type: "string", label: "Id", name: "testId" },
                {
                  type: "string",
                  label: "Page",
                  name: "href",
                  description: "This is the variant page that will be conditionally used instead of the original"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}), S = o({
  schema: C,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    loadCustomStore: async () => (await import("./index.32b5dac4.mjs").then((l) => l.i)).TinaCloudCloudinaryMediaStore
  },
  build: { outputFolder: "admin", publicFolder: "public" },
  cmsCallback: (e) => (import("./index.es.f0f98e68.mjs").then(({ MarkdownFieldPlugin: l }) => {
    e.plugins.add(l);
  }), e.flags.set("branch-switcher", !0), e)
});
export {
  S as default
};
