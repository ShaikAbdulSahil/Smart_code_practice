
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Code, Terminal, Brain, ArrowRight, Sparkles, Star, MessageSquare } from "lucide-react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Hero Section with improved background and animations */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/20 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20" />
        
        {/* Floating elements animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * 100 - 50 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0.3,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [0.2, 0.5, 0.2],
                scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 1, Math.random() * 0.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {i % 3 === 0 ? (
                <Brain className="text-primary/10 w-24 h-24" />
              ) : i % 3 === 1 ? (
                <Code className="text-primary/10 w-20 h-20" />
              ) : (
                <Terminal className="text-primary/10 w-16 h-16" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="container max-w-5xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <motion.div 
              className="flex items-center justify-center space-x-3 mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Smart Code Practice
              </h1>
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            </motion.div>
            
            <motion.h2 
              className="text-2xl md:text-3xl text-foreground/90 max-w-3xl font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered platform to <span className="font-semibold text-primary">master programming skills</span> with intelligent problem-solving assistance and personalized feedback
            </motion.h2>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all" asChild>
                <Link href="/register" className="group gap-2 text-white">
                  Start Coding
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 shadow-sm hover:shadow-md transition-all" asChild>
                <Link href="/login">Log In</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with improved cards */}
      <section className="py-20 bg-background w-full">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<Terminal className="h-12 w-12 text-primary" />}
              title="Interactive Coding Environment"
              description="Practice programming problems in a fully interactive code editor with syntax highlighting and real-time execution."
              delay={0.2}
            />
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-primary" />}
              title="AI-Powered Assistance"
              description="Get intelligent hints, code analysis, and personalized recommendations to improve your programming skills."
              delay={0.4}
            />
            <FeatureCard
              icon={<Code className="h-12 w-12 text-primary" />}
              title="Diverse Problem Library"
              description="Access a growing collection of programming problems across different difficulty levels and domains."
              delay={0.6}
            />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Coming Soon Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 via-background to-background relative overflow-hidden w-full">
        {/* Animated dots background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
        
        <div className="container max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="h-4 w-4" />
              <span>Coming Soon</span>
              <Star className="h-4 w-4" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              AI Mock Interviews
            </h2>
            
            <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-8 shadow-xl">
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Practice Like It's Real</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI interviewer adapts to your skill level, providing a realistic interview experience tailored to your goals.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border shadow-sm">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 text-primary mr-2" />
                    Instant Feedback
                  </h4>
                  <p className="text-sm text-muted-foreground">Get actionable feedback to improve your interview skills after each session.</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border shadow-sm">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 text-primary mr-2" />
                    Popular Companies
                  </h4>
                  <p className="text-sm text-muted-foreground">Train with questions modeled after top tech companies' interview patterns.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" size="lg" className="group gap-2 border-2 shadow-sm hover:shadow-md transition-all">
                Join Waitlist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with improved design */}
      <section className="py-20 bg-background w-full">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center text-center space-y-8 p-10 rounded-xl border bg-gradient-to-br from-card via-card to-card/80 shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Start Coding?
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Access our comprehensive problem editor and start improving your programming skills today.
            </p>
            <div className="pt-2">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all" asChild>
                <Link href="/workspace" className="group gap-2">
                  Go to Workspace
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer with improved design */}
      <footer className="mt-auto py-8 border-t bg-secondary/5 w-full">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Smart Code Practice
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Register
            </Link>
            <Link href="/workspace" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Enhanced Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col items-center text-center p-8 rounded-xl border bg-card hover:border-primary/20 transition-all duration-300"
    >
      <div className="p-4 rounded-full bg-primary/10 mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
