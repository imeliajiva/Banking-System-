/**
 * A safe, lightweight formatter to convert specific Markdown syntax from the prompts
 * into HTML strings. Not a full parser, but handles the prompt's specific requirements.
 */
export const formatMarkdown = (text: string): string => {
  if (!text) return '';

  let formatted = text
    // Sanitize HTML slightly (prevent basic injection, though we trust the AI output generally)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

    // Bold (**text**)
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-800">$1</strong>')
    
    // Italic (*text*)
    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')

    // Code blocks/Pre-formatted (`text` or ```block```)
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-100 p-2 rounded text-sm my-2 overflow-x-auto text-slate-800 border border-slate-200">$1</pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono text-red-600 border border-slate-200">$1</code>')

    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2 text-slate-800">$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4 class="text-md font-bold mt-3 mb-1 text-slate-800">$1</h4>')

    // List items
    .replace(/^\s*-\s(.*$)/gm, '<li class="ml-4 list-disc mb-1">$1</li>')
    .replace(/^\s*\d+\.\s(.*$)/gm, '<li class="ml-4 list-decimal mb-1">$1</li>')

    // Horizontal Rules
    .replace(/^\s*---\s*$/gm, '<hr class="my-4 border-slate-200" />')

    // Line breaks
    .replace(/\n/g, '<br />');

  // Wrap lists in ul/ol if possible (simple heuristic)
  // This is a naive implementation; complex nested lists might strictly need a real parser, 
  // but for the prompt's output, line-by-line <br> is usually sufficient or single <li>
  
  return formatted;
};
