"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronDown } from "lucide-react";
import { LANGUAGES, COMPLIANCE_FRAMEWORKS, COUNTRIES } from "../../constants";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(1, "Please select a country"),
  complianceFramework: z.string().min(1, "Please select a framework"),
  language: z.string().min(1, "Please select a language"),
  date: z.string().refine(val => !isNaN(new Date(val).getTime()), "Invalid date"),
});

const selectStyles = "w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 dark:focus:ring-teal-400/20 dark:focus:border-teal-400 transition-colors cursor-pointer appearance-none";

export function MeetingDetailsForm({ onSubmit, loading, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      title: "", company: "", country: "US", complianceFramework: "GDPR", language: "en-US",
      date: new Date().toISOString().split("T")[0]
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input id="title" label="Meeting Title" placeholder="Q3 Financial Review" error={errors.title} {...register("title")} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input id="company" label="Company" placeholder="Acme Corp" error={errors.company} {...register("company")} />
        <Input id="date" type="date" label="Date" error={errors.date} {...register("date")} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="country" className="text-[13px] font-medium text-stone-600 dark:text-stone-400">Country</label>
          <div className="relative">
            <select id="country" className={selectStyles} {...register("country")}>
              {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
          {errors.country && <span className="text-[13px] text-red-500 font-medium">{errors.country.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="complianceFramework" className="text-[13px] font-medium text-stone-600 dark:text-stone-400">Framework</label>
          <div className="relative">
            <select id="complianceFramework" className={selectStyles} {...register("complianceFramework")}>
              {COMPLIANCE_FRAMEWORKS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
          {errors.complianceFramework && <span className="text-[13px] text-red-500 font-medium">{errors.complianceFramework.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="language" className="text-[13px] font-medium text-stone-600 dark:text-stone-400">Language</label>
          <div className="relative">
            <select id="language" className={selectStyles} {...register("language")}>
              {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
          {errors.language && <span className="text-[13px] text-red-500 font-medium">{errors.language.message}</span>}
        </div>
      </div>
      <div className="pt-1">
        <Button type="submit" className="w-full" loading={loading}>Begin Audit</Button>
      </div>
    </form>
  );
}

export default MeetingDetailsForm;
