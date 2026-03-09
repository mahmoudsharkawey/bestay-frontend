import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { I18nextProvider } from 'react-i18next'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { queryClient } from '@/shared/lib/queryClient'
import { router } from '@/app/router'
import { useUiStore } from '@/shared/stores/ui.store'
import i18n from '@/i18n'

export default function AppProviders() {
  const { language } = useUiStore()

  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', language)
    i18n.changeLanguage(language)
  }, [language])

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </I18nextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}
