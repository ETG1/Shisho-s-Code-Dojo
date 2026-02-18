import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, Star, Sparkles, Crown } from "lucide-react"

// ============================================================================
// PIXEL CARD STYLES - Single unified style
// ============================================================================

const pixelCardStyles = [
  // Base container
  "relative overflow-hidden flex flex-col",
  "rounded-2xl p-6",
  
  // Background
  "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
  "backdrop-blur-xl",
  
  // Border - solid gray pixel style
  "border-2 border-gray-800 dark:border-gray-800",
  
  // Offset drop shadow - pixel depth effect
  "shadow-[4px_4px_0_0_#9ca3af] dark:shadow-[4px_4px_0_0_#4b5563]",
  
  // Hover state - shadow grows, card lifts
  "hover:shadow-[6px_6px_0_0_#9ca3af] dark:hover:shadow-[6px_6px_0_0_#9ca3af]",
  "hover:-translate-y-1",
  
  // Active state - shadow shrinks, card presses down
  "active:shadow-[2px_2px_0_0_#9ca3af] dark:active:shadow-[2px_2px_0_0_#4b5563]",
  "active:translate-y-0.5",
  
  // Smooth transitions
  "transition-all duration-150 ease-out",
].join(" ")

// ============================================================================
// TYPES
// ============================================================================

export interface PricingFeature {
  text: string
  included: boolean
  highlight?: boolean
}

export interface PricingCardProps {
  /** Plan name */
  name: string
  /** Price display */
  price: string
  /** Billing period */
  period?: string
  /** Plan description */
  description: string
  /** Features list */
  features: PricingFeature[]
  /** CTA button text */
  ctaText: string
  /** CTA click handler */
  onCtaClick?: () => void
  /** Additional classes */
  className?: string
  /** Badge text */
  badge?: string
  /** Is this the popular plan? */
  popular?: boolean
  /** Custom icon for the tier */
  icon?: React.ReactNode
}

// ============================================================================
// DEFAULT ICONS BY TIER NAME
// ============================================================================

const tierIcons: Record<string, React.ReactNode> = {
  Free: <Star className="w-5 h-5 text-gray-400" />,
  Pro: <Sparkles className="w-5 h-5 text-primary" />,
  Enterprise: <Crown className="w-5 h-5 text-[#9ca3af]" />,
}

// ============================================================================
// PRICING CARD COMPONENT - Pixel Style Only
// ============================================================================

export function PricingCard({
  name,
  price,
  period = "/month",
  description,
  features,
  ctaText,
  onCtaClick,
  className,
  badge,
  popular = false,
  icon,
}: PricingCardProps) {
  // Use custom icon or default based on name
  const displayIcon = icon ?? tierIcons[name] ?? <Star className="w-5 h-5 text-gray-400" />

  return (
    <div className={cn(pixelCardStyles, className)}>
      {/* Popular badge - pixel style */}
      {popular && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10 ">
          <span className={[
            "px-4 py-1",
            "rounded-sm",
            "bg-gray-400 text-black",
            "border-2 border-black",
            "text-sm font-bold font-game",
            "shadow-[2px_2px_0_0_#9ca3af]",
          ].join(" ")}>
            MOST POPULAR
          </span>
        </div>
      )}
      
      {/* Header */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          {displayIcon}
          <h3 className="text-xl font-bold font-game text-foreground">{name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {/* Price - pixel style */}
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold font-game text-foreground">
          {price}
        </span>
        {period && (
          <span className="text-sm text-muted-foreground font-game">
            {period}
          </span>
        )}
      </div>
      
      {/* Badge - pixel style */}
      {badge && (
        <span className={[
          "self-start px-3 py-1 mb-4",
         "rounded-sm",
            "bg-gray-400 text-black",
            "border-2 border-black",
          "text-sm font-medium font-game",
          "shadow-[2px_2px_0_0_#9ca3af] dark:shadow-[2px_2px_0_0_#9ca3af]",
        ].join(" ")}>
          {badge}
        </span>
      )}
      
      {/* Features - pixel style checkmarks */}
      <ul className="flex-1 space-y-3 mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className={cn(
              "flex items-start gap-3 text-sm",
              !feature.included && "text-muted-foreground/50"
            )}
          >
            <div className={cn(
              "mt-0.5 shrink-0 p-1",
              "border border-gray-400 dark:border-gray-500",
              feature.included 
                ? "bg-primary/20 text-primary" 
                : "bg-gray-200 dark:bg-gray-700 text-muted-foreground"
            )}>
              <Check className="w-3 h-3" />
            </div>
            <span className={cn(
              feature.highlight && "font-bold text-foreground"
            )}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      {/* CTA Button - pixel variant */}
      <Button
        variant="pixel"
        size="lg"
        className="w-full font-bold font-game text-xl"
        onClick={onCtaClick}
      >
        {ctaText}
      </Button>
    </div>
  )
}

export default PricingCard
