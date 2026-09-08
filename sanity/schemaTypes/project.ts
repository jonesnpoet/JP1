import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in the project's URL, e.g. /projects/this-value.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Controls display order in the projects grid -- lower numbers first.",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail image",
      description: "Default cover photo shown on the projects grid.",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hoverImage",
      title: "Hover image",
      description:
        "Crossfades in when the grid card is hovered or focused. Optional -- falls back to the thumbnail if left empty.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      description: "Full-width image at the top of the project page.",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Short intro copy shown centered beneath the title.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Body",
      description:
        "Freely mix paragraphs, headings, and inline images in any order, plus the two custom row types for the site's signature layouts.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
          ],
          lists: [],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        { type: "imagePair" },
        { type: "textImageBlock" },
        { type: "calloutBlock" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "thumbnail" },
  },
});
