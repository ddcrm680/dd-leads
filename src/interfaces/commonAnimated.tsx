import { ReactNode } from "react";
export interface AnimatedDrawerProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;

  side?: "left" | "right" | "top" | "bottom";

  width?: number | string;
  height?: number | string;

  className?: string;

  showBackdrop?: boolean;
}
