import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Editor from './components/Editor';
import ChatbotBuilder from './components/ChatbotBuilder';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);

  const renderView = () => {
    switch (currentView) {
      case ViewState.LANDING:
        return <LandingPage navigate={setCurrentView} />;
      case ViewState.AUTH:
        return <Auth navigate={setCurrentView} />;
      case ViewState.EDITOR:
        return <Editor navigate={setCurrentView} />;
      case ViewState.CHATBOT_BUILDER:
        return <ChatbotBuilder navigate={setCurrentView} />;
      default:
        return <LandingPage navigate={setCurrentView} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-quantum-accent selection:text-black">
      {renderView()}
    </main>
  );
};

export default App;