import { Link } from 'react-router-dom'
import { Loader2, ShieldCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useVerifyResetCode } from '@/features/auth/hooks/useVerifyResetCode'

export default function VerifyResetCodePage() {
  const { code, handleChange, handleKeyDown, handlePaste, inputRefs, countdown, verify, resend, isPending, isFull, email, t } = useVerifyResetCode()

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 md:p-10" style={{ boxShadow: '0 4px 24px rgba(27, 61, 111, 0.10)' }}>
          <div className="flex justify-center mb-6"><div className="w-16 h-16 rounded-full bg-orange-light flex items-center justify-center"><ShieldCheck className="h-7 w-7 text-orange" /></div></div>
          <h1 className="text-2xl font-bold text-navy text-center mb-1">{t('auth.verifyCodeTitle')}</h1>
          <p className="text-slate-500 text-sm text-center mb-8">{t('auth.verifyCodeSub')}{' '}<span className="font-semibold text-navy">{email}</span></p>
          <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input key={i} ref={(el) => (inputRefs.current[i] = el)} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)} className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-colors outline-none ${digit ? 'border-navy bg-navy/5 text-navy' : 'border-slate-200 text-slate-600'} focus:border-orange focus:ring-2 focus:ring-orange/20`} />
            ))}
          </div>
          <Button onClick={() => verify()} className="w-full h-11 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold text-sm" disabled={!isFull || isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{t('auth.verifyCode')}
          </Button>
          <div className="text-center mt-5"><p className="text-sm text-slate-500">{t('auth.didntReceive')}{' '}{countdown > 0 ? <span className="text-slate-400">{t('auth.resendIn', { seconds: countdown })}</span> : <button onClick={() => resend()} className="font-semibold text-orange hover:text-orange-hover">{t('auth.resendCode')}</button>}</p></div>
          <div className="text-center mt-6"><Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy transition-colors"><ArrowLeft className="h-4 w-4" /> {t('auth.backToLogin')}</Link></div>
          <p className="text-center text-xs text-slate-400 mt-6">🔒 {t('auth.securedBy')}</p>
        </div>
      </div>
    </div>
  )
}
