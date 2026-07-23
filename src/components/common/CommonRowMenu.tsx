"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EllipsisVertical } from "lucide-react";
import { CommonRowMenuProps } from "../../types/common.type";
export default function CommonRowMenu({
  items,
  width = 190,
  closeKey,
  isAsyncLoading,
}: CommonRowMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const HEADER_HEIGHT = 50;
  useEffect(() => {
    if (closeKey?.includes("false")) setOpen(false);
  }, [closeKey]);
  /* ----------------------------------------
   * Calculate position (UP / DOWN)
   * -------------------------------------- */
  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    // ❌ Trigger is ABOVE header → close menu
    if (rect.bottom <= HEADER_HEIGHT) {
      setOpen(false);
      return;
    }

    // ❌ Trigger is BELOW viewport → close menu
    if (rect.top >= window.innerHeight) {
      setOpen(false);
      return;
    }

    const menuHeight = menuRef.current?.offsetHeight ?? 240;
    const GAP = 8;

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < menuHeight + GAP;

    const desiredTop = openUpward
      ? rect.top - menuHeight - GAP
      : rect.bottom + GAP;

    // 🔒 Clamp so menu NEVER crosses header
    const top = Math.max(desiredTop, HEADER_HEIGHT + GAP);

    setPos({
      top,
      left: rect.right - width,
    });
  };

  useEffect(() => {
    if (!open) return;

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, width]);

  /* ----------------------------------------
   * Close on outside click
   * -------------------------------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ----------------------------------------
   * Filter visible items
   * -------------------------------------- */
  const visibleItems = items.filter((i) => i.show !== false);

  return (
    <div className="relative inline-block">
      {/* trigger */}
      <button
        ref={triggerRef}
        onClick={(e: any) => {
          e.stopPropagation();
          setOpen((v: any) => {
            return typeof isAsyncLoading === "boolean" && !isAsyncLoading
              ? !v
              : !v;
          });
        }}
        title="More actions"
        className="p-1 rounded hover:bg-gray-100"
      >
        <EllipsisVertical className="!w-4 !h-4 shrink-0 md:!w-[18px]  md:!h-[18px] text-gray-700" />
      </button>
      {/* menu */}
      {open &&
        createPortal(
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width,
              zIndex: 99, // 🚀 safely above everything
            }}
            className="
  rounded-lg md:rounded-lg
   border 
  bg-white
  shadow-lg
  overflow-hidden
"
          >
            {visibleItems.map((item) => (
              <button
                key={item.key}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick();
                  if (
                    item.actionType !== "print" &&
                    item.actionType !== "download" &&
                    item.actionType !== "word" &&
                    item.actionType !== "pdf"
                  ) {
                    setOpen(false);
                  }
                }}
                className={`
  flex w-full items-center gap-2 md:gap-3
  px-3 py-2 md:px-3 md:py-2
  text-[13px] md:text-sm
  text-left
  hover:bg-gray-100
  ${item.danger ? "text-red-600" : ""}
  ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
