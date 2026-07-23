export interface CommonDeleteModalProps {
  isOpen: boolean;
  title?: string;
  width?: string;
  showCloseIcon?: boolean;
  maxWidth?: string;
  onClose?: () => void;
  cancelClassname?: string;
  description?: string;
  shouldNotCancelOnOverlayClick?: boolean;
  confirmText?: string;
  loadingText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
export type CommonMenuItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  show?: boolean;
  danger?: boolean;
  disabled?: boolean;

  actionType?: "print" | "download" | "word" | "pdf"; // 👈 NEW (only for these cases)
};
export type CommonRowMenuProps = {
  items: CommonMenuItem[];
  width?: number;
  isAsyncLoading?: boolean;
  closeKey?: string; // 👈 NEW
};
export type CommonModalInfo = {
  open: {
    open: boolean;

    type: string;
  };
  info: any;
};
