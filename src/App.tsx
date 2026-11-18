import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { CatalogSection } from './components/CatalogSection';
import { Benefits } from './components/Benefits';
import { ReviewsSection } from './components/ReviewsSection';
import { ShowroomSection } from './components/ShowroomSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SkinConsultantModal } from './components/SkinConsultantModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { toast, openConsultantWith } = useCart();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFAF8] text-[#242220] flex flex-col font-sans selection:bg-[#EAD8D3] selection:text-[#242220]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#242220] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium animate-fade-in border border-[#3E3B38]">
          <CheckCircle2 className="w-4 h-4 text-[#D49D94]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Floating Skin AI Consultant Button for Mobile & Quick Access */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={() => openConsultantWith()}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#FCFAF8] hover:bg-[#F4EBE7] text-[#242220] rounded-full shadow-lg border border-[#E5D5CE] transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Спросить AI-дерматолога BRASH"
          title="Спросить AI-дерматолога BRASH"
        >
          <div className="w-7 h-7 rounded-full bg-[#EAD8D3] flex items-center justify-center text-[#B3756C] group-hover:rotate-12 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1">
            Skin AI
          </span>
        </button>
      </div>

      {/* Header */}
      <Header onOpenAccount={() => setIsAccountOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        <Hero />
        <BrandPhilosophy />
        <CatalogSection />
        <Benefits />
        <ReviewsSection />
        <ShowroomSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <CartDrawer />
      <ProductQuickViewModal />
      <SkinConsultantModal />
      <CheckoutModal />
      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
