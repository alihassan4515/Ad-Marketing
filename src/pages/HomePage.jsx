
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, Users, BarChart2 } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
          Amplify Your Reach. Reward Your Network.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Join AdShare Platform to publish your ads and empower users to earn by sharing them across their social networks. Track performance, reward engagement, and watch your message spread like wildfire.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button size="lg" asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300">
            <Link to="/admin">Admin Panel</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-yellow-400" />}
          title="Instant Ad Publishing"
          description="Easily create and launch your ad campaigns in minutes. Reach a vast network instantly."
        />
        <FeatureCard
          icon={<Users className="h-10 w-10 text-blue-400" />}
          title="User-Powered Sharing"
          description="Leverage the power of social networks. Users share your ads and earn rewards."
        />
        <FeatureCard
          icon={<BarChart2 className="h-10 w-10 text-green-400" />}
          title="Real-time Analytics"
          description="Track clicks and engagement for each shared link. Understand your campaign's impact."
        />
      </motion.div>
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.03 }}
    className="glassmorphism p-6 rounded-xl shadow-2xl flex flex-col items-center text-center"
  >
    <div className="p-4 bg-white/10 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default HomePage;
  