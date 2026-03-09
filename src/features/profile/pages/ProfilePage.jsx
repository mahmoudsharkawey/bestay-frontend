import { useTranslation } from 'react-i18next'
import { Loader2, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { useProfileQuery } from '@/features/profile/hooks/useProfile'
import AvatarSection from '@/features/profile/components/AvatarSection'
import PersonalInfoSection from '@/features/profile/components/PersonalInfoSection'
import SecuritySection from '@/features/profile/components/SecuritySection'

export default function ProfilePage() {
  const { t } = useTranslation()
  const { data: user, isLoading, isError } = useProfileQuery()

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-orange" /></div>
  if (isError) return <div className="flex items-center justify-center min-h-[400px]"><p className="text-danger">{t('common.error')}</p></div>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div><h1 className="text-2xl font-bold text-navy">{t('profile.title')}</h1><p className="text-slate-500 text-sm mt-1">{t('profile.subtitle')}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center" style={{ boxShadow: '0 2px 12px rgba(27, 61, 111, 0.08)' }}>
            <AvatarSection currentPicture={user.picture} userName={user.name} />
            <h3 className="mt-4 font-semibold text-navy text-center">{user.name}</h3>
            <p className="text-xs text-orange font-medium mt-0.5">{user.role === 'LANDLORD' ? t('profile.landlord') : t('profile.student')} • {t('profile.verified')}</p>
            <p className="text-xs text-slate-400 mt-1">{t('profile.memberSince', { date: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) })}</p>
          </div>
          <div className="bg-success/10 rounded-2xl p-4"><p className="text-sm font-semibold text-success flex items-center gap-1.5">✅ {t('profile.identityVerified')}</p><p className="text-xs text-slate-500 mt-1">{t('profile.identityVerifiedSub')}</p></div>
        </div>
        <PersonalInfoSection user={user} />
      </div>
      <SecuritySection />
      <div className="bg-danger/5 rounded-2xl p-6 border border-danger/20">
        <h2 className="text-lg font-semibold text-danger mb-1">{t('profile.dangerZone')}</h2>
        <p className="text-sm text-orange mb-4">{t('profile.dangerZoneSub')}</p>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-navy">{t('profile.deleteAccount')}</p><p className="text-xs text-slate-400">{t('profile.deleteAccountSub')}</p></div>
          <Button variant="outline" className="border-danger text-danger hover:bg-danger hover:text-white rounded-lg text-sm font-semibold gap-2"><Trash2 className="h-4 w-4" />{t('profile.deleteAccount')}</Button>
        </div>
      </div>
    </motion.div>
  )
}
