import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "tailwind.config.jsrelative tailwind.config.jsw-full tailwind.config.jsrounded-lg tailwind.config.jsborder tailwind.config.jsborder-slate-200 tailwind.config.jsp-4 [&>svg~*]:tailwind.config.jspl-7 [&>svg+div]:tailwind.config.jstranslate-y-[-3px] [&>svg]:tailwind.config.jsabsolute [&>svg]:tailwind.config.jsleft-4 [&>svg]:tailwind.config.jstop-4 [&>svg]:tailwind.config.jstext-slate-950 dark:tailwind.config.jsborder-slate-800 dark:[&>svg]:tailwind.config.jstext-slate-50",
  {
    variants: {
      variant: {
        default: "tailwind.config.jsbg-white tailwind.config.jstext-slate-950 dark:tailwind.config.jsbg-slate-950 dark:tailwind.config.jstext-slate-50",
        destructive:
          "tailwind.config.jsborder-red-500/50 tailwind.config.jstext-red-500 dark:tailwind.config.jsborder-red-500 [&>svg]:tailwind.config.jstext-red-500 dark:tailwind.config.jsborder-red-900/50 dark:tailwind.config.jstext-red-900 dark:dark:tailwind.config.jsborder-red-900 dark:[&>svg]:tailwind.config.jstext-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("tailwind.config.jsmb-1 tailwind.config.jsfont-medium tailwind.config.jsleading-none tailwind.config.jstracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("tailwind.config.jstext-sm [&_p]:tailwind.config.jsleading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
