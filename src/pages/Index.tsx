
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import Terminal from "@/components/Terminal";
import ProblemView from "@/components/ProblemView";
import ProblemList, { Problem } from "@/components/ProblemList";
import ResizablePanels from "@/components/ResizablePanels";
import AIAssistant from "@/components/AIAssistant";
import { problems } from "@/data/problems";
import { executeCode, ExecutionResult } from "@/services/judge";
import { generateHint, analyzeCode } from "@/services/openai";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState<boolean>(false);
  const [aiDialogType, setAIDialogType] = useState<"hint" | "analysis">("hint");
  const [aiContent, setAIContent] = useState<string>("");
  const [isAILoading, setIsAILoading] = useState<boolean>(false);

  // Set default problem when component mounts
  useEffect(() => {
    if (problems.length > 0 && !selectedProblemId) {
      selectProblem(problems[0].id);
    }
  }, []);

  const selectProblem = (id: string) => {
    const problem = problems.find(p => p.id === id);
    if (problem) {
      setSelectedProblemId(id);
      setCode(problem.starterCode[language as keyof typeof problem.starterCode] || "");
      setOutput("");
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (selectedProblemId) {
      const problem = problems.find(p => p.id === selectedProblemId);
      if (problem && problem.starterCode[newLanguage as keyof typeof problem.starterCode]) {
        setCode(problem.starterCode[newLanguage as keyof typeof problem.starterCode]);
      }
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");

    try {
      const result: ExecutionResult = await executeCode(code, language);
      
      let outputText = "";
      if (result.stdout) {
        outputText += result.stdout;
      }
      
      if (result.stderr) {
        outputText += "\n" + result.stderr;
      }
      
      outputText += `\n\nStatus: ${result.status.description}`;
      outputText += `\nExecution Time: ${result.time} seconds`;
      outputText += `\nMemory Used: ${result.memory}`;
      
      setOutput(outputText.trim());
    } catch (error) {
      setOutput(`Error executing code: ${(error as Error).message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleGetHint = async () => {
    const problem = problems.find(p => p.id === selectedProblemId);
    if (!problem) return;

    setAIDialogType("hint");
    setIsAILoading(true);
    setIsAIDialogOpen(true);
    setAIContent("");
    
    try {
      const response = await generateHint(problem.description, code);
      setAIContent(response.content);
    } catch (error) {
      setAIContent(`Error getting hint: ${(error as Error).message}`);
      toast({
        title: "Error",
        description: "Failed to generate hint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAILoading(false);
    }
  };

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      toast({
        title: "No Code to Analyze",
        description: "Please write some code first before requesting analysis.",
        variant: "destructive",
      });
      return;
    }

    setAIDialogType("analysis");
    setIsAILoading(true);
    setIsAIDialogOpen(true);
    setAIContent("");
    
    try {
      const response = await analyzeCode(code, language);
      setAIContent(response.content);
    } catch (error) {
      setAIContent(`Error analyzing code: ${(error as Error).message}`);
      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAILoading(false);
    }
  };

  const selectedProblem = problems.find(p => p.id === selectedProblemId);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header
        onLanguageChange={handleLanguageChange}
        onRunCode={handleRunCode}
        onGetHint={handleGetHint}
        onAnalyzeCode={handleAnalyzeCode}
      />

      <main className="flex flex-1 overflow-hidden">
        <Tabs defaultValue="workspace" className="flex-1 flex flex-col h-full">
          <div className="border-b px-4">
            <TabsList>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="workspace" className="flex-1 overflow-hidden m-0 p-0">
            {selectedProblem ? (
              <ResizablePanels
                leftPanel={
                  <ProblemView
                    title={selectedProblem.title}
                    difficulty={selectedProblem.difficulty}
                    description={selectedProblem.description}
                    examples={selectedProblem.examples}
                    constraints={selectedProblem.constraints}
                  />
                }
                rightTopPanel={
                  <CodeEditor
                    language={language}
                    value={code}
                    onChange={setCode}
                  />
                }
                rightBottomPanel={
                  <Terminal output={output} />
                }
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Select a problem to start coding.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="problems" className="flex-1 overflow-hidden m-0 p-0">
            <ProblemList
              problems={problems as Problem[]}
              onSelectProblem={selectProblem}
              selectedProblemId={selectedProblemId}
            />
          </TabsContent>
        </Tabs>
      </main>

      <AIAssistant
        isOpen={isAIDialogOpen}
        onClose={() => setIsAIDialogOpen(false)}
        type={aiDialogType}
        content={aiContent}
        isLoading={isAILoading}
      />
    </div>
  );
};

export default Index;
