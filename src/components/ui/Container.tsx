import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
      {children}
    </div>
  );
}