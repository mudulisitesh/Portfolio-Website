import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Terminal,
  User,
  Github,
  Mail,
  Laptop
} from 'lucide-react';

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150); // Adjust speed here
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="font-mono">
      <span className="text-green-500">&gt; </span>
      <span className="text-gray-100">{displayText}</span>
      {showCursor && <span className="text-green-500">_</span>}
    </div>
  );
};

const MovingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px] animate-[moveGrid_2s_linear_infinite]" />
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`
          }}
        >
          <Code className="text-gray-500" size={24} />
        </div>
      ))}
    </div>
  );
};

const PortfolioWebsite = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { category: "Languages", items: ["Python", "C/C++", "SQL", "Go", "Spark"] },
    { category: "Cloud", items: ["Azure Databricks", "Azure Data-Factory", "Azure Synapse Studio"] },
    { category: "Tools", items: ["Git", "Docker", "VS Code", "Visual Studio", "PyCharm"] },
    { category: "Libraries", items: ["Sci-kit learn", "Pandas", "Seaborn"] }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section with Moving Background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <MovingBackground />
        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center px-4 z-10"
        >
          <motion.div 
            className="text-6xl font-mono mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TypewriterText text="Sitesh Muduli" />
          </motion.div>
          <motion.div 
            className="text-xl mb-8 text-green-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <TypewriterText text="Microsoft Certified Data Engineer Associate" />
          </motion.div>
          <motion.div 
            className="flex justify-center space-x-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            <motion.a 
              href="mailto:mudulisitesh@gmail.com"
              className="bg-green-500 text-black px-6 py-3 rounded-lg font-mono hover:bg-green-400 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              <span>Contact</span>
            </motion.a>
            <motion.a 
              href="https://github.com/mudulisitesh"
              className="bg-gray-800 text-green-500 border-2 border-green-500 px-6 py-3 rounded-lg font-mono hover:bg-gray-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
              <span>GitHub</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.section 
        className="py-20 px-4 bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-mono text-center mb-12 text-green-400">&gt; Technical_Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={skillGroup.category}
                className="p-6 bg-gray-900 rounded-lg border border-green-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, borderColor: 'rgb(34, 197, 94)' }}
              >
                <h3 className="text-xl font-mono mb-4 text-green-400">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center space-x-2 text-gray-300 font-mono"
                      whileHover={{ x: 10, color: 'rgb(34, 197, 94)' }}
                    >
                      <Terminal size={16} className="text-green-500" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Additional sections would follow with similar styling */}
      
      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 border-t border-green-500/30">
        <div className="max-w-6xl mx-auto px-4 text-center font-mono">
          <p className="text-green-400">$ echo "© 2024 Sitesh Muduli. All rights reserved."</p>
          <div className="flex justify-center space-x-4 mt-4">
            <motion.a 
              href="mailto:mudulisitesh@gmail.com"
              className="text-green-500 hover:text-green-400"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Mail size={24} />
            </motion.a>
            <motion.a 
              href="https://github.com/mudulisitesh"
              className="text-green-500 hover:text-green-400"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github size={24} />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;