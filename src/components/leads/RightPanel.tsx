import {
  Calendar,
  Mail,
  Paperclip,
  FileText,
  X,
  Phone,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Link,
  AtSign,
  List,
  ListOrdered,
  AlignLeft,
  Strikethrough,
  Info,
  ChevronUp,
} from "lucide-react";

import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { useState } from "react";
import RichTextEditor from "../common/RichTextEditor";

export default function RightPanel() {
  const [showNotes, setShowNotes] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [showFiles, setShowFiles] = useState(true);
  const [value, setValue] = useState("");

  const [showHistory, setShowHistory] = useState(true);
  return (
    <div className="flex h-full flex-col bg-[#f5f5f6]">
      {/* Top */}
      <div className="rounded-[4px] bg-white border-b shadow-[0_0_1px_1px_rgb(0_0_0/5%),0_1px_2px_-2px_rgb(0_0_0/6%),0_1px_3px_0_rgb(0_0_0/7%)]">
        {/* Tabs */}
        <div className="flex items-center justify-between h-10 pr-4">
          <div className="flex h-full">
            <Tab active icon={<FileText size={14} />} title="Notes" />

            <Tab icon={<Calendar size={14} />} title="Activity" />

            <Tab icon={<Paperclip size={14} />} title="Files" />
          </div>

          <X className="h-4 w-4 cursor-pointer text-gray-500 " />
        </div>

        {/* Editor */}

        <div className="bg-[#FFF7D7] ">
          <div className="w-full ">
            <RichTextEditor value={value} onChange={setValue} />
          </div>
        </div>
      </div>

      {/* Scroll Area */}

      <div className="flex-1 overflow-y-auto  py-8">
        {/* Notes */}

        <div>
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className="mb-6 flex items-center gap-1 text-[16px] font-semibold"
          >
            Notes
            {showNotes ? (
              <ChevronUp size={16} className="mt-1" />
            ) : (
              <ChevronDown size={16} className="mt-1" />
            )}
          </button>

          {showNotes && (
            <div className="flex flex-col items-center">
              <h3 className="text-[16px] font-semibold">No notes yet</h3>

              <p className="mt-3 w-[300px] text-center text-[14px] text-gray-500">
                Notes will appear here.
              </p>
            </div>
          )}
        </div>
        <div className="mt-8">
          <button
            onClick={() => setShowActivity((prev) => !prev)}
            className="mb-6 flex items-center gap-1 text-[16px] font-semibold"
          >
            Activity
            {showActivity ? (
              <ChevronUp size={16} className="mt-1" />
            ) : (
              <ChevronDown size={16} className="mt-1" />
            )}
          </button>

          {showActivity && (
            <div className="flex flex-col items-center">
              <h3 className="text-[16px] font-semibold">No activities yet</h3>

              <p className="mt-3 w-[300px] text-center text-[14px] text-gray-500">
                Scheduled activities will appear here.
              </p>
            </div>
          )}
        </div>
        <div className="mt-8">
          <button
            onClick={() => setShowFiles((prev) => !prev)}
            className="mb-6 flex items-center gap-1 text-[16px] font-semibold"
          >
            Files
            {showFiles ? (
              <ChevronUp size={16} className="mt-1" />
            ) : (
              <ChevronDown size={16} className="mt-1" />
            )}
          </button>

          {showFiles && (
            <div className="flex flex-col items-center">
              <h3 className="text-[16px] font-semibold">No files yet</h3>

              <p className="mt-3 w-[300px] text-center text-[14px] text-gray-500">
                Uploaded files will appear here.
              </p>
            </div>
          )}
        </div>
        {/* History */}

        <div className="mt-6">
          <button
            onClick={() => setShowHistory((prev) => !prev)}
            className="mb-8 flex items-center gap-1 text-[16px] font-semibold"
          >
            History
            {showHistory ? (
              <ChevronUp size={16} className="mt-1" />
            ) : (
              <ChevronDown size={16} className="mt-1" />
            )}
          </button>
          {showHistory && (
            <div className="flex gap-4">
              <div className="h-4 w-4 rounded-full border-2 bg-white" />

              <div>
                <h4 className="font-medium text-[12px]">Lead created</h4>

                <p className="mt-1 text-gray-500  text-[12px]">
                  July 21, 2026 at 2:35 PM · Sakshi Tiwari
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Tab({
  icon,
  title,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex text-[14px] items-center gap-2 px-4 border-b-2 ${
        active
          ? "border-blue-600 text-blue-600 bg-[#eff6ff]"
          : "border-transparent text-gray-600 hover:text-black"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}
