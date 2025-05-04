
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type TerminalProps = {
  output: string;
};

export default function Terminal({ output }: TerminalProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  return (
    <div className="bg-terminal-background text-terminal-foreground rounded-md font-mono text-sm p-4 h-full w-full">
      <ScrollArea className="h-full">
        <pre className="whitespace-pre-wrap">{output || "Run your code to see output here..."}</pre>
        <div ref={bottomRef} />
      </ScrollArea>
    </div>
  );
}
