import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Jones + Poet",

  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
  },

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
