import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { products, experiences } from "@/lib/data";
import { artists } from "@/lib/artists";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/magaza", "/deneyimler", "/sanatcilar", "/anlar"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/magaza/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const experienceRoutes = experiences.map((e) => ({
    url: `${SITE_URL}/deneyimler/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const artistRoutes = artists.map((a) => ({
    url: `${SITE_URL}/sanatci/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...experienceRoutes, ...artistRoutes];
}
