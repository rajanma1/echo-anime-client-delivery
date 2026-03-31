"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type CollapsibleContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) throw new Error("Collapsible components must be used within Collapsible");
  return context;
}

export function Collapsible({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    const nextValue = typeof value === "function" ? value(open) : value;
    if (controlledOpen === undefined) setInternalOpen(nextValue);
    onOpenChange?.(nextValue);
  };

  return <CollapsibleContext.Provider value={{ open, setOpen }}>{children}</CollapsibleContext.Provider>;
}

export function CollapsibleTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open, setOpen } = useCollapsibleContext();

  return (
    <button
      type="button"
      onClick={() => setOpen((current) => !current)}
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.05]",
        className,
      )}
    >
      <span className="flex-1">{children}</span>
      <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} />
    </button>
  );
}

export function CollapsibleContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open } = useCollapsibleContext();
  if (!open) return null;
  return <div className={cn("pt-4", className)}>{children}</div>;
}
