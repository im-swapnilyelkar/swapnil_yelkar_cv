
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ChatBot from './components/ChatBot';
import { resumeData } from './data/resumeData';
import { GoogleGenAI } from "@google/genai";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const MatrixBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\|+-*%$#@!'.split('');
    const fontSize = 14;
    const columns = width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#06b6d4'; // Cyan
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

const HeroWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15)_0%,transparent_50%)] animate-[pulse_8s_infinite]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top]"></div>
    </div>
  );
};

const ProjectSketch = ({ type }: { type: string }) => {
  if (type === 'clinical') {
    return (
      <svg className="w-full h-full text-cyan-500/30" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="5 5" />
        <path d="M40 100 Q 100 20 160 100 T 40 100" stroke="currentColor" strokeWidth="1" fill="none" className="animate-pulse" />
        <path d="M40 100 Q 100 180 160 100 T 40 100" stroke="currentColor" strokeWidth="1" fill="none" className="animate-pulse" />
        <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.2" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.2" />
        <g className="animate-float">
          <rect x="85" y="85" width="30" height="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M90 100 H110 M100 90 V110" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
    );
  }
  return (
    <svg className="w-full h-full text-purple-500/30" viewBox="0 0 200 200">
      <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
      <path d="M60 60 L140 140 M140 60 L60 140" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M70 100 H130 M100 70 V130" stroke="currentColor" strokeWidth="0.2" />
      <g className="animate-pulse">
        <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="1" />
        <circle cx="60" cy="60" r="5" fill="currentColor" />
        <circle cx="140" cy="60" r="5" fill="currentColor" />
        <circle cx="140" cy="140" r="5" fill="currentColor" />
        <circle cx="60" cy="140" r="5" fill="currentColor" />
      </g>
    </svg>
  );
};

