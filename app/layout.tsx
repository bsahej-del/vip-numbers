import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VIP Numbers — Premium Indian Mobile Numbers",
  description: "Buy exclusive VIP Indian mobile numbers with rare patterns. Airtel, Jio, BSNL, Vi & Idea. Platinum, Gold, and Silver categories. Free numerology report.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-black min-h-screen antialiased">
        <CartProvider>
          <Header />
          {children}
          <WhatsAppButton />
          <footer className="border-t border-white/10 bg-zinc-950 mt-12">
            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                <div>
                  <p className="text-amber-400 font-bold text-lg mb-4 tracking-widest uppercase">VIP Numbers</p>
                  <p className="text-white/40 text-sm leading-relaxed">India&apos;s premium marketplace for VIP mobile numbers. Airtel, Jio, BSNL, Vi, Idea.</p>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-4 text-sm uppercase tracking-widest">Quick Links</p>
                  <ul className="space-y-2 text-sm text-white/40">
                    {[["Browse Numbers","/numbers"],["Numerology","/numerology"],["Sell Your Number","/sell"],["About Us","/about"],["FAQs","/faq"]].map(([label,href])=>(
                      <li key={href}><a href={href} className="hover:text-amber-400 transition-colors">{label}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-4 text-sm uppercase tracking-widest">Operators</p>
                  <ul className="space-y-2 text-sm text-white/40">
                    {["Airtel VIP Numbers","Jio Fancy Numbers","BSNL VIP Numbers","Vi Fancy Numbers","Idea VIP Numbers"].map((op)=>(
                      <li key={op}><a href="/numbers" className="hover:text-amber-400 transition-colors">{op}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-white/60 font-semibold mb-4 text-sm uppercase tracking-widest">Contact</p>
                  <div className="space-y-3 text-sm text-white/40">
                    <p>📞 Mon–Sat, 10AM–6PM</p>
                    <a href="https://wa.me/918968980650" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                      <span className="text-green-400">●</span> WhatsApp Us
                    </a>
                    <p>✉ info@vipnumbers.in</p>
                  </div>
                </div>
              </div>

              {/* Payment badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6 pt-6 border-t border-white/10">
                <p className="text-white/30 text-xs mr-2">We Accept:</p>
                {["Visa","Mastercard","UPI","Google Pay","PhonePe","Paytm","Net Banking"].map((p)=>(
                  <span key={p} className="bg-white/5 border border-white/10 text-white/40 text-xs px-3 py-1 rounded-lg">{p}</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
                <p>© {new Date().getFullYear()} VIP Numbers. All rights reserved.</p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white/40">Privacy Policy</a>
                  <a href="#" className="hover:text-white/40">Terms & Conditions</a>
                  <a href="#" className="hover:text-white/40">Refund Policy</a>
                </div>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
