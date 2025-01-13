import { motion } from 'framer-motion';

function CircularProgress({ value, max, color, label }) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          className="text-gray-700"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="48"
          cy="48"
        />
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="48"
          cy="48"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
    </div>
  );
}

export default function PlatformStats({ stats }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#1a1b23] rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-6">Platform Statistics</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <CircularProgress
          value={stats.leetcode.solved}
          max={stats.leetcode.total}
          color="text-blue-500"
          label="LeetCode"
        />
        <CircularProgress
          value={stats.gfg.solved}
          max={stats.gfg.total}
          color="text-green-500"
          label="GeeksForGeeks"
        />
        <CircularProgress
          value={stats.hackerrank.solved}
          max={stats.hackerrank.total}
          color="text-purple-500"
          label="HackerRank"
        />
        <CircularProgress
          value={stats.codestudio.solved}
          max={stats.codestudio.total}
          color="text-orange-500"
          label="CodeStudio"
        />
      </div>
    </motion.div>
  );
}

