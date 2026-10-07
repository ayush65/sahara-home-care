import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import { MotionProvider } from '@/components/motion'
import { EnquiryModal, FloatingActions } from '@/components/enquiry-modal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Sahara Home Care — Trusted Home Healthcare Services',
    template: '%s | Sahara Home Care',
  },
  description:
    'Sahara Home Care provides trained nurses, caregivers, attendants, elderly care, physiotherapy, doctor-on-call and critical care in the comfort of your home — 24/7.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0757B9',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable} bg-white`}>
      <body className="antialiased">
        <MotionProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <FloatingActions />
          <EnquiryModal />
        </MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
