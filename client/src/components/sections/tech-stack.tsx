import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import TechCard from "@/components/ui/tech-card";
import { useQuery } from "@tanstack/react-query";
import type { TechStack } from "@shared/schema";

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const { data: techStacks = [], isLoading } = useQuery({
    queryKey: ["/api/tech-stacks"],
  });

  return (
    <section id="tech" className="section-padding bg-primary-800/50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tech <span className="text-blue-400">Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-32 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {techStacks.map((tech: TechStack, index: number) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <TechCard {...tech} />
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glassmorphism rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-purple-400">Unique Development Environment</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
                  alt="Mobile development setup showing smartphone with coding interface"
                  className="rounded-lg w-24 h-16 object-cover flex-shrink-0"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-blue-400">Acode Editor</h4>
                  <p className="text-sm text-gray-300">
                    Mobile-first development with powerful code editing capabilities
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
                  alt="Terminal interface on mobile device showing command line environment"
                  className="rounded-lg w-24 h-16 object-cover flex-shrink-0"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-purple-400">Termux Terminal</h4>
                  <p className="text-sm text-gray-300">
                    Full Linux environment for mobile development and deployment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
