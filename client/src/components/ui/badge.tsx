import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * Badge — wraps the design-system `.badge` CSS class hierarchy.
 *
 * Variants map directly to DS modifier classes:
 *   neutral | success | warning | danger | info
 *
 * Special modifiers:
 *   mono — monospace numeric chip (.badge-mono)
 */

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info" | "default"

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant
  mono?: boolean
  asChild?: boolean
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  default: "badge-neutral",
  neutral: "badge-neutral",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "badge-info",
}

function Badge({
  className,
  variant = "neutral",
  mono = false,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(
        "badge",
        VARIANT_CLASS[variant],
        mono && "badge-mono",
        className
      )}
      {...props}
    />
  )
}

/**
 * BadgeDot — pulsing status indicator (strictly rounded-full per DS spec).
 * Use inside a Badge or standalone.
 */
type BadgeDotVariant = "success" | "warning" | "danger" | "info" | "neutral"

interface BadgeDotProps extends React.ComponentProps<"span"> {
  variant?: BadgeDotVariant
}

function BadgeDot({ className, variant = "neutral", ...props }: BadgeDotProps) {
  return (
    <span
      data-slot="badge-dot"
      className={cn("badge-dot", variant && `badge-dot-${variant}`, className)}
      {...props}
    />
  )
}

export { Badge, BadgeDot }
export type { BadgeProps, BadgeVariant, BadgeDotProps, BadgeDotVariant }
