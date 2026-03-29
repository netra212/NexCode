const Problem = require("../models/problem");
const Submission = require("../models/submission");
const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/ProblemUtility");

const submitCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    const { code, language } = req.body;

    if (!userId || !code || !problemId || !language) {
      return res.status(400).send("some fields are missing.");
    }

    // fetch the problem from database.
    const problem = await Problem.findById(problemId);

    // above 'problem' will gives hidden testcases.
    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: "Pending",
      testCasesTotal: problem.hiddenTestCases.length,
    });

    // Now, Need to submit to Judge0.
    const languageId = getLanguageById(language);

    const submissions = problem.hiddenTestCases.map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);

    // Updating submittedResult
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = "Accepted";
    let errorMessage = null;

    for (const test of testResult) {
      if (test.status_id == 3) {
        testCasesPassed++;
        runtime = runtime + parseFloat(test.time);
        memory = Math.max(memory, test.memory);
      } else {
        if (test.status_id == 4) {
          status = "error";
          errorMessage = test.stderr;
        } else {
          status = "wrong";
          errorMessage = test.stderr;
        }
      }
    }

    // Store the result into db in submission.
    submittedResult.status = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;

    await submittedResult.save();

    // Inserting the Problem Id into the user Schema ko problem solved ma if it is not present there.
    if (!req.result.problemSolved.includes(problemId)) {
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    res.status(201).send(submittedResult);
  } catch (err) {
    res.status(500).send("Internal server error: " + err.message);
  }
};

const runCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    const { code, language } = req.body;

    if (!userId || !code || !problemId || !language) {
      return res.status(400).send("some fields are missing.");
    }

    // fetch the problem from database.
    const problem = await Problem.findById(problemId);

    // Now, Need to submit to Judge0.
    const languageId = getLanguageById(language);

    const submissions = problem.visibleTestCases.map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);

    res.status(201).send(testResult);
  } catch (err) {
    res.status(500).send("Internal server error: " + err.message);
  }
};

module.exports = { submitCode, runCode };
