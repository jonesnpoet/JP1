import { defineField, defineType } from "sanity";

/** Asymmetric text+image row, matching the site's existing TextImageBlock treatment. */
export default defineType({
  name: "textImageBlock",
  title: "Text + image (asymmetric row)",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { text: "text", media: "image" },
    prepare({ text, media }) {
      return { title: "Text + image", subtitle: text, media };
    },
  },
});
