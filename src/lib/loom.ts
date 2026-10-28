/** Safe to import from client and server (lib/projects.ts is server-only). */
export function loomId(url: string): string | undefined {
  return url?.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/)?.[1];
}
