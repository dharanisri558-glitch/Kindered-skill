import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Send, 
  X, 
  Minus, 
  RotateCcw, 
  Check, 
  Copy, 
  Bot, 
  User, 
  ArrowUpRight, 
  HelpCircle,
  Clock,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export const N8N_CHAT_WEBHOOK_URL = 'https://dharanisri.app.n8n.cloud/webhook/d94bedae-1948-4c1d-859e-43506ccbacf5/chat';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'Who can teach me sourdough baking?',
  'Find an acoustic guitar teacher in Grand Lake',
  'How does the 1:1 hour ledger work?',
  'Help me propose a skill swap'
];

export const N8nChatWidget: React.FC = () => {
  const { currentUser, isAiChatOpen, setIsAiChatOpen, setActiveTab, setSelectedCategory } = useApp();
  
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(`kindred_n8n_chat_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'welcome-1',
        sender: 'agent',
        text: `Hello ${currentUser.name.split(' ')[0]}! Welcome to **KindredSkill**.\n\nI'm your community skill-swapping assistant powered by n8n. Ask me about finding local teachers, reciprocal matches, upcoming appointments, or how our zero-cost barter system works. How can I help you today?`,
        timestamp: 'Just now'
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync messages to localStorage per active user
  useEffect(() => {
    try {
      localStorage.setItem(`kindred_n8n_chat_${currentUser.id}`, JSON.stringify(messages));
    } catch {}
  }, [messages, currentUser.id]);

  useEffect(() => {
    if (isAiChatOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiChatOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isAiChatOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isAiChatOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // sessionId formatted for persistence & context
      const sessionId = `kindred-user-${currentUser.id}`;

      const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          chatInput: messageText,
          sessionId: sessionId,
          message: messageText, // fallback compatibility
          user: {
            id: currentUser.id,
            name: currentUser.name,
            neighborhood: currentUser.neighborhood,
            hoursGiven: currentUser.hoursGiven,
            hoursReceived: currentUser.hoursReceived
          }
        })
      });

      if (!response.ok) {
        throw new Error(`n8n response returned status ${response.status}`);
      }

      const responseData = await response.json().catch(async () => {
        const text = await response.text();
        return { output: text };
      });

      // Extract output from various standard n8n chat response formats
      let replyText = '';
      if (typeof responseData === 'string') {
        replyText = responseData;
      } else if (Array.isArray(responseData) && responseData.length > 0) {
        replyText = responseData[0].output || responseData[0].text || responseData[0].response || JSON.stringify(responseData[0]);
      } else if (responseData && typeof responseData === 'object') {
        replyText = responseData.output || responseData.text || responseData.response || responseData.message || responseData.result || JSON.stringify(responseData);
      }

      if (!replyText || replyText === '{}') {
        replyText = "I processed your request with the KindredSkill database. Let me know if you would like me to connect you with a neighborhood teacher or find an appointment slot!";
      }

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error connecting to n8n chat webhook:', error);
      const errorMessage: Message = {
        id: `agent-err-${Date.now()}`,
        sender: 'agent',
        text: `⚠️ I had trouble connecting to the n8n agent workflow (${error instanceof Error ? error.message : 'Network error'}).\n\nPlease check that your n8n workflow is active and allows incoming requests.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const initialMsg: Message = {
      id: `welcome-${Date.now()}`,
      sender: 'agent',
      text: `Conversation reset. How can I help you explore skills or coordinate with your neighbors in **${currentUser.neighborhood}**?`,
      timestamp: 'Just now'
    };
    setMessages([initialMsg]);
    try {
      localStorage.removeItem(`kindred_n8n_chat_${currentUser.id}`);
    } catch {}
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simple Markdown-to-HTML parser for bolding, linebreaks, and list items
  const renderFormattedText = (rawText: string) => {
    return rawText.split('\n').map((line, idx) => {
      // Bold syntax **text**
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li 
            key={idx} 
            className="ml-4 list-disc my-0.5" 
            dangerouslySetInnerHTML={{ __html: formattedLine.slice(2) }} 
          />
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p 
          key={idx} 
          className="my-0.5" 
          dangerouslySetInnerHTML={{ __html: formattedLine }} 
        />
      );
    });
  };

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Right) */}
      {!isAiChatOpen && (
        <button
          onClick={() => {
            setIsAiChatOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 bg-slate-900 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/60 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
          title="Chat with KindredSkill AI Community Assistant"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ring-2 ring-slate-900" />
          </div>
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* Floating Chat Modal Panel */}
      {isAiChatOpen && (
        <div 
          className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white">
                    KindredSkill AI Guide
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-300 font-mono">
                  n8n Community Agent · Active
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsAiChatOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content Body (when not minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Scroll Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-xs">
                
                {/* Integration Trust Notice */}
                <div className="p-2.5 bg-emerald-50/80 border border-emerald-200/80 rounded-xl text-[11px] text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="leading-tight">
                    Connected live to your n8n workflow for neighborhood matching & knowledge exchange.
                  </span>
                </div>

                {/* Messages List */}
                {messages.map((msg) => {
                  const isAgent = msg.sender === 'agent';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-start gap-2 max-w-[88%]">
                        {isAgent && (
                          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div className="space-y-1">
                          <div
                            className={`p-3 rounded-2xl leading-relaxed ${
                              isAgent
                                ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                                : 'bg-emerald-700 text-white rounded-tr-xs shadow-xs'
                            }`}
                          >
                            <div className="space-y-0.5">
                              {renderFormattedText(msg.text)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400 font-mono">
                            <span>{msg.timestamp}</span>
                            {isAgent && (
                              <button
                                onClick={() => handleCopy(msg.id, msg.text)}
                                className="hover:text-slate-600 flex items-center gap-1 transition-colors"
                                title="Copy message"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                    <span className="text-emerald-600">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-2.5 h-2.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] text-slate-500 ml-1">Consulting n8n agent...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Starter Quick Chips (if only 1 or 2 messages) */}
              {messages.length <= 2 && (
                <div className="p-2.5 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors border border-slate-200/60 text-left truncate max-w-full"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }} 
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about skills, teachers, swaps..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition-colors shadow-xs shrink-0"
                  title="Send to AI Assistant"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
