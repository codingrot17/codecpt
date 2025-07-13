import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terminal() {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const terminalCommands = [
    { command: "whoami", output: "Full-Stack Developer | Mobile Development Enthusiast" },
    { 
      command: "cat skills.txt", 
      output: `Frontend: React, Next.js, Vue.js, JavaScript, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, PHP, Laravel
Database: MongoDB, MySQL, PostgreSQL
Mobile: React Native, Acode, Termux
Tools: Git, Docker, AWS, Vercel, Netlify` 
    },
    { 
      command: "ls projects/", 
      output: "e-commerce-platform/    task-management-app/    mobile-weather-app/\nreal-time-chat/         analytics-dashboard/    blog-platform/" 
    },
    { command: "echo \"Contact me for amazing projects!\"", output: "Contact me for amazing projects!" },
    { command: "curl -s \"https://api.github.com/users/codecpt\" | jq '.public_repos'", output: "42" },
  ];

  useEffect(() => {
    const runCommands = async () => {
      for (let i = 0; i < terminalCommands.length; i++) {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const cmd = terminalCommands[i];
        setCurrentCommand(cmd.command);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCommands(prev => [...prev, cmd.command, cmd.output]);
        setCurrentCommand("");
        setIsTyping(false);
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };

    runCommands();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-gray-400">terminal@codecpt:~$</span>
          </div>
          
          <div className="space-y-2">
            {commands.map((line, index) => (
              <div key={index} className={index % 2 === 0 ? "text-blue-400" : "text-green-400"}>
                {index % 2 === 0 && <span className="text-blue-400">ademola@codecpt</span>}
                {index % 2 === 0 && ":~$ "}
                <span className="whitespace-pre-wrap">{line}</span>
              </div>
            ))}
            
            {isTyping && (
              <div className="text-blue-400">
                <span className="text-blue-400">ademola@codecpt</span>:~$ 
                <span className="typing-animation">{currentCommand}</span>
              </div>
            )}
            
            <div className="text-green-400 mt-4">
              <span className="text-blue-400">ademola@codecpt</span>:~$ 
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400">
            <span className="text-yellow-400">💡</span> Easter Egg Found! You discovered the terminal interface.
          </p>
        </div>
      </div>
    </div>
  );
}
