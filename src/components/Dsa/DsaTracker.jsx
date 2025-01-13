import { useState } from "react";
import { Bar } from "@nivo/bar";
import { Pie } from "@nivo/pie";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const topicData = [
  { topic: "Arrays", count: 104 },
  { topic: "Data Structures", count: 50 },
  { topic: "Algorithms", count: 44 },
  { topic: "Math", count: 28 },
  { topic: "Binary Search", count: 28 },
  { topic: "Two Pointers", count: 27 },
  { topic: "HashMap", count: 26 },
  { topic: "Linked Lists", count: 23 },
];

const difficultyData = [
  { id: "Easy", value: 124, color: "#4ade80" },
  { id: "Medium", value: 104, color: "#facc15" },
  { id: "Hard", value: 14, color: "#ef4444" },
];

export default function DsaTracker() {
  const [totalSolved] = useState(242);

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress Overview */}
          <div className="bg-[#1a1b23] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Progress Overview
            </h2>
            <div className="text-5xl font-bold text-green-400 mb-2">
              {totalSolved}
            </div>
            <div className="text-gray-400">Total Problems Solved</div>
          </div>

          {/* Difficulty Distribution */}
          <div className="bg-[#1a1b23] rounded-xl p-6 shadow-lg h-[300px]">
            <h2 className="text-2xl font-bold text-white mb-4">
              Difficulty Distribution
            </h2>
            <Pie
              data={difficultyData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ datum: "data.color" }}
              enableArcLinkLabels={true}
              arcLinkLabelsColor={{ from: "color" }}
              arcLinkLabelsTextColor="#ffffff"
              theme={{
                text: {
                  fill: "#ffffff",
                },
                tooltip: {
                  container: {
                    background: "#1a1b23",
                    color: "#ffffff",
                  },
                },
              }}
            />
          </div>

          {/* Topic Analysis */}
          <div className="md:col-span-2 bg-[#1a1b23] rounded-xl p-6 shadow-lg h-[400px]">
            <h2 className="text-2xl font-bold text-white mb-4">
              Topic Analysis
            </h2>
            <Bar
              data={topicData}
              keys={["count"]}
              indexBy="topic"
              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              colors="#3b82f6"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                tickTextColor: "#ffffff",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                tickTextColor: "#ffffff",
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="#ffffff"
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: "#ffffff",
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: "#2a2b33",
                  },
                },
                tooltip: {
                  container: {
                    background: "#1a1b23",
                    color: "#ffffff",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
