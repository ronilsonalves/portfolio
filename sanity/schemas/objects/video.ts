import { defineField, defineType } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "object",
  description: "Allows you to add a video to your content",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      description: "The title of the video you want to display",
      validation(rule) {
        return rule.required().error("You have to fill out the video title");
      },
    }),
    defineField({
      type: "string",
      name: "videoId",
      title: "Video ID",
      description: "The ID of the video you want to display",
      validation(rule) {
        return rule.required().error("You have to fill out the video ID");
      },
    }),
    defineField({
      type: "string",
      name: "videoProvider",
      title: "Video Provider",
      description:
        "The provider of the video you want to display (YouTube and MUX only, initially",
    }),
  ],
});
