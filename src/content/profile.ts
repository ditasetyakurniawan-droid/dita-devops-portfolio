/** Contact and portrait details supplied for this public portfolio. */
export const profile = {
  name: "Dita Setya Kurniawan",
  role: "DevOps Engineer",
  currentWork: "DevOps Engineer di BRI · Enterprise CI/CD & Kubernetes Platform",
  portraitSrc: "/profile/dita-headroom.png" as string | undefined,
  githubUrl: "https://github.com/ditasetyakurniawan-droid",
  linkedinUrl: "https://www.linkedin.com/in/dita-setya-kurniawan",
  publicPhone: "+6285194513004",
  publicEmail: "ditasetya.kurniawan@gmail.com" as string | undefined,
  resumePdf: {
    href: "/resume/Dita_Setya_Kurniawan_CV_ID_2026-09.pdf",
    updated: "28 September 2026",
    size: "666 KiB",
  } as Readonly<{ href: `/resume/${string}.pdf`; updated: string; size: string }>,
} as const;
