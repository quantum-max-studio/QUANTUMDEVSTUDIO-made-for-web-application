import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { INITIAL_CODE_STATE } from '../constants';
import { generateWebsiteContent } from '../services/geminiService';
import { playSuccessSound, playClickSound } from '../utils/audio';
import { NeonButton } from './ui/NeonButton';
import { 
  Cpu, 
  Code, 
  Play, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Link as LinkIcon,
  Settings,
  LogOut,
  Bot
} from 'lucide-react';

interface EditorProps {
  navigate: (view: ViewState) => void;
}

const Editor: React.FC<EditorProps> = ({ navigate }) => {
  const [code, setCode] = useState(INITIAL_CODE_STATE);
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update iframe content when code changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  }, [code]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    playClickSound();

    try {
      const generated = await generateWebsiteContent(apiKey, prompt, uploadedFiles);
      setCode(generated);
      playSuccessSound();
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUploadMock = (type: string) => {
    playClickSound();
    setUploadedFiles(prev => [...prev, `${type}_${Date.now()}`]);
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-quantum-accent to-blue-600 flex items-center justify-center">
            <Cpu className="text-black" size={18} />
          </div>
          <span className="font-bold text-white tracking-tight">QUANTUM <span className="text-quantum-accent font-light">DEVSTUDIO</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(ViewState.CHATBOT_BUILDER)}
            className="flex items-center gap-2 text-xs font-mono text-quantum-secondary hover:text-white transition-colors border border-quantum-secondary/30 px-3 py-1.5 rounded bg-quantum-secondary/5"
          >
            <Bot size={14} />
            CHATBOT BUILDER
          </button>
          <div className="h-4 w-[1px] bg-slate-700"></div>
          <button onClick={() => navigate(ViewState.LANDING)} className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Development Workspace (65%) */}
        <div className="w-[65%] flex flex-col border-r border-slate-800 bg-[#0B0F19]">
          
          {/* Top: Live Preview (70%) */}
          <div className="h-[70%] relative bg-slate-900/50">
             <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/50 backdrop-blur text-[10px] text-quantum-success font-mono uppercase border border-quantum-success/30 rounded">
               Live Output Stream
             </div>
             <iframe 
               ref={iframeRef}
               title="Preview" 
               className="w-full h-full bg-white"
               sandbox="allow-scripts"
             />
          </div>

          {/* Bottom: Code Editor (30%) */}
          <div className="h-[30%] flex flex-col border-t border-slate-800 bg-[#0d1117]">
            <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 text-xs text-slate-400 gap-4 select-none">
              <span className="flex items-center gap-1 text-quantum-accent"><Code size={12} /> index.html</span>
              <span className="hover:text-white cursor-pointer">styles.css</span>
              <span className="hover:text-white cursor-pointer">script.js</span>
            </div>
            <div className="flex-1 flex overflow-hidden relative group">
              {/* Mock Line Numbers */}
              <div className="w-12 bg-slate-900 text-slate-600 text-xs font-mono py-4 text-right pr-3 select-none leading-6 border-r border-slate-800">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              {/* Editor Area */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-transparent text-slate-300 p-4 font-mono text-sm resize-none focus:outline-none leading-6"
                spellCheck={false}
              />
              {/* Mock Error Indicator */}
              <div className="absolute bottom-4 right-4 flex gap-2 text-xs font-mono">
                 <span className="text-green-500 flex items-center gap-1">● READY</span>
                 <span className="text-slate-600">UTF-8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: AI Control Center (35%) */}
        <div className="w-[35%] bg-slate-950 flex flex-col p-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Settings className="text-quantum-accent animate-spin-slow" /> 
            Control Center
          </h2>

          {/* API Key */}
          <div className="mb-6">
            <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Gemini API Key</label>
            <div className="relative">
              <input 
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste API Key..."
                className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-sm text-white focus:border-quantum-accent focus:outline-none font-mono"
              />
              <button 
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-3 text-slate-500 hover:text-white text-xs uppercase font-bold"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-1">Key stored securely in session memory.</p>
          </div>

          {/* Prompt */}
          <div className="mb-6 flex-1 flex flex-col">
            <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Generation Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your futuristic website (e.g., 'Dark mode e-commerce site for neon sneakers with a hero section and product grid')..."
              className="w-full flex-1 min-h-[150px] bg-slate-900 border border-slate-800 rounded p-4 text-sm text-white focus:border-quantum-accent focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Upload Zone */}
          <div className="mb-8">
            <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Knowledge Context</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleUploadMock('img')} className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-600 rounded transition-all text-xs text-slate-300">
                <ImageIcon size={14} /> Image
              </button>
              <button onClick={() => handleUploadMock('vid')} className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-600 rounded transition-all text-xs text-slate-300">
                <Video size={14} /> Video
              </button>
              <button onClick={() => handleUploadMock('doc')} className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-600 rounded transition-all text-xs text-slate-300">
                <FileText size={14} /> Doc
              </button>
              <button onClick={() => handleUploadMock('url')} className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-600 rounded transition-all text-xs text-slate-300">
                <LinkIcon size={14} /> Link
              </button>
            </div>
            {/* Mock Uploaded Files Chips */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {uploadedFiles.map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded bg-quantum-accent/10 text-quantum-accent border border-quantum-accent/30 flex items-center gap-1">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Generate Button */}
          <NeonButton 
            onClick={handleGenerate} 
            disabled={isGenerating}
            fullWidth
            className="h-16 text-lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-t-transparent border-quantum-accent rounded-full animate-spin"></div>
                <span>SYNTHESIZING...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play fill="currentColor" size={20} />
                GENERATE WEBSITE
              </div>
            )}
          </NeonButton>

        </div>
      </div>
    </div>
  );
};

export default Editor;