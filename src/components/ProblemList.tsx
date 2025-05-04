
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Problem = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
};

type ProblemListProps = {
  problems: Problem[];
  onSelectProblem: (id: string) => void;
  selectedProblemId: string | null;
};

export default function ProblemList({
  problems,
  onSelectProblem,
  selectedProblemId,
}: ProblemListProps) {
  const difficultyColor = {
    easy: "bg-difficulty-easy",
    medium: "bg-difficulty-medium",
    hard: "bg-difficulty-hard",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-3">
        {problems.map((problem) => (
          <Card
            key={problem.id}
            className={`cursor-pointer hover:border-primary transition-colors ${
              selectedProblemId === problem.id ? "border-primary" : ""
            }`}
            onClick={() => onSelectProblem(problem.id)}
          >
            <CardHeader className="py-3 px-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{problem.title}</CardTitle>
                <Badge className={`${difficultyColor[problem.difficulty]} capitalize`}>
                  {problem.difficulty}
                </Badge>
              </div>
              <CardDescription className="flex flex-wrap gap-1 mt-2">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
