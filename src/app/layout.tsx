
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
