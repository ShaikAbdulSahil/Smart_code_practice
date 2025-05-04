
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { problems } from "@/data/problems";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // We'll redirect in the useEffect
  }

  // Get problem titles for IDs
  const getProblemTitle = (id: string): string => {
    const problem = problems.find((p) => p.id === id);
    return problem ? problem.title : "Unknown Problem";
  };

  const totalSolved = user.solvedProblems.length;
  const totalAttempted = user.attemptedProblems.length;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-medium">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member since:</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Problems Solved:</span>
                <Badge>{totalSolved}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Problems Attempted:</span>
                <Badge variant="outline">{totalAttempted}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="font-medium">
                  {totalAttempted > 0
                    ? `${Math.round((totalSolved / totalAttempted) * 100)}%`
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Solved Problems</CardTitle>
            <CardDescription>
              Problems you have successfully solved
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.solvedProblems.length > 0 ? (
              <div className="space-y-2">
                {user.solvedProblems.map((problem) => (
                  <div
                    key={problem.problemId}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {getProblemTitle(problem.problemId)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {problem.language}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(problem.solvedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                You haven't solved any problems yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
