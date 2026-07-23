"use client";

import { useMemo, useState } from "react";
import ReactQuill from "react-quill-new";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
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
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder="Write notes..."
    />
  );
}
