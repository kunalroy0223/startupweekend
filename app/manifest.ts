import type { MetadataRoute } from "next";
import { event } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: event.name,
    short_name: "TSWS 2027",
    description: "54 hours. 3 days. 1 big build. 16–18 April 2027, Inspiria Knowledge Campus, Siliguri.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
