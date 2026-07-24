import { sectionProps } from "../../types/leads.type";

export function Section({ title, children, right }: sectionProps) {
  return (
    <div className="px-3 py-4 sm:px-4 md:px-6 md:py-5">
      {" "}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] sm:text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400">
          {" "}
          {title}
        </h3>

        {right}
      </div>
      <div className="space-y-0">{children}</div>
    </div>
  );
}
