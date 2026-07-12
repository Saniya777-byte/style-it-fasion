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
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await login(data.email, data.password);
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setErrorMsg(err.message || "Invalid credentials.");
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
          <h2 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50">Welcome back</h2>
          <p className="text-[13px] text-stone-400 dark:text-stone-500">Sign in to your Veritas workspace</p>
        </div>

        {errorMsg && (
          <div className="p-3 border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-950/20 rounded-lg text-[13px] text-red-600 dark:text-red-400 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input id="email" type="email" label="Email" placeholder="name@company.com" error={errors.email} {...register("email")} />
          <Input id="password" type="password" label="Password" placeholder="••••••••" error={errors.password} {...register("password")} />
          <Button type="submit" className="w-full" loading={loading}>
            Sign in<ArrowRight size={14} className="ml-1" />
          </Button>
        </form>

        <div className="text-center text-[13px] border-t border-stone-100 dark:border-stone-800 pt-4 flex flex-col gap-2">
          <span className="text-stone-400 dark:text-stone-500">
            Don't have an account?{" "}
            <Link href={ROUTES.REGISTER} className="text-teal-650 dark:text-teal-400 font-medium hover:underline">Create one</Link>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
