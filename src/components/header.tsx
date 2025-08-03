"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, Bot, MessageSquare } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Z-Chatbot AI
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <Bot className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          AI Chatbot
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Intelligent conversations powered by advanced AI technology.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/chat"
                      >
                        <div className="text-sm font-medium leading-none">Chat Interface</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Interactive chat with our AI assistant.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/analytics"
                      >
                        <div className="text-sm font-medium leading-none">Analytics</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Track and analyze your conversations.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/customization"
                      >
                        <div className="text-sm font-medium leading-none">Customization</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Customize your AI assistant behavior.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Documentation
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/pricing" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Bot className="h-6 w-6" />
              <span className="font-bold">Z-Chatbot AI</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Chat</span>
            </Button>
            
            {/* User Menu */}
            <UserMenu />
            {/* Login Button */}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto space-y-1 p-4 px-4 md:px-6">
            <Link
              href="/chat"
              className="block px-2 py-1 text-lg font-medium transition-colors hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              href="/analytics"
              className="block px-2 py-1 text-lg font-medium transition-colors hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/docs"
              className="block px-2 py-1 text-lg font-medium transition-colors hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/pricing"
              className="block px-2 py-1 text-lg font-medium transition-colors hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
