import { type SchemaTypeDefinition } from "sanity";

import ads from "./schemas/objects/ads";
import author from "./schemas/blog/author";
import blockContent from "./schemas/blog/blockContent";
import category from "./schemas/blog/category";
import duration from "./schemas/objects/duration";
import milestone from "./schemas/objects/milestone";
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import project from "./schemas/documents/project";
import service from "./schemas/documents/service";
import timeline from "./schemas/objects/timeline";
import video from "./schemas/objects/video";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ads,
    author,
    blockContent,
    category,
    duration,
    milestone,
    page,
    post,
    project,
    service,
    // @ts-ignore due to an unknown sanity type definition error
    timeline,
    video,
  ],
};
