import React from 'react';
import NeuralBackground from './NeuralBackground';
import { NeonButton } from './ui/NeonButton';
import { ViewState } from '../types';
import { ArrowRight, Cpu, Zap, Code2, Terminal, Layers, Shield } from 'lucide-react';

interface LandingPageProps {
  navigate: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  return (
    <div className="relative w-full bg-slate-950 text-slate-200 selection:bg-quantum-accent selection:text-black">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        <NeuralBackground />
      </div>

      {/* Scrollable Content Layer */}
      <div className="relative z-10 flex flex-col">
        
        {/* HERO SECTION - Full Viewport Height */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative">
          <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-xs font-mono text-quantum-accent mb-8 animate-pulse-fast backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-quantum-accent"></span>
              SYSTEM ONLINE v2.5.0
            </div>

            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-none">
              <span className="text-white">BUILD THE </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-accent to-quantum-secondary drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                FUTURE
              </span>
              <br />
              <span className="text-white text-4xl md:text-7xl opacity-90 mt-2 block">WRITE ZERO CODE.</span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-quantum-accent to-transparent mb-8 opacity-50"></div>

            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
              Quantum DevStudio harnesses advanced Gemini models to generate production-ready web applications in seconds. 
              Step into the era of hyper-efficient development.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-md">
              <NeonButton onClick={() => navigate(ViewState.AUTH)} className="w-full sm:w-auto min-w-[200px] text-lg py-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                Initialize <ArrowRight className="w-5 h-5" />
              </NeonButton>
              <NeonButton variant="outline" onClick={() => navigate(ViewState.AUTH)} className="w-full sm:w-auto min-w-[200px] text-lg py-4 backdrop-blur-sm bg-slate-900/50">
                Secure Login
              </NeonButton>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 animate-bounce text-slate-500 flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Explore</span>
            <ArrowRight className="rotate-90 w-4 h-4" />
          </div>
        </section>

        {/* FEATURES GRID - Scrollable */}
        <section className="py-32 bg-slate-950/80 backdrop-blur-lg border-t border-slate-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">CORE ARCHITECTURE</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Advanced capabilities designed for next-generation development workflows.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-quantum-accent/50 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-1 shadow-lg">
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-quantum-accent/10 transition-colors">
                  <Cpu className="text-quantum-accent w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Neural Engine</h3>
                <p className="text-slate-400 leading-relaxed">Powered by Gemini 2.5 Flash. Processes complex prompts into semantic HTML/Tailwind structures instantly.</p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-quantum-secondary/50 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-1 shadow-lg">
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-quantum-secondary/10 transition-colors">
                  <Zap className="text-quantum-secondary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Live Synthesis</h3>
                <p className="text-slate-400 leading-relaxed">Real-time preview rendering. Watch your code manifest as you type or generate. Zero latency updates.</p>
              </div>

              <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-quantum-success/50 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-1 shadow-lg">
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-quantum-success/10 transition-colors">
                  <Code2 className="text-quantum-success w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Clean Code</h3>
                <p className="text-slate-400 leading-relaxed">Export production-ready code. Fully accessible, responsive, and optimized for modern browsers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section className="py-32 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-80"></div>
           <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col md:flex-row items-center gap-16">
               <div className="w-full md:w-1/2">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                   FROM PROMPT <br/> TO <span className="text-quantum-accent">PRODUCTION</span>
                 </h2>
                 <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                   Bypass the boilerplate. Our AI understands design systems, UI/UX principles, and modern component architecture. 
                   Focus on the vision, not the syntax.
                 </p>
                 <ul className="space-y-4">
                   <li className="flex items-center gap-3 text-slate-400">
                     <Terminal className="text-quantum-secondary w-5 h-5" />
                     <span>Natural Language Processing</span>
                   </li>
                   <li className="flex items-center gap-3 text-slate-400">
                     <Layers className="text-quantum-secondary w-5 h-5" />
                     <span>Component-Based Generation</span>
                   </li>
                   <li className="flex items-center gap-3 text-slate-400">
                     <Shield className="text-quantum-secondary w-5 h-5" />
                     <span>Secure API Integration</span>
                   </li>
                 </ul>
               </div>
               <div className="w-full md:w-1/2">
                 <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl shadow-quantum-accent/10 bg-slate-900">
                    {/* Mock Window Header */}
                    <div className="h-8 bg-slate-800 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-6 font-mono text-xs md:text-sm text-slate-300 space-y-2 opacity-80">
                      <p><span className="text-quantum-secondary">const</span> <span className="text-yellow-400">App</span> = () => {`{`}</p>
                      <p className="pl-4"><span className="text-quantum-secondary">return</span> (</p>
                      <p className="pl-8">&lt;<span className="text-quantum-accent">QuantumDevStudio</span> /&gt;</p>
                      <p className="pl-4">);</p>
                      <p>}</p>
                      <p className="text-slate-500">// Generating future...</p>
                      <div className="w-4 h-6 bg-quantum-accent animate-pulse"></div>
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-2xl font-bold tracking-tighter text-white mb-4">
              QUANTUM <span className="text-quantum-accent font-light">DEVSTUDIO</span>
            </div>
            <p className="text-slate-500 text-sm mb-8">
              © 2025 Quantum Systems. All Rights Reserved. <br/>
              Designed for the architects of tomorrow.
            </p>
            <div className="flex justify-center gap-6 text-slate-400 text-sm font-mono">
              <button className="hover:text-quantum-accent transition-colors">Privacy Protocol</button>
              <button className="hover:text-quantum-accent transition-colors">Terms of Access</button>
              <button className="hover:text-quantum-accent transition-colors">System Status</button>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default LandingPage;