import { motion } from 'framer-motion';

export default function StatsOverview({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1b23] rounded-xl p-6"
      >
        <h3 className="text-gray-400 mb-2">Total Questions</h3>
        <p className="text-4xl font-bold">{stats.totalQuestions}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1a1b23] rounded-xl p-6"
      >
        <h3 className="text-gray-400 mb-2">Total Active Days</h3>
        <p className="text-4xl font-bold">{stats.activeDays}</p>
      </motion.div>
    </div>
  );
}

