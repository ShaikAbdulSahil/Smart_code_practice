
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  onLanguageChange: (language: string) => void;
  onRunCode: () => void;
  onGetHint: () => void;
  onAnalyzeCode: () => void;
};

export default function Header({
  onLanguageChange,
  onRunCode,
  onGetHint,
  onAnalyzeCode,
}: HeaderProps) {
  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Code className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Smart Code Practice</h1>
      </div>

      <div className="flex items-center gap-3">
        <Select onValueChange={onLanguageChange} defaultValue="javascript">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={onRunCode} className="gap-1">
          <Terminal className="h-4 w-4" />
          Run Code
        </Button>

        <Button variant="outline" onClick={onGetHint}>
          Get Hint
        </Button>

        <Button variant="outline" onClick={onAnalyzeCode}>
          Analyze Code
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}
