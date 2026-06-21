import type { MetadataRoute } from "next";

// Web app manifest served at /manifest.webmanifest via Next's metadata-route
// convention. (A static public/manifest.json does not work — the App Router
// reserves the manifest path and serves this route instead.) Next auto-injects
// the matching <link rel="manifest"> into <head>, so layout.tsx no longer sets
// metadata.manifest manually.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Airman's Playbook",
    short_name: "Playbook",
    description: "Pick your job, get the safe starting move, and go run it on GenAI.mil.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003087",
    icons: [
      {
        src: "/assets/af-symbol-blue.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
    ],
  };
}
