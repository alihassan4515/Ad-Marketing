import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, Shield, Share2, LogIn, LogOut, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white flex items-center">
          <Share2 className="mr-2 h-8 w-8" /> AdShare Platform
        </Link>
        <div className="space-x-2 flex items-center">
          <Button variant="ghost" asChild className="text-white hover:bg-white/20">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
          </Button>

          {currentUser ? (
            <>
              <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                <Link to="/dashboard">
                  <User className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                <Link to="/admin">
                  <Shield className="mr-2 h-4 w-4" /> Admin
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout} className="text-white border-white hover:bg-white hover:text-purple-600">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
              <span className="text-sm text-white/80 hidden md:block">Hi, {currentUser.username}!</span>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button variant="outline" asChild className="text-white border-white hover:bg-white hover:text-purple-600">
                <Link to="/register">
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;