import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { InfoProps } from "../../types/leads.type";
import { cn } from "../../utils/helper";

export function InfoRow({
  icon: Icon,
  id,
  label,
  value,
  type = "text",
  currency,
  options,
  onSave,
  editing,
  editable = true,
  onEdit,
  onCancel,
}: InfoProps) {
  const [tempValue, setTempValue] = useState(value);
  const renderEditor = () => {
    switch (type) {
      case "text":
        return (
          <Input
            value={tempValue}
            className={cn(
              "h-8 pl-3 rounded-[4px] bg-white dark:bg-gray-900 shadow-none",
              "border-gray-300 dark:border-gray-700 focus-visible:ring-blue-500",
            )}
            onChange={(e) => setTempValue(e.target.value)}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            className={cn(
              "h-8 pl-3 rounded-[4px] bg-white dark:bg-gray-900 shadow-none",
              "border-gray-300 dark:border-gray-700 focus-visible:ring-blue-500",
            )}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        );

      case "date":
        return (
          <Input
            type="date"
            className={cn(
              "h-8 pl-3 rounded-[4px] bg-white dark:bg-gray-900 shadow-none",
              "border-gray-300 dark:border-gray-700 focus-visible:ring-blue-500",
            )}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        );

      case "select":
        return (
          <select
            className="w-full h-8 rounded-[4px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 border border-input px-3 text-sm focus:ring-2 focus:ring-ring"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "currency":
        return (
          <div className="flex gap-2">
            <Input
              type="number"
              value={tempValue}
              className={cn(
                "h-8 pl-3 rounded-[4px] bg-white dark:bg-gray-900 shadow-none",
                "border-gray-300 dark:border-gray-700 focus-visible:ring-blue-500",
              )}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <select
              value={currency}
              className="w-full h-8 rounded-[4px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 border border-input px-3 text-sm focus:ring-2 focus:ring-ring"
            >
              {" "}
              <option>INR</option>
              <option>USD</option>
            </select>
          </div>
        );
    }
  };
  useEffect(() => {
    setTempValue(value);
  }, [value]);
  if (!editing) {
    const color =
      label === "Hot"
        ? "bg-red-100 text-red-700"
        : label === "Warm"
          ? "bg-orange-100 text-orange-700"
          : label === "Cold"
            ? "bg-blue-100 text-blue-700"
            : "bg-green-100 text-green-700";

    return (
      <div
        onClick={onEdit}
        title={label}
        className="
group
flex
items-center
gap-2
sm:gap-3
rounded-md
px-2
sm:px-3
py-2
hover:bg-gray-100
dark:hover:bg-gray-800
cursor-pointer
transition-colors
"
      >
        <Icon className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
        <div className="flex-1">
          {id === "label" ? (
            <div
              className={`rounded-full inline-flex px-2 py-0.5 text-xs sm:text-sm font-medium ${color}`}
            >
              {value || "—"}
            </div>
          ) : (
            <div className="truncate text-[13px] sm:text-[14px] text-gray-900 dark:text-gray-100">
              {value || "—"}
            </div>
          )}
        </div>

        <Pencil
          size={14}
          className="
    opacity-100
    lg:opacity-0
    lg:group-hover:opacity-100
    transition-opacity
  "
        />
      </div>
    );
  }
  return (
    <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-2">
      <div className="flex items-start gap-3">
        <Icon size={14} />

        <div className="flex-1">
          {renderEditor()}

          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <Button
              onClick={onCancel}
              variant="outline"
              type="button"
              className="rounded-[4px] "
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                onSave && onSave(id, tempValue);
                onCancel && onCancel();
              }}
              className=" rounded-[4px] bg-green-600 hover:bg-green-700"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
