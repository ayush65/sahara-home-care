import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/shared'

const faqs = [
  {
    q: 'What areas do you serve?',
    a: 'We currently serve families across the city and nearby areas. Call or WhatsApp us to confirm we cover your location — we are expanding every month.',
  },
  {
    q: 'Are your nurses and caregivers trained and verified?',
    a: 'Yes. Every nurse, caregiver and attendant is background-checked, skill-assessed and supervised. We share their profile with you before they start.',
  },
  {
    q: 'Can care start the same day or on weekends?',
    a: 'In most cases we can begin care within 24 hours — including nights, weekends and holidays, since we operate 24/7.',
  },
  {
    q: 'Do you provide medical equipment at home?',
    a: 'Yes. Hospital beds, oxygen concentrators, wheelchairs, walkers and more are available on rent or for purchase, delivered and installed by our team.',
  },
  {
    q: 'How is the cost decided?',
    a: 'Pricing depends on the type of care, hours per shift and duration. After a free assessment we share a clear, transparent quote — no hidden charges.',
  },
  {
    q: 'Can I change or cancel my care plan?',
    a: 'Absolutely. Plans are flexible — you can adjust the schedule, switch caregivers or pause service with a simple conversation with your coordinator.',
  },
]

export function Faq() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions families often ask."
          description="Still unsure? Reach us any time — a real coordinator answers, 24/7."
          align="center"
        />
        <div className="mt-14 divide-y divide-border rounded-3xl border border-border bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5 [&_summary]:list-none">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-brand-green transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
