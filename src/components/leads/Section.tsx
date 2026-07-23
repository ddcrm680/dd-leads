import { sectionProps } from "../../types/leads.type";

export function Section({ title, children, right }: sectionProps) {
  return (
    <div className="px-6 py-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest">{title}</h3>

        {right}
      </div>

      <div className="space-y-0">{children}</div>
    </div>
  );
}
