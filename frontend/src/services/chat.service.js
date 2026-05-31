/**
 * Portfolio Chat Service
 * Local AI responses using portfolio training data, with optional Base44 agent fallback.
 */

import { findChatResponse } from '@/data/chat.data';
import { db } from '@/lib/db';

async function tryAgentResponse(conversationRef, content) {
  if (!db?.agents?.createConversation || !db?.agents?.addMessage) {
    return null;
  }

  let conv = conversationRef.current;
  if (!conv?.id) {
    conv = await db.agents.createConversation({ agent_name: 'portfolio_assistant' });
    conversationRef.current = conv;
  }

  const response = await db.agents.addMessage(conv, { role: 'user', content });
  if (response?.content) return response;
  return null;
}

export async function sendChatMessage(content, conversationRef = { current: null }) {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  await delay(350 + Math.random() * 450);

  try {
    const agentReply = await tryAgentResponse(conversationRef, content);
    if (agentReply?.content) {
      return { role: 'assistant', content: agentReply.content };
    }
  } catch (err) {
    console.warn('[Chat] Agent API unavailable, using local responses:', err?.message || err);
  }

  return { role: 'assistant', content: findChatResponse(content) };
}

export const CHAT_OPEN_EVENT = 'portfolio-chat:open';

export function openPortfolioChat() {
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT));
}

export default {
  sendChatMessage,
  openPortfolioChat,
  CHAT_OPEN_EVENT,
};
