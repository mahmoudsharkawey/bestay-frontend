import { Link } from "react-router-dom";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

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
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useUiStore } from "@/shared/stores/ui.store";

export default function LoginPage() {
  const {
    form,
    signIn,
    isPending,
    showPassword,
    setShowPassword,
    handleGoogleSuccess,
    t,
  } = useLogin();

  const rtl = useUiStore((state) => state.language === "ar");
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div
          className="bg-white rounded-2xl p-8 md:p-10"
          style={{ boxShadow: "0 4px 24px rgba(27, 61, 111, 0.10)" }}
        >
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={false} link={false} />
          </div>

          <h1 className="text-2xl font-bold text-navy text-center mb-1">
            {t("auth.welcomeBack")}
          </h1>
          <p className="text-slate-500 text-sm text-center mb-8">
            {t("auth.welcomeBackSub")}
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => signIn(data))}
              className="space-y-4"
            >
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
                          placeholder="mahmood.sharkawey@gmail.com"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-orange focus:ring-orange"
                  />
                  {t("auth.rememberMe")}
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-orange hover:text-orange-hover"
                >
                  {t("auth.forgotPassword")}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm"
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("auth.login")}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400">
                {t("common.or")}
              </span>
            </div>
          </div>

          <div className="flex justify-center posision">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error(t("auth.loginFailed"))}
              text={t("auth.loginWithGoogle")}
              shape="circle"
              size="large"
              className="w-full h-11 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm"
            />
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            {t("auth.dontHaveAccount")}{" "}
            <Link
              to="/register"
              className="font-semibold text-orange hover:text-orange-hover"
            >
              {t("nav.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
