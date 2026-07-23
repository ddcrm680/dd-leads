import { MoreHorizontal, Trash2 } from "lucide-react";
import { dummyLead } from "../../utils/mockData";
import { Section } from "./Section";
import { InfoRow } from "./InfoRow";
import { useState } from "react";
import { InfoProps } from "../../types/leads.type";
import { Button } from "../../ui/button";
import RightPanel from "./RightPanel";

export default function ViewEditContent() {
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
    <div className="flex h-full">
      <div className="w-[320px] border-r bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b shrink-0">
          <h2 className="text-lg font-semibold">{lead.title}</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Section title="DETAILS">{renderRows(lead.details)}</Section>

          <Section title="PERSON">{renderRows(lead.person)}</Section>

          <Section title="ORGANIZATION">
            {renderRows(lead.organization)}
          </Section>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t bg-white px-4 py-3 flex items-center justify-between">
          <Trash2
            //   onClick={() => removePhone(index)}
            className="h-4 w-4 text-gray-600 hover:text-black cursor-pointer"
          />

          <Button className=" rounded-[4px] bg-green-600 hover:bg-green-700">
            Convert to Deal
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-[#f5f5f6] p-6">
        {/* Notes Activity Files */}
        <RightPanel></RightPanel>
      </div>
    </div>
  );
}
