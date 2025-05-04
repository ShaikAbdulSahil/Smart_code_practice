
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type AIAssistantProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "hint" | "analysis";
  content: string;
  isLoading: boolean;
};

export default function AIAssistant({
  isOpen,
  onClose,
  type,
  content,
  isLoading,
}: AIAssistantProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {type === "hint" ? "AI Hint" : "Code Analysis"}
          </DialogTitle>
          <DialogDescription>
            {type === "hint"
              ? "Here's a helpful hint for solving this problem."
              : "Analysis of your code solution."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              {content.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
