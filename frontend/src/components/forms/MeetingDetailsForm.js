"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LANGUAGES, COMPLIANCE_FRAMEWORKS, COUNTRIES } from "../../constants";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(1, "Please select a country"),
  complianceFramework: z.string().min(1, "Please select a compliance framework"),
  language: z.string().min(1, "Please select a recording language"),
  date: z.string().refine(val => !isNaN(new Date(val).getTime()), "Invalid date"),
});

export function MeetingDetailsForm({ onSubmit, loading, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      title: "",
      company: "",
      country: "US",
      complianceFramework: "GDPR",
      language: "en-US",
      date: new Date().toISOString().split("T")[0]
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        id="title"
        label="Meeting Title"
        placeholder="e.g. Q3 Financial Performance Review"
        error={errors.title}
        {...register("title")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="company"
          label="Company / Enterprise"
          placeholder="e.g. Aether Technologies"
          error={errors.company}
          {...register("company")}
        />

        <Input
          id="date"
          type="date"
          label="Meeting Date"
          error={errors.date}
          {...register("date")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Country Select */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="country" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Jurisdiction / Country
          </label>
          <select
            id="country"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-450 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm cursor-pointer"
            {...register("country")}
          >
            {COUNTRIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.country && <span className="text-xs text-red-500 font-medium">{errors.country.message}</span>}
        </div>

        {/* Compliance Select */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="complianceFramework" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Compliance Target
          </label>
          <select
            id="complianceFramework"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-450 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm cursor-pointer"
            {...register("complianceFramework")}
          >
            {COMPLIANCE_FRAMEWORKS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          {errors.complianceFramework && <span className="text-xs text-red-500 font-medium">{errors.complianceFramework.message}</span>}
        </div>

        {/* Language Select */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="language" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Audio Language
          </label>
          <select
            id="language"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-450 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm cursor-pointer"
            {...register("language")}
          >
            {LANGUAGES.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          {errors.language && <span className="text-xs text-red-500 font-medium">{errors.language.message}</span>}
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          Initiate AI Pipeline
        </Button>
      </div>
    </form>
  );
}

export default MeetingDetailsForm;
