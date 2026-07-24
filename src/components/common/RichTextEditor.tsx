"use client";

import {
  ChevronDown,
  FileText,
  Languages,
  Sparkles,
  SpellCheck2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import OpenAI from "openai";
import { Constant } from "../../utils/constant";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "../../ui/button";
import { Loader } from "./loader";
import { cn } from "../../utils/helper";
interface Props {
  value: string;
  onSave: () => void;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange, onSave }: Props) {
  const [loadingInfo, setLoadingInfo] = useState({ state: false, type: "" });

  //   const improveNote = async (type: "AI Improve" | "Summary") => {
  //     if (!value.trim()) return;

  //     setLoadingInfo({ state: true, type });

  //     try {
  //       const genAI = new GoogleGenerativeAI(Constant.keys.GEMINI_KEY);

  //       const model = genAI.getGenerativeModel({
  //         model: "gemini-3.1-flash-lite",
  //       });

  //       let prompt = "";

  //       switch (type) {
  //         case "AI Improve":
  //           prompt = `
  // You are a CRM writing assistant.

  // Your task is ONLY to improve the writing quality of the text.

  // Rules:
  // - Correct spelling and grammar.
  // - Improve readability.
  // - Preserve the original meaning.
  // - Do not change the intent.
  // - Do not summarize.
  // - Do not add explanations.
  // - Return ONLY the improved text.

  // Text:

  // ${value}
  // `;
  //           break;

  //         case "Summary":
  //           prompt = `
  // You are a CRM assistant.

  // Summarize the following note.

  // Rules:
  // - Correct spelling and grammar.
  // - Keep the important information.
  // - Remove unnecessary details.
  // - Do not add new information.
  // - Return ONLY the summary.

  // Text:

  // ${value}
  // `;
  //           break;
  //       }

  //       const result = await model.generateContent(prompt);

  //       onChange(result.response.text());
  //     } finally {
  //       setLoadingInfo({ state: false, type: "" });
  //     }
  //   };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],

        [{ header: [1, 2, 3, false] }],

        [{ list: "ordered" }, { list: "bullet" }],

        [{ align: [] }],

        [{ color: [] }, { background: [] }],

        ["blockquote"],

        ["link"],

        ["clean"],
      ],
    }),
    [],
  );

  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  return (
    <div className="rounded-[4px] overflow-hidden border border-gray-300">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />

      {/* Footer */}
      <div className="flex items-center justify-between  border-t bg-white px-4 py-3">
        {/* <div className="flex items-center gap-2">
          <button
            onClick={() => improveNote("AI Improve")}
            className={cn(
              "h-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-[12px] font-medium text-white shadow-sm transition hover:shadow-md",
              `${loadingInfo.state && loadingInfo.type === "AI improve" && "cursor-not-allowed opacity-50"}`,
            )}
          >
            {loadingInfo.state && loadingInfo.type === "AI improve" ? (
              <Loader isShowLoadingText={false} loaderSize={4} color={"#fff"} />
            ) : (
              <Sparkles size={14} />
            )}
            AI Improve
          </button>

          <button
            onClick={() => improveNote("Summary")}
            className={cn(
              "h-8 flex items-center gap-2 rounded-full border border-gray-200 bg-[#F8FAFC] px-4 py-2 text-[12px] font-medium text-gray-700 transition hover:bg-gray-100",
              `${loadingInfo.state && loadingInfo.type === "Summary" && "cursor-not-allowed opacity-50"}`,
            )}
          >
            {loadingInfo.state && loadingInfo.type === "Summary" ? (
              <Loader
                isShowLoadingText={false}
                loaderSize={4}
                color={"#374151"}
              />
            ) : (
              <FileText size={14} />
            )}
            Summarize
          </button>
        </div> */}

        <Button
          onClick={onSave}
          className="rounded-full bg-green-600 ml-auto hover:bg-green-700"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
