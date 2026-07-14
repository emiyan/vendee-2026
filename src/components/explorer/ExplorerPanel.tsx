import type { PropsWithChildren } from "react";

export default function ExplorerPanel({
  children,
}: PropsWithChildren) {
  return (
    <section
      className="
        relative
        -mt-8
        rounded-t-[32px]
        bg-white
        px-5
        pt-6
        pb-8
        shadow-[0_-8px_24px_rgba(15,23,42,0.06)]
      "
    >
      {children}
    </section>
  );
}