import { auraStyles, type AuraVariant, type PerfumePalette } from "@/data/perfumes";
import type { CSSProperties } from "react";

export function Aura({
  variant,
  palette, // Add this prop
  intense = false,
  className = "",
}: {
  variant?: AuraVariant;
  palette?: PerfumePalette; // Optional palette
  intense?: boolean;
  className?: string;
}) {
  // Logic: Use dynamic palette if provided, otherwise fallback to hardcoded variants
  const dynamicStyle = palette ? {
    from: palette.dominant,
    to: palette.ambient,
    speed: "20s" // Standard speed for dynamic auras
  } : auraStyles[variant || "silver"];

  const style = {
    "--aura-from": dynamicStyle.from,
    "--aura-to": dynamicStyle.to,
    "--aura-speed": dynamicStyle.speed,
  } as CSSProperties;

  return (
    <div 
      className={`aura ${intense ? "is-on" : ""} ${className}`} 
      style={style} 
    />
  );
}