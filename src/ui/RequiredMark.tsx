import { cn } from "../utils/helper";

export const RequiredMark = ({
  show,
  addedClassname,
}: {
  show: boolean;
  addedClassname?: string;
}) =>
  show ? (
    <span className={cn("text-red-500 ml-1", addedClassname)}>*</span>
  ) : null;
