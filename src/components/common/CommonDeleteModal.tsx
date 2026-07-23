import { useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { CommonDeleteModalProps } from "../../types/common.type";
import CommonModal from "./CommonModal";
import { Button } from "../../ui/button";
import { cn } from "../../utils/helper";

export default function CommonDeleteModal({
  isOpen,
  width,
  title = "Delete",
  cancelClassname,
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  loadingText = "Deleting...",
  maxWidth,
  onClose, // ✅ NEW
  onConfirm,
  showCloseIcon = true,
  onCancel,
  shouldNotCancelOnOverlayClick = false,
}: CommonDeleteModalProps) {
  const { user } = useAuth();

  useEffect(() => {
    const handleUnauthorized = () => {
      if (onClose) {
        onClose();
      } else {
        onCancel();
      }
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [onCancel, onClose]);
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={() => {
        if (!shouldNotCancelOnOverlayClick) {
          if (onClose) {
            onClose();
          } else {
            onCancel();
          }
        }
      }}
      contentClassName={`
    w-[95vw]
    sm:w-[460px] 
  `}
      showCloseIcon={showCloseIcon}
      title={title}
      isLoading={isLoading}
      primaryText={confirmText}
      cancelTextClass="hover:bg-[#E3EDF6] hover:text-[#000]"
      primaryColor="bg-red-600 hover:bg-red-700"
    >
      <div className={"space-y-3 "}>
        <p className={`${"px-4 py-4"} text-sm text-gray-600 `}>{description}</p>

        <div
          className={cn(
            `flex  border-t ${"px-4 py-4   pt-4 !mt-0 justify-between gap-3"}`,
          )}
        >
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className={cn(
              `${"h-10 hover:bg-[#E3EDF6] hover:text-[#000] "} flex-1 text-xs`,
              cancelClassname,
            )}
            disabled={isLoading}
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={`${"h-10 bg-red-600 hover:bg-red-700"} flex-1 text-xs`}
          >
            {isLoading && (
              <svg
                className="h-6 w-6 animate-spin text-[#fff]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}{" "}
            {isLoading ? (loadingText ?? "Deleting...") : confirmText}
          </Button>
        </div>
      </div>
    </CommonModal>
  );
}
