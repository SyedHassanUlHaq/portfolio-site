export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Prefix for plain <a>/<img> URLs (next/link adds the base path by itself). */
export const withBase = (p: string) => (/^(https?:|mailto:|tel:|#)/.test(p) ? p : BASE + p);
export const projectImg = (slug: string, file: string) => withBase(`/projects/${slug}/${file}`);
