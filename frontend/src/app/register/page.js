"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Please enter your organization name"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register: signup } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await signup(data.name, data.email, data.password, data.company);
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setErrorMsg(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 p-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-7 shadow-card flex flex-col gap-6"
      >
        <div className="flex flex-col items-center text-center gap-1">
          <div className="w-9 h-9 rounded-lg bg-teal-650 flex items-center justify-center text-white font-bold text-base mb-2">V</div>
          <h2 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50">Create workspace</h2>
          <p className="text-[13px] text-stone-400 dark:text-stone-500">Set up AI auditing for your team</p>
        </div>

        {errorMsg && (
          <div className="p-3 border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-950/20 rounded-lg text-[13px] text-red-600 dark:text-red-400 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <Input id="name" label="Full Name" placeholder="Sarah Chen" error={errors.name} {...register("name")} />
          <Input id="email" type="email" label="Email" placeholder="sarah@company.com" error={errors.email} {...register("email")} />
          <Input id="company" label="Company" placeholder="Acme Corp" error={errors.company} {...register("company")} />
          <Input id="password" type="password" label="Password" placeholder="••••••••" error={errors.password} {...register("password")} />
          <Button type="submit" className="w-full" loading={loading}>
            Create workspace<ArrowRight size={14} className="ml-1" />
          </Button>
        </form>

        <div className="text-center text-[13px] border-t border-stone-100 dark:border-stone-800 pt-4">
          <span className="text-stone-400 dark:text-stone-500">
            Already have an account?{" "}
            <Link href={ROUTES.LOGIN} className="text-teal-650 dark:text-teal-400 font-medium hover:underline">Sign in</Link>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
