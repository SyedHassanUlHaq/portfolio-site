import { site } from "../../content/site";

const BODY = [
  "Hi Hassan,",
  "",
  "What I'd like to automate or build:",
  "",
  "",
  "Tools I use today (CRM, phone system, etc.):",
  "",
  "",
  "Roughly when I'd like to start:",
  "",
  "",
  "Thanks,",
].join("\n");

/** mailto link with a short prompt in the body, so the first email already says what you need to reply well. */
export const mailto = (subject: string) => `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(BODY)}`;

/** Where "Book a call" goes: the Calendly page if set, otherwise the prefilled email. */
export const book = (subject = "Project inquiry") => ({
  href: site.contact.calendly || mailto(subject),
  external: !!site.contact.calendly,
});
