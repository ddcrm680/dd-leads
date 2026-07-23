import { UseFormSetError } from "react-hook-form";
import { leadSchema } from "../schema/leads.schema";
import z from "zod";
import { LucideIcon } from "lucide-react";

export interface LeadFormProp {
  mode: string;
  id?: string;
  meta?: any[];
  initialValues?: Partial<any>;
  isLoading?: boolean;
  onClose: () => void;
  // 👇 IMPORTANT
  onSubmit: (values: any, setError: UseFormSetError<any>) => void;
}

export type leadFormType = z.infer<ReturnType<typeof leadSchema>>;
export type sectionProps = {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
};

export interface InfoProps {
  id: string;

  label: string;

  value: string | number;

  icon: LucideIcon;

  type: "text" | "number" | "currency" | "date" | "select";

  currency?: string;

  options?: {
    label: string;
    value: string;
  }[];

  editable?: boolean;

  editing?: boolean;

  onEdit?: () => void;

  onCancel?: () => void;

  onSave?: (id: string, value: any) => void;
}
