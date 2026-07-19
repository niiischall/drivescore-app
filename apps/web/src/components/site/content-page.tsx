import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark, BrandWordmark } from "@/components/landing/ui/brand";

export function ContentPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[480px] flex-col px-4 pb-16 pt-5">
      <header className="mb-8 flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text-primary no-underline"
        >
          <BrandMark size={28} />
          <BrandWordmark size="sm" />
        </Link>
        <Link
          href="/"
          className="text-[13px] font-semibold text-text-brand no-underline"
        >
          Home
        </Link>
      </header>

      <p className="m-0 mb-2 text-xs font-bold tracking-[0.12em] text-text-brand uppercase">
        {eyebrow}
      </p>
      <h1 className="m-0 mb-6 text-[28px] leading-[1.2] font-bold tracking-tight text-text-primary text-balance">
        {title}
      </h1>

      <div className="flex flex-col gap-5 text-[15px] leading-[1.6] text-text-secondary [&_a]:text-text-brand [&_h2]:m-0 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-text-primary [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-text-primary">
        {children}
      </div>
    </div>
  );
}
