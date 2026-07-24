import { ArrowLeft, MoreHorizontal, Trash2 } from "lucide-react";
import { dummyLead } from "../../utils/mockData";
import { Section } from "./Section";
import { InfoRow } from "./InfoRow";
import { useState } from "react";
import { InfoProps } from "../../types/leads.type";
import { Button } from "../../ui/button";
import RightPanel from "./RightPanel";

export default function ViewEditContent({ onClose }: { onClose: () => void }) {
  const [lead, setLead] = useState(dummyLead);
  const [editing, setEditing] = useState<string | null>(null);
  const renderRows = (items: InfoProps[]) =>
    items.map((item) => (
      <InfoRow
        {...item}
        editing={editing === item.id}
        onEdit={() => setEditing(item.id)}
        onCancel={() => setEditing(null)}
        onSave={handleSave}
      />
    ));
  const handleSave = (id: string, newValue: any) => {
    setLead((prev) => ({
      ...prev,

      details: prev.details.map((item) =>
        item.id === id
          ? {
              ...item,
              value: newValue,
            }
          : item,
      ),

      person: prev.person.map((item) =>
        item.id === id
          ? {
              ...item,
              value: newValue,
            }
          : item,
      ),

      organization: prev.organization.map((item) =>
        item.id === id
          ? {
              ...item,
              value: newValue,
            }
          : item,
      ),
    }));
  };
  return (
    <div className="flex h-full flex-col md:flex-row overflow-y-auto">
      {" "}
      <div
        className="
    flex flex-col
        w-full
    md:w-[280px]
    lg:w-[320px]

    h-full
    border-b md:border-b-0 md:border-r
    border-gray-200 dark:border-gray-700
    bg-white dark:bg-gray-900
  "
      >
        {" "}
        {/* Header */}
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4">
          <button
            onClick={onClose}
            className="
      flex h-8 w-8 items-center justify-center
      rounded-md
      text-gray-600
      hover:bg-gray-100
      hover:text-black
      dark:text-gray-400
      dark:hover:bg-gray-800
      dark:hover:text-white
      transition
    "
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>

          <h2 className="truncate text-lg font-semibold text-gray-900 dark:text-gray-100">
            {lead.title}
          </h2>
        </div>
        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Section title="DETAILS">{renderRows(lead.details)}</Section>

          <Section title="PERSON">{renderRows(lead.person)}</Section>

          <Section title="ORGANIZATION">
            {renderRows(lead.organization)}
          </Section>
        </div>
        {/* Footer */}
        <div
          className="
    shrink-0
    flex
    items-center
    justify-between
    border-t
    border-gray-200 dark:border-gray-700
    bg-white dark:bg-gray-900
    px-4
    py-3
  "
        >
          <Trash2
            className="
      h-5
      w-5
      ml-1.5
      cursor-pointer
      text-gray-500
      hover:text-red-500
      dark:text-gray-400
      dark:hover:text-red-400
      transition-colors
    "
          />

          <Button
            className="
      rounded-[4px]
      bg-green-600
      hover:bg-green-700
      dark:bg-green-700
      dark:hover:bg-green-600
    "
          >
            Convert to Deal
          </Button>
        </div>
      </div>
      <div
        className="
    flex-1
    min-w-0
    bg-gray-100
    dark:bg-gray-950
    p-4
    lg:p-6
  "
      >
        {/* Notes Activity Files */}
        <RightPanel></RightPanel>
      </div>
    </div>
  );
}
