export const siteConfig = {
  name: 'Sahara Home Care',
  tagline: 'Compassionate care, in the comfort of home.',
  description:
    'Sahara Home Care provides trained nurses, caregivers, attendants, elderly care, physiotherapy, doctor-on-call and critical care in the comfort of your home — 24/7.',
  url: 'https://sahara-home-care.vercel.app',
  ogImage: '/og-image.jpg',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsapp: '919876543210',
  email: 'care@saharahomecare.in',
  address: 'Serving families across the city & nearby areas',
  hours: 'Available 24 hours, 7 days a week',
  locale: 'en_IN',
  twitter: '@saharahomecare',
} as const

export const seo = {
  titleTemplate: '%s | Sahara Home Care',
  defaultTitle: 'Sahara Home Care — Trusted Home Healthcare Services',
  defaultDescription: siteConfig.description,
  keywords: [
    'home nursing services',
    'patient attendant',
    'caregiver at home',
    'elderly care at home',
    'post-hospitalization care',
    'home healthcare',
    'physiotherapy at home',
    'doctor on call',
    'bedridden patient care',
    '24/7 home care',
  ],
} as const
