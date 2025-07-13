import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "mobile development":
        return "bg-blue-500/20 text-blue-400";
      case "react":
        return "bg-purple-500/20 text-purple-400";
      case "backend":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case "mobile development":
        return "from-blue-500 to-purple-500";
      case "react":
        return "from-purple-500 to-pink-500";
      case "backend":
        return "from-green-500 to-teal-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "mobile development":
        return "📱";
      case "react":
        return "⚛️";
      case "backend":
        return "🚀";
      default:
        return "📝";
    }
  };

  if (isLoading) {
    return (
      <section id="blog" className="section-padding bg-primary-800/50" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-primary-800/50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest <span className="text-blue-400">Blog</span> Posts
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glassmorphism rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(post.category)} flex items-center justify-center`}>
                <div className="text-6xl">{getCategoryIcon(post.category)}</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${getCategoryColor(post.category)}`}>
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No blog posts available at the moment.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View All Posts
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
