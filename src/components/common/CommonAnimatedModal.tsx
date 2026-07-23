"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { Loader } from "./loader";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  title?: ReactNode;
  children?: ReactNode;

  contentClassName?: string;
  showCloseIcon?: boolean;
  primaryText?: string;
  cancelText?: string;

  primaryColor?: string;
  cancelTextClass?: string;

  showPrimary?: boolean;

  onConfirm?: () => void;

  isLoading?: boolean;

  closeOnBackdropClick?: boolean;
};

export default function CommonAnimatedModal({
  isOpen,
  onClose,
  title,
  children,
  showCloseIcon,
  contentClassName = "w-[360px]",

  primaryText = "Confirm",
  cancelText = "Cancel",

  primaryColor = "bg-blue-600 hover:bg-blue-700",
  cancelTextClass = "hover:bg-gray-100",

  showPrimary = true,

  onConfirm,
  closeOnBackdropClick = true,

  isLoading = false,
}: Props) {
  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] !mt-0"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed inset-0 flex items-center justify-center z-[9999]"
            onClick={(e) => {
              if (isLoading) return;

              if (closeOnBackdropClick && e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`${contentClassName} bg-white rounded-xl shadow-2xl overflow-hidden`}
            >
              {/* HEADER */}
              {title && (
                <div className="px-4 py-3 bg-[#f5f5f6] border-b flex items-center justify-between">
                  <h2 className="text-sm font-semibold">{title}</h2>

                  {showCloseIcon && (
                    <button
                      disabled={isLoading}
                      onClick={!isLoading ? handleClose : undefined}
                      className={`rounded ${
                        isLoading ? "opacity-50 " : "hover:bg-gray-100"
                      }`}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* BODY */}
              <div className="overflow-y-auto">{children}</div>

              {/* FOOTER */}
              {showPrimary && (
                <div className="flex justify-end gap-3 px-4 py-3 border-t">
                  <button
                    disabled={isLoading}
                    onClick={!isLoading ? handleClose : undefined}
                    className={`h-8 px-3 text-xs border rounded ${
                      isLoading ? "opacity-50 " : cancelTextClass
                    }`}
                  >
                    {cancelText}
                  </button>

                  {showPrimary && (
                    <button
                      disabled={isLoading}
                      onClick={onConfirm}
                      className={`h-8 px-3 text-xs text-white rounded flex items-center gap-2 ${primaryColor}`}
                    >
                      {isLoading && (
                        <Loader isShowLoadingText={false} loaderSize={3} />
                      )}
                      {primaryText}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
