import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "TVOJ_PROJECT_ID",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-01",
});