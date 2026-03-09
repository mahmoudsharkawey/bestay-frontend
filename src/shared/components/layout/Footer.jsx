import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from '@/shared/components/layout/Logo'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo size="lg" showText={false} link={false} />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              <li><Link to="/units" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.findHousing')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.universities')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.helpCenter')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.safety')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.cancellationPolicy')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.reportIssue')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.termsOfService')}</Link></li>
              <li><Link to="/" className="text-slate-300 text-sm hover:text-orange transition-colors">{t('footer.sitemap')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-xs">
            {t('common.copyright', { year })}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-400 text-xs hover:text-orange transition-colors">{t('common.privacy')}</Link>
            <Link to="/" className="text-slate-400 text-xs hover:text-orange transition-colors">{t('common.terms')}</Link>
            <Link to="/" className="text-slate-400 text-xs hover:text-orange transition-colors">{t('common.sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
