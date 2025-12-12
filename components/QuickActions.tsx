import React from 'react';
import { QUICK_ACTIONS } from '../constants';

interface QuickActionsProps {
  onActionClick: (text: string) => void;
  disabled: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, disabled }) => {
  return (
    <div className="py-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-2 px-4 border-t border-slate-100 bg-white">
      {QUICK_ACTIONS.map((action, index) => (
        <button
          key={index}
          onClick={() => onActionClick(action.text)}
          disabled={disabled}
          className="inline-flex items-center px-3 py-1.5 border border-slate-200 shadow-sm text-xs font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
