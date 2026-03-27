const testingData = {
  title: "Add Two Numbers",
  description:
    "Write a Program that takes two integers as input and returns their sum",
  difficulty: "easy",
  tags: "array",
  visibleTestCases: [
    {
      input: "2 3",
      output: "5",
      explanation: "2 + 3 equals 5",
    },
    {
      input: "-1 5",
      output: "4",
      explanation: "-1 + 5 equals 4",
    },
  ],
  hiddenTestCases: [
    {
      input: "0 0",
      output: "0",
      explanation: "Zero addition test",
    },
    {
      input: "10 20",
      output: "30",
      explanation: "Simple positive integers",
    },
    {
      input: "100 256",
      output: "356",
      explanation: "Larger positive integers",
    },
    {
      input: "-5 -3",
      output: "-8",
      explanation: "Both numbers negative",
    },
    {
      input: "-10 10",
      output: "0",
      explanation: "Canceling out to zero",
    },
    {
      input: "-999 1",
      output: "-998",
      explanation: "Large negative with small positive",
    },
    {
      input: "2147483647 0",
      output: "2147483647",
      explanation: "Maximum 32-bit integer with zero",
    },
    {
      input: "-2147483648 0",
      output: "-2147483648",
      explanation: "Minimum 32-bit integer with zero",
    },
    {
      input: "2147483647 -1",
      output: "2147483646",
      explanation: "Just below overflow",
    },
    {
      input: "-2147483648 1",
      output: "-2147483647",
      explanation: "Just above underflow",
    },
    {
      input: "12345 67890",
      output: "80235",
      explanation: "Random positive numbers",
    },
    {
      input: "-12345 -67890",
      output: "-80235",
      explanation: "Random negative numbers",
    },
    {
      input: "999999 1",
      output: "1000000",
      explanation: "Crossing digit boundary",
    },
    {
      input: "-999999 1",
      output: "-999998",
      explanation: "Negative crossing boundary",
    },
    {
      input: "42 -42",
      output: "0",
      explanation: "Symmetric cancellation",
    },
    {
      input: "123456789 987654321",
      output: "1111111110",
      explanation: "Large random addition",
    },
  ],
  startCode: [
    {
      language: "C++",
      initialCode:
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}",
    },
    {
      language: "Java",
      initialCode:
        "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n        sc.close();\n    }\n}",
    },
    {
      language: "JavaScript",
      initialCode:
        "const readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    const [a, b] = input.split(' ').map(Number);\n    console.log(a + b);\n    rl.close();\n});",
    },
  ],
  referenceSolution: [
    {
      language: "C++",
      completeCode:
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}",
    },
    {
      language: "Java",
      completeCode:
        "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n        sc.close();\n    }\n}",
    },
    {
      language: "JavaScript",
      completeCode:
        "const readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    const [a, b] = input.split(' ').map(Number);\n    console.log(a + b);\n    rl.close();\n});",
    },
  ],
};
