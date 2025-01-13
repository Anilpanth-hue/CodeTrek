import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import StatsOverview from './StatsOverview';
import ContributionHeatmap from './ContributionHeatmap';
import PlatformStats from './PlatformStats';
import { 
  fetchLeetCodeStats, 
  fetchGFGStats, 
  fetchHackerRankStats, 
  fetchCodeStudioStats,
  mergeContributionData 
} from '../../utils/coding-apis';

export default function DsaProfile() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [leetcode, gfg, hackerrank, codestudio] = await Promise.all([
          fetchLeetCodeStats(),
          fetchGFGStats(),
          fetchHackerRankStats(),
          fetchCodeStudioStats()
        ]);

        // Process contribution data from all platforms
        const { contributions, totalSubmissions } = mergeContributionData(
          leetcode,
          gfg,
          hackerrank,
          codestudio
        );

        // Calculate total questions across all platforms
        const totalQuestions = leetcode.solved + gfg.solved + hackerrank.solved + codestudio.solved;

        setStats({
          user: {
            name: 'Anil',
            username: 'anil123_0',
            avatar: '/placeholder.svg',
            location: 'India',
            education: 'Computer Science',
          },
          overview: {
            totalQuestions,
            activeDays: contributions.flat().filter(day => day.count > 0).length
          },
          contributions: {
            totalSubmissions,
            contributions
          },
          platforms: {
            leetcode: {
              solved: leetcode.solved,
              total: leetcode.total
            },
            gfg: {
              solved: gfg.solved,
              total: gfg.total
            },
            hackerrank: {
              solved: hackerrank.solved,
              total: hackerrank.total
            },
            codestudio: {
              solved: codestudio.solved,
              total: codestudio.total
            }
          }
        });
      } catch (err) {
        setError('Failed to fetch coding statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ProfileSidebar user={stats.user} />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <StatsOverview stats={stats.overview} />
            <ContributionHeatmap data={stats.contributions} />
          </div>

          <div className="lg:col-span-3">
            <PlatformStats stats={stats.platforms} />
          </div>
        </div>
      </div>
    </div>
  );
}

