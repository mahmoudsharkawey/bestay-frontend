import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2, Key, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { useChangePassword } from '@/features/profile/hooks/useProfile'

export default function SecuritySection() {
  const { t } = useTranslation()
  const [showForm, setShowForm] = useState(false)
  const { form, changePassword, isPending } = useChangePassword()

  const handleSubmit = (data) => {
    changePassword(data, { onSuccess: () => setShowForm(false) })
  }

  return (
    <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(27, 61, 111, 0.08)' }}>
      <h2 className="text-lg font-semibold text-navy mb-6">{t('profile.security')}</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Key className="h-4 w-4 text-slate-600" /></div>
            <div><p className="text-sm font-medium text-navy">{t('profile.passwordLabel')}</p><p className="text-xs text-slate-400">{t('profile.lastChanged')}</p></div>
          </div>
          <button type="button" onClick={() => setShowForm(!showForm)} className="text-sm font-medium text-slate-500 hover:text-navy border border-slate-200 px-4 py-1.5 rounded-lg">{t('profile.update')}</button>
        </div>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-2">
                <FormField control={form.control} name="oldPassword" render={({ field }) => (
                  <FormItem><FormLabel className="text-sm font-medium text-slate-700">{t('profile.currentPassword')}</FormLabel><FormControl><Input type="password" placeholder="••••••••" className="h-11 rounded-lg border-slate-200" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="newPassword" render={({ field }) => (
                  <FormItem><FormLabel className="text-sm font-medium text-slate-700">{t('profile.newPassword')}</FormLabel><FormControl><Input type="password" placeholder="••••••••" className="h-11 rounded-lg border-slate-200" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); form.reset() }} className="h-10 rounded-lg">{t('common.cancel')}</Button>
                  <Button type="submit" className="h-10 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{t('profile.updatePassword')}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Shield className="h-4 w-4 text-slate-600" /></div>
            <div><p className="text-sm font-medium text-navy">{t('profile.twoStep')}</p><p className="text-xs text-slate-400">{t('profile.twoStepSub')}</p></div>
          </div>
          <button type="button" className="text-sm font-medium text-slate-500 hover:text-navy border border-slate-200 px-4 py-1.5 rounded-lg">{t('profile.setup')}</button>
        </div>
      </div>
    </div>
  )
}
