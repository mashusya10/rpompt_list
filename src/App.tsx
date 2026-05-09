import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Copy, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Languages,
  ArrowRight
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { cn } from './lib/utils';
import { categories, prompts, type Prompt } from './data/prompts';
import { translations, type Language } from './translations';
import { improvePrompt } from './services/gemini';
import * as Icons from 'lucide-react';

// Dynamic icon component
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} size={20} />;
};

export default function App() {
  const [lang, setLang] = useState<Language>('ko');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Prompt Improver State
  const [simpleInput, setSimpleInput] = useState('');
  const [improvedOutput, setImprovedOutput] = useState('');
  const [isImproving, setIsImproving] = useState(false);

  const t = translations[lang];

  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => {
      const matchesSearch = search === '' || 
        p.content[lang].toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(tag => tag[lang].toLowerCase().includes(search.toLowerCase())) ||
        p.role[lang].toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = !activeCategory || p.categoryId === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, lang]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t.copySuccess, {
      style: {
        background: '#18181b',
        color: '#fff',
        border: '1px solid #27272a',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#000',
      },
    });
  };

  const handleImprove = async () => {
    if (!simpleInput.trim()) return;
    setIsImproving(true);
    const result = await improvePrompt(simpleInput, lang);
    setImprovedOutput(result);
    setIsImproving(false);
  };

  return (
    <div id="app-root" className="min-h-screen font-sans selection:bg-white/30 bg-[#0A0A0A] text-[#F5F5F5]">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:px-10 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div>
          <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter leading-none uppercase italic text-white">
            Prompt<br/><span className="text-zinc-600">Refiner</span>
          </h1>
          <p className="mt-6 text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
            {t.subtitle}
          </p>
        </div>

        <div className="flex gap-2 bg-zinc-900 p-1 rounded-full border border-zinc-800 self-start">
          {(['ko', 'en', 'ru'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-6 py-1.5 rounded-full font-black text-[10px] uppercase transition-all tracking-wider",
                lang === l ? "bg-white text-black" : "text-zinc-500 hover:text-white"
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        
        {/* Prompt Improver Tool */}
        <section className="mb-20">
          <div className="grid gap-8 lg:grid-cols-12 min-h-0">
            {/* Left Column: Input */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col flex-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2 font-bold select-none">
                  Raw Prompt Input
                </label>
                <textarea
                  value={simpleInput}
                  onChange={(e) => setSimpleInput(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  className="h-44 md:h-64 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-xl font-medium text-white transition-all focus:border-white focus:outline-none placeholder-zinc-700"
                />
              </div>
              <button
                onClick={handleImprove}
                disabled={isImproving || !simpleInput.trim()}
                className="group flex w-full h-20 items-center justify-center gap-4 rounded-2xl bg-white text-black text-2xl font-black uppercase tracking-tight transition-all hover:bg-zinc-200 disabled:opacity-50 active:scale-[0.98]"
              >
                {isImproving ? (
                  <Icons.Loader2 className="animate-spin" size={28} />
                ) : (
                  <>
                    {t.improveBtn} <ArrowRight size={28} className="transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-7 flex flex-col gap-4 min-h-0">
              <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2 font-bold select-none">
                Optimized Output
              </label>
              
              <div className={cn(
                "relative flex-1 min-h-[300px] flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 overflow-hidden",
                !improvedOutput && "items-center justify-center opacity-30 border-dashed"
              )}>
                {improvedOutput ? (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] bg-white text-black px-2 py-0.5 font-bold uppercase tracking-widest">{t.promptImproved}</span>
                      <button
                        onClick={() => handleCopy(improvedOutput)}
                        className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 active:scale-95 transition-all text-white"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-lg leading-relaxed text-zinc-200 scrollbar-thin pr-4">
                      {improvedOutput}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-zinc-700">
                    <Sparkles className="mx-auto mb-4" size={48} />
                    <p className="text-sm font-bold uppercase tracking-widest">{t.improverDesc}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Global Divider */}
        <div className="mb-16 border-t border-zinc-800" />

        {/* Library controls */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-3 block font-bold">Search Database</label>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-white" size={24} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.search}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-6 pl-16 pr-6 text-xl text-white transition-all focus:border-white focus:outline-none placeholder-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all",
                !activeCategory 
                  ? "bg-white text-black" 
                  : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white hover:border-zinc-700"
              )}
            >
              {t.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all",
                  activeCategory === cat.id 
                    ? "bg-white text-black" 
                    : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white hover:border-zinc-700"
                )}
              >
                <Icon name={cat.icon} className="opacity-50" />
                {cat[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode='popLayout'>
            {filteredPrompts.map((prompt) => (
              <motion.div
                layout
                key={prompt.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all hover:border-white/20 hover:bg-zinc-900"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-zinc-600 tracking-widest uppercase">
                      ID_{prompt.id.replace('#', '')}
                    </span>
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 font-bold uppercase tracking-tighter">
                      {prompt.role[lang]}
                    </span>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {prompt.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        // {tag[lang]}
                      </span>
                    ))}
                  </div>

                  <p className="line-clamp-6 text-lg md:text-xl font-medium leading-snug text-zinc-200">
                    {prompt.content[lang]}
                  </p>
                </div>

                <div className="mt-8 flex gap-4 pt-6 border-t border-zinc-800/50">
                  <button
                    onClick={() => handleCopy(prompt.content[lang])}
                    className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-zinc-800 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black active:scale-95"
                  >
                    <Copy size={16} />
                    {t.copyBtn}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPrompts.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-xl font-black uppercase tracking-[0.3em] text-zinc-800">{t.noResults}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-900 bg-black py-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex gap-16 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto">
            <div className="flex flex-col min-w-max">
              <span className="text-[10px] uppercase text-zinc-600 font-bold mb-2 tracking-widest">Active Model</span>
              <span className="text-sm font-black text-zinc-400">GEMINI-3-FLASH</span>
            </div>
            <div className="flex flex-col min-w-max">
              <span className="text-[10px] uppercase text-zinc-600 font-bold mb-2 tracking-widest">System Status</span>
              <span className="text-sm font-black text-emerald-500 uppercase">Optimal</span>
            </div>
            <div className="flex flex-col min-w-max text-right">
              <span className="text-[10px] uppercase text-zinc-600 font-bold mb-2 tracking-widest">Language Service</span>
              <span className="text-sm font-black text-zinc-400 uppercase">EN · KO · RU Enabled</span>
            </div>
          </div>
          
          <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest items-center flex gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync: Persistent // 2026_VERSION
          </div>
        </div>
        <div className="mt-12 text-center border-t border-zinc-900 pt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-800">{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
