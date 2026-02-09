/**
 * Strip markdown syntax from a string for use in plain-text contexts (e.g. SEO meta descriptions).
 */
export function normalizeUrl(url: string): string {
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;
  return url;
}

export function stripMarkdown(text: string): string {
  return (
    text
      // Images ![alt](url)
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Links [text](url) → text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // Bold/italic ***text***, **text**, *text*, ___text___, __text__, _text_
      .replace(/(\*{1,3}|_{1,3})(.+?)\1/g, "$2")
      // Strikethrough ~~text~~ → text
      .replace(/~~(.+?)~~/g, "$1")
      // Inline code `text` → text
      .replace(/`([^`]+)`/g, "$1")
      // Headings # text → text
      .replace(/^#{1,6}\s+/gm, "")
      // Blockquotes > text → text
      .replace(/^>\s+/gm, "")
      // Unordered list markers - text, * text
      .replace(/^[\s]*[-*+]\s+/gm, "")
      // Ordered list markers 1. text
      .replace(/^[\s]*\d+\.\s+/gm, "")
      // Horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Collapse whitespace
      .replace(/\n{2,}/g, " ")
      .replace(/\n/g, " ")
      .trim()
  );
}
