import React, { useState } from 'react';
import { ViewState } from '../types';
import { NeonButton } from './ui/NeonButton';
import { Input } from './ui/Input';
import { ShieldCheck, UserPlus, LogIn, ScanFace } from 'lucide-react';
import NeuralBackground from './NeuralBackground';
import { playSuccessSound, playClickSound } from '../utils/audio';

interface AuthProps {
  navigate: (view: ViewState) => void;
}

const Auth: React.FC<AuthProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: 'login' | 'signup') => {
    if (tab !== activeTab) {
        playClickSound();
        setActiveTab(tab);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock Authentication delay
    setTimeout(() => {
      setLoading(false);
      playSuccessSound();
      navigate(ViewState.EDITOR);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-quantum-900 overflow-hidden">
      <NeuralBackground />
      
      {/* Floating ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-quantum-accent/5 rounded-full blur-3xl animate-pulse duration-[4s]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-quantum-secondary/5 rounded-full blur-3xl animate-pulse delay-1000 duration-[5s]"></div>

      <div className="relative z-20 w-full max-w-md mx-4">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black overflow-hidden transition-all duration-500 hover:shadow-neon-blue hover:border-slate-700 group">
          
          {/* Tab Header - Perfectly Arranged */}
          <div className="flex w-full h-16 border-b border-slate-800 relative bg-slate-900/50">
             {/* Animated Indicator Line */}
             <div 
               className={`absolute bottom-0 h-[2px] bg-gradient-to-r from-quantum-accent to-quantum-secondary transition-all duration-300 ease-out z-10`}
               style={{ 
                 width: '50%', 
                 left: activeTab === 'login' ? '0%' : '50%',
                 boxShadow: '0 -2px 10px rgba(0, 240, 255, 0.5)' 
               }}
             />

             <button
               type="button"
               onClick={() => handleTabChange('login')}
               className={`flex-1 h-full flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 outline-none ${
                 activeTab === 'login' 
                 ? 'text-white bg-slate-800/40' 
                 : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/20'
               }`}
             >
               <LogIn size={16} className={`transition-colors ${activeTab === 'login' ? 'text-quantum-accent' : 'text-slate-600'}`} /> 
               Access Terminal
             </button>
             
             <button
               type="button"
               onClick={() => handleTabChange('signup')}
               className={`flex-1 h-full flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 outline-none ${
                 activeTab === 'signup' 
                 ? 'text-white bg-slate-800/40' 
                 : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/20'
               }`}
             >
               <UserPlus size={16} className={`transition-colors ${activeTab === 'signup' ? 'text-quantum-secondary' : 'text-slate-600'}`} /> 
               New Profile
             </button>
          </div>

          <div className="p-8 pt-10">
            {/* Icon & Title Section */}
            <div className="text-center mb-8 transition-all duration-500">
               <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 border transition-all duration-500 shadow-lg ${
                 activeTab === 'login' 
                   ? 'bg-quantum-accent/5 text-quantum-accent border-quantum-accent/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]' 
                   : 'bg-quantum-secondary/5 text-quantum-secondary border-quantum-secondary/30 shadow-[0_0_20px_rgba(255,0,153,0.1)]'
               }`}>
                 {activeTab === 'login' ? <ShieldCheck size={40} className="animate-pulse-fast" /> : <ScanFace size={40} className="animate-pulse-fast" />}
               </div>
               
               <h2 className="text-2xl font-bold text-white tracking-tight">
                 {activeTab === 'login' ? 'Identity Verification' : 'Create Operative ID'}
               </h2>
               <p className={`text-xs font-mono mt-3 uppercase tracking-wide transition-colors duration-300 ${activeTab === 'login' ? 'text-quantum-accent/70' : 'text-quantum-secondary/70'}`}>
                 {activeTab === 'login' ? '>> Secure Channel Established <<' : '>> Initializing Neural Link <<'}
               </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-2">
              {/* Animated Height Container for Name */}
               <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeTab === 'signup' ? 'max-h-24 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
                  <Input label="Operative Codename" type="text" placeholder="e.g. Alex Cipher" required={activeTab === 'signup'} />
               </div>

              <Input label="Communication ID (Email)" type="email" placeholder="unit@quantum.dev" required />
              <Input label="Security Key" type="password" placeholder="••••••••" required />

              <div className="pt-6">
                <NeonButton fullWidth type="submit" disabled={loading} variant={activeTab === 'login' ? 'primary' : 'secondary'}>
                  {loading ? (
                    <span className="animate-pulse flex items-center justify-center gap-2">
                       <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                       Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {activeTab === 'login' ? 'Authenticate' : 'Register Unit'}
                    </span>
                  )}
                </NeonButton>
              </div>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-8 text-slate-600 text-[10px] font-mono tracking-widest opacity-60">
          QUANTUM DEVSTUDIO | ENCRYPTION LEVEL: MILITARY-GRADE
        </div>
      </div>
    </div>
  );
};

export default Auth;