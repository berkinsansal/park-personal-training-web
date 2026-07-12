import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      sizeStr: {
        default: "px-3 py-2",
        compact: "px-3 py-2",
        lg: "px-4 py-3",
      },
    },
    defaultVariants: {
      sizeStr: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, sizeStr, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ sizeStr, className }))}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input, inputVariants }
