import React, { useState } from 'react';
import { ViewState } from '../types';
import { NeonButton } from './ui/NeonButton';
import { generateChatbotResponse } from '../services/geminiService';
import { ArrowLeft, Save, MessageSquare, UploadCloud, Palette, Send, Bot } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface ChatbotBuilderProps {
  navigate: (view: ViewState) => void;
}

const ChatbotBuilder: React.FC<ChatbotBuilderProps> = ({ navigate }) => {
  const [persona, setPersona] = useState('You are a helpful AI assistant designed to assist with technical queries.');
  const [primaryColor, setPrimaryColor] = useState('#00F0FF');
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'bot', text: string}[]>([
    {role: 'bot', text: 'Hello! I am your custom AI agent. How can I help you today?'}
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMsg.trim()) return;
    
    const userMsg = inputMsg;
    setInputMsg('');
    setChatHistory(prev => [...prev, {role: 'user', text: userMsg}]);
    
    try {
       const response = await generateChatbotResponse('', persona, userMsg);
       setChatHistory(prev => [...prev, {role: 'bot', text: response}]);
    } catch (e) {
        // ignore
    }
  };

  const handleSave = () => {
      playClickSound();
      setIsSaving(true);
      setTimeout(() => {
          setIsSaving(false);
          alert("Bot Configuration Saved to Firestore (Mock)");
      }, 1000);
  }

  return (
    <div className="h-screen w-full bg-slate-950 text-white flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(ViewState.EDITOR)}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold tracking-wide">CHATBOT <span className="text-quantum-secondary">ARCHITECT</span></h1>
            </div>
            <NeonButton variant="secondary" onClick={handleSave} className="px-8">
                {isSaving ? 'DEPLOYING...' : 'SAVE & DEPLOY'}
            </NeonButton>
        </header>

        <div className="flex-1 flex overflow-hidden">
            {/* Config Panel */}
            <div className="w-1/2 p-8 overflow-y-auto border-r border-slate-800">
                
                <section className="mb-10">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-quantum-accent">
                        <MessageSquare size={18} /> Persona Definition
                    </h2>
                    <p className="text-xs text-slate-400 mb-3">Define the system instructions and personality traits of your agent.</p>
                    <textarea 
                        value={persona}
                        onChange={(e) => setPersona(e.target.value)}
                        className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 focus:border-quantum-accent focus:outline-none resize-none font-mono text-sm"
                    />
                </section>

                <section className="mb-10">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-quantum-accent">
                        <UploadCloud size={18} /> Knowledge Base
                    </h2>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-slate-500 transition-colors cursor-pointer bg-slate-900/30">
                        <p className="text-slate-400 text-sm mb-2">Drag & Drop PDF, DOCX, or TXT files here</p>
                        <span className="text-xs text-slate-600 block">Train your bot on specific documents</span>
                        <button className="mt-4 px-4 py-2 bg-slate-800 rounded text-xs hover:bg-slate-700 transition">Select Files</button>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-quantum-accent">
                        <Palette size={18} /> Appearance
                    </h2>
                    <div className="flex items-center gap-4">
                        <div>
                            <label className="block text-xs text-slate-500 mb-2">Accent Color</label>
                            <input 
                                type="color" 
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="w-12 h-12 rounded cursor-pointer bg-transparent border-none"
                            />
                        </div>
                        <div className="flex-1">
                             <label className="block text-xs text-slate-500 mb-2">Avatar Style</label>
                             <div className="flex gap-2">
                                 {[1,2,3].map(i => (
                                     <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:border-white cursor-pointer flex items-center justify-center">
                                         <Bot size={20} className="text-slate-400" />
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Preview Panel */}
            <div className="w-1/2 bg-[#050505] flex flex-col relative">
                <div className="absolute top-4 left-4 px-2 py-1 bg-quantum-secondary/20 border border-quantum-secondary/50 text-quantum-secondary text-xs font-mono rounded">
                    LIVE PREVIEW
                </div>
                
                {/* Chat Window Mockup */}
                <div className="flex-1 flex flex-col items-center justify-center p-12">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 h-[600px] flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 flex items-center gap-3 border-b border-slate-800" style={{backgroundColor: primaryColor + '10'}}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{backgroundColor: primaryColor}}>
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Quantum Assistant</h3>
                                <span className="text-[10px] text-green-500 flex items-center gap-1">● Online</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950">
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div 
                                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                            msg.role === 'user' 
                                                ? 'bg-slate-700 text-white rounded-tr-none' 
                                                : 'text-white rounded-tl-none'
                                        }`}
                                        style={msg.role === 'bot' ? {backgroundColor: primaryColor} : {}}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-800 bg-slate-900 flex gap-2">
                            <input 
                                type="text" 
                                value={inputMsg}
                                onChange={(e) => setInputMsg(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-quantum-accent"
                            />
                            <button 
                                onClick={handleSendMessage}
                                className="p-2 rounded text-white transition-opacity hover:opacity-80"
                                style={{backgroundColor: primaryColor}}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChatbotBuilder;