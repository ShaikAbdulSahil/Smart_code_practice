
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Difficulty = "easy" | "medium" | "hard";

type ProblemProps = {
  title: string;
  difficulty: Difficulty;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
};

export default function ProblemView({ title, difficulty, description, examples, constraints }: ProblemProps) {
  const difficultyColor = {
    easy: "bg-difficulty-easy",
    medium: "bg-difficulty-medium",
    hard: "bg-difficulty-hard",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Badge className={`${difficultyColor[difficulty]} capitalize`}>
              {difficulty}
            </Badge>
          </div>
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Examples</h3>
          <div className="space-y-4">
            {examples.map((example, index) => (
              <div key={index} className="bg-muted p-4 rounded-md">
                <div className="mb-2">
                  <div className="font-medium">Input:</div>
                  <pre className="bg-background p-2 rounded text-sm">{example.input}</pre>
                </div>
                <div className="mb-2">
                  <div className="font-medium">Output:</div>
                  <pre className="bg-background p-2 rounded text-sm">{example.output}</pre>
                </div>
                {example.explanation && (
                  <div>
                    <div className="font-medium">Explanation:</div>
                    <div className="text-sm">{example.explanation}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Constraints</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
}
