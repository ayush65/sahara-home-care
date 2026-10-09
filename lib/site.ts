import {
  Accessibility,
  Activity,
  Baby,
  Brain,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Hospital,
  Package,
  PhoneCall,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'
import type { ComponentType } from 'react'
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
} from '@/components/social-icons'

export const site = {
  name: 'Sahara Home Health Care',
  tagline: 'Compassionate care, in the comfort of home.',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsapp: '919876543210',
  email: 'care@saharahomecare.in',
  address: 'Serving families across the city & nearby areas',
  hours: 'Available 24 hours, 7 days a week',
}

export const socials: { label: string; href: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/R.jinstititution01', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/saharahealthcareservice', icon: InstagramIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@saharahomehealthcare', icon: YouTubeIcon },
]

/** Used for schema.org `sameAs` so search engines trust the profiles. */
export const socialProfiles = socials.map((s) => s.href)

/**
 * Ready-made 16:9 marketing creatives in /public/services, each mapped to the
 * service page it promotes. The artwork already contains its own headline,
 * service list and phone number — so the carousel adds no overlay text.
 */
export const promoBanners = [
  {
    id: 'caregiver-attendant',
    title: 'Caretaker Services',
    image: '/services/1.png',
    href: '/services/caregiver-attendant',
  },
  {
    id: 'baby-postnatal-care',
    title: 'Baby & Postnatal Care',
    image: '/services/2.png',
    href: '/services/baby-postnatal-care',
  },
  {
    id: 'physiotherapy',
    title: 'Physiotherapy & Rehabilitation',
    image: '/services/3.png',
    href: '/services/physiotherapy',
  },
  {
    id: 'palliative-long-term-care',
    title: 'Palliative & Long-Term Care',
    image: '/services/4.png',
    href: '/services/palliative-long-term-care',
  },
]

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export type Service = {
  slug: string
  title: string
  short: string
  description: string
  icon: LucideIcon
  image: string
  includes: string[]
  idealFor: string[]
}

