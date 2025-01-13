const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// LeetCode API endpoint
app.get('/api/leetcode/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query userProblemsSolved($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            userCalendar {
              activeYears
              totalActiveDays
              submissionCalendar
            }
          }
        }
      `,
      variables: { username }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('LeetCode API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch LeetCode data' });
  }
});

// GeeksForGeeks API endpoint
app.get('/api/gfg/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://auth.geeksforgeeks.org/user/${username}/practice`, {
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    // Parse the HTML response to get the solved count
    // This is a simplified example - you might need to adjust the parsing logic
    const solvedMatch = response.data.match(/Total Problems Solved\s*-\s*(\d+)/);
    const solved = solvedMatch ? parseInt(solvedMatch[1]) : 0;
    
    res.json({ solved, total: 500 }); // Total is approximate
  } catch (error) {
    console.error('GFG API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch GFG data' });
  }
});

// HackerRank API endpoint
app.get('/api/hackerrank/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://www.hackerrank.com/rest/hackers/${username}/submission_histories`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('HackerRank API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch HackerRank data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

