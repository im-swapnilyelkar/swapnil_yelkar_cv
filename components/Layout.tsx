
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },    
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen selection:bg-cyan-500/30">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3 border-b border-cyan-500/10' : 'bg-transparent py-8'
        }`}
      >
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="font-display text-2xl font-bold tracking-tighter flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                SY
              </div>
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:to-cyan-400 transition-all">
              Swapnil <span className="font-light">Yelkar</span>
            </span>
          </a>
          
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-all uppercase tracking-[0.2em]"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <a 
              href="https://www.linkedin.com/in/im-swapnil/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#0077b5] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-career-agent'))}
              className="group relative px-6 py-2 rounded-full bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span>Ask AI</span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="py-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              <div className="text-left">
                <p className="text-xl font-display font-bold text-white mb-2">Swapnil Yelkar</p>
                <p className="text-slate-500 text-sm">UI Architect // Staff Engineer // AI Pioneer</p>
                <p className="text-cyan-400/80 text-[11px] font-bold mt-3 tracking-widest">+1 (289)-400-9007</p>
              </div>
              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/im-swapnil/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors uppercase text-[10px] font-bold tracking-widest">LinkedIn</a>
                <a href="mailto:im.swapnilyelkar@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors uppercase text-[10px] font-bold tracking-widest">Email</a>
                <a href="https://github.com/im-swapnilyelkar" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors uppercase text-[10px] font-bold tracking-widest">GitHub</a>
              </div>
           </div>
           <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-slate-600 uppercase tracking-widest">© {new Date().getFullYear()} SWAPNIL YELKAR // ALL_RIGHTS_RESERVED</p>
              <p className="text-[10px] text-slate-600 uppercase tracking-widest">BUILD_REF: 2.5.0-ALPHA</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