export const services: Service[] = [
  {
    slug: 'home-nursing',
    title: '24/7 Professional Home Nursing',
    short: 'Qualified nurses for clinical care at home, round the clock.',
    description:
      'Our registered and trained nurses bring hospital-grade clinical care into your home — from wound dressing and injections to IV management and vital monitoring — so your loved one recovers where they feel safest.',
    icon: Stethoscope,
    image: '/images/nursing.png',
    includes: [
      'Vital signs monitoring & charting',
      'Injections, IV & catheter care',
      'Wound dressing & post-surgical care',
      'Medication administration',
      'Coordination with treating doctors',
    ],
    idealFor: ['Post-surgery recovery', 'Chronic illness', 'Patients needing clinical support'],
  },
  {
    slug: 'caregiver-attendant',
    title: '24/7 Caregiver & Patient Attendant',
    short: 'Trained attendants for daily living, mobility and companionship.',
    description:
      'Our caregivers help with everyday needs — bathing, feeding, mobility, toileting and companionship — with patience, dignity and respect. Available for day, night, 24-hour and live-in shifts.',
    icon: HeartHandshake,
    image: '/images/caregiver.png',
    includes: [
      'Personal hygiene & grooming',
      'Feeding & meal assistance',
      'Mobility & transfer support',
      'Medication reminders',
      'Companionship & emotional support',
    ],
    idealFor: ['Seniors living alone', 'Bedridden patients', 'Families needing respite'],
  },
  {
    slug: 'elderly-care',
    title: 'Elderly Care',
    short: 'Gentle, dignified support so seniors can age safely at home.',
    description:
      'We design personalised care plans for seniors that balance safety, independence and joy — helping with routines, mobility, nutrition and staying socially connected.',
    icon: HandHeart,
    image: '/images/elderly.png',
    includes: [
      'Daily routine & activity support',
      'Fall prevention & safe mobility',
      'Nutrition & hydration monitoring',
      'Companionship & engagement',
      'Regular health updates to family',
    ],
    idealFor: ['Senior citizens', 'Parents of NRIs', 'Age-related conditions'],
  },
  {
    slug: 'doctor-on-call',
    title: 'Doctor-on-Call Services',
    short: 'Experienced doctors who visit your home when you need them.',
    description:
      'Skip the waiting rooms. Our doctors provide home consultations, routine check-ups and follow-ups, and coordinate further tests or treatment when required.',
    icon: PhoneCall,
    image: '/images/doctor.png',
    includes: [
      'Home consultations & check-ups',
      'Follow-up visits after discharge',
      'Prescription review',
      'Referral & diagnostics coordination',
      'Guidance for caregivers',
    ],
    idealFor: ['Elderly & immobile patients', 'Chronic disease follow-ups', 'Minor illnesses'],
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy & Rehabilitation',
    short: 'Certified physiotherapists to restore strength and mobility.',
    description:
      'Personalised physiotherapy at home for recovery after surgery, stroke, injury or long illness — focused on regaining strength, balance and independence.',
    icon: Activity,
    image: '/images/physio.png',
    includes: [
      'Post-operative rehabilitation',
      'Stroke & neuro rehabilitation',
      'Orthopaedic & joint pain therapy',
      'Balance & gait training',
      'Home exercise programmes',
    ],
    idealFor: ['Knee & hip replacement', 'Stroke recovery', 'Back & joint pain'],
  },
  {
    slug: 'baby-postnatal-care',
    title: 'Baby & Postnatal Care',
    short: 'Caring support for new mothers and newborns.',
    description:
      'Experienced baby care attendants and nurses support new mothers through recovery while caring for the newborn — feeding, bathing, sleep routines and more.',
    icon: Baby,
    image: '/images/postnatal.png',
    includes: [
      'Newborn bathing & massage',
      'Feeding & breastfeeding support',
      'Mother’s postnatal recovery care',
      'Hygiene & sleep routines',
      'Night-time support',
    ],
    idealFor: ['New mothers', 'Twins & premature babies', 'C-section recovery'],
  },
  {
    slug: 'medical-equipment',
    title: 'Medical Equipment Rental & Purchase',
    short: 'Hospital beds, oxygen, wheelchairs and more — delivered home.',
    description:
      'We supply quality medical equipment on rent or purchase, with delivery, installation and guidance so your home is ready for safe care.',
    icon: Package,
    image: '/images/equipment.png',
    includes: [
      'Hospital beds & air mattresses',
      'Oxygen concentrators & cylinders',
      'Wheelchairs & walkers',
      'Patient monitors & BiPAP/CPAP',
      'Delivery & installation',
    ],
    idealFor: ['Home ICU setup', 'Post-discharge recovery', 'Long-term care'],
  },
  {
    slug: 'post-hospitalization-care',
    title: 'Post-Hospitalization Care',
    short: 'A smooth, safe transition from hospital to home.',
    description:
      'We make discharge simple — from planning care at home to following doctor instructions, managing medications and preventing readmission.',
    icon: Hospital,
    image: '/images/post-hospital.png',
    includes: [
      'Discharge planning support',
      'Medication & diet management',
      'Wound & drain care',
      'Recovery monitoring',
      'Doctor & physio coordination',
    ],
    idealFor: ['Post-surgery patients', 'After ICU discharge', 'Cardiac recovery'],
  },
  {
    slug: 'palliative-long-term-care',
    title: 'Palliative & Long-Term Care',
    short: 'Comfort-focused care with dignity for serious illness.',
    description:
      'Compassionate care that prioritises comfort, pain relief and quality of life for patients with serious or long-term illness — while supporting the whole family.',
    icon: Accessibility,
    image: '/images/palliative.png',
    includes: [
      'Pain & symptom management',
      'Bedridden patient care',
      'Bedsore prevention & positioning',
      'Emotional support for family',
      'Long-term care planning',
    ],
    idealFor: ['Cancer care', 'Advanced illness', 'Bedridden patients'],
  },
  {
    slug: 'dementia-alzheimers-care',
    title: 'Dementia & Alzheimer’s Care',
    short: 'Patient, specialised support for memory-related conditions.',
    description:
      'Caregivers trained in dementia care provide structure, safety and calm — helping your loved one feel secure in familiar surroundings.',
    icon: Brain,
    image: '/images/dementia.png',
    includes: [
      'Structured daily routines',
      'Safety & wandering prevention',
      'Memory & cognitive activities',
      'Behaviour & mood support',
      'Family guidance',
    ],
    idealFor: ['Dementia', 'Alzheimer’s disease', 'Parkinson’s with cognitive decline'],
  },
  {
    slug: 'critical-care-at-home',
    title: 'Critical Care at Home',
    short: 'ICU-level monitoring and skilled nursing at home.',
    description:
      'For patients who need intensive support, we set up home ICU care with skilled critical-care nurses, equipment and doctor supervision.',
    icon: HeartPulse,
    image: '/images/critical.png',
    includes: [
      'ICU-trained nurses',
      'Ventilator & tracheostomy care',
      'Continuous vital monitoring',
      'Home ICU equipment setup',
      'Doctor supervision',
    ],
    idealFor: ['Ventilator support', 'Critical recovery', 'Complex medical needs'],
  },
]

export const careHighlights = [
  'Nursing Care',
  'Patient Attendants & Caregivers',
  'Elderly Care',
  'Post-Hospitalization Care',
  '24/7 & Live-in Care',
  'Medication & Daily Care Support',
  'Bedridden Patient Care',
  'Patient Support',
]
