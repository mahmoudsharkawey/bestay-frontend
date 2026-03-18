import { Link } from "react-router-dom";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Home,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import Logo from "@/shared/components/layout/Logo";
import PasswordStrengthBar from "@/features/auth/components/PasswordStrengthBar";
import { useRegister } from "@/features/auth/hooks/useRegister";

export default function RegisterPage() {
  const {
    form,
    signUp,
    isPending,
    step,
    setStep,
    showPassword,
    setShowPassword,
    handleNextStep,
    selectedRole,
    t,
  } = useRegister();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <Logo size="sm" />
        <div className="text-sm text-slate-500">
          {t("auth.alreadyMember")}{" "}
          <Link to="/login" className="font-semibold text-navy hover:underline">
            {t("auth.login")}
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto pt-8 px-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-slate-500">
            {t("auth.step", { current: step, total: 2 })}
          </span>
          <span className="text-sm text-slate-400">
            {step === 1 ? t("auth.accountInfo") : t("auth.roleSelection")}
          </span>
        </div>
        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy rounded-full transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div className="max-w-md mx-auto mt-8 px-4 pb-12">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-8"
              style={{ boxShadow: "0 4px 24px rgba(27, 61, 111, 0.10)" }}
            >
              <h1 className="text-2xl font-bold text-navy mb-1">
                {t("auth.createAccountTitle")}
              </h1>
              <p className="text-slate-500 text-sm mb-6">
                {t("auth.createAccountSub")}
              </p>
              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {t("auth.fullName")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              placeholder="John Doe"
                              className="pl-10 h-11 rounded-lg border-slate-200"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {t("auth.email")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10 h-11 rounded-lg border-slate-200"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {t("auth.phone")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              className="pl-10 h-11 rounded-lg border-slate-200"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {t("auth.password")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10 h-11 rounded-lg border-slate-200"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <PasswordStrengthBar value={field.value} />
                        <FormMessage />
                        <p className="text-xs text-slate-500">
                          {t("auth.passwordMustContain")}
                        </p>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full h-11 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm gap-2"
                  >
                    {t("auth.next")} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-8"
              style={{ boxShadow: "0 4px 24px rgba(27, 61, 111, 0.10)" }}
            >
              <h1 className="text-2xl font-bold text-navy text-center mb-1">
                {t("auth.iAmA")}
              </h1>
              <p className="text-slate-500 text-sm text-center mb-8">
                {t("auth.selectRoleSub")}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => form.setValue("role", "USER")}
                  className={`relative rounded-xl border-2 p-6 text-center transition-all ${selectedRole === "USER" ? "border-navy bg-navy/5" : "border-slate-200 hover:border-slate-300"}`}
                >
                  {selectedRole === "USER" && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-navy rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                  <GraduationCap className="h-8 w-8 mx-auto mb-3 text-navy" />
                  <p className="font-semibold text-navy text-sm">
                    {t("auth.studentExpat")}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {t("auth.studentExpatDesc")}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => form.setValue("role", "LANDLORD")}
                  className={`relative rounded-xl border-2 p-6 text-center transition-all ${selectedRole === "LANDLORD" ? "border-navy bg-navy/5" : "border-slate-200 hover:border-slate-300"}`}
                >
                  {selectedRole === "LANDLORD" && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-navy rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                  <Home className="h-8 w-8 mx-auto mb-3 text-orange" />
                  <p className="font-semibold text-navy text-sm">
                    {t("auth.landlord")}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {t("auth.landlordDesc")}
                  </p>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-11 rounded-lg border-slate-200 text-slate-600 gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> {t("common.back")}
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit((data) => signUp(data))}
                  className="flex-1 h-11 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm gap-2"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("auth.createAccount")} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-center mt-6 text-xs text-slate-400">
          {t("common.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </div>
  );
}
