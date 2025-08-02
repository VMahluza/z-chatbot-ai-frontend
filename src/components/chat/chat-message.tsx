"use client";
import { ChatMessage as ChatMessageType } from "@/app/chat/actions";
import { User, Bot, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useState } from 'react';
import 'highlight.js/styles/github-dark.css';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start gap-3 max-w-[85%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted border border-border"
        )}>
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>

        {/* Message Content */}
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-sm border relative group",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "bg-card text-card-foreground rounded-tl-sm border-border"
        )}>
          {isUser ? (
            // User messages: plain text with better formatting
            <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </div>
          ) : (
            // Bot messages: rendered markdown with enhanced styling
            <div className="prose prose-sm max-w-none dark:prose-invert prose-slate">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  // Headings with better spacing
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold mb-3 mt-0 text-foreground border-b border-border pb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-semibold mb-2 mt-4 text-foreground">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-medium mb-2 mt-3 text-foreground">{children}</h3>
                  ),
                  // Paragraphs with proper spacing
                  p: ({ children }) => (
                    <p className="text-sm mb-3 last:mb-0 text-card-foreground leading-relaxed">{children}</p>
                  ),
                  // Enhanced code blocks with copy functionality
                  code: ({ inline, children, className, ...props }: any) => {
                    const codeText = String(children).replace(/\n$/, '');
                    
                    if (inline) {
                      return (
                        <code 
                          className="bg-muted/80 px-1.5 py-0.5 rounded text-xs font-mono text-foreground border"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code 
                        className={cn("text-xs font-mono", className)} 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  // Enhanced pre blocks with copy button
                  pre: ({ children, ...props }: any) => {
                    // Extract code text safely
                    let codeText = '';
                    let language = 'text';
                    
                    try {
                      if (children && typeof children === 'object' && 'props' in children) {
                        codeText = String((children as any).props?.children || '').replace(/\n$/, '');
                        language = (children as any).props?.className?.replace('language-', '') || 'text';
                      } else {
                        codeText = String(children).replace(/\n$/, '');
                      }
                    } catch {
                      codeText = String(children).replace(/\n$/, '');
                    }
                    
                    return (
                      <div className="relative group/code">
                        <div className="flex items-center justify-between bg-muted/50 border border-border rounded-t-lg px-3 py-2">
                          <span className="text-xs font-medium text-muted-foreground capitalize">
                            {language}
                          </span>
                          <button
                            onClick={() => copyToClipboard(codeText)}
                            className="opacity-0 group-hover/code:opacity-100 transition-opacity p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                            aria-label="Copy code"
                          >
                            {copiedCode === codeText ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                        <pre 
                          className="bg-muted border border-t-0 border-border rounded-b-lg p-3 overflow-x-auto text-xs font-mono my-0" 
                          {...props}
                        >
                          {children}
                        </pre>
                      </div>
                    );
                  },
                  // Enhanced lists
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 mb-3 space-y-1 marker:text-muted-foreground">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 mb-3 space-y-1 marker:text-muted-foreground">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm text-card-foreground leading-relaxed">{children}</li>
                  ),
                  // Better text styling
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-muted-foreground">{children}</em>
                  ),
                  // Enhanced blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary bg-muted/30 pl-4 py-2 italic text-muted-foreground my-3 rounded-r">
                      {children}
                    </blockquote>
                  ),
                  // Better links
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  // Enhanced tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border border-border rounded-lg bg-card">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-muted/50">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border px-3 py-2 text-left font-semibold text-sm text-foreground">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-3 py-2 text-sm text-card-foreground">
                      {children}
                    </td>
                  ),
                  // Horizontal rule
                  hr: () => (
                    <hr className="border-border my-4" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
          
          {/* Timestamp */}
          <div className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}