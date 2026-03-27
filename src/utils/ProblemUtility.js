const axios = require("axios");

const getLanguageById = (lang) => {
  const language = {
    "C++": 54,
    java: 62,
    javascript: 63,
  };

  return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": "8069e26ba3mshb3d45f418d49436p1c036ejsn6f55fddab235",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error("Error:" + error.message);
    }
    return await fetchData();
  }
};

const Waiting1sec = async (timer) => {
  setTimeout(() => {
    return 1;
  }, timer);
};

const submitToken = async (resultToken) => {
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: resultToken.join(","),
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "8069e26ba3mshb3d45f418d49436p1c036ejsn6f55fddab235",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  while (true) {
    const result = await fetchData();
    const IsResultObtained = result.submissions.every((r) => r.status_id > 2);

    if (IsResultObtained) {
      return result.IsResultObtained;
    }
    await Waiting1sec(1000);
  }
};

module.exports = { getLanguageById, submitBatch, submitToken };
