"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid corporate email address"),
  company: z.string().min(2, "Please enter your organization name"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register: signup } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4 select-none">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-650 flex items-center justify-center text-white font-bold text-xl shadow-md">
            V
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-3">
            Create corporate workspace
          </h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Set up automatic AI auditing for your team
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 border border-red-200 bg-red-50/50 rounded-xl text-xs text-red-650 font-semibold dark:bg-red-950/20 dark:border-red-900/40">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="name"
            label="Full Name"
            placeholder="Sarah Chen"
            error={errors.name}
            {...register("name")}
          />

          <Input
            id="email"
            type="email"
            label="Corporate Email"
            placeholder="sarah.chen@globalfinance.com"
            error={errors.email}
            {...register("email")}
          />

          <Input
            id="company"
            label="Enterprise / Company"
            placeholder="Global Finance Corp"
            error={errors.company}
            {...register("company")}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            error={errors.password}
            {...register("password")}
          />

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            <span>Create Workspace</span>
            <ArrowRight size={15} className="ml-2" />
          </Button>
        </form>

        <div className="text-center text-xs border-t border-zinc-100 dark:border-zinc-900 pt-4">
          <span className="text-zinc-400 dark:text-zinc-500">
            Already have an enterprise account?{" "}
            <Link href={ROUTES.LOGIN} className="text-indigo-600 font-bold hover:underline">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
