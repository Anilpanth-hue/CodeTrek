const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
async function fetchFromAPI(platform, username) {
  try {
    const response = await fetch(`${API_BASE_URL}/${platform}/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`${platform} API Error:`, error);
    return { solved: 0, total: 0 };
  }
}

// LeetCode API
export async function fetchLeetCodeStats(username = 'anil123_0') {
  return await fetchFromAPI('leetcode', username);
}

// GeeksForGeeks API
export async function fetchGFGStats(username = 'anilpaj39t') {
  return await fetchFromAPI('gfg', username);
}

// HackerRank API
export async function fetchHackerRankStats(username = 'anilpanth44') {
  return await fetchFromAPI('hackerrank', username);
}

// CodeStudio API
export async function fetchCodeStudioStats(username = 'Anil9081') {
  return await fetchFromAPI('codestudio', username);
}

// Helper function to merge heatmap data
export function mergeContributionData(leetcode) {
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