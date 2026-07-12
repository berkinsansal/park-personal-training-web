import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-amber-400 text-zinc-950 hover:bg-amber-300",
        ghost:
          "border border-zinc-600 text-white hover:border-amber-400 hover:text-amber-400 font-medium",
        link:
          "text-amber-400 hover:text-amber-300",
        "admin-edit":
          "text-zinc-400 hover:text-amber-400",
        destructive:
          "text-zinc-400 hover:text-red-400",
        whatsapp:
          "border border-green-600 text-green-600 hover:bg-green-700/10",
        icon:
          "rounded-full bg-green-600 hover:bg-green-500 text-white",
      },
      size: {
        default: "px-8 py-3 text-sm uppercase tracking-wider",
        lg: "px-8 py-4 text-sm uppercase tracking-wider",
        sm: "px-4 py-2 text-xs",
        xs: "text-xs",
        full: "w-full py-3 text-sm uppercase tracking-wider",
        icon: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
