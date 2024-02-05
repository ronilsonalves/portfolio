/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { codeInput } from "@sanity/code-input";
import { deskTool } from "sanity/desk";
import { documentInternationalization } from "@sanity/document-internationalization";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { StreamLanguage } from "@codemirror/language";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(),
    codeInput({
      codeModes: [
        {
          name: "bash",
          loader: () =>
            import("@codemirror/legacy-modes/mode/shell").then(({ shell }) =>
              StreamLanguage.define(shell),
            ),
        },
        {
          name: "golang",
          loader: () =>
            import("@codemirror/legacy-modes/mode/go").then(({ go }) =>
              StreamLanguage.define(go),
            ),
        },
        {
          name: "javascript",
          loader: () =>
            import("@codemirror/lang-javascript").then(({ javascript }) =>
              javascript(),
            ),
        },
        {
          name: "java",
          loader: () =>
            import("@codemirror/lang-java").then(({ java }) => java()),
        },
        {
          name: "sql",
          loader: () => import("@codemirror/lang-sql").then(({ sql }) => sql()),
        },
        {
          name: "yaml",
          loader: () =>
            import("@codemirror/legacy-modes/mode/yaml").then(({ yaml }) =>
              StreamLanguage.define(yaml),
            ),
        },
      ],
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "pt", title: "Português" },
      ],
      schemaTypes: ["post", "page", "project", "service"],
      languageField: "language",
    }),
    internationalizedArray({
      languages: [
        { id: "en", title: "English" },
        { id: "pt", title: "Português" },
      ],
      defaultLanguages: ["en"],
      fieldTypes: ["string", "text"],
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
