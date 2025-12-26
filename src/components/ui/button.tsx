import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
};

const styles = {
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-muted",
    outline: "border border-border hover:bg-muted",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    destructive: "bg-red-600 text-white hover:bg-red-600/90"
  },
  sizes: {
    sm: "h-8 px-3",
    md: "h-9 px-4",
    lg: "h-11 px-6"
  }
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.base, styles.variants[variant], styles.sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
