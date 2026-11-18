import type { MetadataRoute } from "next";
import { SITE_URL, nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const priority: Record<string, number> = { "/": 1, "/tickets": 0.9, "/schedule": 0.8, "/faqs": 0.8, "/contact": 0.6 };
  return nav.map((n) => ({
    url: `${SITE_URL}${n.href === "/" ? "/" : n.href}`,
    lastModified: new Date(),
    changeFrequency: n.href === "/" || n.href === "/tickets" ? "weekly" : "monthly",
    priority: priority[n.href] ?? 0.5,
  }));
}
