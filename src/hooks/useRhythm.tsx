import React from "react";

/* ---------- Paragraph (中文阅读优化版) ---------- */
export function Para({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={'pt-[10px] pb-[10px] leading-[2.1] text-[20px] text-gray-800 ${className}'}
    >
      {children}
    </p>
  );
}

/* ---------- SubSection Title (小节) ---------- */
export function SubSection({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={` pb-[10px] pt-[20px] text-[36.5px] font-semibold tracking-tight text-gray-900 ${className}`}
    >
      {children}
    </h3>
  );
}

/* ---------- Main Heading (编号节标题) ---------- */
export function Heading({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-[8px] mb-[6px] text-[18.5px] font-bold leading-[1.8] tracking-tight text-gray-900 tabular-nums ${className}`}
    >
      {children}
    </h2>
  );
}

/* ---------- Quote Block (略紧) ---------- */
export function Quote({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <blockquote
      className={`mt-[14px] mb-[14px] text-[20px] pl-4 border-l-2 border-gray-300 italic text-gray-600 ${className}`}
    >
      {children}
    </blockquote>
  );
}

/* ---------- List (列表统一) ---------- */
export function List({
  children,
  ordered = false,
  className = "",
}: { children: React.ReactNode; ordered?: boolean; className?: string }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`mt-[9px] mb-[12px] pl-6 ${
        ordered ? "list-decimal" : "list-disc"
      } space-y-[1px] text-[20px] leading-[2.3] text-gray-800 ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ---------- Code Block (保持原节奏) ---------- */
export function CodeBlock({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <pre
      className={`pt-[10px] pb-[10px] rounded-lg bg-gray-50 p-3 font-mono text-sm text-gray-800 overflow-x-auto ${className}`}
    >
      <code>{children}</code>
    </pre>
  );
}
