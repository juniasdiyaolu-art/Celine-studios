import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  MessageCircle,
  ArrowRight,
  RefreshCw,
  User,
  Bot
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CelineAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomRequest: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; url?: string }[];
}

export const CelineAIAssistant: React.FC<CelineAIAssistantProps> = ({
  isOpen,
  onClose,
  onOpenCustomRequest
}) => {
  const { siteSettings, buildWhatsAppUrl, recordAnalyticsEvent } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Welcome to Celine Studio. I am Celine AI, your personal style concierge. Whether you're searching for an immaculate Senator outfit, a bespoke wedding gown, or need advice on Dutch wax styling, I'm here to assist you.",
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Start Custom Request', action: 'custom' },
        { label: 'Talk to Celine Studio on WhatsApp', action: 'whatsapp' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What should I wear to a traditional Nigerian wedding?",
    "Tell me about the men's Sovereign Senator suit",
    "How does the custom ordering process work?",
    "Where is Celine Studio located and what are your hours?",
    "Can I bring my own lace or Hollandais fabric?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    recordAnalyticsEvent('ai_chat', 'question', text.slice(0, 40));

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversationHistory: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Thank you for reaching out. Connect with our master tailor on WhatsApp at 09124465224 for prompt personal assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions || [
          { label: 'Start Custom Request', action: 'custom' },
          { label: 'Chat on WhatsApp', action: 'whatsapp', url: 'https://wa.me/2349124465224' }
        ]
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      // Fallback
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "At Celine Studio, our master designers in Iyana-Isashi, Nigeria craft custom dresses, Senator suits, and luxury native pieces. Would you like to submit your custom specifications or speak directly with our head tailor on WhatsApp?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            { label: 'Start Custom Request', action: 'custom' },
            { label: 'Chat on WhatsApp', action: 'whatsapp', url: 'https://wa.me/2349124465224' }
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: string, url?: string) => {
    if (action === 'custom') {
      onClose();
      onOpenCustomRequest();
    } else if (action === 'whatsapp') {
      const targetUrl = url || buildWhatsAppUrl("Hello Celine Studio, I was consulting Celine AI and would like to speak directly with your stylist.");
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      id="ai-assistant-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="ai-assistant-modal-container"
        onClick={e => e.stopPropagation()}
        className="relative bg-[#111116] border border-[#2e2e3a] rounded-2xl w-full max-w-2xl h-[85vh] max-h-[720px] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-4 sm:px-5 py-4 border-b border-[#202028] bg-[#14141c] flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg text-[#f5f3ef] font-medium tracking-wide truncate">
                  Celine AI Fashion Concierge
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] text-[10px] font-bold shrink-0">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-[#8e8c85] truncate">
                Bespoke Nigerian Couture Guidance & Styling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={buildWhatsAppUrl("Hello Celine Studio, I was consulting Celine AI and would like to speak directly with your stylist.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Talk to Celine Studio on WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8e8c85] hover:text-white hover:bg-[#1e1e28] transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#1e1e28] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed break-words overflow-hidden ${
                  msg.sender === 'user'
                    ? 'bg-[#c5a880] text-[#0c0c0e] font-medium'
                    : 'bg-[#181822] text-[#dedcd5] border border-[#272733]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Suggested actions from AI */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#2d2d3c] flex flex-wrap gap-2">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act.action, act.url)}
                        className="px-3 py-1 rounded-full bg-[#20202e] text-[#c5a880] hover:bg-[#2b2b3e] text-[11px] font-semibold tracking-wide border border-[#c5a880]/30 flex items-center gap-1.5 transition-colors"
                      >
                        {act.action === 'whatsapp' ? (
                          <MessageCircle className="w-3 h-3 fill-current text-[#25D366]" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span
                  className={`block text-[10px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-[#0c0c0e]/70 text-right' : 'text-[#7e7c75]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#282836] flex items-center justify-center text-[#dedcd5] shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#1e1e28] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#181822] border border-[#272733] rounded-2xl px-4 py-3 text-xs text-[#a6a49e] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c5a880]" />
                <span>Consulting Celine Studio fashion archives...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 border-t border-[#1e1e26] bg-[#121218] overflow-x-auto shrink-0 flex gap-2">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-[#181822] text-[#b8b6af] hover:text-[#f5f3ef] hover:border-[#c5a880]/50 border border-[#23232e] text-[11px] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#202028] bg-[#14141c] shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask about styles, custom gowns, Senator fits, fabrics..."
              className="flex-1 px-4 py-3 rounded-full bg-[#0d0d10] border border-[#262632] text-sm text-[#f5f3ef] placeholder-[#6e6c65] focus:outline-none focus:border-[#c5a880]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-full bg-[#c5a880] text-[#0c0c0e] hover:bg-[#d6be9a] disabled:opacity-40 transition-colors shadow-md shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
