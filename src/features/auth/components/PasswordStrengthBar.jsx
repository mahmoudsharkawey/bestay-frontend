import { useTranslation } from 'react-i18next'
import { getPasswordStrength } from '@/shared/utils/password'

export default function PasswordStrengthBar({ value }) {
  const { t } = useTranslation()
  const { strength } = getPasswordStrength(value)

  if (!strength) return null

  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-400">{t('auth.passwordStrength')}</span>
        <span className={`font-medium ${
          strength === 'strong' ? 'text-success' :
          strength === 'medium' ? 'text-orange' : 'text-danger'
        }`}>{t(`auth.${strength}`)}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${
          strength === 'strong' ? 'bg-success w-full' :
          strength === 'medium' ? 'bg-orange w-2/3' : 'bg-danger w-1/3'
        }`} />
      </div>
      <p className="text-xs text-slate-400 mt-1">
        {t('auth.passwordHint')}
      </p>
    </div>
  )
}
