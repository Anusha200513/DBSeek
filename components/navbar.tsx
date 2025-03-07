"use client";

import { Button } from "@/components/ui/button";
import { Bot, Database, Menu } from "lucide-react";
import { LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type React from "react"; // Added import for React
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const { data: session, status} = useSession();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <Link href="/" className="flex items-center space-x-2">
      <Database className="w-8 h-8 text-green-400/50"/>
        <span className="text-white font-medium text-xl">DBSeek</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/features">Features</NavLink>
        <NavLink href="/how-it-works">How it Works</NavLink>
        <NavLink href="/chat">Examples</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {session ? (
          <>
            <Button 
                  variant="ghost" 
                  size='icon'
                  className="relative h-12 w-12 text-[#2A5C8F] hover:bg-[#FFD700]/10"
                  onClick={() => {
                    if(window.confirm('Are you sure you want to logout?')) {
                      signOut();
                      router.push('/');
                    }
                  }}
                >
                <LogOut className="h-5 w-5 mr-2" />
                </Button>
          </>
          ) : (
          <>
          <Button onClick={() => {
            router.push('/auth/login')
          }} variant="ghost" className="text-white hover:text-green-400">
          Sign In
          </Button>
          <Button onClick={() => {
            router.push('/auth/signup')
          }} className="bg-green-600 hover:bg-green-700 text-white">
            Get Started
          </Button>
          </>
      )}
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
    </Link>
  );
}