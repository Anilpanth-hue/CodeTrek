import { motion } from "framer-motion";

function HeatmapCell({ value, date, delay }) {
  const intensity = Math.min(value / 5, 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.01 }}
      className="w-3 h-3 rounded-sm cursor-pointer relative group"
      style={{
        backgroundColor:
          value === 0 ? "#2d2d2d" : `rgba(74, 222, 128, ${intensity})`,
      }}
    >
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {value} contributions on {date}
      </div>
    </motion.div>
  );
}

export default function ContributionHeatmap({ data }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1a1b23] rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {data.totalSubmissions} submissions in past 6 months
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Less</span>
          <div className="flex gap-1">
            {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
              <div
                key={intensity}
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor:
                    intensity === 0
                      ? "#2d2d2d"
                      : `rgba(74, 222, 128, ${intensity})`,
                }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">More</span>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="grid grid-rows-7 gap-1 text-xs text-gray-400 pt-2">
          {["", "Mon", "", "Wed", "", "Fri", ""].map((day) => (
            <div key={day} className="h-3 flex items-center">
              {day}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1">
            {data.contributions.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => (
                  <HeatmapCell
                    key={`${weekIndex}-${dayIndex}`}
                    value={day.count}
                    date={day.date}
                    delay={weekIndex * 7 + dayIndex}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-400">
            {months.map((month) => (
              <div key={month}>{month}</div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
