import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">CodeTrek</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              Question Tracker
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Event Tracker
            </button>
            <button className="text-orange-500 hover:text-orange-400 transition-colors">
              Profile Tracker
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dsa')}
            className="w-full p-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-bold shadow-lg hover:shadow-cyan-500/25 transition-shadow"
          >
            DSA Track
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dev')}
            className="w-full p-8 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold shadow-lg hover:shadow-purple-500/25 transition-shadow"
          >
            Dev Track
          </motion.button>
        </div>
      </main>
    </div>
  );
}

