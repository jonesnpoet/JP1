import { defineField, defineType } from "sanity";

/**
 * Two-up image row, matching the site's existing gallery layout. `right` is
 * optional -- leaving it empty renders a solo full-row image, same as the
 * closing shots on the current hardcoded case studies.
 */
export default defineType({
  name: "imagePair",
  title: "Image pair (two-up row)",
  type: "object",
  fields: [
    defineField({
      name: "left",
      title: "Left image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "right",
      title: "Right image (leave empty for a solo row)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
  ],
  preview: {
    select: { media: "left" },
    prepare({ media }) {
      return { title: "Image pair", media };
    },
  },
});
