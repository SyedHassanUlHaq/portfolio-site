import { site } from "../../content/site";

export const mailto = (subject: string) => `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
