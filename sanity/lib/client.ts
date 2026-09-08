import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Public dataset: no token needed for reads, so this is safe to use from
// Server Components at request/build time.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
