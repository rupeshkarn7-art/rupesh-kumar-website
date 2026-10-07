import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";

/**
 * Safe Markdown renderer. Raw HTML in content is NOT rendered (react-markdown default),
 * which prevents script injection. Supports GFM tables, code highlighting and heading anchors.
 */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose-article", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={{
          a: ({ href = "", children, ...props }) => {
            const external = /^https?:\/\//.test(href);
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
                {children}
              </a>
            );
          },
          img: ({ src, alt }) =>
            // eslint-disable-next-line @next/next/no-img-element
            <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" decoding="async" />,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
