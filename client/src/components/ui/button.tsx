import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * Button — wraps the design-system `.button` CSS class hierarchy.
 *
 * Variants map directly to DS modifier classes:
 *   primary | secondary | outline | ghost | destructive | accent | link
 *
 * Sizes map to:
 *   default (md) | sm | lg | icon
 */

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "accent"
  | "link"
  | "default"

type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  default: "button-primary",
  primary: "button-primary",
  secondary: "button-secondary",
  outline: "button-outline",
  ghost: "button-ghost",
  destructive: "button-destructive",
  accent: "button-accent",
  link: "button-link",
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  default: "",
  sm: "button-sm",
  lg: "button-lg",
  icon: "button-icon",
}

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        "button",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className
      )}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
