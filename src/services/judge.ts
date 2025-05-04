
// This is a mock implementation of the Judge0 API integration
// In a real application, you would connect to a Judge0 API instance

export type ExecutionResult = {
  stdout: string;
  stderr: string;
  status: {
    id: number;
    description: string;
  };
  time: string;
  memory: string;
};

const languageIds: Record<string, number> = {
  javascript: 63, // Node.js
  python: 71, // Python 3
  java: 62, // Java
  cpp: 54, // C++
};

export async function executeCode(
  code: string,
  language: string,
  stdin = ""
): Promise<ExecutionResult> {
  // In a real application, you would make an API call to Judge0 like:
  // const response = await fetch('http://your-judge0-instance/submissions', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     source_code: code,
  //     language_id: languageIds[language],
  //     stdin,
  //   }),
  // });
  // const data = await response.json();
  // return data;

  console.log(`Executing ${language} code`);
  console.log(code);

  // This is a mock implementation to simulate code execution
  return new Promise((resolve) => {
    // Simulate execution delay
    setTimeout(() => {
      if (code.includes("console.log") || code.includes("print") || code.includes("System.out")) {
        if (language === "javascript" && code.includes("twoSum")) {
          // Mock successful execution for Two Sum problem in JavaScript
          resolve({
            stdout: "Output: [0, 1]\n",
            stderr: "",
            status: {
              id: 3,
              description: "Accepted",
            },
            time: "0.01",
            memory: "9.8 MB",
          });
        } else {
          // Mock generic success response
          resolve({
            stdout: "Hello, World!\n",
            stderr: "",
            status: {
              id: 3,
              description: "Accepted",
            },
            time: "0.02",
            memory: "10.2 MB",
          });
        }
      } else if (code.includes("//") || code.includes("#")) {
        // Only comments, no actual code
        resolve({
          stdout: "",
          stderr: "Warning: No output generated",
          status: {
            id: 4,
            description: "Completed",
          },
          time: "0.01",
          memory: "8.5 MB",
        });
      } else if (code.trim() === "") {
        // Empty code
        resolve({
          stdout: "",
          stderr: "Error: Empty code submission",
          status: {
            id: 6,
            description: "Error",
          },
          time: "0.00",
          memory: "0.0 MB",
        });
      } else {
        // Simulate error for testing
        resolve({
          stdout: "",
          stderr: "ReferenceError: undefinedVariable is not defined",
          status: {
            id: 6,
            description: "Error",
          },
          time: "0.01",
          memory: "9.2 MB",
        });
      }
    }, 800);
  });
}

export function getAvailableLanguages() {
  return Object.keys(languageIds).map((key) => ({
    id: languageIds[key],
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: key,
  }));
}
