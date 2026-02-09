"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const sizeClasses = {
  sm: "prose-sm",
  base: "prose-base",
  lg: "prose-lg",
} as const;

export default function MarkdownRenderer({
  content,
  size = "lg",
  className,
}: {
  content: string;
  size?: "sm" | "base" | "lg";
  className?: string;
}) {
  return (
    <div className={`prose ${sizeClasses[size]} prose-invert max-w-none ${className ?? ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
