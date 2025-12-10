import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  CalendarClock, 
  QrCode, 
  UserPlus, 
  Star, 
  Trophy, 
  CheckCircle2, 
  Bike,
  ChevronDown,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Section } from './components/Section';
import { ActionButton } from './components/ActionButton';
import { REVIEWS, BADGES, STATS, PHONE_NUMBER, PIX_KEY, FAQ_ITEMS, SERVICES } from './constants';

// Componente para animar os números (0 até o valor final) com gatilho de scroll
const AnimatedCounter = ({ end, duration = 2500, decimals = 0 }: { end: number, duration?: number, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Monitora se o elemento entrou na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 } // Dispara quando 20% do elemento estiver visível
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Executa a animação apenas se hasStarted for true
  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const performAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        // Easing function: Ease-out expo para um efeito suave no final
        const percentage = 1 - Math.pow(2, -10 * (progress / duration));
        setCount(percentage * end);
        animationFrame = requestAnimationFrame(performAnimation);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(performAnimation);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count.toFixed(decimals)}</span>;
};

export default function App() {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Auto-scroll carrossel de avaliações
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000); // Troca a cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  // --- ACTIONS ---

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${PHONE_NUMBER}?text=Olá Marcos! Preciso de um corre.`, '_blank');
  };

  const handleServiceClick = (message: string) => {
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo seu navegador.");
      return;
    }
    
    // Simple prompt to simulate "sending" location via WhatsApp
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        const message = `Olá! Minha localização para coleta/entrega é: ${mapLink}`;
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      },
      (error) => {
        alert("Erro ao obter localização. Verifique suas permissões.");
        console.error(error);
      }
    );
  };

  const handleSchedule = () => {
    const message = "Olá! Gostaria de agendar uma entrega para...";
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopyFeedback("Chave Pix copiada!");
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  const handleVCard = () => {
    // Basic VCard 3.0 Structure
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Marcos L33T Motoboy
TEL;TYPE=CELL:${PHONE_NUMBER}
NOTE:Motoboy Profissional - Rápido e Seguro
END:VCARD`;
    
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Marcos_L33T_Motoboy.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setCopyFeedback("Contato salvo!");
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-vr46-dark text-white font-sans overflow-x-hidden pb-12">
      {/* --- HEADER --- */}
      <header className="relative bg-vr46-blue overflow-hidden pb-8 pt-10 px-6 rounded-b-[2.5rem] shadow-[0_10px_30px_rgba(0,51,153,0.3)]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full skew-stripes opacity-20 pointer-events-none"></div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-vr46-yellow rounded-full blur-[80px] opacity-20"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-vr46-yellow overflow-hidden bg-slate-800 flex items-center justify-center shadow-[0_0_20px_rgba(232,246,37,0.6)]">
               {/* Placeholder for Profile Image */}
               <Bike size={48} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-vr46-yellow text-vr46-blue text-xs font-bold px-2 py-1 rounded-full border-2 border-vr46-dark flex items-center">
              <Star size={12} className="mr-1 fill-vr46-blue" />
              <AnimatedCounter end={4.9} decimals={1} duration={2000} />
            </div>
          </div>
          
          <h1 className="text-4xl font-racing italic mb-1 tracking-wide">
            MARCOS <span className="text-vr46-yellow">"L33T"</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-2">
            Motoboy Profissional
          </p>
          <p className="text-xs text-slate-400 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm flex items-center">
             <Trophy size={12} className="mr-1 text-vr46-yellow" /> 
             <span><AnimatedCounter end={312} duration={2000} /> Avaliações</span>
          </p>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="px-4 -mt-4 relative z-20 space-y-6">
        
        {/* FEEDBACK TOAST */}
        {copyFeedback && (
           <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-vr46-yellow text-vr46-dark font-bold px-6 py-3 rounded-full shadow-lg z-50 animate-slide-in flex items-center">
             <CheckCircle2 className="mr-2" size={20}/>
             {copyFeedback}
           </div>
        )}

        {/* --- BUTTONS --- */}
        <div className="space-y-3">
          <ActionButton 
            label="Chamar no WhatsApp" 
            subLabel="Resposta imediata"
            icon={<Phone className="w-6 h-6" />} 
            onClick={handleWhatsApp}
            variant="primary"
          />
          <div className="grid grid-cols-2 gap-3">
            <ActionButton 
              label="Localização" 
              icon={<MapPin className="w-5 h-5" />} 
              onClick={handleLocation}
            />
            <ActionButton 
              label="Agendar" 
              icon={<CalendarClock className="w-5 h-5" />} 
              onClick={handleSchedule}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <ActionButton 
              label="Pix / Pagar" 
              icon={<QrCode className="w-5 h-5" />} 
              onClick={handlePix}
              variant="outline"
            />
             <ActionButton 
              label="Salvar Contato" 
              icon={<UserPlus className="w-5 h-5" />} 
              onClick={handleVCard}
              variant="outline"
            />
          </div>
        </div>

        {/* --- SOBRE MIM --- */}
        <Section title="Sobre o Piloto">
          <div className="bg-slate-900/80 border-l-4 border-vr46-yellow p-4 rounded-r-lg shadow-lg backdrop-blur-sm">
            <p className="text-slate-300 leading-relaxed italic">
              "Sou motoboy profissional, rápido, direto e sem enrolação. 
              Trabalho com entregas urgentes, rotas locais e serviços particulares. 
              Se precisar agora, chama que eu improviso rota."
            </p>
          </div>
        </Section>

        {/* --- CATÁLOGO DE SERVIÇOS (CARROSSEL) --- */}
        <Section title="Meus Serviços">
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentServiceIndex * 100}%)` }}
            >
              {SERVICES.map((service) => (
                <div key={service.id} className="min-w-full px-1">
                  <button 
                    onClick={() => handleServiceClick(service.message)}
                    className="w-full group relative bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-vr46-yellow transition-all duration-300 text-left active:scale-[0.98] h-full"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-vr46-yellow p-3 rounded-full shrink-0 shadow-[0_0_10px_rgba(232,246,37,0.3)] group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                         <h3 className="text-xl font-racing italic text-white group-hover:text-vr46-yellow transition-colors">
                          {service.title}
                        </h3>
                        <span className="inline-block bg-slate-900/50 text-vr46-yellow text-[0.65rem] font-bold uppercase px-2 py-1 rounded border border-slate-700 mt-1">
                          {service.priceLabel}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                       <p className="text-slate-400 text-sm leading-relaxed pr-8">
                          {service.description}
                        </p>
                       <div className="bg-slate-700/50 p-2 rounded-full opacity-70 group-hover:opacity-100 group-hover:bg-vr46-yellow group-hover:text-vr46-dark transition-all duration-300">
                          <ArrowRight className="w-5 h-5" />
                       </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Indicadores de Serviços */}
            <div className="flex justify-center mt-4 gap-2">
              {SERVICES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentServiceIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentServiceIndex 
                      ? 'w-8 bg-vr46-yellow shadow-[0_0_10px_rgba(232,246,37,0.5)]' 
                      : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Ver serviço ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* --- CREDIBILIDADE --- */}
        <Section title="Credibilidade">
          <div className="grid grid-cols-2 gap-2">
            {BADGES.map((badge, idx) => (
              <div key={idx} className="bg-slate-800/50 p-3 rounded border border-slate-700 flex items-center space-x-3 hover:border-vr46-yellow transition-colors">
                <div className="shrink-0">{badge.icon}</div>
                <span className="text-xs font-bold uppercase text-slate-300">{badge.text}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* --- ESTATISTICAS --- */}
        <Section>
          <div className="bg-vr46-yellow rounded-xl p-6 relative overflow-hidden text-vr46-dark shadow-[0_0_30px_rgba(232,246,37,0.15)]">
             <div className="grid grid-cols-3 gap-4 text-center relative z-10">
               {STATS.map((stat, idx) => (
                 <div key={idx} className="flex flex-col items-center">
                   <span className="text-2xl font-racing">
                     <AnimatedCounter end={parseInt(stat.value)} duration={3000} />
                   </span>
                   <span className="text-[0.6rem] font-bold uppercase tracking-wider opacity-80">{stat.label}</span>
                 </div>
               ))}
             </div>
             {/* Decorative bike icon moved to end of DOM to prevent layout shifts on load */}
             <div className="absolute -right-4 -bottom-8 opacity-10 pointer-events-none">
               <Bike size={120} />
             </div>
          </div>
        </Section>

        {/* --- AVALIAÇÕES --- */}
        <Section title="O que dizem">
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              {REVIEWS.map((review) => (
                <div key={review.id} className="min-w-full px-1">
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-between h-full mx-1">
                    <div>
                      <div className="flex text-vr46-yellow mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-base text-slate-300 italic leading-relaxed">"{review.text}"</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                      <span className="text-sm font-bold uppercase text-vr46-yellow">{review.name}</span>
                      <div className="flex items-center text-slate-500 text-xs">
                         <CheckCircle2 size={12} className="mr-1" />
                         <span>Verificado</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicadores do Carrossel */}
            <div className="flex justify-center mt-4 gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReviewIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentReviewIndex 
                      ? 'w-8 bg-vr46-yellow shadow-[0_0_10px_rgba(232,246,37,0.5)]' 
                      : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Ir para avaliação ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Section>
        
        {/* --- FAQ --- */}
        <Section title="Dúvidas Frequentes">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div 
                key={index}
                className={`bg-slate-800 rounded-lg overflow-hidden border transition-all duration-300 ${
                  openFaqIndex === index ? 'border-vr46-yellow shadow-[0_0_10px_rgba(232,246,37,0.15)]' : 'border-slate-700'
                }`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className={`w-5 h-5 ${openFaqIndex === index ? 'text-vr46-yellow' : 'text-slate-500'}`} />
                    <span className={`font-bold text-sm ${openFaqIndex === index ? 'text-white' : 'text-slate-300'}`}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 text-vr46-yellow' : ''}`} 
                  />
                </button>
                <div 
                  className={`px-4 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="border-t border-slate-700/50 pt-3 pl-8">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="mt-12 text-center pb-8 opacity-60">
        <div className="flex items-center justify-center space-x-2 mb-2">
           <div className="h-[1px] w-8 bg-slate-600"></div>
           <Bike size={16} className="text-slate-500"/>
           <div className="h-[1px] w-8 bg-slate-600"></div>
        </div>
        <p className="text-[0.6rem] uppercase tracking-widest text-slate-500">
          Powered by <span className="text-slate-300 font-bold">INSIGHT / BILL</span>
        </p>
        <p className="text-[0.6rem] text-slate-600">Cartão Pro NFC</p>
      </footer>
    </div>
  );
}