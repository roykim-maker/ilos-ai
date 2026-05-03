import { Suspense } from "react";
import { BookContent } from "./BookContent";

export const metadata = {
  title: "Book Your Strategy Call | ilos.ai",
  description: "Schedule your free 30-minute AI OS strategy call with ilos.ai.",
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <BookContent />
    </Suspense>
  );
}
