import {
  Mail,
  Linkedin,
  Globe,
  MapPin,
  GraduationCap,
  Icon,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileSidebar({ user }) {
  const links = [
    { Icon: Mail, url: `mailto:${user.email || "anilpanth44@gmail.com"}` },
    { Icon: Linkedin, url: "https://linkedin.com/in/anil-panth-b060a2256" },
    {
      Icon: Globe,
      url: user.website || "https://anil-panth-portfolio.vercel.app/",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#1a1b23] rounded-xl p-6 h-full"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-700"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#1a1b23]" />
        </div>

        <h2 className="mt-4 text-xl font-bold flex items-center gap-2">
          {user.name}
          <svg
            className="w-5 h-5 text-blue-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </h2>

        <p className="text-gray-400">@{user.username}</p>

        <div className="flex gap-4 mt-4">
          {links.map(({ Icon, url }, i) => (
            <button
              key={i}
              onClick={() => window.open(url, "_blank")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

        <div className="w-full mt-6 space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={16} />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <GraduationCap size={16} />
            <span>{user.education}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
