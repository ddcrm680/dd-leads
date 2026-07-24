import { LayoutDashboard, Users } from "lucide-react";

export const menus = [
  {
    name: "Dashboard",
    path: "/home",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    path: "/leads",
    icon: Users,
  },
];
export const Constant = {
  keys: {
    GEMINI_KEY: process.env.REACT_GEMINI_KEY,
  },
  leads: {
    contactPerson: "Contact person",
    org: "Organization",
    title: "Title",
    value: "Value",
    owner: "Owner",
    label: "Labels",
    closeDate: "Expected close date",
    sourceChannel: "Source channel",
    sourceChannelId: "Source channel ID",
  },
};

export const variants = {
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },

  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },

  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },

  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
};

export const position = {
  right: "top-0 right-0 h-full",
  left: "top-0 left-0 h-full",
  top: "top-0 left-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};
