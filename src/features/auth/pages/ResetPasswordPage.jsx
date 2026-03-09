import { Link } from 'react-router-dom'
import { Loader2, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import PasswordStrengthBar from '@/features/auth/components/PasswordStrengthBar'
import { useResetPassword } from '@/features/auth/hooks/useResetPassword'

export default function ResetPasswordPage() {
  const { form, resetPassword, isPending, showPassword, setShowPassword, t } = useResetPassword()

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 md:p-10" style={{ boxShadow: '0 4px 24px rgba(27, 61, 111, 0.10)' }}>
          <div className="flex justify-center mb-6"><div className="w-16 h-16 rounded-full bg-orange-light flex items-center justify-center"><Lock className="h-7 w-7 text-orange" /></div></div>
          <h1 className="text-2xl font-bold text-navy text-center mb-1">{t('auth.resetPasswordTitle')}</h1>
          <p className="text-slate-500 text-sm text-center mb-8">{t('auth.resetPasswordSub')}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => resetPassword(data))} className="space-y-4">
              <FormField control={form.control} name="newPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">{t('auth.newPassword')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10 h-11 rounded-lg border-slate-200" {...field} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <PasswordStrengthBar value={field.value} />
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full h-11 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{t('auth.resetPassword')}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-6"><Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy transition-colors"><ArrowLeft className="h-4 w-4" /> {t('auth.backToLogin')}</Link></div>
        </div>
      </div>
    </div>
  )
}
