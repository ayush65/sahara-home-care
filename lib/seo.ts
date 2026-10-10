export const siteConfig = {
  name: 'Sahara Home Health Care',
  tagline: 'Compassionate care, in the comfort of home.',
  description:
    'Sahara Home Health Care provides trained nurses, caregivers, attendants, elderly care, physiotherapy, doctor-on-call and critical care in the comfort of your home — 24/7.',
  url: 'https://sahara-home-care.vercel.app',
  ogImage: '/og-image.jpg',
  phone: '+91 97381 53548',
  phoneHref: 'tel:+919738153548',
  whatsapp: '919738153548',
  email: 'Saharahomehealthcareservice@gmail.com',
  address: 'Serving families across the city & nearby areas',
  hours: 'Available 24 hours, 7 days a week',
  locale: 'en_IN',
} as const

export const seo = {
  titleTemplate: '%s | Sahara Home Health Care',
  defaultTitle: 'Sahara Home Health Care — Trusted Home Healthcare Services',
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
