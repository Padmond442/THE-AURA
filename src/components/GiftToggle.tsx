import { useParcel } from "@/store";

export function GiftToggle({
  id,
  variant = "icon",
  className = "",
}: {
  id: string;
  variant?: "icon" | "pill" | "full";
  className?: string;
}) {
  const has = useParcel((s) => s.items.includes(id));
  const toggle = useParcel((s) => s.toggle);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        aria-label={has ? "Remove from Parcel" : "Add to Parcel"}
        title={has ? "In your Parcel" : "Add to Parcel"}
        className={`absolute top-3 right-3 z-30 h-9 w-9 grid place-items-center rounded-full backdrop-blur-md border border-border/60 transition-all ${
          has ? "bg-foreground text-background border-foreground" : "bg-background/70 hover:bg-background"
        } ${className}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 12v9H4v-9" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 22V7" />
          <path d="M12 7s-2-5-5-5-3 3-1 4 6 1 6 1zM12 7s2-5 5-5 3 3 1 4-6 1-6 1z" />
        </svg>
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        onClick={onClick}
        className={`text-[10px] uppercase tracking-luxe px-3 py-2 border transition-colors ${
          has ? "bg-foreground text-background border-foreground" : "border-border hover:bg-secondary"
        } ${className}`}
      >
        {has ? "✓ In Parcel" : "+ Gift It"}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 text-xs uppercase tracking-luxe border transition-colors ${
        has ? "bg-secondary border-foreground" : "border-border hover:bg-secondary"
      } ${className}`}
    >
      {has ? "✓ Added to Parcel" : "Gift this scent"}
    </button>
  );
}
