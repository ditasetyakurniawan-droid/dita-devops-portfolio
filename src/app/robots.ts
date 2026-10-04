import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dita-devops.zabisa.my.id";
  const allowIndex = process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";

  return {
    rules: {
      userAgent: "*",
      allow: allowIndex ? "/" : undefined,
      disallow: allowIndex ? ["/api/"] : "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
