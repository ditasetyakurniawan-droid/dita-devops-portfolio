import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dita Setya Kurniawan | DevOps & Platform Engineer",
    short_name: "Dita DevOps",
    description:
      "Portofolio DevOps & Platform Engineer: Pengelolaan CI/CD Bamboo, Helm, OpenShift untuk 200+ microservices di BRI dan rancang bangun klaster Kubernetes Multi-VM mandiri dari 0.",
    start_url: "/",
    display: "standalone",
    background_color: "#030014",
    theme_color: "#07091e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
