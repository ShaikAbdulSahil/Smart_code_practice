
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import "@/index.css";

export const metadata = {
  title: "Smart Code Practice",
  description: "AI-powered coding practice platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Polyfill for Node.js globals in browser environment
              window.__dirname = '';
              window.process = window.process || {};
              window.process.env = window.process.env || {};
            `,
          }}
        />
      </head>
      <body>
        <TooltipProvider>
          <AuthProvider>
            {children}
            <Toaster />
            <Sonner />
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
