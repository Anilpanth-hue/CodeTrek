const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to merge heatmap data from multiple platforms
export function mergeContributionData(leetcode, gfg, hackerrank, codestudio) {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  // Initialize contribution map
  const contributionMap = new Map();

  // Process LeetCode data
  if (leetcode?.submissionCalendar) {
    const calendar = JSON.parse(leetcode.submissionCalendar);
    Object.entries(calendar).forEach(([timestamp, count]) => {
      const date = new Date(timestamp * 1000).toISOString().split('T')[0];
      contributionMap.set(date, (contributionMap.get(date) || 0) + count);
    });
  }

  // Process GFG data
  if (gfg?.contributions) {
    gfg.contributions.forEach(({ date, count }) => {
      contributionMap.set(date, (contributionMap.get(date) || 0) + count);
    });
  }

  // Process HackerRank data
  if (hackerrank?.submissions) {
    hackerrank.submissions.forEach(({ date, count }) => {
      contributionMap.set(date, (contributionMap.get(date) || 0) + count);
    });
  }

  // Process CodeStudio data
  if (codestudio?.submissions) {
    codestudio.submissions.forEach(({ date, count }) => {
      contributionMap.set(date, (contributionMap.get(date) || 0) + count);
    });
  }

  // Convert to weekly format
  const contributions = [];
  let totalSubmissions = 0;

  for (let i = 0; i < 26; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      const date = new Date(sixMonthsAgo);
      date.setDate(date.getDate() + (i * 7) + j);
      const dateStr = date.toISOString().split('T')[0];
      const count = contributionMap.get(dateStr) || 0;
      totalSubmissions += count;
      week.push({ date: dateStr, count });
    }
    contributions.push(week);
  }

  return { contributions, totalSubmissions };
}

// LeetCode API
export async function fetchLeetCodeStats(username = 'anil123_0') {
  try {
    const response = await fetch(`https://leetcode.com/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
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
      })
    });
    
    const data = await response.json();
    return {
      solved: data.data?.matchedUser?.submitStats?.acSubmissionNum?.reduce((acc, curr) => acc + curr.count, 0) || 0,
      total: 2500,
      submissionCalendar: data.data?.matchedUser?.userCalendar?.submissionCalendar || '{}'
    };
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return { solved: 0, total: 2500, submissionCalendar: '{}' };
  }
}

// GeeksForGeeks API
export async function fetchGFGStats(username = 'anilpaj39t') {
  try {
    const response = await fetch(`https://geeksforgeeks.org/api/profile/${username}`);
    const data = await response.json();
    return {
      solved: data.solved || 0,
      total: 1500,
      contributions: data.contributions || []
    };
  } catch (error) {
    console.error('GFG API Error:', error);
    return { solved: 0, total: 1500, contributions: [] };
  }
}

// HackerRank API
export async function fetchHackerRankStats(username = 'anilpanth44') {
  try {
    const response = await fetch(`https://www.hackerrank.com/rest/hackers/${username}/submission_histories`);
    const data = await response.json();
    return {
      solved: data.solved || 0,
      total: 500,
      submissions: data.submissions || []
    };
  } catch (error) {
    console.error('HackerRank API Error:', error);
    return { solved: 0, total: 500, submissions: [] };
  }
}

// CodeStudio API
export async function fetchCodeStudioStats(username = 'Anil9081') {
  try {
    const response = await fetch(`https://api.codingninjas.com/api/v3/public_profile/${username}`);
    const data = await response.json();
    return {
      solved: data.solved || 0,
      total: 1000,
      submissions: data.submissions || []
    };
  } catch (error) {
    console.error('CodeStudio API Error:', error);
    return { solved: 0, total: 1000, submissions: [] };
  }
}

