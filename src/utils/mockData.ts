import {
  CalendarDays,
  CircleDollarSign,
  Flag,
  Link2,
  Tag,
  User,
  Building2,
  Phone,
  Mail,
  ArrowRightLeft,
  Hash,
} from "lucide-react";
import { InfoProps } from "../types/leads.type";
export const leadList = {
  data: [
    {
      id: 1,

      // Person
      contactPerson: "John Doe",
      phone: "+91 9876543210",
      phoneType: "Work",
      email: "john@abc.com",
      emailType: "Work",

      // Lead
      title: "ABC Technologies ERP Project",
      organization: "ABC Technologies",

      value: 500000,
      currency: "INR",

      labels: "Hot",

      owner: "Sakshi",

      expectedCloseDate: "2026-08-15",

      sourceChannel: "Website",
      sourceChannelId: "WEB-1001",

      nextActivity: "No activity",

      sourceOrigin: "Manually created",

      leadCreated: "2026-07-22T14:39:00",

      status: "Open",
    },

    {
      id: 2,
      contactPerson: "Rahul Sharma",
      phone: "+91 9999999999",
      phoneType: "Mobile",
      email: "rahul@gmail.com",
      emailType: "Personal",

      title: "CRM Implementation",

      organization: "TechNova Solutions",

      value: 220000,
      currency: "INR",

      labels: "Warm",

      owner: "Rahul",

      expectedCloseDate: "2026-08-01",

      sourceChannel: "LinkedIn",
      sourceChannelId: "LN-202",

      nextActivity: "Follow up",

      sourceOrigin: "LinkedIn",

      leadCreated: "2026-07-20T11:20:00",

      status: "Qualified",
    },
  ],

  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 2,
    has_next: false,
  },
};
// dummyLead.ts

export const dummyLead: {
  title: string;
  details: InfoProps[];
  person: InfoProps[];
  organization: InfoProps[];
} = {
  title: "Yhhhh",

  details: [
    {
      id: "contactPerson",
      label: "Contact Person",
      value: "Sakshi Tiwari",
      type: "text",
      icon: User,
    },
    {
      id: "title",
      label: "Title",
      value: "Lead 1",
      type: "text",
      icon: User,
    },
    {
      id: "label",
      label: "Labels",
      value: "Hot",
      type: "select",
      icon: Tag,
      options: [
        { label: "Hot", value: "Hot" },
        { label: "Warm", value: "Warm" },
        { label: "Cold", value: "Cold" },
      ],
    },
    {
      id: "value",
      label: "Value",
      value: 25000,
      currency: "INR",
      type: "currency",
      icon: CircleDollarSign,
    },
    {
      id: "owner",
      label: "Owner",
      value: "Sakshi Tiwari",
      type: "text",
      icon: User,
    },
    {
      id: "closeDate",
      label: "Expected close date",
      value: "2026-07-30",
      type: "date",
      icon: CalendarDays,
    },
    {
      id: "sourceChannel",
      label: "Source channel",
      value: "LinkedIn",
      type: "text",
      icon: ArrowRightLeft,
    },
    {
      id: "sourceChannelId",
      label: "Source channel ID",
      value: "LN-10294",
      type: "text",
      icon: Hash,
    },
  ],

  person: [
    {
      id: "email",
      label: "Email",
      value: "hhh@gmail.com",
      type: "text",
      icon: Mail,
    },
    {
      id: "phone",
      label: "Phone",
      value: "+91 9876543210",
      type: "text",
      icon: Phone,
    },
  ],

  organization: [
    {
      id: "organization",
      label: "Organization",
      value: "OpenAI",
      type: "text",
      icon: Building2,
    },
  ],
};
