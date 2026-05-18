"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What is a VIP or fancy mobile number?", a: "A VIP or fancy number is a mobile number with a special pattern — repeating digits, sequential numbers, palindromes, or other memorable combinations. These numbers are prized for their uniqueness, memorability, and numerological significance." },
  { q: "How do I purchase a VIP number?", a: "Simply browse our catalog, add the number to your cart, and complete the checkout. We accept all major cards, UPI, Google Pay, and net banking. Once payment is confirmed, we initiate the transfer process within 1 business day." },
  { q: "How long does the number transfer take?", a: "Number transfers typically take 1-3 business days after payment confirmation. We handle all the paperwork and telecom coordination. You'll receive updates via WhatsApp throughout the process." },
  { q: "Can I transfer the number to any network?", a: "Yes! All our numbers support Mobile Number Portability (MNP). You can keep your existing operator or switch. We'll guide you through the process step by step." },
  { q: "Are the numbers genuine and legally transferable?", a: "100% yes. All numbers listed on our platform are legally owned and fully transferable. We provide complete documentation for every transaction." },
  { q: "What payment methods do you accept?", a: "We accept Credit/Debit Cards (Visa, Mastercard), UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and bank transfers for large purchases." },
  { q: "Can I sell my fancy number through your platform?", a: "Absolutely! Visit our 'Sell Your Number' page, submit your number with your asking price, and our team will review it within 24 hours. If accepted, we handle everything including finding a buyer and processing the transfer." },
  { q: "What is numerology and why does it matter for mobile numbers?", a: "Numerology is the study of numbers and their influence on human life. Many people believe that carrying a mobile number whose digits align with their birth number or life path brings good luck, prosperity, and positive energy. Use our free numerology calculator to find your ideal number." },
  { q: "Do you offer bulk or family packs?", a: "Yes! We offer special pricing for families and businesses looking to buy multiple VIP numbers. Contact us on WhatsApp for custom packages and discounts." },
  { q: "What is your refund policy?", a: "Since each number is unique and the transfer is irreversible, we do not offer refunds after transfer initiation. However, if there is any issue with the number or transfer, we work with you to resolve it fully. Please read our refund policy for complete details." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-24">
      <div className="text-center mb-12">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">Help Center</p>
        <h1 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-white/50">Everything you need to know about buying and selling VIP numbers.</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button className="w-full flex items-center justify-between px-6 py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}>
              <span className="text-white font-semibold pr-4">{faq.q}</span>
              <ChevronDown size={18} className={`text-white/40 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-white/60 leading-relaxed border-t border-white/10 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-amber-400/10 border border-amber-400/20 rounded-2xl p-8 text-center">
        <p className="text-white font-semibold mb-2">Still have questions?</p>
        <p className="text-white/50 text-sm mb-6">Our team is available Mon–Sat, 10AM to 6PM</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="https://wa.me/918968980650" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors text-sm">
            WhatsApp Us
          </a>
          <a href="mailto:info@vipnumbers.in"
            className="px-6 py-3 border border-white/20 text-white/70 font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm">
            Email Us
          </a>
        </div>
      </div>
    </main>
  );
}
