import React from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Copy, Share2, BarChartBig, ExternalLink, Eye, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const [ads] = useLocalStorage('ads', []);
  const [userStats] = useLocalStorage('userAdStats', {}); 
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const userId = currentUser ? currentUser.id : null;


  const getShareableLink = (adId) => {
    if (!userId) return ''; 
    const baseUrl = window.location.origin;
    return `${baseUrl}/r/${userId}/${adId}`;
  };

  const copyToClipboard = (text, adTitle) => {
    if (!text) {
      toast({
        title: 'Error',
        description: 'Cannot copy empty link. Are you logged in?',
        variant: 'destructive',
      });
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Link Copied!',
        description: `Link for "${adTitle}" copied to clipboard.`,
        className: 'bg-green-500 text-white'
      });
    }).catch(err => {
      toast({
        title: 'Copy Failed',
        description: 'Could not copy link. Please try again manually.',
        variant: 'destructive',
      });
      console.error('Failed to copy: ', err);
    });
  };
  
  const getAdStats = (adId) => {
    if (!userId) return { clicks: 0, views: 0 };
    const stat = userStats[`${userId}_${adId}`];
    return {
      clicks: Number(stat?.clicks || 0),
      views: Number(stat?.views || 0)
    };
  };


  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 p-4 md:p-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Your Ad Sharing Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Welcome, <span className="font-semibold text-yellow-300">{currentUser?.username || 'User'}</span>! Share ads, track your performance, and get ready to earn!
          </p>
        </header>

        {!currentUser && (
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 glassmorphism rounded-xl mb-8"
          >
            <BarChartBig className="h-24 w-24 mx-auto text-purple-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Please Log In</h2>
            <p className="text-gray-400">Log in to see your ads and stats.</p>
          </motion.div>
        )}

        {currentUser && ads.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 glassmorphism rounded-xl"
          >
            <BarChartBig className="h-24 w-24 mx-auto text-purple-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Ads Available Yet</h2>
            <p className="text-gray-400">Please check back later. Admins are working on new campaigns!</p>
          </motion.div>
        )}

        {currentUser && ads.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ads.map((ad, index) => {
              const shareableLink = getShareableLink(ad.id);
              const stats = getAdStats(ad.id);
              return (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
                >
                  <Card className="overflow-hidden shadow-xl h-full flex flex-col glassmorphism border-purple-500/30 bg-gray-800/50 hover:border-purple-500 transition-all duration-300">
                    {ad.imageUrl && (
                      <div className="relative h-56 w-full overflow-hidden">
                        <img src={ad.imageUrl} alt={ad.title || 'Ad image'} className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
                      </div>
                    )}
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-2xl font-bold text-purple-300 truncate">{ad.title}</CardTitle>
                      <CardDescription className="text-gray-300 h-16 overflow-y-auto text-ellipsis mt-1">{ad.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="flex items-center"><Eye className="mr-2 h-5 w-5 text-blue-400" /> Views:</span>
                        <span className="font-semibold text-blue-300">{stats.views}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="flex items-center"><ThumbsUp className="mr-2 h-5 w-5 text-green-400" /> Clicks:</span>
                        <span className="font-semibold text-green-300">{stats.clicks}</span>
                      </div>
                      <div className="mt-2">
                        <Label htmlFor={`link-${ad.id}`} className="text-xs font-medium text-gray-400">Your unique shareable link:</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            id={`link-${ad.id}`}
                            type="text"
                            readOnly
                            value={shareableLink}
                            className="bg-gray-700/70 border-gray-600 text-gray-200 text-xs flex-grow"
                            placeholder={!userId ? "Log in to get link" : ""}
                            disabled={!userId}
                          />
                           <Button variant="outline" size="icon" onClick={() => copyToClipboard(shareableLink, ad.title)} className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white" disabled={!userId}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                      <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-pink-400 hover:text-pink-300 hover:underline flex items-center">
                        Preview Ad <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                       <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white" onClick={() => copyToClipboard(shareableLink, ad.title)} disabled={!userId}>
                        <Share2 className="mr-2 h-4 w-4" /> Share Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;