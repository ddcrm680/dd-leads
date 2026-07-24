"use client";

import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormProp, leadFormType } from "../../types/leads.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Constant } from "../../utils/constant";
import { leadSchema } from "../../schema/leads.schema";
import { Building, Info, Trash2, User } from "lucide-react";
import { cn } from "../../utils/helper";
import { RequiredMark } from "../../ui/RequiredMark";

export default function LeadForm({
  mode,
  id,
  onClose,
  initialValues,
  isLoading = false,
  onSubmit,
}: LeadFormProp) {
  const form = useForm<leadFormType>({
    resolver: zodResolver(leadSchema(mode)),
    defaultValues: {
      contactPerson: "",
      organization: "",
      title: "",
      currency: "",
      value: "",
      owner: "",
      closeDate: "",
      sourceChannel: "",
      sourceChannelId: "",
      phone: [
        {
          value: "",
          type: "Work",
        },
      ],

      email: [
        {
          value: "",
          type: "Work",
        },
      ],
      address: "",
    },
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: "phone",
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: "email",
  });
  const contactPerson = form.watch("contactPerson");
  const organization = form.watch("organization");

  const personDisabled = !contactPerson?.trim() && !organization?.trim();
  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit((values) =>
          onSubmit(values, form.setError),
        )}
        className="flex flex-col"
      >
        {/* Body */}
        <div className="   space-y-3 max-h-[60vh]  overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* LEFT */}
            <div className="sm:border-r border-b border-gray-200 px-4 py-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.contactPerson}
                        <RequiredMark show />
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                          <Input
                            {...field}
                            className={cn(
                              "h-8 pl-10 rounded-[4px] bg-white shadow-none",
                              fieldState.error
                                ? "border-red-700 text-red-700 focus-visible:ring-red-700"
                                : "border-[#D1D5DB] focus-visible:ring-blue-500",
                            )}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.org}
                        <RequiredMark show />
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                          <Input
                            {...field}
                            className={cn(
                              "h-8 pl-10 rounded-[4px] bg-white shadow-none",
                              fieldState.error
                                ? "border-red-700 text-red-700 focus-visible:ring-red-700"
                                : "border-[#D1D5DB] focus-visible:ring-blue-500",
                            )}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.title}
                        <RequiredMark show />
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className={cn(
                              "h-8 pl-3 rounded-[4px] bg-white shadow-none",
                              fieldState.error
                                ? "border-red-700 text-red-700 focus-visible:ring-red-700"
                                : "border-[#D1D5DB] focus-visible:ring-blue-500",
                            )}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.value}
                      </FormLabel>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Amount */}
                        <FormField
                          control={form.control}
                          name="value"
                          render={({ field }) => (
                            <FormControl>
                              <Input
                                {...field}
                                className="h-8 pl-3 rounded-[4px] bg-white border-[#D1D5DB] shadow-none focus-visible:ring-1 focus-visible:ring-blue-500"
                              />
                            </FormControl>
                          )}
                        />

                        {/* Currency */}
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormControl>
                              <select
                                {...field}
                                className="h-8 w-full rounded-[4px] border border-input bg-white px-3 text-sm"
                              >
                                <option value="INR">Indian Rupee (₹)</option>
                                <option value="USD">US Dollar ($)</option>
                                <option value="EUR">Euro (€)</option>
                                <option value="GBP">British Pound (£)</option>
                              </select>
                            </FormControl>
                          )}
                        />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="label"
                  disabled={mode === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.label}
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-8 rounded-[4px] bg-white border-[#D1D5DB] border border-input px-3 text-sm focus:ring-2 focus:ring-ring"
                        >
                          {[
                            {
                              name: "Hot",
                              value: "hot",
                              id: 1,
                            },
                          ].map((r) => (
                            <option key={r.id} value={Number(r.id)}>
                              {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.owner}
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-8 rounded-[4px] bg-white border-[#D1D5DB] border border-input px-3 text-sm focus:ring-2 focus:ring-ring"
                        >
                          {[
                            {
                              name: "Sakshi Tiwari (You)",
                              value: "sakshi",
                              id: 1,
                            },
                          ].map((r) => (
                            <option key={r.id} value={Number(r.id)}>
                              {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="closeDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.closeDate}
                      </FormLabel>

                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            type="date"
                            className="h-8 pl-3 w-full rounded-[4px] bg-white border-[#D1D5DB] shadow-none focus-visible:ring-1 focus-visible:ring-blue-500"
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sourceChannel"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.sourceChannel}
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <select
                            {...field}
                            className="w-full h-8 rounded-[4px] bg-white border-[#D1D5DB] border border-input px-3 text-sm focus:ring-2 focus:ring-ring"
                          >
                            {[].map((r: any) => (
                              <option key={r.id} value={Number(r.id)}>
                                {r.name.charAt(0).toUpperCase() +
                                  r.name.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sourceChannelId"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                        {Constant.leads.sourceChannelId}
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className="h-8 pl-3 rounded-[4px] bg-white border-[#D1D5DB] shadow-none focus-visible:ring-1 focus-visible:ring-blue-500"
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* RIGHT */}
            <div className={cn("px-4 py-4 flex flex-col gap-3")}>
              {" "}
              <div className="flex items-center gap-3 ">
                <div className="text-[11px] font-semibold tracking-widest text-black">
                  PERSON
                </div>

                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div
                className={cn(
                  "space-y-2",
                  personDisabled && "opacity-50 pointer-events-none",
                )}
              >
                <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                  Phone
                </FormLabel>

                {phoneFields.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_1fr_28px] gap-2 items-center"
                  >
                    <FormField
                      control={form.control}
                      name={`phone.${index}.value`}
                      render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                  );
                                  field.onChange(value);
                                }}
                                className={cn(
                                  "h-8 pl-3 rounded-[4px] bg-white shadow-none",
                                  fieldState.error
                                    ? "border-red-700 text-red-700 focus-visible:ring-red-700"
                                    : "border-[#D1D5DB] focus-visible:ring-blue-500",
                                )}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`phone.${index}.type`}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full h-8 rounded-[4px] bg-white border-[#D1D5DB] border border-input px-3 text-sm focus:ring-2 focus:ring-ring"
                        >
                          {" "}
                          <option>Work</option>
                          <option>Mobile</option>
                          <option>Home</option>
                        </select>
                      )}
                    />

                    <Trash2
                      onClick={() => removePhone(index)}
                      className={cn(
                        "h-4 w-4  cursor-pointer",
                        !personDisabled ? "text-black" : "text-gray-500",
                      )}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendPhone({
                      value: "",
                      type: "Work",
                    })
                  }
                  className="text-blue-600 text-[14px] font-medium"
                >
                  + Add phone
                </button>
              </div>
              <div
                className={cn(
                  "space-y-2",
                  personDisabled && "opacity-50 pointer-events-none",
                )}
              >
                <FormLabel className="flex items-center gap-1 text-[14px] font-normal text-[#4F5B6A]">
                  Email
                </FormLabel>

                {phoneFields.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_1fr_28px] gap-2 items-center"
                  >
                    <FormField
                      control={form.control}
                      name={`email.${index}.value`}
                      render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                className={cn(
                                  "h-8 pl-3 rounded-[4px] bg-white shadow-none",
                                  fieldState.error
                                    ? "border-red-700 text-red-700 focus-visible:ring-red-700"
                                    : "border-[#D1D5DB] focus-visible:ring-blue-500",
                                )}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`email.${index}.type`}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full h-8 rounded-[4px] bg-white border-[#D1D5DB] border border-input px-3 text-sm focus:ring-2 focus:ring-ring"
                        >
                          {" "}
                          <option>Work</option>
                          <option>Mobile</option>
                          <option>Home</option>
                        </select>
                      )}
                    />

                    <Trash2
                      onClick={() => removeEmail(index)}
                      className={cn(
                        "h-4 w-4  cursor-pointer",
                        !personDisabled ? "text-black" : "text-gray-500",
                      )}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendEmail({
                      value: "",
                      type: "Work",
                    })
                  }
                  className="text-blue-600 text-[14px] font-medium"
                >
                  + Add email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t bg-[#f5f5f6] p-4 flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            type="button"
            className="rounded-[4px] "
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className=" rounded-[4px] bg-green-600 hover:bg-green-700"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
