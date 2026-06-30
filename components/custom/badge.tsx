import { cn } from "@/lib/utils";

export function CustomBadge({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn("py-1 text-cyan-600 dark:text-cyan-400 font-bold border-b-2 border-cyan-600 dark:border-cyan-400 mb-1.5 uppercase tracking-widest text-xs", className)}>
			{children}
		</div>
	);
}