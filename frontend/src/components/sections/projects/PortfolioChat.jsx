import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, ChevronRight } from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import { db } from '@/lib/db';

const SUGGESTIONS = [
  'Ask about my projects',
  'Explain my architecture',
  'What tech do I use?',
  'Tell me about Nexus Engine',
];

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-none border border-primary/40 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-3 h-3 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[85%] px-3 py-2 font-mono text-xs leading-[1.7] ${
          isUser
            ? 'bg-primary/20 border border-primary/30 text-foreground'
            : 'bg-card border border-border/50 text-foreground/90'
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:font-mono [&_p]:text-xs [&_strong]:text-primary [&_code]:bg-primary/10 [&_code]:text-primary [&_code]:px-1 [&_ul]:list-disc [&_ul]:pl-4"
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!conversationId) return;
    const unsub = db.agents.subscribeToConversation(conversationId, (data) => {
      setMessages(data.messages || []);
    });
    return unsub;
  }, [conversationId]);

  const initConversation = async () => {
    if (conversationId) return conversationId;
    const conv = await db.agents.createConversation({ agent_name: 'portfolio_assistant' });
    setConversationId(conv.id);
    return conv;
  };

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput('');
    setLoading(true);

    // Optimistic user message
    setMessages(prev => [...prev, { role: 'user', content }]);

    const conv = await initConversation();
    await db.agents.addMessage(conv, { role: 'user', content });
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const visibleMessages = messages.filter(m => m.role === 'user' || (m.role === 'assistant' && m.content));

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-20 left-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-background border border-primary/50 text-primary hover:bg-primary/10 transition-colors duration-200 shadow-lg shadow-primary/10"
        title="Ask AI about my work"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-4 h-4" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageSquare className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="font-mono text-[10px] tracking-widest uppercase">
          {open ? 'Close' : 'Ask AI'}
        </span>
        {!open && (
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-36 left-5 z-50 w-[340px] sm:w-[380px] flex flex-col border border-border/60 bg-background shadow-2xl shadow-black/40"
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-card/50">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <div>
                <div className="font-mono text-xs font-bold text-foreground tracking-wide">Portfolio AI</div>
                <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">Trained on my work</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: '320px' }}>
              {visibleMessages.length === 0 ? (
                <div className="space-y-3">
                  <p className="font-mono text-[11px] text-muted-foreground leading-[1.7]">
                    Hey! I'm an AI trained on this portfolio. Ask me anything about the projects, architecture decisions, or tech stack.
                  </p>
                  <div className="space-y-1.5">
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="w-full flex items-center gap-2 px-3 py-2 border border-border/40 hover:border-primary/40 hover:bg-primary/5 text-left transition-colors group"
                      >
                        <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        <span className="font-mono text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">{s}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                visibleMessages.map((msg, i) => <MessageBubble key={i} message={msg} />)
              )}
              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 border border-primary/40 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  </div>
                  <div className="px-3 py-2 bg-card border border-border/50 flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1 h-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/40 p-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about my work..."
                className="flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground border border-border/40 px-3 py-2 outline-none focus:border-primary/50 transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="p-2 border border-primary/40 text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}