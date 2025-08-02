import { useCallback } from 'react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = useCallback(({ title, description, variant = 'default' }: ToastProps) => {
    // Simple console-based toast for now
    // In a real app, you'd integrate with a proper toast library
    const prefix = variant === 'destructive' ? '❌' : '✅';
    console.log(`${prefix} ${title}${description ? `: ${description}` : ''}`);
    
    // You could also use browser notifications or alert
    // For demo purposes, we'll just log to console
  }, []);

  return { toast };
}