const getSkillIcon = (name: string) => {
  const normalized = name.toLowerCase();
  const className = "w-10 h-10 mb-6 text-cyan-400 group-hover:text-emerald-400 transition-colors duration-300 stroke-[1.5]";

  if (normalized.includes("react") || normalized.includes("native")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
         <circle cx="12" cy="12" r="3" />
         <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
         <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
         <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    );
  }
  if (normalized.includes("angular")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (normalized.includes("typescript")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 7h16" strokeLinecap="round"/>
        <path d="M12 7v13" strokeLinecap="round"/>
        <path d="M8 20h8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (normalized.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <path d="M13 2v7h7"></path>
        <path d="M9 16l6-6"></path>
      </svg>
    );
  }
  if (normalized.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2l-9 5v10l9 5 9-5V7l-9-5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12v10" strokeLinecap="round"/>
        <path d="M12 12L3 7" strokeLinecap="round"/>
        <path d="M12 12l9-5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (normalized.includes("java") && !normalized.includes("script")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M17 11c0 2.5-4 4-5 6-1-2-5-3.5-5-6" strokeLinecap="round" />
        <path d="M12 3v2" strokeLinecap="round" />
        <path d="M15 4v2" strokeLinecap="round" />
        <path d="M9 4v2" strokeLinecap="round" />
        <path d="M6 19c0 1.1 2.2 2 6 2s6-.9 6-2" />
        <path d="M19 14h1c1.1 0 2 .9 2 2s-.9 2-2 2h-1" />
      </svg>
    );
  }
  if (normalized.includes("spring")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
         <path d="M12 3L4 9v12h16V9l-8-6z" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
         <path d="M12 14v4" strokeLinecap="round"/>
         <path d="M8.5 17.5L12 14l3.5 3.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (normalized.includes("python")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M10 8h4v4h-4z" />
        <path d="M10 12h4v4h-4z" />
      </svg>
    );
  }
  if (normalized.includes("aws")) {
     return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M17 16l-5-5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 4v12" strokeLinecap="round"/>
        <path d="M4 20h16" strokeLinecap="round"/>
      </svg>
     );
  }
  
  // Default Generic Code Icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M16 18l6-6-6-6" strokeLinecap="round" strokeWidth="2"/>
      <path d="M8 6l-6 6 6 6" strokeLinecap="round" strokeWidth="2"/>
    </svg>
  );
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    const fetchGeneratedImage = async () => {
      setIsGeneratingImage(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A high-tech futuristic visualization for a UI Architect named Swapnil Yelkar. The image features a sleek micro-frontend architecture diagram with glowing neon cyan lines, modular components, and integrated AI neural network patterns. Dark slate background, glass-morphism effects, 4k, professional and premium feel.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate technical image:", error);
      } finally {
        setIsGeneratingImage(false);
      }
    };

    fetchGeneratedImage();
  }, []);

  const categories = ['All', 'Frontend', 'UI Architecture', 'Backend', 'AI', 'Testing'];
  const filteredSkills = selectedCategory === 'All' 
    ? resumeData.skills 
    : resumeData.skills.filter(s => s.category === selectedCategory);

  const openAgent = () => {
    window.dispatchEvent(new CustomEvent('open-career-agent'));
  };

  const profileImgUrl = "https://media.licdn.com/dms/image/v2/D4D03AQHFEPLD9BSqXw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706091531697?e=1767830400&v=beta&t=B2kfbYbsb09VqOjGt0KQ-5SLcmrcVJXt7J38hiubens";

  return (
    <Layout>
      <MatrixBackground />
      
      {/* Hero Section */}
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden border-b border-white/5">
        <HeroWaves />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[9px] font-bold uppercase tracking-[0.3em] animate-in fade-in slide-in-from-left-4 duration-700">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Open to work | Ontario Canada
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000 relative group">
                  <span className="block text-slate-400 opacity-50 uppercase tracking-tight group-hover:opacity-100 transition-opacity duration-1000">SWAPNIL</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 bg-clip-text text-transparent uppercase tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-500">YELKAR</span>
                </h1>
                <div className="relative overflow-hidden w-full max-w-full group">
                  <div className="text-base md:text-xl lg:text-2xl font-bold font-display animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 uppercase tracking-widest text-slate-200 flex flex-wrap md:flex-nowrap items-center justify-center lg:justify-start gap-3 md:gap-4 whitespace-nowrap">
                    <span className="hover:text-cyan-400 transition-colors duration-300">Technical Lead</span>
                    <span className="text-cyan-500/50">|</span>
                    <span className="hover:text-emerald-400 transition-colors duration-300">AI Engineer</span>
                    <span className="text-cyan-500/50">|</span>
                    <span className="hover:text-purple-400 transition-colors duration-300">UI Architect</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
              
              <div className="max-w-lg text-slate-400 text-base leading-relaxed animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 glass p-6 rounded-[1.5rem] border-white/5 mx-auto lg:mx-0">
                Transforming complex enterprise requirements into <span className="text-cyan-400 font-bold underline decoration-cyan-500/20 underline-offset-4">distributed high-performance ecosystems</span>. 
                Expert in Micro-frontends, Modular Federation, and AI-driven UI scalability.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-400 w-full lg:w-auto">
                <button 
                  onClick={openAgent}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-slate-950 font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:-translate-y-1 transition-all uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Launch Career Proxy
                </button>
                <a 
                  href="/Swapnil_Yelkar_Resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 glass border-white/10 hover:border-cyan-500/30 transition-all rounded-xl font-bold flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.15em] text-slate-200 hover:-translate-y-1"
                >
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Sync Resume
                </a>
              </div>
            </div>

            <div className="flex-1 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 flex justify-center py-10 lg:py-0">
               {/* Reduced container size to prevent cropping */}
               <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Futuristic Frame */}
                  <div className="absolute inset-[-20px] border-[0.5px] border-cyan-500/30 rounded-[3rem] animate-[spin_30s_linear_infinite]"></div>
                  <div className="absolute inset-[-10px] border-[0.5px] border-emerald-500/20 rounded-[2.5rem] animate-[spin_20s_linear_infinite_reverse]"></div>
                  
                  {/* Profile Image with Dynamic Technical Background */}
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden glass border border-white/10 group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                      style={{ 
                        backgroundImage: `url(${generatedImageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'})`,
                        opacity: isGeneratingImage ? 0.3 : 1
                      }}
                    ></div>
                    
                    <img 
                      src={profileImgUrl}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/SwapnilYelkar/portfolio-assets/main/swapnil_portrait.jpg";
                      }}
                      alt="Swapnil Yelkar" 
                      className="w-full h-full object-cover relative z-10 transition-all duration-700 group-hover:scale-105 mix-blend-normal opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/90 via-transparent to-transparent opacity-60 z-20"></div>
                  </div>

                  {/* UI Elements */}
                  <div className="absolute -top-4 -right-8 glass p-3 rounded-xl border-cyan-500/20 animate-float z-30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md">
                     <div className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase mb-0.5">Location</div>
                     <div className="text-xs font-bold text-white uppercase tracking-tighter">Canada // ON</div>
                  </div>
                  <div className="absolute -bottom-4 -left-8 glass p-3 rounded-xl border-emerald-500/20 animate-float z-30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md" style={{ animationDelay: '-2s' }}>
                     <div className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase mb-0.5">Exp_Status</div>
                     <div className="text-xs font-bold text-white uppercase tracking-tighter">14+ Cycles</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer z-20 hover:text-cyan-400 transition-colors" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-[10px] text-cyan-500/50 uppercase tracking-[0.3em]">Explore System</span>
          <svg className="w-4 h-4 text-cyan-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>



      {/* Professional Experience */}
      <section id="experience" className="py-40 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-24 space-y-4 text-center lg:text-left">
            <h2 className="text-emerald-400 text-xs font-bold uppercase tracking-[0.4em]">Chronological_Nodes</h2>
            <h3 className="text-6xl font-display font-bold">Service Timeline.</h3>
          </div>

          <div className="space-y-32">
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="resume-line group animate-in fade-in slide-in-from-bottom-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-4">
                       <span className="px-3 py-1 glass border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-bold">{exp.period}</span>
                    </div>
                    <h4 className="text-3xl font-bold text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{exp.company}</h4>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{exp.location}</p>
                  </div>
                  
                  <div className="lg:col-span-8 space-y-8 glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 blur-[50px] rounded-full"></div>
                    
                    <div className="space-y-4 relative z-10">
                      <h5 className="text-2xl font-bold text-slate-200 uppercase tracking-tight">{exp.role}</h5>
                      {exp.project && (
                        <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-bold rounded-xl uppercase tracking-[0.2em]">
                          DEPLOYMENT: {exp.project}
                        </div>
                      )}
                      <p className="text-slate-400 text-lg leading-relaxed font-light py-4 border-b border-white/5">{exp.description}</p>
                    </div>
                    
                    <ul className="grid grid-cols-1 gap-6 relative z-10">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-4 text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-all">
                          <span className="text-cyan-500 font-bold">/</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {exp.recognition && (
                      <div className="flex items-center gap-4 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-[11px] text-emerald-400 font-bold uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        CORE_MERIT: {exp.recognition}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 bg-slate-950/40 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-24 space-y-4">
            <h2 className="text-purple-400 text-xs font-bold uppercase tracking-[0.4em]">Architectural_Nexus</h2>
            <h3 className="text-6xl font-display font-bold">Neural Projects.</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {resumeData.projects.map((project) => (
              <div key={project.id} className="glass p-12 rounded-[4rem] border-white/5 flex flex-col group hover:border-cyan-500/20 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-5 group-hover:opacity-20 transition-opacity">
                   <ProjectSketch type={project.category} />
                </div>

                <div className="w-full aspect-video mb-12 bg-slate-900/80 rounded-[2.5rem] border border-white/5 overflow-hidden relative flex items-center justify-center">
                  <div className="w-48 h-48">
                    <ProjectSketch type={project.category} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-950/80 border border-white/10 rounded-lg text-[9px] text-slate-400 uppercase font-bold tracking-widest">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 flex-1 flex flex-col">
                  <div>
                    <h4 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">{project.subtitle}</p>
                  </div>
                  
                  <p className="text-slate-400 text-lg leading-relaxed font-light">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5 mt-auto">
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Deployment_Impact</span>
                      <p className="text-slate-200 text-sm font-bold uppercase tracking-tighter">{project.impact}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Operational_Role</span>
                      <p className="text-slate-200 text-sm font-bold uppercase tracking-tighter">{project.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-40 relative border-t border-white/5 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="mb-24 space-y-4 text-center">
            <h2 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.4em] animate-pulse">Credentials_Verified</h2>
            <h3 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Certifications.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resumeData.certifications.map((cert, idx) => (
              <div key={idx} className="group relative">
                {/* Popover Preview */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 glass p-4 rounded-xl border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 pointer-events-none z-20 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-b border-r border-cyan-500/30 rotate-45"></div>
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Source_Link</span>
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
                          </div>
                      </div>
                      <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 p-2 rounded-lg justify-center">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          Click to View Credential
                      </div>
                    </div>
                </div>

                {/* Main Card */}
                <a 
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block h-full glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] group ${!cert.link ? 'pointer-events-none' : ''}`}
                >
                  {/* Futuristic Corner Accents */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Background Glow */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-700"></div>

                  {/* Top Right Status Icon */}
                  <div className="absolute top-6 right-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:bg-emerald-500/20 transition-all">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Main Icon */}
                    <div className="mb-6">
                       <div className="w-14 h-14 bg-slate-900/50 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500">
                          <svg className="w-7 h-7 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                       </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h4 className="text-xl font-display font-medium text-slate-100 leading-snug mb-2 group-hover:text-cyan-400 transition-colors min-h-[3.5rem]">{cert.title}</h4>
                      
                      <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-cyan-500/20 transition-colors">
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-cyan-500 font-mono tracking-wider mb-1">{cert.date}</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{cert.issuer}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section id="skills" className="py-40 border-b border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto">
            <div className="lg:w-1/3 space-y-8">
              <div className="space-y-4">
                <h2 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.4em]">Capabilities_Matrix</h2>
                <h3 className="text-5xl font-display font-bold">Technical Genome.</h3>
              </div>
              <p className="text-slate-500 leading-relaxed text-lg">
                High-fidelity proficiency across the modern UI stack, specialized in architectural scaling.
              </p>
              <div className="flex flex-wrap gap-3 pt-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      selectedCategory === cat 
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                        : 'bg-slate-900/50 text-slate-500 border border-white/5 hover:text-white hover:border-cyan-500/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredSkills.map((skill, index) => (
                <div key={skill.name} className="glass p-8 rounded-[2rem] border-white/5 group relative overflow-hidden transition-all hover:border-cyan-500/20">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <span className="text-4xl font-display font-bold text-cyan-500">{(index + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="relative z-10 space-y-6">
                    {getSkillIcon(skill.name)}
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1 block">{skill.category}</span>
                        <h4 className="text-xl font-bold text-slate-200 uppercase tracking-tighter">{skill.name}</h4>
                      </div>
                      <span className="text-cyan-400 font-display text-lg font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-1500 ease-out" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-48 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none">
              Initialize <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Nexus Link.</span>
            </h2>
            <div className="space-y-8">
              <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
                Ready to deploy advanced UI architectures and lead strategic frontend evolution in your ecosystem.
              </p>
              <div className="flex flex-col items-center gap-4 glass max-w-md mx-auto p-6 rounded-[2rem] border-cyan-500/10">
                <div className="flex items-center gap-4 text-cyan-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-display font-bold text-xl tracking-tighter">{resumeData.personal.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-emerald-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002-2z" />
                  </svg>
                  <span className="font-display font-bold text-lg tracking-tighter">{resumeData.personal.email}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
              <button 
                onClick={openAgent}
                className="w-full sm:w-auto px-16 py-6 bg-white text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] uppercase tracking-[0.2em] text-[11px]"
              >
                Launch Intelligence
              </button>
              <a 
                href={`mailto:${resumeData.personal.email}`}
                className="w-full sm:w-auto px-16 py-6 glass border-white/10 hover:border-cyan-500/30 font-bold rounded-2xl transition-all uppercase tracking-[0.2em] text-[11px] text-white"
              >
                Send Packet
              </a>
            </div>

            <div className="pt-32 flex flex-wrap justify-center gap-16 opacity-10">
              <span className="font-display font-bold text-2xl tracking-[0.5em]">ROCHE</span>
              <span className="font-display font-bold text-2xl tracking-[0.5em]">BMC</span>
              <span className="font-display font-bold text-2xl tracking-[0.5em]">COGNIZANT</span>
              <span className="font-display font-bold text-2xl tracking-[0.5em]">EBIX</span>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
      <Analytics />
      <SpeedInsights />
    </Layout>
  );
};

export default App;
