/** Extracts the id from youtu.be/<id>, youtube.com/watch?v=<id>, /embed/<id>, /shorts/<id>. Safe for client and server. */
export function youtubeId(url: string): string | undefined {
  return url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/)?.[1];
}
