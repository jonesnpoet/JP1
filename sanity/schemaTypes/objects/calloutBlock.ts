import { defineField, defineType } from "sanity";

/** Centered callout text, matching the site's existing TextCallout treatment. */
export default defineType({
  name: "calloutBlock",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }) {
      return { title: "Callout", subtitle: text };
    },
  },
});
