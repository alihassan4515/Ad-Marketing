import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LogIn, User, Lock } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: 'Login Failed',
        description: 'Please enter both username and password.',
        variant: 'destructive',
      });
      return;
    }
    const success = login(username, password);
    if (success) {
      toast({
        title: 'Login Successful!',
        description: `Welcome back, ${username}!`,
        className: 'bg-green-500 text-white'
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl glassmorphism border-primary/30 dark:border-primary/50 dark:bg-gray-800/70">
          <CardHeader className="text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                Welcome Back!
              </CardTitle>
            </motion.div>
            <CardDescription className="text-gray-300 dark:text-gray-400">Sign in to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center text-lg font-semibold text-gray-200 dark:text-gray-200">
                  <User className="mr-2 h-5 w-5 text-purple-400" /> Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-gray-700/50 border-purple-500/50 focus:border-purple-400 text-white dark:text-white placeholder-gray-400"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center text-lg font-semibold text-gray-200 dark:text-gray-200">
                  <Lock className="mr-2 h-5 w-5 text-purple-400" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-gray-700/50 border-purple-500/50 focus:border-purple-400 text-white dark:text-white placeholder-gray-400"
                  autoComplete="current-password"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg py-3">
                  <LogIn className="mr-2 h-5 w-5" /> Sign In
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 pt-4">
            <p className="text-sm text-gray-400 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300 hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;