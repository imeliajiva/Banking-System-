import React from 'react';
import { Message, AgentType } from '../types';
import { formatMarkdown } from '../utils/markdown';

interface MessageBubbleProps {
  message: Message;
}

const detectAgent = (text: string): AgentType => {
  if (text.includes('CALL: AMA') || text.includes('**AMA**')) return AgentType.AMA;
  if (text.includes('CALL: TPA') || text.includes('**TPA**')) return AgentType.TPA;
  if (text.includes('CALL: CSA') || text.includes('**CSA**')) return AgentType.CSA;
  if (text.includes('CALL: FRA') || text.includes('**FRA**')) return AgentType.FRA;
  return AgentType.UNKNOWN;
};

const getAgentStyle = (agent: AgentType) => {
  switch (agent) {
    case AgentType.AMA:
      return 'border-l-blue-500 bg-blue-50/50';
    case AgentType.TPA:
      return 'border-l-green-500 bg-green-50/50';
    case AgentType.CSA:
      return 'border-l-purple-500 bg-purple-50/50';
    case AgentType.FRA:
      return 'border-l-orange-500 bg-orange-50/50';
    default:
      return 'border-l-slate-300 bg-white';
  }
};

const getAgentBadge = (agent: AgentType) => {
  switch (agent) {
    case AgentType.AMA: return { label: 'Account Manager', color: 'bg-blue-100 text-blue-700' };
    case AgentType.TPA: return { label: 'Transaction Processor', color: 'bg-green-100 text-green-700' };
    case AgentType.CSA: return { label: 'Customer Support', color: 'bg-purple-100 text-purple-700' };
    case AgentType.FRA: return { label: 'Financial Reporter', color: 'bg-orange-100 text-orange-700' };
    default: return null;
  }
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const agentType = !isUser ? detectAgent(message.text) : AgentType.UNKNOWN;
  const agentBadge = !isUser ? getAgentBadge(agentType) : null;
  const bubbleStyle = !isUser ? getAgentStyle(agentType) : '';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in-up">
        <div className="max-w-[80%] md:max-w-[70%] bg-slate-800 text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md">
          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
          <div className="text-right mt-1">
            <span className="text-xs text-slate-400 opacity-75">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6 animate-fade-in-up">
      <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl rounded-tl-none shadow-sm border border-slate-200 border-l-4 px-6 py-5 ${bubbleStyle}`}>
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/50 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
               </svg>
            </div>
            <span className="font-semibold text-sm text-slate-600">Banking Agent</span>
          </div>
          <span className="text-xs text-slate-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {agentBadge && (
          <div className="mb-3">
             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${agentBadge.color}`}>
                {agentBadge.label}
             </span>
          </div>
        )}

        <div 
          className="prose prose-sm prose-slate max-w-none text-slate-700"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(message.text) }}
        />
      </div>
    </div>
  );
};

export default MessageBubble;
