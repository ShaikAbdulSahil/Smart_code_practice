
"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Code, Terminal, Brain, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 md:py-32 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10" />

        <div className="container max-w-5xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Code className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Smart Code Practice
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-3xl text-muted-foreground max-w-3xl">
              AI-powered platform to master programming skills with intelligent problem-solving assistance and personalized feedback
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" asChild>
                <Link to="/register" className="group gap-2">
                  Start Coding
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<Terminal className="h-10 w-10 text-primary" />}
              title="Interactive Coding Environment"
              description="Practice programming problems in a fully interactive code editor with syntax highlighting and real-time execution."
              delay={0.2}
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="AI-Powered Assistance"
              description="Get intelligent hints, code analysis, and personalized recommendations to improve your programming skills."
              delay={0.4}
            />
            <FeatureCard
              icon={<Code className="h-10 w-10 text-primary" />}
              title="Diverse Problem Library"
              description="Access a growing collection of programming problems across different difficulty levels and domains."
              delay={0.6}
            />
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
              Coming Soon
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">AI Mock Interviews</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Practice technical interviews with our advanced AI interviewer. Get real-time feedback on your performance and improve your interviewing skills.
            </p>
            <div className="pt-4">
              <Button variant="outline" size="lg" className="gap-2">
                Join Waitlist
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center text-center space-y-8 p-8 rounded-lg border bg-card shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Start Coding?
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Access our comprehensive problem editor and start improving your programming skills today.
            </p>
            <div className="pt-2">
              <Button size="lg" asChild>
                <Link to="/workspace" className="gap-2">
                  Go to Workspace
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto py-6 border-t">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Smart Code Practice
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground">
              Register
            </Link>
            <Link to="/workspace" className="text-sm text-muted-foreground hover:text-foreground">
              Workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
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
      className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
    >
      <div className="p-3 rounded-full bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
