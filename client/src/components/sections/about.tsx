import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="about" className="section-padding relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-blue-400">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate full-stack developer with a unique approach to mobile and desktop development
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glassmorphism rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-400">My Journey</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-2">Frontend Development</h4>
                  <p className="text-gray-300">
                    Expertise in modern JavaScript frameworks including React, Next.js, and Vue.js. 
                    Creating responsive, performant web applications with exceptional user experiences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-2">Backend Development</h4>
                  <p className="text-gray-300">
                    Strong foundation in server-side technologies including Node.js, Express.js, PHP, and Laravel. 
                    Building scalable APIs and robust backend systems.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-2">Mobile Development</h4>
                  <p className="text-gray-300">
                    Unique experience with Acode and Termux for mobile development. 
                    Creating applications that work seamlessly across all devices and platforms.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern developer workspace with multiple monitors and coding setup"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Development Philosophy</h3>
              <p className="text-gray-300 mb-4">
                I believe in writing clean, maintainable code that scales. My approach combines modern 
                development practices with innovative solutions to create exceptional user experiences.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className="text-sm text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">3+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
