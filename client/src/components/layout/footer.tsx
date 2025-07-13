import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="text-blue-400">Code</span>cpt
            </div>
            <p className="text-gray-400 mb-4">
              Full-stack developer creating innovative solutions with modern technologies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-blue-400 transition-colors">Projects</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Frontend Development</span></li>
              <li><span className="text-gray-400">Backend Development</span></li>
              <li><span className="text-gray-400">Mobile Development</span></li>
              <li><span className="text-gray-400">API Development</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>codingrot001@email.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+234 (8) 081 779 959</span>

              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2023 Ademola Emmanuel Ayomide. All rights reserved.{" "}
            <span className="text-blue-400">Made with ❤️ using React & Node.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
