"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../../utils/helper";

export default function CommonModal({
  isOpen,
  onClose,
  isLoading = false,
  title = "Modal Title",
  disableClose = false,
  children,
  showCloseIcon = true,
  shouldUpdateUI = false,
  /** 👇 NEW */
  contentClassName = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  shouldUpdateUI?: boolean;
  showPrimary?: boolean;
  cancelTextClass?: string;
  primaryColor: string;
  disableClose?: boolean;
  primaryText: any;
  isLoading?: boolean;
  title?: React.ReactNode;
  showCloseIcon?: boolean;
  contentClassName?: string;
}) {
  useEffect(() => {
    const handleUnauthorized = () => onClose();
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [onClose]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && (isLoading || disableClose)) return;
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[99]" />

        {/* Content */}
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            ` ${shouldUpdateUI ? "flex flex-col " : ""}
              fixed left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              bg-white ${shouldUpdateUI ? "rounded-xl" : "rounded-lg"} shadow-xl
              z-[5000]
max-h-[calc(100vh-100px)]
              
              overflow-hidden
            `,
            contentClassName,
          )}
        >
          {/* Header */}
          {!title && !showCloseIcon ? (
            ""
          ) : (
            <div className="flex items-center justify-between border-b px-4 py-3">
              <Dialog.Title className="text-sm font-semibold text-gray-800">
                {title}
              </Dialog.Title>

              {showCloseIcon && (
                <Dialog.Close asChild>
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-md p-2 hover:bg-gray-100 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}

          {/* Body */}
          <div
            className={` ${shouldUpdateUI ? "h-auto flex-1" : " overflow-y-auto max-h-[calc(90vh-52px)]"} `}
          >
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
