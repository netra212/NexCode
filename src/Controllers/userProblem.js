const Problem = require("../models/problem");
const { getLanguageById, submitBatch } = require("../utils/ProblemUtility");

const CreateProblem = async (req, res) => {
  const {
    title,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;

  try {
    for (const { language, completeCode } of referenceSolution) {
      // source_code:
      // language_id:
      // stdin:
      // expectedOutput:
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => {
        //
        source_code: completeCode;
        language_id: languageId;
        stdin: testcase.input;
        expected_output: testcase.output;
      });

      const submitResult = await submitBatch(submissions);
      console.log(submitResult);
      const resultToken = submitResult.map((value) => value.token);
      console.log(resultToken);

      const testResult = await submitToken(resultToken);
      console.log(testResult);
      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }

    // We can store it in our DB.
    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id,
    });

    res.status(201).send("Problem saved successfully.");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

//Updating Problems.
const UpdateProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      title,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      startCode,
      referenceSolution,
      problemCreator,
    } = req.body;

    if (!id) {
      return res.status(400).send("Missing Id Field.");
    }

    const DsaProblem = await Problem.findById(id);
    if (!DsaProblem) {
      return res.status(404).send("Id is not present in server.");
    }
    for (const { language, completeCode } of referenceSolution) {
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => {
        //
        source_code: completeCode;
        language_id: languageId;
        stdin: testcase.input;
        expected_output: testcase.output;
      });

      const submitResult = await submitBatch(submissions);
      console.log(submitResult);
      const resultToken = submitResult.map((value) => value.token);
      console.log(resultToken);

      const testResult = await submitToken(resultToken);
      console.log(testResult);
      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }

    const newProblem = await Problem.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true },
    );
    res.status(200).send(newProblem);
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("Id is Missing.");
    }
    const deletedProblem = await Problem.findByIdAndDelete(id);
    if (!deletedProblem) {
      return res.status(404).send("Problem not deleted.");
    }
    return res.status(200).send("Problem Deleted Successfully.");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("Id is Missing.");
    }
    const getProblem = await Problem.findById(id);
    if (!getProblem) {
      return res.status(404).send("Problem is Missing");
    }
    return res.status(200).send(getProblem);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

const getAllProblem = async (req, res) => {
  try {
    const getProblem = await Problem.find({});
    if (!getProblem) {
      return res.status(404).send("Problem is Missing");
    }
    return res.status(200).send(getProblem);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

module.exports = {
  CreateProblem,
  UpdateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
};
