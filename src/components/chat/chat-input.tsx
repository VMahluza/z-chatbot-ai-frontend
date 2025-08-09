"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (text: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  onChangeValue?: (v: string) => void;
}

export function ChatInput({ 
  onSendMessage, 
  disabled, 
  placeholder, 
  value, 
  onChangeValue 
}: ChatInputProps) {
  const [localValue, setLocalValue] = useState(value ?? "");
  const [isLoading, setIsLoading] = useState(false);

  // Keep localValue in sync if parent switches from undefined -> some value (rare)
  // but do not overwrite when controlled every keystroke (we already use value directly)
  // Optional:
  // useEffect(() => { if (value !== undefined) setLocalValue(value); }, [value]);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value! : localValue;

  const handleSend = async () => {
    if (!currentValue.trim() || disabled || isLoading) return;

    const messageToSend = currentValue.trim();

    // Optimistically clear
    if (isControlled) {
      onChangeValue?.("");
    } else {
      setLocalValue("");
    }

    setIsLoading(true);
    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Restore on error
      if (isControlled) {
        onChangeValue?.(messageToSend);
      } else {
        setLocalValue(messageToSend);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <form
      className={cn("border-t p-4 bg-background flex-shrink-0")}
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
    >
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            id="chat-input"
            value={currentValue}
            onChange={(e) => {
              if (isControlled) {
                onChangeValue?.(e.target.value);
              } else {
                setLocalValue(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isDisabled}
            className={cn(
              "w-full px-3 py-2 border rounded-md transition-colors resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isDisabled && "bg-muted"
            )}
          />
        </div>
        <Button 
          type="submit"
          onClick={handleSend}
          disabled={isDisabled || !currentValue.trim()}
          size="icon"
          className="shrink-0"
        >
          {isLoading ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!disabled && (
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      )}

      {disabled && (
        <p className="text-xs text-muted-foreground mt-2">
          Chat is currently unavailable. Please try again later.
        </p>
      )}
    </form>
  );
}
