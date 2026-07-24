"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/helper";
import { AnimatedDrawerProps } from "../../interfaces/commonAnimated";
import { position, variants } from "../../utils/constant";

export default function AnimatedDrawer({
  open,
  onClose,
  children,
  side = "right",
  width = 450,
  height = 400,
  className,
  showBackdrop = false,
}: AnimatedDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {showBackdrop && (
            <motion.div
              className="fixed inset-0 bg-black/30 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}

          <motion.div
            initial={variants[side].initial}
            animate={variants[side].animate}
            exit={variants[side].exit}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            style={{
              width: side === "left" || side === "right" ? width : undefined,
              height: side === "top" || side === "bottom" ? height : undefined,
            }}
            className={cn(
              "fixed z-50 bg-white shadow-xl",
              position[side],
              className,
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
