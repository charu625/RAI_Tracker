import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">This metric could not be found.</p>
      <Link href="/" className={cn(buttonVariants(), "mt-6")}>
        Back to Metrics Library
      </Link>
    </div>
  );
}
