import { motion } from "framer-motion";

interface TechCardProps {
  name: string;
  icon: string;
  progress: number;
  color: string;
}

export default function TechCard({ name, icon, progress, color }: TechCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="tech-card glassmorphism rounded-xl p-6 text-center"
    >
      <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${color}`}>
        <span className="text-3xl">{icon}</span>
      </div>
      
      <h3 className="font-semibold mb-2">{name}</h3>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="progress-bar h-2 rounded-full"
        />
      </div>
      
      <span className="text-sm text-gray-400">{progress}%</span>
    </motion.div>
  );
}
