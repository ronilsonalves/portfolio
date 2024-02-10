import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your service.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      description:
        "A short description used to give more details about the service",
      title: "Overview",
      type: "array",
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Strong",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(160).required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description: "This is the image that will be used as the cover image.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
      };
    },
  },
});
