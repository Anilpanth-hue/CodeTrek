const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());



// LeetCode API endpoint
app.get("/api/leetcode/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
          query userProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              userCalendar {
                submissionCalendar
              }
            }
          }
        `,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );

    const userData = response.data.data.matchedUser;
    const solved = userData.submitStats.acSubmissionNum.reduce(
      (acc, curr) => acc + curr.count,
      0
    );
    const submissionCalendar = userData.userCalendar.submissionCalendar;

    res.json({
      solved,
      total: 2500,
      submissionCalendar,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
});

// GeeksForGeeks API endpoint
app.get("/api/gfg/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `https://auth.geeksforgeeks.org/user/${username}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
      }
    );

    const solvedMatch = response.data.match(
      /Total Problems Solved\s*-\s*(\d+)/
    );
    const solved = solvedMatch ? parseInt(solvedMatch[1]) : 0;

    res.json({
      solved,
      total: 1500,
    });
  } catch (error) {
    console.error("GFG API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch GFG data" });
  }
});

// HackerRank API endpoint
app.get("/api/hackerrank/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `https://www.hackerrank.com/rest/hackers/${username}/scores/languages_metrics`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "application/json",
        },
      }
    );

    // Calculate total solved problems from languages metrics
    const solved = Object.values(response.data).reduce(
      (acc, curr) => acc + (curr.solved || 0),
      0
    );

    res.json({
      solved,
      total: 500,
    });
  } catch (error) {
    console.error("HackerRank API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch HackerRank data" });
  }
});

// CodeStudio API endpoint
app.get("/api/codestudio/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `https://api.codingninjas.com/api/v3/public_profile/user_details?username=${username}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "application/json",
        },
      }
    );

    const solved = response.data?.data?.total_problems_solved || 0;

    res.json({
      solved,
      total: 1000,
    });
  } catch (error) {
    console.error("CodeStudio API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch CodeStudio data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
