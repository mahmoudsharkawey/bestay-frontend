import { useTranslation } from 'react-i18next'
import { Loader2, Lock } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { useUpdateProfile, useProfileForm } from '@/features/profile/hooks/useProfile'

export default function PersonalInfoSection({ user }) {
  const { t } = useTranslation()
  const { form, isEditing, setIsEditing } = useProfileForm(user)
  const { mutate: updateMe, isPending } = useUpdateProfile()

  const handleSave = (data) => {
    updateMe(data, { onSuccess: () => setIsEditing(false) })
  }

  return (
    <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(27, 61, 111, 0.08)' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-navy">{t('profile.personalInfo')}</h2>
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} className="text-sm font-medium text-orange hover:text-orange-hover">{t('common.edit')}</button>
        )}
      </div>

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel className="text-sm font-medium text-slate-700">{t('profile.fullName')}</FormLabel><FormControl><Input className="h-11 rounded-lg border-slate-200" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel className="text-sm font-medium text-slate-700">{t('profile.phoneNumber')}</FormLabel><FormControl><Input type="tel" className="h-11 rounded-lg border-slate-200" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => { setIsEditing(false); form.reset() }} className="h-10 rounded-lg border-slate-200 text-slate-600">{t('common.cancel')}</Button>
              <Button type="submit" className="h-10 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{t('common.saveChanges')}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-slate-500">{t('profile.fullName')}</label><p className="mt-1 h-11 flex items-center px-3 rounded-lg bg-slate-50 border border-slate-100 text-sm text-navy font-medium">{user.name}</p></div>
            <div><label className="text-sm font-medium text-slate-500">{t('profile.phoneNumber')}</label><p className="mt-1 h-11 flex items-center px-3 rounded-lg bg-slate-50 border border-slate-100 text-sm text-navy font-medium">{user.phone || '—'}</p></div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-500">{t('profile.emailAddress')} <span className="text-xs text-slate-400 ml-1">{t('profile.readOnly')}</span></label>
            <div className="mt-1 h-11 flex items-center justify-between px-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-sm text-navy font-medium">{user.email}</span>
              <Lock className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">{t('profile.emailHint')}</p>
          </div>
        </>
      )}
    </div>
  )
}
