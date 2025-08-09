"use client";
// Responsive behavior handled via Tailwind (flex, grid, md: breakpoints).
import { Sparkles, MessageSquare, Bot} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

export function ChatEmptyState({ className, onUseExample }: { className?: string; onUseExample?: (text: string) => void }) {
  const { user, isAuthenticated } = useAuth();
  const name = isAuthenticated && user ? (user.firstName || user.username) : "there";

  return (
    <div
      className={cn(
        "h-full flex items-center justify-center p-6",
        className
      )}
    >
      <Card
        className="relative w-full max-w-3xl overflow-hidden border border-border/60 bg-gradient-to-b from-background to-muted/30"
      >
        {/* Glow / backdrop */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[conic-gradient(var(--primary)_0deg,var(--primary-foreground)_120deg,var(--primary)_300deg)] opacity-[0.07]" />
        <div className="relative px-10 py-12 flex flex-col gap-8">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Z-Chatbot AI Assistant
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Hi {name}, ready to start a conversation?
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Ask a question, brainstorm ideas, summarize content, or explore code assistance. 
              Your AI assistant is standing by.
            </p>
          </div>

            <Separator className="bg-border/60" />

          <div className="grid gap-4 md:grid-cols-3">
            <Feature
              icon={<Bot className="h-4 w-4" />}
              title="Intelligent"
              desc="Understands context across turns."
            />
            <Feature
              icon={<MessageSquare className="h-4 w-4" />}
              title="Conversational"
              desc="Natural dialogue flow."
            />
            <Feature
              icon={<Sparkles className="h-4 w-4" />}
              title="Helpful"
              desc="Actionable, concise answers."
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">
              Start by typing your first message below.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const example = "Explain quantum computing simply";
                onUseExample?.(example);
                // focus after parent updated
                requestAnimationFrame(() => {
                  document.getElementById("chat-input")?.focus();
                });
              }}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Try: Explain quantum computing simply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative rounded-lg border bg-background/40 p-4 backdrop-blur hover:bg-background/70 transition-colors">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {desc}
      </p>
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 transition" />
    </div>
  );
}