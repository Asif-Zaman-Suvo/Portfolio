import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
